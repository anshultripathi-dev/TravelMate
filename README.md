# TravelMate — Smart Travel Planning & Discovery

> **UI/UX Design Lab Course Assignment**  
> A lightweight, interactive web application prototype designed for effortless itinerary planning, budget tracking, and destination discovery.

---

## 📌 Project Overview

**TravelMate** is a user-centered travel companion web application crafted for the **UI/UX Design Lab Course Assignment**. The project demonstrates the end-to-end design and frontend implementation of an intuitive travel platform tailored for travellers exploring destinations across India.

The platform streamlines the travel experience into three core pillars:
1. **Discovery & Exploration**: Visual cards, search, and category filtering.
2. **Itinerary Scheduling**: Organized day-by-day morning, afternoon, and evening timelines.
3. **Financial Transparency**: Real-time budget progress, category-wise breakdowns, and expense tracking.

---

## 🎨 UI/UX Design System & Decisions

### 1. Color Palette
The color scheme is inspired by warm Indian landscapes, heritage terracotta, and earth tones:
- **Primary / Accent**: `Terracotta Coral (#ED6B55)` — energetic call-to-action buttons, active states, and highlights.
- **Backgrounds**: `Warm Cream (#F7F3EF)` & `Soft Paper (#FFFDFA)` — reduces eye strain and provides a comfortable reading environment.
- **Typography & Ink**: `Deep Charcoal (#272421)` & `Muted Slate (#77716C)` — accessible contrast ratios for legibility.
- **Accents**: `Sage Green (#46835A)` — used for budget health and positive indicators.

### 2. Typography & Hierarchy
- Clean, modern system sans-serif font stack (`Segoe UI`, `Arial`, `sans-serif`) for optimal rendering performance across devices.
- Consistent scale of headings (`h1`–`h4`), eyebrow labels, meta tags, and badges to guide user scanning behavior.

### 3. Layout & Responsiveness
- **Desktop**: Left navigation sidebar with spacious content view and persistent quick stats.
- **Mobile / Small Screens**: Responsive navigation bar, flexible grid layouts, and touch-friendly button targets (minimum 44px).
- **Component Design**: Modular cards with subtle borders (`#E5DED8`), balanced padding, and smooth transition states.

### 4. Usability & Micro-Interactions
- Instant client-side hash routing (`#dashboard`, `#trips`, `#explore`, `#itinerary`, `#budget`, `#history`) for seamless page transitions without page reloads.
- Visual feedback on interactive elements (hover lift, focus-visible accessibility outlines).
- Real-time search and filter feedback on the destination explorer.
- Dynamic itinerary tabs allowing quick switching between travel days.

---

## 🚀 Key Features

| Screen / Feature | Description |
| :--- | :--- |
| **Dashboard** | Overview of upcoming trips, quick statistics (trips planned, places saved), editor's recommended route, and popular spots. |
| **My Trips** | Visual list of ongoing, upcoming, and past journeys with budget status. |
| **New Trip Planner** | Form to customize destination, travel dates, travellers, pace (Slow, Balanced, Fast), and estimated budget. |
| **Explore** | Searchable destination catalog filtered by themes like *Culture*, *Slow travel*, and *Weekend getaway*. |
| **Interactive Itinerary** | Day-by-day schedule organized into Morning, Afternoon, and Evening slots. |
| **Budget Tracker** | Visual budget consumption bar, category-wise allocations (Stay, Travel, Food, Activities), and expense log. |
| **Trip History** | Memory timeline highlighting past travel milestones, photo counters, and notes. |

---

## 💻 Technical Architecture

The project is intentionally developed using **pure, clean, vanilla web standards** without bulky frameworks or external build tools:

- **HTML5**: Semantic document structure and accessible tags.
- **CSS3**: Custom properties (CSS variables), Flexbox, CSS Grid, and responsive media queries.
- **JavaScript (ES6+)**: Single-page application (SPA) state management, local storage persistence, DOM rendering, and hash-based routing.

---

## 📂 Project Structure

```text
TravelMate/
├── index.html        # Semantic HTML5 entry page
├── style.css         # Complete design system & responsive styles
├── app.js            # Vanilla JavaScript app logic & state management
├── favicon.svg       # Brand icon asset
├── images/           # Destination visual assets
│   ├── jaipur.jpg
│   ├── kerala.jpg
│   ├── palms.jpg
│   ├── rajasthan.jpg
│   └── udaipur.jpg
├── .gitignore        # Ignored operating system files
└── README.md         # Course assignment documentation
```

---

## 🛠️ How to Run Locally

No package installation or build steps are required.

### Method 1: Direct File Launch
Double-click `index.html` or right-click and open with your preferred browser (Chrome, Edge, Safari, Firefox).

### Method 2: Local HTTP Server (Recommended)
Using Python 3:
```bash
python3 -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

Or using VS Code:
Right-click `index.html` and click **"Open with Live Server"**.

---

## 🎓 Course Submission Details

- **Course**: UI/UX Design Lab
- **Assignment**: Web Application Interface Design & Frontend Implementation
- **Student Name**: Anshul Tripathi
- **Repository**: [anshultripathi-dev/TravelMate](https://github.com/anshultripathi-dev/TravelMate)
