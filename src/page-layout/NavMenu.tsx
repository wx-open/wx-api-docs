import * as React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const rootSubmenuKeys: React.ReactText[] = [];

interface MenuNode {
  id: string;
  pid: string,
  children?: MenuNode[];
  data: {
    title: string;
    route: string;
  };
}

export interface SiderProps {
  data: MenuNode[];
  openKeys: string[];
  defaultSelectedKeys: string[];
}

const Sider: React.FunctionComponent<SiderProps> = (props) => {
  const menuData = props.data;
  const defaultSelectedKeys = props.defaultSelectedKeys;
  const [openKeys, setOpenKeys] = React.useState<React.ReactText[]>(props.openKeys);

  const onOpenChange = (keys: React.ReactText[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key as string) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const renderMenu = (data: MenuNode[], depth = 0) => {
    return data.map((item) => {
      if (item.children?.length && depth < 1) {
        return (
          <SubMenu key={item.id} title={item.id}>
            {renderMenu(item.children, depth + 1)}
          </SubMenu>
        );
      }
      const route = item.data.route;
      return (
        <Menu.Item key={route}>
          <Link to={route}>{item.data.title}</Link>
        </Menu.Item>
      );
    });
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      openKeys={openKeys as string[]}
      onOpenChange={onOpenChange}
      style={{ width: 260 }}
    >
      {renderMenu(menuData)}
    </Menu>
  );
};

export default Sider;
