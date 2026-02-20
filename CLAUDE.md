# Cirrus Flight Academy Auburn

A professional website for a Cirrus flight training center in Auburn, Alabama. Features executive navy/gold branding, interactive training program displays, CAPS parachute system graphics, and a Flight Schedule Pro-style student portal.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - No framework dependencies
- **Font Awesome 6.4** - Icon library
- **Google Fonts** - Montserrat & Playfair Display

## Project Structure

```
auburn/
├── index.html          # Main landing page
├── calendar.html       # Student portal with scheduling
├── css/
│   ├── styles.css      # Main stylesheet (navy/gold theme)
│   ├── animations.css  # Animation utilities
│   └── calendar.css    # Student portal styles
├── js/
│   ├── main.js         # Core functionality
│   ├── ratings.js      # Training program modal content
│   └── calendar.js     # Student portal & scheduling
└── CLAUDE.md           # This file
```

## Key Features

### Main Website (index.html)
- Hero section with CAPS safety badge
- About section with aircraft specs (SR20)
- Training programs with interactive modal details:
  - Private Pilot ($12,000-$16,000)
  - Instrument Rating ($14,000-$18,000)
  - Commercial Pilot ($25,000-$35,000)
- Interactive CAPS parachute diagram with step-by-step explanation
- Prepay pricing with discount incentives
- Contact form with program interest selector

### Student Portal (calendar.html)
- Demo login: `demo.student` / `FlyAuburn2024`
- Weekly calendar view (Flight Schedule Pro style)
- Aircraft booking with instructor selection
- Color-coded availability slots
- Weather display for KAUO
- Upcoming flights list
- Instructor availability

## Development

### Running Locally

```bash
# Option 1: Python HTTP server
python -m http.server 8000

# Option 2: Node http-server
npx http-server

# Option 3: VS Code Live Server extension
# Right-click index.html > Open with Live Server
```

Then open `http://localhost:8000` in your browser.

## Color Scheme (Navy/Gold Executive)

```css
--navy-dark: #0a1628;
--navy: #1a365d;
--navy-light: #2d4a6f;
--gold: #c9a227;
--gold-light: #d4b23d;
--gold-dark: #9a7b1a;
```

## Important Notes

- **Single Aircraft**: The school has one Cirrus SR20. Website emphasizes quality over quantity.
- **CAPS Emphasis**: The Cirrus Airframe Parachute System is a major selling point. Interactive diagram educates visitors.
- **Pricing**: Displayed as ranges, not fixed prices (contact for exact quotes).
- **Calendar Demo**: Uses sessionStorage for demo login state. Production would need backend auth.
- **Responsive**: Fully responsive design for mobile, tablet, and desktop.
- **Animations**: Scroll reveal, parallax effects, and interactive hover states throughout.

## Future Enhancements

- Backend integration for real scheduling
- Payment processing for prepay packages
- Student progress tracking dashboard
- Weather API integration (aviationweather.gov)
- SMS/email booking confirmations
