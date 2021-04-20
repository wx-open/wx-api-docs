import { ContextData, MenuNode } from '../../context';

export function search(meta: ContextData['meta'], key: string, result: MenuNode[] = []) {
  meta.forEach((i) => {
    walk(i.data.nodes);
  });

  function walk(nodes: MenuNode[]) {
    nodes.forEach((node) => {
      if (node.data.title.indexOf(key) > -1) {
        result.push(node);
        if (node.children?.length) {
          walk(node.children);
        }
        return;
      }
      if (node.children?.length) {
        walk(node.children);
      }
    });
  }

  return result;
}

export function getFirstRoute(nodes: MenuNode[]): MenuNode | null {
  const node = nodes[0];
  if (node.children?.length) {
    const subNodes = node.children?.filter((i) => i.data?.toc === 'true');
    if (subNodes.length) {
      return getFirstRoute(subNodes);
    }
  }
  return node || null;
}
