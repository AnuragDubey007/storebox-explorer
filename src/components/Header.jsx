import React from 'react';
import { Folder, Moon, Sun, FilePlus, FolderPlus } from 'lucide-react';

export default function Header({ theme, onToggleTheme, onNewFile, onNewFolder }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <Folder size={20} color={theme === 'dark' ? '#000' : '#fff'} />
        </div>
        <div>
          <h1 className="header-title">STOREBOX</h1>
          <p className="header-subtitle">File Manager</p>
        </div>
      </div>
      <div className="header-actions">
        <button onClick={onToggleTheme} className="icon-btn" title="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button onClick={() => onNewFile(null)} className="icon-btn" title="New File (Ctrl+N)">
          <FilePlus size={20} />
        </button>
        <button onClick={() => onNewFolder(null)} className="icon-btn" title="New Folder (Ctrl+Shift+N)">
          <FolderPlus size={20} />
        </button>
      </div>
    </header>
  );
}