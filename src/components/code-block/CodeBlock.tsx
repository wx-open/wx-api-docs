import * as React from 'react';
import MdBlock from '../md-block/MdBlock';
import { loadMd, MenuNode } from '../../context';
import CodeSection from './CodeSection';
import LoadingLine from '../load-line';
import MdSection from './MdSection';
import { filterToc } from './helper';

export interface CodeBlockProps {
  meta: MenuNode;
}

export interface CodeBlockState {
  loading: boolean;
  meta: Record<string, any>;
  doc: string;
  sections: MenuNode[];
  error: boolean;
}

class CodeBlock extends React.Component<CodeBlockProps, CodeBlockState> {
  static propTypes = {};
  static defaultProps = {};
  state: CodeBlockState = {
    loading: true,
    meta: {},
    doc: '',
    sections: [],
    error: false,
  };

  async componentDidMount() {
    await this.load();
  }

  async componentDidUpdate(prevProps: CodeBlockProps) {
    const { routeKey: oldId } = prevProps.meta.data;
    const { routeKey: id } = this.props.meta.data;
    if (id !== oldId) {
      await this.load();
    }
  }

  private async load() {
    this.setState({ loading: true, error: false });
    try {
      const { meta } = this.props;
      const n = meta.data.contextPath;
      const doc = await loadMd(n);
      let sections: MenuNode[] = [];
      if (meta) {
        const { children } = meta;
        if (children) {
          sections = children;
        }
      }
      this.setState({
        loading: false,
        meta: doc.html.meta,
        sections,
        doc: filterToc(doc.html.source),
      });
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    const { sections, meta, doc, error, loading } = this.state;
    if (error) {
      return (
        <div className='v-page-markdown-load-error'>
          {loading && <LoadingLine loading={loading} />}
          <h2>内容加载失败！</h2>
        </div>
      );
    }
    if (meta.toc === 'true') {
      return (
        <div className='v-page-markdown'>
          {loading && <LoadingLine loading={loading} />}
          <div>
            <MdBlock content={doc} />
          </div>
          <div style={{ marginTop: 20 }}>
            {sections.map((i) => {
              if (i.data.toc === 'true' || i.data.only === 'true') {
                return (
                  <div key={i.data.route} className='v-md-section-container'>
                    <MdSection meta={i} />
                  </div>
                );
              }
              return (
                <div key={i.data.route} className='v-code-section-container'>
                  <CodeSection meta={i} />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return (
      <div style={{ marginTop: 20 }}>
        {loading && <LoadingLine loading={loading} />}
        {sections.map((i) => {
          return (
            <div key={i.data.route}>
              <CodeSection meta={i} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default CodeBlock;
