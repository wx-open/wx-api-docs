import * as React from 'react';
import data, { loadMd } from './data';

export interface MenuNode {
  id: string;
  pid: string;
  children?: MenuNode[];
  data: {
    title: string;
    route: string;
    routeKey: string;
    filename: string;
    name: string;
    toc: string;
    contextPath: string;
    only: string;
  };
}

export interface LocalLoadData {
  meta: {
    title: string;
    route: string;
    data: {
      nodes: MenuNode[];
      mapping: Record<string, string>;
    };
  }[];
  inject: Record<string, any>;
}

export interface ContextData extends LocalLoadData {
  inject: {
    title: string;
    logo: string;
  };
}

const importData = (data as unknown) as ContextData;
const LocalContext = React.createContext<ContextData>({
  ...importData,
});

export function getNodeByRoute(treeData: MenuNode[], route: string): MenuNode | null {
  let result: MenuNode | null = null;
  for (const node of treeData) {
    if (node.data.routeKey === route) {
      return node;
    }
    if (node.children) {
      result = getNodeByRoute(node.children, route);
      if (result) {
        return result;
      }
    }
  }
  return result;
}

export function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export { LocalContext, loadMd };
