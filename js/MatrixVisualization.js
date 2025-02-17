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
        // Add transition classes to controls
        const controls = d3.selectAll('#window-type, #order')
            .classed('p-sm rounded-sm border text-primary bg-transparent transition-default pointer', true);

        controls.on('change', (event) => {
            const windowType = document.getElementById('window-type').value;
            const orderType = document.getElementById('order').value;
            this.createMatrix(windowType, orderType);
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

        // Create SVG with utility classes
        const svg = visualComponents.setupSVG(
            d3.select("#matrix")
                .classed("matrix-container matrix-responsive bg-surface shadow-md rounded-md overflow-auto", true),
            width,
            height
        );

        this.renderRows(svg, orderedNodes, matrix, maxValue, colorScale);
        this.renderLabels(svg, orderedNodes);
        visualComponents.createTooltip();
    }

    renderRows(svg, nodes, matrix, maxValue, colorScale) {
        const rows = svg.selectAll(".row")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "row d-flex matrix-gap-md")
            .attr("transform", (d, i) => `translate(0,${i * (config.cellSize + config.cellPadding)})`);

        this.renderCells(rows, matrix, nodes, maxValue, colorScale);
    }

    renderCells(rows, matrix, nodes, maxValue, colorScale) {
        rows.selectAll(".cell")
            .data((d, i) => matrix[i].map((value, j) => ({value, i, j, nodes})))
            .enter()
            .append("rect")
            .attr("class", d => {
                const baseClasses = "cell transition-matrix pointer matrix-cell-md";
                const stateClasses = d.value === 0 ? "cell-empty" : "cell-filled";
                return `${baseClasses} ${stateClasses}`;
            })
            .attr("x", (d, i) => i * (config.cellSize + config.cellPadding))
            .attr("width", config.cellSize)
            .attr("height", config.cellSize)
            .style("fill", d => d.value === 0 ? config.colors.empty : colorScale(d.value))
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
            .attr("class", d => `matrix-label row-label-${nodes.indexOf(d)} font-xs text-primary transition-default`)
            .attr("x", -6)
            .attr("y", config.cellSize / 2)
            .attr("text-anchor", "end")
            .attr("alignment-baseline", "middle")
            .text(d => d.name);

        // Column labels container with utility classes
        const columnLabelsGroup = svg.append("g")
            .attr("class", "column-labels transition-default")
            .attr("transform", `translate(0, ${-config.margin.top * 0.4})`);

        // Column labels
        columnLabelsGroup.selectAll(".column-label")
            .data(nodes)
            .enter()
            .append("text")
            .attr("class", (d, i) => `matrix-label col-label-${i} font-xs text-primary transition-default`)
            .attr("x", (d, i) => i * (config.cellSize + config.cellPadding) + config.cellSize / 2)
            .attr("y", -4)
            .attr("transform", (d, i) => {
                const x = i * (config.cellSize + config.cellPadding) + config.cellSize / 2;
                return `rotate(-45,${x},-4)`;
            })
            .attr("text-anchor", "end")
            .attr("dy", ".2em")
            .text(d => d.name);
    }
} 