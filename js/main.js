import { config } from './config.js';
import { utils } from './utils.js';
import { MatrixVisualization } from './MatrixVisualization.js';

// Initialize the matrix container with proper classes
const matrixContainer = d3.select("#matrix")
    .classed("matrix-container matrix-responsive bg-surface shadow-md rounded-md overflow-auto", true);

// Add loading state
const loadingIndicator = matrixContainer
    .append("div")
    .attr("class", "d-flex justify-center align-center p-xl")
    .text("Loading visualization...");

// Initialize visualization
d3.json(config.dataUrl)
    .then(data => {
        if (!data) throw new Error('No data received');
        
        // Remove loading indicator
        loadingIndicator.remove();
        
        // Initialize and create matrix
        const vis = new MatrixVisualization(data);
        
        // Get window type select and add proper styling
        const windowSelect = d3.select("#window-type")
            .classed("p-sm rounded-sm border text-primary bg-transparent transition-default", true);
            
        vis.createMatrix(windowSelect.node().value);
    })
    .catch(error => {
        console.error('Error loading the data:', error);
        
        // Remove loading indicator
        loadingIndicator.remove();
        
        // Show error with proper styling
        utils.showError("Error loading visualization data. Please check the console for details.");
    }); 