import { config } from './config.js';

export const cellInteractions = {
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