import React from 'react';
import { FolderOpen, FilePlus, FolderPlus } from 'lucide-react';

export default function EmptyState({ onNewFile, onNewFolder }) {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrap">
        <FolderOpen size={28} />
      </div>
      <p className="empty-title">Start Creating</p>
      <p className="empty-desc">Your files and folders will appear here</p>
      <div className="empty-btns">
        <button onClick={() => onNewFile(null)} className="btn-primary">
          <FilePlus size={16} /> New File
        </button>
        <button onClick={() => onNewFolder(null)} className="btn-secondary">
          <FolderPlus size={16} /> New Folder
        </button>
      </div>
      <div className="shortcuts">
        <p className="shortcuts-title">Keyboard Shortcuts</p>
        <div className="shortcut-row">
            <div className="kbd-group">
            <kbd>Alt</kbd><span>+</span><kbd>N</kbd>
            </div>
            <span>Create a new file</span>
        </div>
        <div className="shortcut-row">
            <div className="kbd-group">
            <kbd>Alt</kbd><span>+</span><kbd>Shift</kbd><span>+</span><kbd>N</kbd>
            </div>
            <span>Create a new folder</span>
        </div>
        <div className="shortcut-row">
            <div className="kbd-group">
            <kbd>Alt</kbd><span>+</span><kbd>R</kbd>
            </div>
            <span>Rename selected item</span>
        </div>
        <div className="shortcut-row">
            <kbd>Delete</kbd>
            <span>Delete selected item</span>
        </div>
        </div>
    </div>
  );
}