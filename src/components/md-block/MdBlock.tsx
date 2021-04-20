import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import CodeBox from '../code-block/CodeBox';
import { loadAssets } from '../../data';

export interface MdBlockProps {
  content: string;
}

class MdBlock extends React.Component<MdBlockProps, any> {
  static propTypes = {};
  static defaultProps = {
    content: '',
  };

  render() {
    const { content } = this.props;
    return (
      <div>
        <ReactMarkdown
          className="markdown-body"
          allowDangerousHtml
          transformImageUri={(uri) => {
            const reg = /^wx:\/\/(.+?\.(?:jpg|png|bmp|gif|webp|jpeg))$/;
            if (reg.test(uri)) {
              const [, path] = uri.match(reg)!;
              return loadAssets(path);
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
            code: ({ language, value }) => {
              return <CodeBox language={language} source={value} />;
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
