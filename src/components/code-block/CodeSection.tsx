import * as React from 'react';
import { Tabs } from 'antd';
import CodeBox from './CodeBox';
import * as ReactDOM from 'react-dom';
import { loadMd, MenuNode } from '../../context';
import { filterToc } from './helper';
import { MdBlock } from '../index';
import MdExecBlock from '../md-block/MdExecBlock';

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
  md: string;
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
    md: '',
    error: false,
  };
  private mounted = false;
  private mount: [Function, string][];

  async componentDidMount() {
    await this.load();
  }

  private async load() {
    this.setState({ error: false, loading: true });
    const { meta } = this.props;
    const n = meta.data.contextPath;
    try {
      const doc = await loadMd(n);
      this.mount = doc.codes;
      this.setState({
        loading: false,
        source: decodeURIComponent(doc.html.content),
        type: doc.html.type,
        desc: doc.html.desc,
        md: filterToc(doc.html.source),
      });
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  private onRef = (codeIndex: number) => (ele: HTMLDivElement | null) => {
    if (!ele) {
      return;
    }
    const codeBox = document.createElement('div');
    const codeBlock = document.createElement('div');
    codeBlock.classList.add('v-code-block');
    codeBox.appendChild(codeBlock);
    ele.appendChild(codeBox);
    const { type } = this.state;
    if (typeof this.mount[codeIndex][0] !== 'function') {
      return;
    }
    if (type === 'js' || type === 'ts') {
      this.mount[codeIndex][0]({
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
      ReactDOM.render(React.createElement(this.mount[codeIndex][0] as any, {}), codeBlock);
    }
  };

  render() {
    const { loading, desc, error, md } = this.state;
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
    if (meta.data.only === 'true') {
      return (
        <div className="v-code-section">
          <h2>{meta.data.title}</h2>
          <p>{desc}</p>
          <MdBlock hashList={meta.data.tocNodes} content={md} />
        </div>
      );
    }
    return (
      <div className="v-code-section">
        <h2>{meta.data.title}</h2>
        <p>{desc}</p>
        <MdExecBlock hashList={meta.data.tocNodes} content={md} loading={loading} mounts={this.mount} />
      </div>
    );
  }
}

export default CodeSection;
