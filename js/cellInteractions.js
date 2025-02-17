import { config } from './config.js';

export const cellInteractions = {
    highlightCell(row, col) {
        d3.selectAll(".cell")
            .style("opacity", function() {
                const cellRow = +this.getAttribute("data-row");
                const cellCol = +this.getAttribute("data-col");
                return (cellRow === row && cellCol === col) ? 1 : 0.15;
            });

        d3.selectAll(".label")
            .classed("dimmed", true)
            .classed("highlighted", false);
        
        d3.select(`.row-label-${row}`)
            .classed("dimmed", false)
            .classed("highlighted", true);
        
        d3.select(`.col-label-${col}`)
            .classed("dimmed", false)
            .classed("highlighted", true);
    },

    unhighlightCell(maxValue) {
        d3.selectAll(".cell")
            .style("opacity", d => {
                if (d.value === 0) return 0.05;
                const normalizedValue = d.value / maxValue;
                return config.minOpacity + normalizedValue * (config.maxOpacity - config.minOpacity);
            });

        d3.selectAll(".label")
            .classed("dimmed", false)
            .classed("highlighted", false);
    }
}; 