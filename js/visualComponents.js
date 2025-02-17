import { config } from './config.js';

export const visualComponents = {
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