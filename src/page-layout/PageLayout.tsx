import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import Icon from '@ant-design/icons/es/components/Icon';
import Logo from './Logo';
import { LocalContext } from '../context';

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

  handleSearch = () => {};

  render() {
    const { title: propTitle, logo: propLogo, children } = this.props;
    return (
      <LocalContext.Consumer>
        {({ inject: { title: contextTitle, logo: contextLogo } }) => {
          const logo = propLogo || contextLogo;
          const title = propTitle || contextTitle;
          return (
            <div className="v-page">
              <div className="v-page-header">
                <div className="v-page-logo">
                  <div>
                    <Link to="/">
                      {logo ? <img src={logo} alt={title} /> : <Icon className="v-page-icon" component={Logo} />}
                    </Link>
                  </div>
                  <div className="v-page-logo-title">
                    <Link to="/">{title}</Link>
                  </div>
                </div>
                <div className="v-page-search">
                  <Search placeholder="在文档中搜索" allowClear onSearch={this.handleSearch} style={{ width: 300 }} />
                </div>
              </div>
              <div className="v-page-body">{children}</div>
            </div>
          );
        }}
      </LocalContext.Consumer>
    );
  }
}

export default PageLayout;
