import * as React from 'react';
import * as PropTypes from 'prop-types';
import './style';

export interface HeadingProps {
  level: number;
}

class Heading extends React.Component<HeadingProps, any> {
  static propTypes = {
    level: PropTypes.number,
    children: PropTypes.node,
  };
  static defaultProps = {};

  render() {
    const { level, children } = this.props;
    return React.createElement(
      `h${level}`,
      {},
      <div className="v-md-block-heading">
        <a {...({ name: (children as any)[0].props.value } as any)} />
        <a href={`#${(children as any)[0].props.value}`} className="v-md-block-heading-anchor">
          <span>#</span>
        </a>
        <span>{children}</span>
      </div>
    );
  }
}

export default Heading;
