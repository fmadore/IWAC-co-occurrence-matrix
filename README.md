# Co-occurrence Matrix Visualization

An interactive visualization tool that displays term co-occurrences in newspaper articles across different Islamic organizations in West Africa.

## Features

- Interactive co-occurrence matrix visualization
- Multiple dataset support for different organizations:
  - Union Islamique du Bénin
  - Conseil National Islamique
  - Conseil Supérieur des Imams, des Mosquées et des Affaires islamiques
  - Conseil Supérieur Islamique
  - Fédération des Associations Islamiques du Burkina
  - Union Musulmane du Togo
- Different window type options (article, paragraph, sentence)
- Multiple sorting options (by name or frequency)
- Interactive tooltips showing co-occurrence details
- Responsive design with automatic sizing
- Accessible interface with ARIA attributes
- Download visualization as SVG

## Usage

1. Select an organization from the dropdown menu to load its co-occurrence data
2. Choose a window type to see how terms co-occur within:
   - Articles
   - Paragraphs
   - Sentences
3. Sort the matrix by:
   - Name (alphabetically)
   - Frequency (most frequent terms first)
4. Hover over cells to see detailed co-occurrence information
5. Click on row/column labels to highlight specific terms
6. Download the visualization using the "Download SVG" button

## Technical Details

- Built with D3.js for visualization
- Modular JavaScript architecture
- CSS utility classes for consistent styling
- Responsive design that adapts to different screen sizes
- Data stored in JSON format in the `data` folder

## Project Structure

```
IWAC-co-occurrence-matrix/
├── data/                   # JSON data files for each organization
├── js/
│   ├── config.js          # Configuration settings
│   ├── utils.js           # General utility functions
│   ├── dataProcessor.js   # Data processing functions
│   ├── visualComponents.js # D3.js visualization components
│   ├── cellInteractions.js # Cell interaction handlers
│   ├── sortingUtils.js    # Matrix sorting functionality
│   ├── downloadUtils.js   # Download functionality
│   ├── MatrixVisualization.js # Main visualization class
│   └── main.js           # Application entry point
├── css/
│   ├── main.css          # Main CSS file importing all modules
│   ├── base.css          # Base styles and layout
│   ├── colors.css        # Color system
│   ├── typography.css    # Typography system
│   ├── layout.css        # Layout and spacing
│   ├── animations.css    # Animations and transitions
│   ├── tooltip.css       # Tooltip styles
│   ├── scrollbar.css     # Cross-browser scrollbar styles
│   └── utilities/        # Utility classes
│       ├── display.css   # Display and flexbox utilities
│       ├── spacing.css   # Margin and padding utilities
│       ├── text.css      # Typography utilities
│       ├── visual.css    # Borders, backgrounds, shadows
│       ├── interaction.css # Visibility and interactions
│       ├── button.css    # Button styles and variants
│       └── matrix.css    # Matrix-specific utilities
├── index.html           # Main HTML file
└── README.md            # Project documentation
```

## CSS Architecture

The project uses a modular CSS architecture with:

### Core Styles
- `base.css`: Base styles and layout
- `colors.css`: Color system
- `typography.css`: Typography system
- `layout.css`: Layout and spacing
- `animations.css`: Animations and transitions
- `tooltip.css`: Tooltip components
- `scrollbar.css`: Cross-browser scrollbar styles

### Utility Classes
Located in the `utilities/` directory:
- `display.css`: Display and flexbox utilities
- `spacing.css`: Margin and padding utilities
- `text.css`: Typography utilities
- `visual.css`: Borders, backgrounds, shadows
- `interaction.css`: Visibility and interactions
- `button.css`: Button styles and variants
- `matrix.css`: Matrix-specific utilities

## JavaScript Modules

The application is organized into focused modules:
- `config.js`: Configuration and settings
- `utils.js`: General utility functions
- `dataProcessor.js`: Data transformation and processing
- `visualComponents.js`: Reusable D3.js components
- `cellInteractions.js`: Matrix cell interactions
- `sortingUtils.js`: Matrix sorting algorithms
- `downloadUtils.js`: SVG download functionality
- `MatrixVisualization.js`: Core visualization logic
- `main.js`: Application initialization

## Dependencies

- D3.js v7.x - For data visualization
- Modern web browser with ES6 module support

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/fmadore/IWAC-co-occurrence-matrix.git
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

## Browser Compatibility

The visualization is compatible with:
- Modern browsers (Chrome, Firefox, Edge, Safari)
- Includes fallbacks for scrollbar styling across different browsers
- Responsive design that works on different screen sizes