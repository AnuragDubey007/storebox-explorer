export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export function countItems(tree) {
  let count = 0;
  tree.forEach((node) => {
    count++;
    if (node.type === 'folder' && node.children) {
      count += countItems(node.children);
    }
  });
  return count;
}

export function getFileIconColor(name) {
  const ext = name.split('.').pop().toLowerCase();
  const map = {
    js: '#ca8a04',
    ts: '#2563eb',
    jsx: '#0891b2',
    tsx: '#3b82f6',
    css: '#9333ea',
    html: '#ea580c',
    json: '#b45309',
    md: '#6b7280',
    py: '#16a34a',
    rb: '#dc2626',
    java: '#b91c1c',
    cpp: '#1d4ed8',
    c: '#374151',
    go: '#0e7490',
    rs: '#c2410c',
    php: '#7e22ce',
    xml: '#ef4444',
    yaml: '#6b7280',
    env: '#374151',
    svg: '#f97316',
  };
  return map[ext] || '#6b7280';
}

export function findNode(id, nodes) {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const found = findNode(id, n.children);
      if (found) return found;
    }
  }
  return null;
}

export function sortNodes(nodes) {
  return [...nodes].sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}