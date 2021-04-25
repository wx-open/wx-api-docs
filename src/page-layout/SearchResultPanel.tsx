import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Empty } from 'antd';
import { SearchResultItem } from '../routes/api-docs/helpers';

export interface SearchResultPanelProps {
  data: SearchResultItem[];
  onClick?(obj: SearchResultItem): void;
}

class SearchResultPanel extends React.Component<SearchResultPanelProps, any> {
  static propTypes = {
    data: PropTypes.array,
  };
  static defaultProps = {
    data: [],
  };
  private handleClick = (i: SearchResultItem) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(i);
    }
  };
  render() {
    const { data } = this.props;
    if (!data.length) {
      return (
        <div>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      );
    }
    return (
      <div>
        <div>
          {data.map((i) => {
            return (
              <div key={i.route}>
                <div>
                  <div onClick={() => this.handleClick(i)}>
                    <a href={`${i.route}`}>{i.title}</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchResultPanel;
