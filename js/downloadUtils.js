export const downloadUtils = {
    /**
     * Downloads an SVG element as a file
     * @param {SVGElement} svgElement - The SVG element to download
     * @param {string} filename - The name of the file to download
     */
    downloadSVG(svgElement, filename) {
        // Get SVG source
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svgElement);
        
        // Add XML declaration
        const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename || 'matrix-visualization.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Clean up
        URL.revokeObjectURL(url);
    },

    /**
     * Generates a filename for the visualization
     * @param {string} datasetName - The name of the current dataset
     * @param {string} windowType - The current window type
     * @returns {string} The generated filename
     */
    generateFilename(datasetName, windowType) {
        return `co-occurrence-matrix-${datasetName}-${windowType}.svg`;
    }
}; 