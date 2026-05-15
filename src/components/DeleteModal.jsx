import React from 'react';

export default function DeleteModal({ node, onConfirm, onCancel }) {
  if (!node) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <p className="modal-title">Delete "{node.name}"?</p>
        <p className="modal-desc">
          {node.type === 'folder'
            ? 'This folder and all its contents will be permanently deleted.'
            : 'This file will be permanently deleted.'}
        </p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}