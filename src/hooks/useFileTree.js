import { useState, useRef } from 'react';
import { generateId, findNode } from '../utils/helpers';

function insertNode(nodes, parentId, newNode) {
  return nodes.map((n) => {
    if (n.id === parentId) {
      return { ...n, children: [...(n.children || []), newNode] };
    }
    if (n.children) {
      return { ...n, children: insertNode(n.children, parentId, newNode) };
    }
    return n;
  });
}

function renameNode(nodes, id, newName) {
  return nodes.map((n) => {
    if (n.id === id) return { ...n, name: newName };
    if (n.children) return { ...n, children: renameNode(n.children, id, newName) };
    return n;
  });
}

function deleteNode(nodes, id) {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) => {
      if (n.children) return { ...n, children: deleteNode(n.children, id) };
      return n;
    });
}

function saveTree(newTree, newExpanded) {
  localStorage.setItem('storebox_tree', JSON.stringify(newTree));
  localStorage.setItem('storebox_expanded', JSON.stringify([...newExpanded]));
}

export function useFileTree() {
  const [tree, setTree] = useState(() => {
    try { return JSON.parse(localStorage.getItem('storebox_tree') || '[]'); }
    catch { return []; }
  });

  const [expandedFolders, setExpandedFolders] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('storebox_expanded') || '[]')); }
    catch { return new Set(); }
  });

  // useRef always holds the latest tree value — no stale closure problem
  const treeRef = useRef(tree);
  const expandedRef = useRef(expandedFolders);

  function updateTree(newTree, newExpanded) {
    treeRef.current = newTree;
    expandedRef.current = newExpanded;
    setTree(newTree);
    setExpandedFolders(newExpanded);
    saveTree(newTree, newExpanded);
  }

  function toggleFolder(id) {
    const newExpanded = new Set(expandedRef.current);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    updateTree(treeRef.current, newExpanded);
  }

  function createFile(parentId) {
    const newNode = { id: generateId(), type: 'file', name: 'untitled' };
    // treeRef.current is always latest — never stale
    const newExpanded = new Set(expandedRef.current);
    let newTree;
    if (parentId) {
      newTree = insertNode(treeRef.current, parentId, newNode);
      newExpanded.add(parentId);
    } else {
      newTree = [...treeRef.current, newNode];
    }
    updateTree(newTree, newExpanded);
    return newNode.id;
  }

  function createFolder(parentId) {
    const newNode = { id: generateId(), type: 'folder', name: 'new-folder', children: [] };
    const newExpanded = new Set(expandedRef.current);
    let newTree;
    if (parentId) {
      newTree = insertNode(treeRef.current, parentId, newNode);
      newExpanded.add(parentId);
    } else {
      newTree = [...treeRef.current, newNode];
    }
    updateTree(newTree, newExpanded);
    return newNode.id;
  }

  function rename(id, newName) {
    const newTree = renameNode(treeRef.current, id, newName);
    updateTree(newTree, expandedRef.current);
  }

  function remove(id) {
    const newTree = deleteNode(treeRef.current, id);
    const newExpanded = new Set(expandedRef.current);
    newExpanded.delete(id);
    updateTree(newTree, newExpanded);
  }

  return {
    tree,
    expandedFolders,
    toggleFolder,
    createFile,
    createFolder,
    rename,
    remove,
    findNode: (id) => findNode(id, tree),
  };
}