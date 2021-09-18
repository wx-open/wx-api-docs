import * as React from 'react';
import { Menu } from 'antd';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SelectEventHandler } from 'rc-menu/lib/interface';
const { SubMenu } = Menu;

const rootSubmenuKeys: React.ReactText[] = [];

interface MenuNode {
  id: string;
  pid: string;
  children?: MenuNode[];
  data: {
    title: string;
    route: string;
    toc?: string;
  };
}

export interface SiderProps {
  data: MenuNode[];
  openKeys: string[];
  selectedKeys: string[];
  onSelect: SelectEventHandler;
}

const Sider: React.FunctionComponent<SiderProps> = (props) => {
  const menuData = props.data;
  const onSelect = props.onSelect;
  const selectedKeys = props.selectedKeys;
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
      if (item.children?.filter((i) => i.data?.toc === 'true').length && depth < 1) {
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
      selectedKeys={selectedKeys}
      openKeys={openKeys as string[]}
      onOpenChange={onOpenChange}
      style={{ width: 300 }}
      onSelect={onSelect}
    >
      {renderMenu(menuData)}
    </Menu>
  );
};
Sider.propTypes = {
  data: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    pid: PropTypes.string.isRequired,
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      toc: PropTypes.string,
    }),
  } as any),
  selectedKeys: PropTypes.array,
  openKeys: PropTypes.array,
  onSelect: PropTypes.func,
} as any;
export default Sider;
