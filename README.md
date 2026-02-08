# 🚀 M. Abdul Rasheed (Talal) - Interactive Portfolio

> A Next-Gen Developer Portfolio featuring a dual-mode interface: **Visual Polish** for clients and a **Simulated IDE** for developers.

![Portfolio Preview](https://github.com/Abdul-Rasheed-Talal/My-Portfolio/blob/main/public/preview.png?raw=true)

## 🌟 Key Features

### 🌗 Dual Experience Mode
-   **Normal Mode**: A sleek, modern scrolling website designed for recruiters and clients. Features smooth animations, glassmorphism, and vibrant gradients.
-   **Developer Mode**: A fully interactive **VS Code-like Environment**.
    -   **File Explorer**: Navigate through "project files" to see content.
    -   **Terminal**: Run custom commands like `help`, `about`, `contact`.
    -   **Settings**: Customize the "IDE" theme (Void/Solarized), font size, and minimap.

### 📱 Mobile Optimized
-   **Responsive Design**: Flawless experience across all devices.
-   **Gesture Controls**: Horizontal swipe carousels for Projects and scrollable tabs for Skills to minimize vertical scrolling.
-   **Touch-Friendly**: Optimized button sizes and interaction targets.

### 💬 Interactive Feedback System
-   **Feedback Popup**: A non-intrusive popup that appears after 10 seconds to gather visitor insights.
-   **No-Database Backend**: Powered by **Google Scripts** for zero-maintenance form submissions (Contact & Feedback).
-   **Star Rating**: 5-star rating system for quick engagement.

### 🎨 Visuals & Animations
-   **Tech Stack**: Built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.
-   **Dynamic Content**:
    -   **Skills**: Tabbed interface with progress bars and "Target" indicators for future goals.
    -   **Projects**: Badge-style category indicators and hover effects.

---

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), TypeScript
-   **Styling**: Tailwind CSS, Shadcn UI
-   **Animations**: Framer Motion
-   **Icons**: Lucide React, React Icons
-   **State Management**: React Context API
-   **Routing**: Wouter

---

## ⚡ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Abdul-Rasheed-Talal/My-Portfolio.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```
src/
├── components/         # UI Components (Hero, About, Skills, Projects, etc.)
│   ├── developer/      # Specific components for Developer Mode (IDE view)
│   └── layout/         # Layout wrappers (FuturisticDeveloperLayout)
├── content/            # JSON data for Skills and Projects
├── context/            # Global state (ModeContext for switching themes)
├── hooks/              # Custom hooks (useIntersectionObserver)
└── pages/              # Main route pages
```

---

## 🤝 Contact & Feedback

Feel free to explore the **Developer Mode** by clicking the "Enter Developer Mode" floating button!

-   **Email**: [mabdulrasheedtalal@gmail.com](mailto:mabdulrasheedtalal@gmail.com)
-   **LinkedIn**: [Abdul Rasheed Talal](https://www.linkedin.com/in/abdulrasheedtalal/)
-   **GitHub**: [@Abdul-Rasheed-Talal](https://github.com/Abdul-Rasheed-Talal)

---

Built with ❤️ by **Abdul Rasheed Talal**.