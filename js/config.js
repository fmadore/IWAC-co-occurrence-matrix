export const config = {
    margin: { top: 160, right: 20, bottom: 10, left: 120 },
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