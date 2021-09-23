import * as React from 'react';
import './style';

export interface HeadingProps {
  level: number;
  hash: string;
}

class Heading extends React.Component<HeadingProps, any> {
  static propTypes = {};
  static defaultProps = {};

  render() {
    const { level, children, hash } = this.props;
    return React.createElement(
      `h${level}`,
      {},
      <div className="v-md-block-heading" id={hash}>
        <a href={`#${hash}`} className="v-md-block-heading-anchor">
          <span>#</span>
        </a>
        <span className="v-md-block-heading-anchor-title">{children}</span>
      </div>
    );
  }
}

export default Heading;
