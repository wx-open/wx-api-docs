import * as React from 'react';
import { Tabs } from 'antd';
import CodeBox from './CodeBox';
import * as ReactDOM from 'react-dom';
import { loadMd, MenuNode } from '../../context';
import MdBlock from '../md-block/MdBlock';
import { filterToc } from './helper';
import MdExecBlock from '../md-block/MdExecBlock';

const { TabPane } = Tabs;

export interface CodeSectionProps {
  meta: MenuNode;
}

export interface CodeSectionState {
  loading: boolean;
  source: string;
  desc: string;
}

class MdSection extends React.Component<CodeSectionProps, CodeSectionState> {
  static propTypes = {};
  static defaultProps = {};
  state = {
    loading: false,
    source: '',
    desc: '',
  };
  private mount: [Function, string, object][] = [];
  async componentDidMount() {
    await this.load();
  }

  private async load() {
    this.setState({ loading: true });
    const { meta } = this.props;
    const n = meta.data.contextPath;
    const doc = await loadMd(n);
    this.mount = doc.codes;
    this.setState({
      loading: false,
      desc: doc.html.desc,
      source: filterToc(doc.html.source),
    });
  }

  render() {
    const { source, loading, desc } = this.state;
    const { meta } = this.props;
    return (
      <div className="v-code-section">
        <h2>{meta.data.title}</h2>
        <p>{desc}</p>
        <div>
          {loading ? (
            <div>加载中...</div>
          ) : (
            <div>
              <MdExecBlock loading={loading} mounts={this.mount} hashList={meta.data.tocNodes} content={source} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MdSection;
