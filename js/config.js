export const config = {
    margin: { 
        top: 220,     // Increased from 160 to accommodate rotated labels
        right: 20, 
        bottom: 10, 
        left: 120 
    },
    cellSize: 16,
    cellPadding: 3,
    maxOpacity: 1.0,
    minOpacity: 0.3,
    colors: {
        empty: "#f8f9fa",
        filled: d3.interpolateBlues
    },
    dataUrl: './data/cooccurrence.json'
}; 