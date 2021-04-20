import * as React from 'react';
import { Key } from 'react';
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
}

class ComponentPage extends React.Component<ComponentPageProps, ComponentPageState> {
  static propTypes = {};
  static defaultProps = {};
  state = {
    selectedKeys: [],
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
    const { selectedKeys } = this.state;
    return (
      <PageLayout>
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
                    <Col span={6}>
                      <Sider
                        data={nodes}
                        openKeys={nodes.map((i) => i.id)}
                        selectedKeys={selectedKeys}
                        onSelect={({ selectedKeys }) => this.setState({ selectedKeys: selectedKeys! })}
                      />
                    </Col>
                    <Col span={18}>
                      <div>文档不存在#{activeRoute}</div>
                    </Col>
                  </>
                );
              }
              return (
                <>
                  <DocumentTitle title={`${inject.title}-${node.data.title}`} />
                  <Col span={6}>
                    <Sider
                      data={nodes}
                      openKeys={nodes.map((i) => i.id)}
                      selectedKeys={selectedKeys}
                      onSelect={({ selectedKeys }) => this.setState({ selectedKeys: selectedKeys! })}
                    />
                  </Col>
                  <Col span={18}>
                    <div style={{ padding: '20px 40px', maxWidth: 930 }}>
                      <CodeBlock meta={node} />
                    </div>
                  </Col>
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
