import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import Icon from '@ant-design/icons/es/components/Icon';
import Logo from './Logo';
import { ContextData, LocalContext } from '../context';
import { search, SearchResultItem } from '../routes/api-docs/helpers';
import SearchResultPanel from './SearchResultPanel';
import { RouteComponentProps, withRouter } from 'react-router';

export interface HeaderProps extends RouteComponentProps {
  title?: string;
  logo?: string;
  showMenu?: boolean;
  onMenuTriggerClick?: () => void;
}

export interface HeaderState {
  searchData: SearchResultItem[];
  keyword: string;
  showResult: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  static propTypes = {
    title: PropTypes.string,
  };
  static defaultProps = {
    title: '',
    logo: '',
  };
  state: HeaderState = {
    searchData: [],
    keyword: '',
    showResult: false,
  };
  private timer: number;
  private flag = true;

  private handleFocus = () => {
    if (this.state.keyword) {
      this.setState({ showResult: true });
    }
  };
  private handleKeywordChange = (meta: ContextData['meta'], e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    const result = search(meta, keyword);
    clearTimeout(this.timer);
    this.setState({ keyword, showResult: true });
    this.timer = window.setTimeout(() => {
      if (this.flag) {
        this.setState({
          searchData: result,
        });
      }
    }, 100);
  };
  private handleCompositionStart = () => {
    this.flag = false;
  };
  private handleCompositionEnd = () => {
    this.flag = true;
  };
  private handleSearchNavClick = (i: SearchResultItem) => {
    this.setState({ showResult: false }, () => {
      this.props.history.push(i.route);
    });
  };

  render() {
    const { title, logo, showMenu } = this.props;
    const { searchData, keyword, showResult } = this.state;
    return (
      <LocalContext.Consumer>
        {({ meta }) => {
          return (
            <div className="v-page-header">
              <div className="v-page-logo">
                {!showMenu ? (
                  <div title={title}>
                    <Link to="/">
                      {logo ? <img src={logo} alt={title} /> : <Icon className="v-page-icon" component={Logo} />}
                    </Link>
                  </div>
                ) : (
                  <Icon
                    className="v-page-icon v-page-header-menu-trigger"
                    component={Logo}
                    title={title}
                    onClick={this.props.onMenuTriggerClick}
                  />
                )}
                <div className="v-page-logo-title" title={title}>
                  <Link to="/">{title}</Link>
                </div>
              </div>
              <div className="v-page-search">
                <Input
                  placeholder="在文档中搜索"
                  onChange={(e) => this.handleKeywordChange(meta, e)}
                  onFocus={(e) => this.handleFocus()}
                  className="v-page-search-input"
                  onCompositionStart={this.handleCompositionStart}
                  onCompositionEnd={this.handleCompositionEnd}
                />
                {this.flag && showResult && keyword && (
                  <div className="v-page-result-panel">
                    <SearchResultPanel data={searchData} onClick={this.handleSearchNavClick} />
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </LocalContext.Consumer>
    );
  }
}

export default withRouter(Header);
