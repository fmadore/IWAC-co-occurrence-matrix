import { config } from './config.js';

export const cellInteractions = {
    highlightCell(row, col) {
        d3.selectAll(".cell")
            .classed("cell-highlighted", function() {
                const cellRow = +this.getAttribute("data-row");
                const cellCol = +this.getAttribute("data-col");
                return cellRow === row && cellCol === col;
            })
            .classed("cell-dimmed", function() {
                const cellRow = +this.getAttribute("data-row");
                const cellCol = +this.getAttribute("data-col");
                return cellRow !== row || cellCol !== col;
            });

        d3.selectAll(".matrix-label")
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
            .classed("cell-highlighted", false)
            .classed("cell-dimmed", false)
            .classed("cell-empty", d => d.value === 0)
            .classed("cell-filled", d => d.value > 0);

        d3.selectAll(".matrix-label")
            .classed("dimmed", false)
            .classed("highlighted", false);
    }
}; 