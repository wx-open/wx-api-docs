import * as React from 'react';
import Sider from './NavMenu';
import { Col, Row } from 'antd';
import { getNodeByRoute, LocalContext } from '../context';

export interface ContentProps {
  activeId: string;
}

class Content extends React.Component<ContentProps, any> {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <LocalContext.Consumer>
        {({ meta }) => {
          return <div>{this.props.children}</div>;
        }}
      </LocalContext.Consumer>
    );
  }
}

export default Content;
