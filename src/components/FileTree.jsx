import React from 'react';
import TreeNode from './TreeNode';
import { sortNodes } from '../utils/helpers';

export default function FileTree({
  tree,
  expandedFolders,
  selectedId,
  renamingId,
  onSelect,
  onToggle,
  onStartRename,
  onFinishRename,
  onDelete,
  onNewFile,
  onNewFolder,
  onContextMenu,
}) {
  return (
    <div>
      {sortNodes(tree).map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          depth={0}
          isExpanded={expandedFolders.has(node.id)}
          isSelected={selectedId === node.id}
          isRenaming={renamingId === node.id}
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
  );
}