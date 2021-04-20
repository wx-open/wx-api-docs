import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import { message } from 'antd';
import copyText from 'copy-to-clipboard';

export interface CodeBoxProps {
  source: string;
  language?: string;
}

class CodeBox extends React.Component<CodeBoxProps, any> {
  static propTypes = {};
  static defaultProps = {
    language: 'javascript',
  };
  private handleCopy = () => {
    const { source } = this.props;
    if (copyText(source)) {
      message.success('复制成功！').then();
    }
  };

  render() {
    const { source, language, children } = this.props;
    return (
      <div className="v-code-source-container">
        <div className="v-code-source-copy">
          <CopyOutlined onClick={this.handleCopy} />
        </div>
        <SyntaxHighlighter showLineNumbers language={language} style={theme}>
          {source || children}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default CodeBox;
