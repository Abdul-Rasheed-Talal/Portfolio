# Abdul Rasheed Talal - Portfolio

A modern, professional portfolio website showcasing my journey as a Web Developer and CIT student. Built with high-performance modern web technologies.

![Portfolio Preview](client/public/assets/profile-picture.jpg)

## 🚀 Features

- **Modern Dark UI**: Premium dark theme with glassmorphism and animated gradients
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Dynamic Content**:
  - Typing animations
  - Interactive skill bars with real SVG icons
  - Filterable project cards with live previews
  - Achievement timelines
- **Contact Form**: Functional contact form integrated with Google Sheets
- **Performance**: High Lighthouse scores with optimized assets

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Tailwind Animate
- **Icons**: [Lucide React](https://lucide.dev/) + SVG Logos
- **Animation**: Framer Motion (Ready) + Custom CSS Keyframes
- **Routing**: Wouter (Lightweight routing)

## 📂 Project Structure

```bash
Portfolio/
├── client/
│   ├── public/          # Static assets (images, CV)
│   └── src/
│       ├── components/  # Reusable UI components (Hero, Skills, Projects...)
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utility functions
│       └── pages/       # Page views
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdul-Rasheed-Talal/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local server**
   ```bash
   npm run dev
   ```
   The site will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

## 📝 Configuration

### Contact Form Setup
The contact form uses a serverless approach with Google Sheets.
👉 **[Read the Setup Guide](CONTACT_FORM_SETUP.md)** to connect your own Google Sheet.

### Deployment
This portfolio is static-site ready and can be deployed anywhere.
👉 **[Read the GitHub Pages Guide](STEP_BY_STEP_GITHUB_PAGES.md)** for easy deployment.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
**Abdul Rasheed Talal** - Web Developer
[GitHub](https://github.com/Abdul-Rasheed-Talal) | [Email](mailto:mabdulrasheedtalal@gmail.com)