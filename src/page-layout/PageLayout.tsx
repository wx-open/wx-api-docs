import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Input } from 'antd';
import { LocalContext } from '../context';
import Header from './Header';

const { Search } = Input;

export interface PageLayoutProps {
  title?: string;
  logo?: string;
}

class PageLayout extends React.Component<PageLayoutProps, any> {
  static propTypes = {
    title: PropTypes.string,
  };
  static defaultProps = {
    title: '',
    logo: '',
  };

  render() {
    const { title: propTitle, logo: propLogo, children } = this.props;
    return (
      <LocalContext.Consumer>
        {({ meta, inject: { title: contextTitle, logo: contextLogo } }) => {
          const logo = propLogo || contextLogo;
          const title = propTitle || contextTitle;
          return (
            <div className="v-page">
              <Header title={title} logo={logo} />
              <div className="v-page-body">{children}</div>
            </div>
          );
        }}
      </LocalContext.Consumer>
    );
  }
}

export default PageLayout;
