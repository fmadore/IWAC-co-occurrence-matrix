import { config } from './config.js';
import { utils } from './utils.js';

export const visualComponents = {
    setupSVG(container, width, height) {
        // Apply container classes based on dimensions
        container.attr("class", utils.getMatrixContainerClass(width, height));

        // Create SVG with responsive classes
        const svg = container
            .append("svg")
            .attr("class", "w-100 h-auto matrix-svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        // Create main group with proper margin transform
        return svg.append("g")
            .attr("class", "matrix-content transition-default")
            .attr("transform", `translate(${config.margin.left},${config.margin.top})`);
    },

    createTooltip() {
        if (!d3.select("#tooltip").size()) {
            d3.select("body").append("div")
                .attr("id", "tooltip")
                .attr("class", "tooltip transition-fast no-pointer bg-surface shadow-sm rounded-sm")
                .attr("role", "tooltip")
                .attr("aria-hidden", "true")
                .html(`
                    <div class="tooltip-content p-sm">
                        <div class="tooltip-label font-sm text-primary font-medium mb-xs"></div>
                        <div class="tooltip-value font-sm text-secondary"></div>
                    </div>
                `);
        }
    },

    showTooltip(event, d) {
        if (d.value > 0) {
            const tooltip = d3.select("#tooltip");
            const source = d.nodes[d.i].name;
            const target = d.nodes[d.j].name;
            
            // Update tooltip content with proper formatting
            tooltip.select(".tooltip-label")
                .html(`<span class="font-medium">${source}</span> ↔ <span class="font-medium">${target}</span>`);
            
            tooltip.select(".tooltip-value")
                .text(`Co-occurrences: ${utils.formatValue(d.value)}`);

            // Calculate position to ensure tooltip stays within viewport
            const tooltipWidth = tooltip.node().offsetWidth;
            const tooltipHeight = tooltip.node().offsetHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let left = event.pageX + 10;
            let top = event.pageY - 10;

            // Adjust position if tooltip would overflow viewport
            if (left + tooltipWidth > viewportWidth) {
                left = event.pageX - tooltipWidth - 10;
            }
            if (top + tooltipHeight > viewportHeight) {
                top = event.pageY - tooltipHeight - 10;
            }

            // Position and show tooltip with proper ARIA attributes
            tooltip
                .style("left", `${left}px`)
                .style("top", `${top}px`)
                .classed("visible", true)
                .attr("aria-hidden", "false");
        }
    },

    hideTooltip() {
        d3.select("#tooltip")
            .classed("visible", false)
            .attr("aria-hidden", "true");
    }
}; 