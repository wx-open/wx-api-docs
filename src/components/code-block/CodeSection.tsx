import * as React from 'react';
import { Tabs } from 'antd';
import CodeBox from './CodeBox';
import * as ReactDOM from 'react-dom';
import { loadMd, MenuNode } from '../../context';

const { TabPane } = Tabs;

export interface CodeSectionProps {
  meta: MenuNode;
}

export interface CodeSectionState {
  loading: boolean;
  source: string;
  desc: string;
  type: string;
  title: string;
  error: boolean;
}

class CodeSection extends React.Component<CodeSectionProps, CodeSectionState> {
  static propTypes = {};
  static defaultProps = {};
  state = {
    loading: false,
    source: '',
    desc: '',
    title: '',
    type: '',
    error: false,
  };
  private mounted = false;
  private mount: Function = () => {};

  async componentDidMount() {
    await this.load();
  }

  private async load() {
    this.setState({ error: false, loading: true });
    const { meta } = this.props;
    const n = meta.data.contextPath;
    try {
      const doc = await loadMd(n);
      this.mount = doc.code;
      this.setState({
        loading: false,
        source: decodeURIComponent(doc.html.content),
        type: doc.html.type,
        desc: doc.html.desc,
      });
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  private onRef = (ele: HTMLDivElement | null) => {
    if (!ele) {
      return;
    }
    const codeBox = document.createElement('div');
    const codeBlock = document.createElement('div');
    codeBlock.classList.add('v-code-block');
    codeBox.appendChild(codeBlock);
    ele.appendChild(codeBox);
    const { type } = this.state;
    if (type === 'js' || type === 'ts') {
      if (typeof this.mount !== 'function') {
      }
      this.mount({
        mount: async (container: HTMLElement | null) => {
          if (this.mounted) {
            return;
          }
          if (!container || !(container instanceof Node)) {
            return;
          }
          codeBlock.appendChild(container);
          ele.appendChild(codeBox);
        },
      });
      return;
    }
    if (type === 'jsx' || type === 'tsx') {
      ReactDOM.render(React.createElement(this.mount as any, {}), codeBlock);
    }
  };

  render() {
    const { source, loading, desc, error } = this.state;
    const { meta } = this.props;
    if (error) {
      return (
        <div className="v-code-section">
          <div className="v-page-markdown-load-error">
            <h2>内容加载失败！</h2>
          </div>
        </div>
      );
    }
    return (
      <div className="v-code-section">
        <h2>{meta.data.title}</h2>
        <p>{desc}</p>
        <div>
          <Tabs defaultActiveKey="result">
            <TabPane tab="效果" key="result">
              <div>
                {loading ? (
                  <div>加载中....</div>
                ) : (
                  <div>
                    <div ref={this.onRef} />
                  </div>
                )}
              </div>
            </TabPane>
            <TabPane tab="源码" key="source">
              <div>{source && <CodeBox source={source} />}</div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default CodeSection;
