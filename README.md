# IWAC Co-occurrence Matrix Visualization

An interactive visualization tool that displays term co-occurrences in newspaper articles using a matrix representation. The visualization allows users to explore how frequently terms appear together at different textual levels (article, paragraph, or sentence).

## Features

- Interactive matrix visualization of term co-occurrences
- Multiple window types (article, paragraph, sentence) for co-occurrence analysis
- Dynamic ordering options:
  - Name: Alphabetical ordering of terms
  - Frequency: Ordering by total co-occurrence frequency (descending)
- Interactive tooltips showing co-occurrence details
- Responsive highlighting of matrix cells and labels
- Color-coded visualization based on co-occurrence frequency
- Cross-browser compatible styling
- Consistent typography with CSS custom properties

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
│   ├── sortingUtils.js      # Matrix sorting functionality
│   ├── MatrixVisualization.js # Main visualization class
│   └── main.js             # Application entry point
├── css/
│   ├── main.css            # Main CSS file importing all modules
│   ├── typography.css      # Typography system and variables
│   ├── base.css            # Base styles and layout
│   ├── matrix.css          # Matrix-specific styles
│   ├── tooltip.css         # Tooltip styles
│   └── scrollbar.css       # Cross-browser scrollbar styles
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
2. Use the ordering options to organize the matrix:
   - Name: Orders terms alphabetically
   - Frequency: Orders terms by their total co-occurrence frequency (highest to lowest)
3. Hover over cells to see detailed co-occurrence information
4. Observe highlighted rows and columns for better pattern recognition

## Code Organization

### JavaScript Modules
- `config.js`: Contains all configuration parameters for the visualization
- `utils.js`: General utility functions for error handling and size calculations
- `dataProcessor.js`: Functions for processing and transforming the co-occurrence data
- `visualComponents.js`: Reusable D3.js visualization components
- `cellInteractions.js`: Handlers for cell hover and highlight interactions
- `sortingUtils.js`: Matrix sorting algorithms and utilities
- `MatrixVisualization.js`: Main class orchestrating the visualization
- `main.js`: Application initialization and setup

### CSS Modules
- `main.css`: Imports and organizes all CSS modules
- `typography.css`: Typography system with CSS custom properties
  - Font families
  - Font sizes
  - Font weights
  - Line heights
- `base.css`: Base styles for layout and typography
- `matrix.css`: Styles specific to the matrix visualization
- `tooltip.css`: Tooltip styling and animations
- `scrollbar.css`: Cross-browser compatible scrollbar styling

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

## Browser Compatibility

The visualization is compatible with:
- Modern browsers (Chrome, Firefox, Edge, Safari)
- Includes fallbacks for scrollbar styling across different browsers
- Responsive design that works on different screen sizes
