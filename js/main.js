import { config } from './config.js';
import { utils } from './utils.js';
import { MatrixVisualization } from './MatrixVisualization.js';

// Initialize visualization
d3.json(config.dataUrl)
    .then(data => {
        if (!data) throw new Error('No data received');
        const vis = new MatrixVisualization(data);
        vis.createMatrix(document.getElementById('window-type').value);
    })
    .catch(error => {
        console.error('Error loading the data:', error);
        utils.showError("Error loading visualization data. Please ensure the data file exists and is properly formatted.");
    }); 