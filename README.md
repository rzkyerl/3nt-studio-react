# 3NT Studio - Premium Photography Portfolio & Booking System

A modern, minimalist, and premium photography studio website built with React, Tailwind CSS, and Framer Motion. This project features a sophisticated monochrome aesthetic designed to showcase high-end photography and provide a seamless booking experience.

## ✨ Features

- **Cinematic Hero Section**: Full-screen video background with smooth typography animations.
- **Dynamic Portfolio**: Filterable masonry grid with grayscale-to-color hover effects, integrated with Sanity CMS.
- **Automated Booking System**: 
  - Generates professional PDF confirmation using `jsPDF`.
  - Automatically uploads booking details and PDFs to **Sanity CMS**.
  - Direct integration with WhatsApp for instant notification and confirmation.
- **Interactive Photobooth**: A unique feature allowing users to capture and download monochrome portraits directly from their browser.
- **Embedded Admin Dashboard**: Fully integrated Sanity Studio at `/admin` for managing portfolio, pricing, team, and booking reservations.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Smooth Animations**: Subtle scroll-triggered animations using Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **CMS & Backend**: Sanity.io
- **PDF Generation**: jsPDF
- **Routing**: React Router Dom
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory and add your Sanity credentials:

```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=your_sanity_write_token
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rzkyerl/3nt-studio-react.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/frontend`: Public website app (pages, sections, UI components, assets, utils, services).
- `src/backend/admin`: Admin domain components and session management.
- `src/backend/sanity`: Sanity client, studio components, and schemas.
- `src/App.tsx`: Domain-based routing (`main site` vs `admin`).

---
Crafted with ❤️ for **3NT Studio**.
