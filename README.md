# E-Learning Platform

A modern, scalable, and maintainable E-Learning platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

##  Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React
- ESLint
- Prettier

## 📁 Project Structure

```
src/
├── app/                # App Router (pages, layouts, API routes)
├── assets/             # Images, icons, fonts
├── components/         # Reusable UI components
│   ├── common/
│   ├── forms/
│   ├── layout/
│   ├── shared/
│   └── ui/
├── config/             # Application configuration
├── constants/          # Global constants
├── features/           # Feature-based modules
├── hooks/              # Custom React hooks
├── lib/                # Library configurations
├── middleware/         # Middleware helpers
├── providers/          # React providers
├── services/           # API services
├── store/              # Global state management
├── styles/             # Global styles
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## ⚙️ Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌿 Git Workflow

Create a new branch:

```bash
git checkout -b feature/your-feature
```

Commit changes:

```bash
git commit -m "feat: add authentication"
```

Push your branch:

```bash
git push origin feature/your-feature
```

## 📂 Architecture

The project follows a **feature-based architecture**.

- `app/` → Routing and layouts
- `features/` → Business logic
- `components/` → Shared UI
- `services/` → API communication
- `store/` → Global state
- `utils/` → Helper functions
- `types/` → Shared TypeScript types

## 📝 Code Style

- Use TypeScript.
- Prefer Server Components when possible.
- Keep components small and reusable.
- Group business logic inside `features/`.
- Avoid duplicated code.
- Follow ESLint rules.

## 📄 License

This project is licensed under the MIT License.