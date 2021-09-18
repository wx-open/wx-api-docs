import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import CodeBox from '../code-block/CodeBox';
import Heading from './Heading';
import { loadAssets } from '../../data';
import { TocItem } from '../../context';
import { Tabs } from 'antd';
import * as ReactDOM from 'react-dom';
import img404 from '../../assets/404.png';

const { TabPane } = Tabs;
export interface MdBlockProps {
  content: string;
  hashList: TocItem[];
  loading: boolean;
  mounts: [Function, string, any?][];
}

class MdExecBlock extends React.Component<MdBlockProps, any> {
  static propTypes = {};
  static defaultProps = {
    content: '',
  };
  private mounted = false;
  private onRef = (language: string, codeIndex: number) => (ele: HTMLDivElement | null) => {
    if (!ele) {
      return;
    }
    const codeBox = document.createElement('div');
    const codeBlock = document.createElement('div');
    codeBlock.classList.add('v-code-block');
    codeBox.appendChild(codeBlock);
    ele.appendChild(codeBox);
    // const [fn, code, options] = this.props.mounts[codeIndex];
    // console.log(this.props.mounts);
    const { mounts } = this.props;
    if (language === 'js' || language === 'ts') {
      if (typeof mounts[codeIndex] !== 'function') {
      }
      mounts[codeIndex][0]({
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
    if (language === 'jsx' || language === 'tsx') {
      ReactDOM.render(React.createElement(mounts[codeIndex][0] as any, {}), codeBlock);
    }
  };
  renderCode = ({ language, value, codeIndex }: { language: string; value: string; codeIndex: number }) => {
    const { loading, mounts } = this.props;
    const [fn, code, options] = mounts[codeIndex];
    if (options.type === 'run') {
      const source = mounts[codeIndex][1];
      return (
        <div className="v-exec-code-section">
          <div>
            <div style={{ fontSize: 17 }}>{options.name}</div>
            <div
              style={{
                fontSize: 14,
                padding: '5px 0',
              }}
            >
              {options.desc}
            </div>
          </div>
          <Tabs defaultActiveKey="result">
            <TabPane tab="效果" key="result">
              <div>
                {loading ? (
                  <div>加载中....</div>
                ) : (
                  <div>
                    <div ref={this.onRef(language, codeIndex)} />
                  </div>
                )}
              </div>
            </TabPane>
            <TabPane tab="源码" key="source">
              <div>{source && <CodeBox source={source || ''} />}</div>
            </TabPane>
          </Tabs>
        </div>
      );
    }
    return <CodeBox language={language} source={value} />;
  };
  render() {
    const { content, hashList } = this.props;
    let i = 0;
    let codeIndex = 0;
    return (
      <div>
        <ReactMarkdown
          className="markdown-body"
          allowDangerousHtml
          transformImageUri={(uri) => {
            const reg = /^wx:\/\/(.+?\.(?:jpg|png|bmp|gif|webp|jpeg))$/;
            if (reg.test(uri)) {
              const [, path] = uri.match(reg)!;
              try {
                return loadAssets(path);
              } catch (e) {
                return img404;
              }
            }
            return uri;
          }}
          allowNode={(node, index, parent) => {
            if (node.type === 'html') {
              // filter style
              node.value = (node.value as string).replace(
                /<((style|script|link|input|form)|\/(style|script|link|input|form))(\s?[^>]*>)/gi,
                (a: string) => {
                  return a.replace(
                    /[<>]/g,
                    (e: string) =>
                      (({
                        '<': '&lt;',
                        '>': '&gt;',
                      } as { [key: string]: string })[e])
                  );
                }
              );
            }
            return true;
          }}
          plugins={[[gfm, { singleTilde: false }]]}
          renderers={{
            code: (obj) => {
              const { language, value } = obj;
              return ['js', 'jsx', 'ts', 'tsx'].includes(language) ? (
                this.renderCode({ language, value, codeIndex: codeIndex++ })
              ) : (
                <CodeBox language={language} source={value} />
              );
            },
            heading: ({ level, children }) => {
              return (
                <Heading level={level} hash={hashList[i++]?.id}>
                  {children}
                </Heading>
              );
            },
            link: ({ href, children }) => {
              return (
                <a href={href} referrerPolicy="no-referrer" target="_blank" rel="noreferrer">
                  {children}
                </a>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }
}

export default MdExecBlock;
