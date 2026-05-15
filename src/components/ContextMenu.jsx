import React from 'react';
import { FilePlus, FolderPlus, Pencil, Trash2 } from 'lucide-react';

export default function ContextMenu({ x, y, node, onClose, onNewFile, onNewFolder, onRename, onDelete }) {
  if (!node) return null;

  return (
    <div className="context-menu" style={{ left: x, top: y }} onClick={onClose}>
      {node.type === 'folder' && (
        <>
          <div className="context-item" onClick={() => { onClose(); onNewFile(node.id); }}>
            <FilePlus size={16} /> New File
          </div>
          <div className="context-item" onClick={() => { onClose(); onNewFolder(node.id); }}>
            <FolderPlus size={16} /> New Folder
          </div>
          <div className="context-divider" />
        </>
      )}
      <div className="context-item" onClick={() => { onClose(); onRename(node.id); }}>
        <Pencil size={16} /> Rename
      </div>
      <div className="context-item danger" onClick={() => { onClose(); onDelete(node.id); }}>
        <Trash2 size={16} /> Delete
      </div>
    </div>
  );
}