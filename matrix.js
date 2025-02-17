// Configuration object
const config = {
    margin: { top: 160, right: 20, bottom: 10, left: 120 },
    cellSize: 16,
    cellPadding: 3,
    maxOpacity: 1.0,
    minOpacity: 0.3,
    colors: {
        empty: "#f8f9fa",
        filled: d3.interpolateBlues
    },
    dataUrl: './data/cooccurrence.json'
};

// Utility functions
const utils = {
    showError(message) {
        const matrixDiv = d3.select("#matrix");
        matrixDiv.selectAll("*").remove();
        matrixDiv
            .append("div")
            .attr("class", "error-message")
            .attr("role", "alert")
            .text(message);
    },

    calculateMatrixSize(nodesLength) {
        const size = nodesLength * (config.cellSize + config.cellPadding);
        return {
            size,
            width: size + config.margin.left + config.margin.right,
            height: size + config.margin.top + config.margin.bottom
        };
    }
};

// Data processing functions
const dataProcessor = {
    createAdjacencyMatrix(nodes, links) {
        const matrix = Array(nodes.length).fill().map(() => Array(nodes.length).fill(0));
        links.forEach(link => {
            matrix[link.source][link.target] = link.value;
        });
        return matrix;
    },

    calculateScales(links) {
        const maxValue = d3.max(links, d => d.value);
        const nonZeroValues = links.map(d => d.value).filter(v => v > 0);
        const quartiles = {
            q1: d3.quantile(nonZeroValues, 0.25),
            q2: d3.quantile(nonZeroValues, 0.5),
            q3: d3.quantile(nonZeroValues, 0.75)
        };

        const colorScale = d3.scaleQuantile()
            .domain([0, quartiles.q1, quartiles.q2, quartiles.q3, d3.max(nonZeroValues)])
            .range([
                d3.interpolateBlues(0.1),
                d3.interpolateBlues(0.3),
                d3.interpolateBlues(0.5),
                d3.interpolateBlues(0.7),
                d3.interpolateBlues(0.9)
            ]);

        return { maxValue, colorScale };
    }
};

// Visualization components
const visualComponents = {
    setupSVG(container, width, height) {
        return container
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${config.margin.left},${config.margin.top})`);
    },

    createTooltip() {
        if (!d3.select("#tooltip").size()) {
            d3.select("body").append("div")
                .attr("id", "tooltip")
                .attr("class", "tooltip")
                .style("display", "none");
        }
    },

    showTooltip(event, d) {
        if (d.value > 0) {
            const tooltip = d3.select("#tooltip");
            const source = d.nodes[d.i].name;
            const target = d.nodes[d.j].name;
            tooltip.style("display", "block")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
                .html(`${source} ↔ ${target}<br>Co-occurrences: ${d.value}`);
        }
    },

    hideTooltip() {
        d3.select("#tooltip").style("display", "none");
    }
};

// Cell interaction handlers
const cellInteractions = {
    highlightCell(row, col) {
        d3.selectAll(".cell")
            .style("opacity", function() {
                const cellRow = +this.getAttribute("data-row");
                const cellCol = +this.getAttribute("data-col");
                return (cellRow === row && cellCol === col) ? 1 : 0.15;
            });

        d3.selectAll(".label").style("fill", "#999");
        d3.select(`.row-label-${row}`).style("fill", "#2171b5").style("font-weight", "bold");
        d3.select(`.col-label-${col}`).style("fill", "#2171b5").style("font-weight", "bold");
    },

    unhighlightCell(maxValue) {
        d3.selectAll(".cell")
            .style("opacity", d => {
                if (d.value === 0) return 0.05;
                const normalizedValue = d.value / maxValue;
                return config.minOpacity + normalizedValue * (config.maxOpacity - config.minOpacity);
            });

        d3.selectAll(".label")
            .style("fill", "#333")
            .style("font-weight", "500");
    }
};

// Matrix visualization class
class MatrixVisualization {
    constructor(data) {
        this.data = data;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('window-type').addEventListener('change', (event) => {
            this.createMatrix(event.target.value);
        });

        document.getElementById('order').addEventListener('change', () => {
            this.createMatrix(document.getElementById('window-type').value);
        });
    }

    createMatrix(windowType) {
        d3.select("#matrix").selectAll("*").remove();

        const { nodes, links } = this.data[windowType];
        const matrix = dataProcessor.createAdjacencyMatrix(nodes, links);
        const { maxValue, colorScale } = dataProcessor.calculateScales(links);
        const { width, height } = utils.calculateMatrixSize(nodes.length);

        const svg = visualComponents.setupSVG(d3.select("#matrix"), width, height);
        this.renderRows(svg, nodes, matrix, maxValue, colorScale);
        this.renderLabels(svg, nodes);
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

        // Column labels
        svg.selectAll(".column-label")
            .data(nodes)
            .enter()
            .append("text")
            .attr("class", (d, i) => `label col-label-${i}`)
            .attr("x", (d, i) => i * (config.cellSize + config.cellPadding) + config.cellSize / 2)
            .attr("y", -30)
            .attr("transform", (d, i) => {
                const x = i * (config.cellSize + config.cellPadding) + config.cellSize / 2;
                return `rotate(-65,${x},-30)`;
            })
            .attr("text-anchor", "end")
            .attr("dy", ".2em")
            .text(d => d.name)
            .style("font-size", "12px")
            .style("font-weight", "500");
    }
}

// Initialize visualization
d3.json(config.dataUrl)
    .then(data => {
        if (!data) throw new Error('No data received');
        const vis = new MatrixVisualization(data);
        vis.createMatrix(document.getElementById('window-type').value);
    })
    .catch(error => {
        console.error('Error loading the data:', error);
        utils.showError("Error loading visualization data. Please ensure the data file exists and is properly formatted.");
    }); 