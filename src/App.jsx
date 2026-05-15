import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FileTree from './components/FileTree';
import EmptyState from './components/EmptyState';
import ContextMenu from './components/ContextMenu';
import DeleteModal from './components/DeleteModal';
import { useFileTree } from './hooks/useFileTree';
import { countItems } from './utils/helpers';

export default function App() {
  const {
    tree,
    expandedFolders,
    toggleFolder,
    createFile,
    createFolder,
    rename,
    remove,
    findNode,
  } = useFileTree();

  const [theme, setTheme] = useState(() => localStorage.getItem('storebox_theme') || 'light');
  const [selectedId, setSelectedId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, nodeId: null });

  // Apply theme to <html> element
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('storebox_theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }

  function handleNewFile(parentId) {
    const newId = createFile(parentId);
    setSelectedId(newId);
    setRenamingId(newId);
  }

  function handleNewFolder(parentId) {
    const newId = createFolder(parentId);
    setSelectedId(newId);
    setRenamingId(newId);
  }

  function handleStartRename(id) {
    setRenamingId(id);
  }

  function handleFinishRename(id, newName) {
    if (newName) rename(id, newName);
    setRenamingId(null);
  }

  function handleDeleteRequest(id) {
    setDeleteTarget(id);
    setContextMenu({ visible: false, x: 0, y: 0, nodeId: null });
  }

  function handleDeleteConfirm() {
    if (deleteTarget) {
      remove(deleteTarget);
      if (selectedId === deleteTarget) setSelectedId(null);
    }
    setDeleteTarget(null);
  }

  function handleContextMenu(e, nodeId) {
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, nodeId });
    setSelectedId(nodeId);
  }

  function hideContextMenu() {
    setContextMenu({ visible: false, x: 0, y: 0, nodeId: null });
  }

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
  (e) => {
    if (renamingId) return;
    if (e.altKey && e.shiftKey && e.key === 'N') {
      e.preventDefault();
      const parent = selectedId && findNode(selectedId)?.type === 'folder' ? selectedId : null;
      handleNewFolder(parent);
    } else if (e.altKey && e.key === 'n') {
      e.preventDefault();
      const parent = selectedId && findNode(selectedId)?.type === 'folder' ? selectedId : null;
      handleNewFile(parent);
    } else if (e.altKey && e.key === 'r') {
      e.preventDefault();
      if (selectedId) handleStartRename(selectedId);
    } else if (e.key === 'Delete' && selectedId) {
      handleDeleteRequest(selectedId);
    }
  },
  [renamingId, selectedId]
);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', hideContextMenu);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', hideContextMenu);
    };
  }, [handleKeyDown]);

  const total = countItems(tree);
  const contextNode = contextMenu.nodeId ? findNode(contextMenu.nodeId) : null;
  const deleteNode = deleteTarget ? findNode(deleteTarget) : null;

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onNewFile={handleNewFile}
        onNewFolder={handleNewFolder}
      />

      <div className="divider" />

      <div className="tree-container" onClick={() => setSelectedId(null)}>
        {total === 0 ? (
          <EmptyState onNewFile={handleNewFile} onNewFolder={handleNewFolder} />
        ) : (
          <FileTree
            tree={tree}
            expandedFolders={expandedFolders}
            selectedId={selectedId}
            renamingId={renamingId}
            onSelect={setSelectedId}
            onToggle={toggleFolder}
            onStartRename={handleStartRename}
            onFinishRename={handleFinishRename}
            onDelete={handleDeleteRequest}
            onNewFile={handleNewFile}
            onNewFolder={handleNewFolder}
            onContextMenu={handleContextMenu}
          />
        )}
      </div>

      <footer className="status-bar">
        <span className="status-text">{total} item{total !== 1 ? 's' : ''}</span>
        <span className="status-credit">
          Built by <strong>Anurag Dubey</strong> for Storebox AI
        </span>
      </footer>

      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          node={contextNode}
          onClose={hideContextMenu}
          onNewFile={handleNewFile}
          onNewFolder={handleNewFolder}
          onRename={handleStartRename}
          onDelete={handleDeleteRequest}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          node={deleteNode}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}