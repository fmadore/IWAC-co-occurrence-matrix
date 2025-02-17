import { config } from './config.js';

export const utils = {
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