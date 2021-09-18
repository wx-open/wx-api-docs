import * as React from 'react';
import * as PropTypes from 'prop-types';
import { LocalContext } from '../context';
import Header from './Header';

export interface PageLayoutProps {
  title?: string;
  logo?: string;
  onMenuTriggerClick?: () => void;
  showMenu?: boolean;
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
    const { title: propTitle, logo: propLogo, showMenu, children } = this.props;
    return (
      <LocalContext.Consumer>
        {({ meta, inject: { title: contextTitle, logo: contextLogo } }) => {
          const logo = propLogo || contextLogo;
          const title = propTitle || contextTitle;
          return (
            <div className="v-page">
              <Header
                showMenu={showMenu}
                title={title}
                logo={logo}
                onMenuTriggerClick={this.props.onMenuTriggerClick}
              />
              <div className="v-page-body">{children}</div>
            </div>
          );
        }}
      </LocalContext.Consumer>
    );
  }
}

export default PageLayout;
