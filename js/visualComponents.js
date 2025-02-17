import { config } from './config.js';

export const visualComponents = {
    setupSVG(container, width, height) {
        return container
            .append("svg")
            .attr("class", "w-100 h-auto")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${config.margin.left},${config.margin.top})`);
    },

    createTooltip() {
        if (!d3.select("#tooltip").size()) {
            d3.select("body").append("div")
                .attr("id", "tooltip")
                .attr("class", "tooltip transition-fast")
                .html(`
                    <div class="tooltip-content">
                        <div class="tooltip-label"></div>
                        <div class="tooltip-value"></div>
                    </div>
                `);
        }
    },

    showTooltip(event, d) {
        if (d.value > 0) {
            const tooltip = d3.select("#tooltip");
            const source = d.nodes[d.i].name;
            const target = d.nodes[d.j].name;
            
            // Update tooltip content
            tooltip.select(".tooltip-label")
                .text(`${source} ↔ ${target}`);
            
            tooltip.select(".tooltip-value")
                .text(`Co-occurrences: ${d.value}`);

            // Position and show tooltip
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
                .classed("visible", true);
        }
    },

    hideTooltip() {
        d3.select("#tooltip")
            .classed("visible", false);
    }
}; 