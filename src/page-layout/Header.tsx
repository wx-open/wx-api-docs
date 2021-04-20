import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import Icon from '@ant-design/icons/es/components/Icon';
import Logo from './Logo';
import { ContextData, LocalContext, MenuNode } from '../context';
import { search } from '../routes/api-docs/helpers';
import SearchResultPanel from './SearchResultPanel';

const { Search } = Input;

export interface HeaderProps {
  title?: string;
  logo?: string;
}

export interface HeaderState {
  searchData: MenuNode[];
  keyword: string;
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
  };
  private timer: number;
  private flag = true;
  private handleKeywordChange = (meta: ContextData['meta'], e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    const result = search(meta, keyword);
    clearTimeout(this.timer);
    this.setState({ keyword });
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

  render() {
    const { title, logo } = this.props;
    const { searchData, keyword } = this.state;
    return (
      <LocalContext.Consumer>
        {({ meta }) => {
          return (
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
                <Input
                  placeholder="在文档中搜索"
                  onChange={(e) => this.handleKeywordChange(meta, e)}
                  className="v-page-search-input"
                  onCompositionStart={this.handleCompositionStart}
                  onCompositionEnd={this.handleCompositionEnd}
                />
                {this.flag && keyword && (
                  <div className="v-page-result-panel">
                    <SearchResultPanel data={searchData} />
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

export default Header;
