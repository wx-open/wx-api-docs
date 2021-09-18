import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import CodeBox from '../code-block/CodeBox';
import Heading from './Heading';
import { loadAssets } from '../../data';
import { TocItem } from '../../context';
import img404 from '../../assets/404.png';
export interface MdBlockProps {
  content: string;
  hashList: TocItem[];
  renderCode?: ({ language, value, codeIndex }: { language: string; value: string; codeIndex: number }) => any;
}

class MdBlock extends React.Component<MdBlockProps, any> {
  static propTypes = {};
  static defaultProps = {
    content: '',
  };

  render() {
    const { content, hashList, renderCode } = this.props;
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
              if (reg.test(uri)) {
                const [, path] = uri.match(reg)!;
                try {
                  return loadAssets(path);
                } catch (e) {
                  return img404;
                }
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
              return renderCode ? (
                renderCode({ language, value, codeIndex: codeIndex++ })
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
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }
}

export default MdBlock;
