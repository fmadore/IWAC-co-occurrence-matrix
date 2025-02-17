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

// Setup dataset selector
const datasetSelect = d3.select("#dataset-type")
    .classed("p-sm rounded-sm border text-primary bg-transparent transition-default", true);

// Populate dataset selector
Object.entries(config.datasets).forEach(([key, dataset]) => {
    datasetSelect.append("option")
        .attr("value", key)
        .text(dataset.title)
        .property("selected", key === config.defaultDataset);  // Set selected state based on default
});

// Initialize visualization with default dataset
loadDataset(config.defaultDataset);

// Handle dataset changes
datasetSelect.on("change", function() {
    loadDataset(this.value);
});

function loadDataset(datasetKey) {
    const dataset = config.datasets[datasetKey];
    if (!dataset) {
        console.error(`Dataset ${datasetKey} not found`);
        return;
    }

    // Show loading indicator
    loadingIndicator.style("display", "flex");
    
    // Load the selected dataset
    d3.json(dataset.file)
        .then(data => {
            if (!data) throw new Error('No data received');
            
            // Remove loading indicator
            loadingIndicator.style("display", "none");
            
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
            loadingIndicator.style("display", "none");
            
            // Show error with proper styling
            utils.showError(`Error loading visualization data for "${dataset.title}". Please check the console for details.`);
        });
} 