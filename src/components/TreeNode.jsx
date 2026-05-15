import React, { useRef, useEffect } from 'react';
import {
  ChevronRight, Folder, FolderOpen, File,
  FilePlus, FolderPlus, Pencil, Trash2,
} from 'lucide-react';
import { getFileIconColor, sortNodes } from '../utils/helpers';

export default function TreeNode({
  node,
  depth,
  isExpanded,
  isSelected,
  isRenaming,
  onSelect,
  onToggle,
  onStartRename,
  onFinishRename,
  onDelete,
  onNewFile,
  onNewFolder,
  onContextMenu,
  expandedFolders,
  selectedId,
  renamingId,
}) {
  const inputRef = useRef(null);
  const indent = depth * 16 + 8;
  const isFolder = node.type === 'folder';

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  function handleKeyDown(e) {
    if (e.key === 'Enter') inputRef.current.blur();
    if (e.key === 'Escape') onFinishRename(node.id, null);
  }

  function handleBlur() {
    if (isRenaming) {
      const val = inputRef.current?.value?.trim();
      onFinishRename(node.id, val || node.name);
    }
  }

  function handleClick(e) {
    e.stopPropagation();
    onSelect(node.id);
    if (isFolder) onToggle(node.id);
  }

  return (
    <div>
      <div
        className={`tree-item${isSelected ? ' selected' : ''}`}
        style={{ paddingLeft: indent }}
        onClick={handleClick}
        onDoubleClick={() => onStartRename(node.id)}
        onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); onContextMenu(e, node.id); }}
      >
        {/* Chevron or spacer */}
        {isFolder ? (
          <span className={`chevron${isExpanded ? ' open' : ''}`}>
            <ChevronRight size={16} />
          </span>
        ) : (
          <span className="chevron-spacer" />
        )}

        {/* Icon */}
        {isFolder ? (
          <span className="node-icon">
            {isExpanded ? <FolderOpen size={16} color="#374151" /> : <Folder size={16} color="#374151" />}
          </span>
        ) : (
          <span className="node-icon">
            <File size={16} color={getFileIconColor(node.name)} />
          </span>
        )}

        {/* Name or rename input */}
        {isRenaming ? (
          <input
            ref={inputRef}
            className="rename-input"
            defaultValue={node.name}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className={`node-name${isFolder ? ' folder-name' : ''}`}>{node.name}</span>
        )}

        {/* Action buttons */}
        <div className="node-actions">
          {isFolder && (
            <>
              <button
                className="action-btn"
                title="New File"
                onClick={(e) => { e.stopPropagation(); onNewFile(node.id); }}
              >
                <FilePlus size={14} />
              </button>
              <button
                className="action-btn"
                title="New Folder"
                onClick={(e) => { e.stopPropagation(); onNewFolder(node.id); }}
              >
                <FolderPlus size={14} />
              </button>
            </>
          )}
          <button
            className="action-btn"
            title="Rename"
            onClick={(e) => { e.stopPropagation(); onStartRename(node.id); }}
          >
            <Pencil size={14} />
          </button>
          <button
            className="action-btn danger"
            title="Delete"
            onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Children */}
      {isFolder && isExpanded && node.children && (
        <div>
          {sortNodes(node.children).map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              isExpanded={expandedFolders.has(child.id)}
              isSelected={selectedId === child.id}
              isRenaming={renamingId === child.id}
              onSelect={onSelect}
              onToggle={onToggle}
              onStartRename={onStartRename}
              onFinishRename={onFinishRename}
              onDelete={onDelete}
              onNewFile={onNewFile}
              onNewFolder={onNewFolder}
              onContextMenu={onContextMenu}
              expandedFolders={expandedFolders}
              selectedId={selectedId}
              renamingId={renamingId}
            />
          ))}
        </div>
      )}
    </div>
  );
}