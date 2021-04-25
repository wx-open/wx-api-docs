import { ContextData, MenuNode } from '../../context';

export interface SearchResultItem {
  route: string;
  title: string;
}

export function search(meta: ContextData['meta'], key: string, result: SearchResultItem[] = []) {
  meta.forEach((i) => {
    walk(i.data.nodes);
  });

  function walk(nodes: MenuNode[]) {
    nodes.forEach((node) => {
      if (compare(node.data.title, key)) {
        result.push({
          title: node.data.title,
          route: node.data.route,
        });
        node.data.tocNodes.forEach((i) => {
          if (i.title.indexOf(key) > -1) {
            result.push({
              title: [node.data.title, i.title].join(' > '),
              route: `${node.data.route}#${i.id}`,
            });
          }
        });
        if (node.children?.length) {
          walk(node.children);
        }
        return;
      }
      node.data.tocNodes.forEach((i) => {
        if (compare(i.title, key)) {
          result.push({
            title: [node.data.title, i.title].join(' > '),
            route: `${node.data.route}#${i.id}`,
          });
        }
      });
      if (node.children?.length) {
        walk(node.children);
      }
    });
  }

  return result;
}

function compare(title: string, keyword: string) {
  return title.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
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
