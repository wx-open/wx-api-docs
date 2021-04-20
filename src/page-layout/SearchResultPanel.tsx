import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import { MenuNode } from '../context';

export interface SearchResultPanelProps {
  data: MenuNode[];
}

class SearchResultPanel extends React.Component<SearchResultPanelProps, any> {
  static propTypes = {
    data: PropTypes.array,
  };
  static defaultProps = {
    data: [],
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
              <div key={i.id}>
                <div>
                  <Link to={i.data.route}>{i.data.title}</Link>
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
