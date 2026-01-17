# Planetary Student in Landscape Architecture Index

An interactive web-based visualization of the historical development of design studio pedagogy in landscape architecture education (1857–2025).

## Features

- **Network View**: Force-directed graph showing connections between pedagogical developments
- **Radial View**: Circular timeline organized by Pedagogical Priority (PP01, PP02, PP03)
- **Timeline View**: Chronological list organized by historical era
- **Filtering**: Filter by Entry Type, Pedagogical Priority, Focus Area, and time range
- **Shareable URLs**: Generate links that preserve your current view and filters
- **Excel Export**: Download the complete dataset as CSV
- **Legend**: Reference guide to the coding system
- **Annotations**: Add personal research notes (saved in browser)

## Files

```
planetary-student-network/
├── index.html       # Landing page with logo
├── network.html     # Main visualization interface
├── about.html       # About page with exhibition text
├── styles.css       # Munsell soil color palette, UI styles
├── data.js          # 166 timeline entries with connections
├── app.js           # D3.js visualization and interaction logic
├── assets/
│   └── Exhibition_Web_Image_01.jpg
└── README.md
```

## Coding System

### Entry Types
- **PD** (Pedagogical Development): Changes in teaching methods or philosophy
- **ID** (Institutional Development): New programs, schools, or organizational changes
- **BIB** (Theoretical Foundation): Key publications and theoretical frameworks

### Pedagogical Priorities
- **PP01**: The Discipline (curriculum, knowledge frameworks)
- **PP02**: The Design Studio (teaching methods, technology)
- **PP03**: The Academic Program (institutional structure, collaboration)

### Focus Areas
- **FA01**: Curriculum
- **FA02**: Program Structure
- **FA03**: Studio Methods
- **FA04**: Technology
- **FA05**: Social Justice
- **FA06**: Collaboration

## Deployment

### GitHub Pages (Recommended)

1. Create a new GitHub repository
2. Upload all files maintaining folder structure
3. Go to Settings → Pages
4. Select "Deploy from a branch" → main → / (root)
5. Your site will be live at `https://[username].github.io/[repo-name]`

### Alternative Hosting

These are static HTML/CSS/JS files with no build process required. Upload to any web hosting service.

## Usage

- **Click** a node to view details
- **Double-click** to center the network on that node
- **Drag** nodes to rearrange
- **Scroll** to zoom
- **Use filters** in the left panel to focus on specific categories
- **Toggle views** using the header buttons
- **Share** generates a URL preserving your current state
- **Export** downloads all data as CSV

## Credits

**Dr. Rosalea Monacella**  
Harvard Graduate School of Design

Special thanks to: Dan Borelli, David Zimmerman & the exhibition team, Sarah Whiting, Gary Hilderbrand, Craig Douglas, Sean Hogan, Simone Sandholz, Alessandro Martinelli, Charles Waldheim, Makio Yamamoto, Racha Doughman, Fran Arrieta

---

*Design Pedagogies for the Planetary Student in Landscape Architecture*
