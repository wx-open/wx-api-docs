import * as React from 'react';
import { Key } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Drawer, Empty, Row } from 'antd';
import Content from '../../page-layout/Content';
import { getNodeByRoute, LocalContext } from '../../context';
import { Col } from 'antd';
import DocumentTitle from 'react-document-title';
import Sider from '../../page-layout/NavMenu';
import CodeBlock from '../../components/code-block';
import PageLayout from '../../page-layout';
import { RouteComponentProps } from 'react-router';

export interface ComponentPageProps extends RouteComponentProps<{ id: string }> {
  route: string;
}

export interface ComponentPageState {
  selectedKeys: Key[];
  showDrawer: boolean;
}

class ComponentPage extends React.Component<ComponentPageProps, ComponentPageState> {
  static propTypes = {};
  static defaultProps = {};
  public state: ComponentPageState = {
    selectedKeys: [],
    showDrawer: false,
  };

  static getDerivedStateFromProps(nextProps: ComponentPageProps, prevState: ComponentPageState) {
    const nextPath = nextProps.location.pathname;
    return nextPath === prevState.selectedKeys[0]
      ? null
      : {
          selectedKeys: [nextPath],
        };
  }

  render() {
    const { route } = this.props;
    const { id } = this.props.match.params;
    const { selectedKeys, showDrawer } = this.state;
    return (
      <PageLayout
        showMenu
        onMenuTriggerClick={() => {
          this.setState({ showDrawer: true });
        }}
      >
        <Content activeId={id}>
          <LocalContext.Consumer>
            {({ meta, inject }) => {
              const mta = meta.find((i) => i.route === route);
              if (!mta) {
                return <div>未获取到元信息{route}</div>;
              }
              const nodes = mta.data.nodes;
              let activeRoute = id;
              if (!id) {
                activeRoute = nodes[0]?.children?.length ? nodes[0].children[0].data.routeKey : nodes[0].data.routeKey;
              }
              const node = getNodeByRoute(nodes, activeRoute);
              if (!node) {
                return (
                  <>
                    <DocumentTitle title={`${inject.title}-文档走丢了`} />
                    <div className="v-page-body-side-menu">
                      <Sider
                        data={nodes}
                        openKeys={nodes.map((i) => i.id)}
                        selectedKeys={selectedKeys as string[]}
                        onSelect={({ selectedKeys }) => this.setState({ selectedKeys: selectedKeys! })}
                      />
                    </div>
                    <div className="v-page-body-doc-main">
                      <div style={{ padding: '20px 40px', maxWidth: 930, margin: ' 0 auto' }}>
                        <Empty description={'文档走丢了'} imageStyle={{ height: 400 }} />
                      </div>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <DocumentTitle title={`${inject.title}-${node.data.title}`} />
                  <Drawer
                    onClose={() => this.setState({ showDrawer: false })}
                    visible={showDrawer}
                    mask
                    maskClosable
                    keyboard
                    placement="left"
                    width={400}
                  >
                    <div>
                      <div>
                        <Link to="/">首页</Link>
                      </div>
                      <Sider
                        data={nodes}
                        openKeys={nodes.map((i) => i.id)}
                        selectedKeys={selectedKeys as string[]}
                        onSelect={({ selectedKeys }) =>
                          this.setState({ selectedKeys: selectedKeys!, showDrawer: false })
                        }
                      />
                    </div>
                  </Drawer>
                  <div className="v-page-body-side-menu">
                    <Sider
                      data={nodes}
                      openKeys={nodes.map((i) => i.id)}
                      selectedKeys={selectedKeys as string[]}
                      onSelect={({ selectedKeys }) => this.setState({ selectedKeys: selectedKeys! })}
                    />
                  </div>
                  <div className="v-page-body-doc-main">
                    <div style={{ padding: '20px 40px', maxWidth: 930, margin: ' 0 auto' }}>
                      <CodeBlock meta={node} />
                    </div>
                  </div>
                  <div className="v-page-body-anchor-list">
                    <Anchor showInkInFixed={false} style={{ marginTop: 40 }}>
                      {node.data.contents.map((n) => {
                        return (
                          <Anchor.Link key={n.id} href={`#${n.id}`} title={n.title}>
                            {n.children.map((i) => {
                              return <Anchor.Link key={i.id} href={`#${i.id}`} title={i.title} />;
                            })}
                          </Anchor.Link>
                        );
                      })}
                    </Anchor>
                  </div>
                </>
              );
            }}
          </LocalContext.Consumer>
        </Content>
      </PageLayout>
    );
  }
}

export default ComponentPage;
