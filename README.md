# IWAC Co-occurrence Matrix Visualization

An interactive visualization tool that displays term co-occurrences in newspaper articles using a matrix representation. The visualization allows users to explore how frequently terms appear together at different textual levels (article, paragraph, or sentence).

## Features

- Interactive matrix visualization of term co-occurrences
- Multiple window types (article, paragraph, sentence) for co-occurrence analysis
- Dynamic ordering options (by name or frequency)
- Interactive tooltips showing co-occurrence details
- Responsive highlighting of matrix cells and labels
- Color-coded visualization based on co-occurrence frequency

## Project Structure

```
IWAC-co-occurrence-matrix/
├── data/
│   └── cooccurrence.json     # Co-occurrence data for different window types
├── js/
│   ├── config.js            # Configuration settings
│   ├── utils.js             # Utility functions
│   ├── dataProcessor.js     # Data processing functions
│   ├── visualComponents.js  # D3.js visualization components
│   ├── cellInteractions.js  # Cell interaction handlers
│   ├── MatrixVisualization.js # Main visualization class
│   └── main.js             # Application entry point
├── styles.css              # Visualization styles
├── index.html             # Main HTML file
└── README.md              # Project documentation
```

## Dependencies

- D3.js v7.x - For data visualization
- Modern web browser with ES6 module support

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/IWAC-co-occurrence-matrix.git
   cd IWAC-co-occurrence-matrix
   ```

2. Serve the project using a local web server (required for ES6 modules):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. Open your browser and navigate to `http://localhost:8000`

## Usage

1. Select a window type (article, paragraph, or sentence) to view co-occurrences at different textual levels
2. Use the ordering options to sort terms by name or frequency
3. Hover over cells to see detailed co-occurrence information
4. Observe highlighted rows and columns for better pattern recognition

## Code Organization

- `config.js`: Contains all configuration parameters for the visualization
- `utils.js`: General utility functions for error handling and size calculations
- `dataProcessor.js`: Functions for processing and transforming the co-occurrence data
- `visualComponents.js`: Reusable D3.js visualization components
- `cellInteractions.js`: Handlers for cell hover and highlight interactions
- `MatrixVisualization.js`: Main class orchestrating the visualization
- `main.js`: Application initialization and setup

## Data Format

The visualization expects a JSON file with the following structure:
```json
{
  "article": {
    "nodes": [{ "id": number, "name": string }],
    "links": [{ "source": number, "target": number, "value": number }]
  },
  "paragraph": { ... },
  "sentence": { ... }
}
```
