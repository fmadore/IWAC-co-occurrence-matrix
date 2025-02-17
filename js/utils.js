import { config } from './config.js';

export const utils = {
    showError(message) {
        const matrixDiv = d3.select("#matrix");
        matrixDiv.selectAll("*").remove();
        matrixDiv
            .append("div")
            .attr("class", "error-message d-flex justify-center align-center p-lg text-primary bg-surface rounded-md shadow-sm")
            .attr("role", "alert")
            .attr("aria-live", "assertive")
            .text(message);
    },

    calculateMatrixSize(nodesLength) {
        const size = nodesLength * (config.cellSize + config.cellPadding);
        return {
            size,
            width: size + config.margin.left + config.margin.right,
            height: size + config.margin.top + config.margin.bottom
        };
    },

    // Helper to determine appropriate matrix size class based on node count
    getMatrixSizeClass(nodesLength) {
        if (nodesLength <= 20) return 'matrix-cell-lg matrix-gap-lg';
        if (nodesLength <= 50) return 'matrix-cell-md matrix-gap-md';
        return 'matrix-cell-sm matrix-gap-sm';
    },

    // Helper to determine appropriate matrix container class based on size
    getMatrixContainerClass(width, height) {
        const classes = ['matrix-container', 'bg-surface', 'shadow-md', 'rounded-md'];
        
        // Add responsive classes based on dimensions
        if (width > window.innerWidth * 0.8 || height > window.innerHeight * 0.8) {
            classes.push('matrix-responsive', 'matrix-auto-scroll');
        }
        
        // Add density class based on dimensions
        if (width > 1000 || height > 1000) {
            classes.push('matrix-dense');
        } else if (width < 500 && height < 500) {
            classes.push('matrix-sparse');
        } else {
            classes.push('matrix-normal');
        }
        
        return classes.join(' ');
    },

    // Helper to format values consistently
    formatValue(value) {
        return value === 0 ? '0' : value.toLocaleString();
    },

    // Helper to check if the matrix is too large and needs optimization
    isLargeMatrix(nodesLength) {
        return nodesLength > 100;
    },

    // Helper to debounce resize events
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}; 