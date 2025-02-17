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
- Responsive design with utility-first CSS

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
│   │
│   ├── Design Tokens:
│   ├── colors.css          # Color system and themes
│   ├── typography.css      # Typography system
│   ├── layout.css          # Spacing and structural styles
│   ├── animations.css      # Animations and transitions
│   │
│   ├── Utilities:
│   ├── utilities/
│   │   ├── display.css     # Display and flexbox utilities
│   │   ├── spacing.css     # Margin and padding utilities
│   │   ├── text.css        # Typography utilities
│   │   ├── visual.css      # Borders, backgrounds, shadows
│   │   ├── layout.css      # Positioning and dimensions
│   │   ├── interaction.css # Visibility and interactions
│   │   └── matrix.css      # Matrix-specific utilities
│   │
│   ├── Components:
│   ├── base.css            # Base styles and layout
│   ├── matrix.css          # Matrix-specific styles
│   ├── tooltip.css         # Tooltip styles
│   └── scrollbar.css       # Cross-browser scrollbar styles
├── index.html             # Main HTML file
└── README.md              # Project documentation
```

## CSS Architecture

The project follows a utility-first CSS architecture with a modular design system:

### Design Tokens
- `colors.css`: Color system with semantic variables
- `typography.css`: Typography scale and text styles
- `layout.css`: Spacing, sizing, and layout tokens
- `animations.css`: Animation durations and timing functions

### Utility Modules
1. **Display (`utilities/display.css`)**
   - Display properties
   - Flexbox utilities
   
2. **Spacing (`utilities/spacing.css`)**
   - Margin utilities
   - Padding utilities
   
3. **Typography (`utilities/text.css`)**
   - Text alignment
   - Font sizes
   - Font weights
   - Text colors
   
4. **Visual (`utilities/visual.css`)**
   - Borders and radius
   - Backgrounds
   - Shadows
   
5. **Layout (`utilities/layout.css`)**
   - Positioning
   - Width and height
   - Z-index layers
   - Overflow behavior
   
6. **Interaction (`utilities/interaction.css`)**
   - Visibility states
   - Pointer events
   - Transitions
   
7. **Matrix (`utilities/matrix.css`)**
   - Matrix-specific sizing
   - Matrix spacing
   - Responsive adaptations
   - Layout presets

### Matrix-Specific Utilities

The matrix visualization includes specialized utility classes:

```css
/* Size variations */
.matrix-cell-sm
.matrix-cell-md
.matrix-cell-lg

/* Layout presets */
.matrix-compact
.matrix-normal
.matrix-expanded

/* Responsive behavior */
.matrix-responsive
.matrix-auto-scroll

/* Density options */
.matrix-dense
.matrix-sparse
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
