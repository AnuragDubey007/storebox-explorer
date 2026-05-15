# Storebox File Explorer

A VS Code-style file explorer built with React + Vite for the Storebox AI Frontend Engineer Assignment.

## Live Demo

[https://storebox-explorer-liard.vercel.app/]

## Setup Instructions

Make sure you have Node.js installed (v18 or above recommended).

```bash
# Clone the repo
git clone https://github.com/AnuragDubey007/storebox-explorer.git

# Go into the folder
cd storebox-explorer

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- Create files and folders from the home screen or header buttons
- Nested folders — folders inside folders supported
- Rename any file or folder by double clicking or using Alt+R
- Delete with a confirmation modal so you don't delete by accident
- Right click context menu on any item
- Dark and light mode toggle
- All data persists in localStorage — refresh and everything is still there
- Clean empty state with keyboard shortcut guide when no files exist

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Alt + N | New file |
| Alt + Shift + N | New folder |
| Alt + R | Rename selected item |
| Delete | Delete selected item |

## Project Structure

```
storebox-explorer/
├── index.html
├── vite.config.js
├── package.json
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── FileTree.jsx
│   │   ├── TreeNode.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ContextMenu.jsx
│   │   └── DeleteModal.jsx
│   ├── hooks/
│   │   └── useFileTree.js
│   └── utils/
│       └── helpers.js
```

## Tech Stack

- React 18
- Vite
- Lucide React (icons only)
- Vanilla CSS with CSS variables for theming
- No file-tree libraries used

## LLM Usage

Used Claude (claude.ai) to convert the original HTML/CSS/JS prototype from canvaAI into a React component architecture. All logic, structure decisions, and debugging were done through conversation with Claude. Full chat history attached as `chat-history.md`.
