import { config } from './config.js';
import { utils } from './utils.js';
import { dataProcessor } from './dataProcessor.js';
import { visualComponents } from './visualComponents.js';
import { cellInteractions } from './cellInteractions.js';
import { sortingUtils } from './sortingUtils.js';

export class MatrixVisualization {
    constructor(data) {
        this.data = data;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('window-type').addEventListener('change', (event) => {
            this.createMatrix(event.target.value);
        });

        document.getElementById('order').addEventListener('change', (event) => {
            this.createMatrix(document.getElementById('window-type').value, event.target.value);
        });
    }

    createMatrix(windowType, orderType = document.getElementById('order').value) {
        d3.select("#matrix").selectAll("*").remove();

        const { nodes, links } = this.data[windowType];
        
        // Apply ordering
        const { orderedNodes, orderedLinks } = sortingUtils.getOrderedMatrix(nodes, links, orderType);
        
        const matrix = dataProcessor.createAdjacencyMatrix(orderedNodes, orderedLinks);
        const { maxValue, colorScale } = dataProcessor.calculateScales(orderedLinks);
        const { width, height } = utils.calculateMatrixSize(orderedNodes.length);

        const svg = visualComponents.setupSVG(d3.select("#matrix"), width, height);
        this.renderRows(svg, orderedNodes, matrix, maxValue, colorScale);
        this.renderLabels(svg, orderedNodes);
        visualComponents.createTooltip();
    }

    renderRows(svg, nodes, matrix, maxValue, colorScale) {
        const rows = svg.selectAll(".row")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "row")
            .attr("transform", (d, i) => `translate(0,${i * (config.cellSize + config.cellPadding)})`);

        this.renderCells(rows, matrix, nodes, maxValue, colorScale);
    }

    renderCells(rows, matrix, nodes, maxValue, colorScale) {
        rows.selectAll(".cell")
            .data((d, i) => matrix[i].map((value, j) => ({value, i, j, nodes})))
            .enter()
            .append("rect")
            .attr("class", "cell")
            .attr("x", (d, i) => i * (config.cellSize + config.cellPadding))
            .attr("width", config.cellSize)
            .attr("height", config.cellSize)
            .style("fill", d => d.value === 0 ? config.colors.empty : colorScale(d.value))
            .style("opacity", d => {
                if (d.value === 0) return 0.05;
                const normalizedValue = d.value / maxValue;
                return config.minOpacity + Math.pow(normalizedValue, 0.5) * 
                       (config.maxOpacity - config.minOpacity);
            })
            .style("stroke", "#ddd")
            .style("stroke-width", 0.5)
            .attr("data-row", d => d.i)
            .attr("data-col", d => d.j)
            .on("mouseover", (event, d) => {
                visualComponents.showTooltip(event, d);
                cellInteractions.highlightCell(d.i, d.j);
            })
            .on("mouseout", () => {
                visualComponents.hideTooltip();
                cellInteractions.unhighlightCell(maxValue);
            });
    }

    renderLabels(svg, nodes) {
        // Row labels
        svg.selectAll(".row")
            .append("text")
            .attr("class", d => `label row-label-${nodes.indexOf(d)}`)
            .attr("x", -12)
            .attr("y", config.cellSize / 2)
            .attr("text-anchor", "end")
            .attr("alignment-baseline", "middle")
            .text(d => d.name)
            .style("font-size", "12px")
            .style("font-weight", "500");

        // Column labels - create a container group
        const columnLabelsGroup = svg.append("g")
            .attr("class", "column-labels");

        columnLabelsGroup.selectAll(".column-label")
            .data(nodes)
            .enter()
            .append("text")
            .attr("class", (d, i) => `label col-label-${i}`)
            .attr("x", (d, i) => i * (config.cellSize + config.cellPadding) + config.cellSize / 2)
            .attr("y", -10)  // Adjusted y position
            .attr("transform", (d, i) => {
                const x = i * (config.cellSize + config.cellPadding) + config.cellSize / 2;
                return `rotate(-45,${x},-10)`;  // Changed angle from -65 to -45 for better readability
            })
            .attr("text-anchor", "end")
            .attr("dy", ".2em")
            .text(d => d.name)
            .style("font-size", "12px")
            .style("font-weight", "500");
    }
} 