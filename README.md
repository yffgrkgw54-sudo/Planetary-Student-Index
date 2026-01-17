# Planetary Student Timeline | Network Visualization

An interactive network visualization of the development of design studio pedagogy and pedagogical philosophy in landscape architecture from 1857 to 2025.

## Overview

This visualization transforms a comprehensive timeline of landscape architecture education into an interactive network that reveals relationships between pedagogical developments, institutional changes, and theoretical foundations.

### Features

- **Force-Directed Network View**: Explore entries as interconnected nodes, with visual connections showing conceptual and explicit relationships
- **Timeline View**: Browse entries chronologically by era
- **Multiple Filter Options**:
  - Entry Type (Pedagogical Development, Institutional Development, Theoretical Foundation)
  - Pedagogical Priority (PP01-03)
  - Focus Area (FA01-06)
  - Time Period (1857-2025)
- **Dynamic Node Coloring**: Toggle between coloring by type, priority, focus area, or era
- **Interactive Details**: Click nodes to view full descriptions, citations, and connections
- **Center on Node**: Double-click to focus the network on a specific entry and its connections
- **Search**: Find entries by title, description, or location
- **Add New Entries**: Expand the timeline with new entries through the built-in form

### Color Palette

The visualization uses a Munsell Soil Color palette on a black background, drawing from the soil classification system used in landscape architecture practice:

- **10YR (Yellow-Red)**: Browns and tans for Pedagogical Developments
- **7.5YR (Reddish Browns)**: For Institutional Developments
- **2.5Y (Olive/Yellow)**: Pale yellows for Theoretical Foundations (BIB entries)
- **Gley tones**: Blue-grays for Technology focus areas

## Coding System

### Entry Types
- **PD**: Pedagogical Development
- **ID**: Institutional Development
- **BIB**: Theoretical Foundation (key citations)

### Pedagogical Priorities
- **PP01**: The Discipline
- **PP02**: The Design Studio
- **PP03**: The Academic Program

### Focus Areas
- **FA01**: Curriculum
- **FA02**: Program Structure
- **FA03**: Studio Methods
- **FA04**: Technology
- **FA05**: Social Justice
- **FA06**: Collaboration

## Deployment to GitHub Pages

### Option 1: Simple Deployment

1. Create a new repository on GitHub
2. Upload all files from this directory
3. Go to Settings → Pages
4. Select "Deploy from a branch" and choose `main` / `root`
5. Your site will be available at `https://[username].github.io/[repository-name]`

### Option 2: Using Git

```bash
# Initialize git in the project folder
cd planetary-student-network
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Planetary Student Network visualization"

# Add your GitHub repository as remote
git remote add origin https://github.com/[username]/[repository-name].git

# Push to GitHub
git push -u origin main
```

Then enable GitHub Pages in your repository settings.

## File Structure

```
planetary-student-network/
├── index.html      # Main HTML structure
├── styles.css      # Munsell soil color palette & styling
├── data.js         # Timeline entries & connection generation
├── app.js          # D3.js visualization logic
└── README.md       # This file
```

## Usage

### Navigation
- **Pan**: Click and drag on empty space
- **Zoom**: Mouse wheel / pinch
- **Select Node**: Click on a node
- **Center on Node**: Double-click on a node
- **View Details**: Click a node to open the detail panel

### Filters
Use the left panel to filter entries by type, priority, focus area, or time period. Filters are cumulative (AND logic within categories).

### Adding Entries
Click "+ Add Entry" in the filter panel to add new entries to the network. New entries will be saved in the browser session (for persistent storage, export the data and update data.js).

## Customization

### Adding More Entries
Edit `data.js` to add entries to the `timelineEntries` array. Each entry should include:

```javascript
{
    id: [unique number],
    year: [year],
    location: '[City, Country]',
    title: '[Brief title]',
    description: '[Full description]',
    types: ['PD'|'ID'|'BIB'],
    priorities: ['PP01'|'PP02'|'PP03'],
    focusAreas: ['FA01'|'FA02'|'FA03'|'FA04'|'FA05'|'FA06'],
    citation: '[Full citation]',
    connections: [array of connected entry IDs],
    tags: ['optional', 'tags']
}
```

### Modifying Colors
Edit the CSS variables in `styles.css` under `:root` to change the color palette.

## Credits

Timeline data compiled as part of the "Design Pedagogies for the Planetary Student" framework.

## License

[Add your license here]
