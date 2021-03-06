import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import PageLayout from '../../page-layout';
import { LocalContext } from '../../context';
import DocumentTitle from 'react-document-title';
import { getFirstRoute } from '../api-docs/helpers';

export interface HomeProps extends RouteComponentProps {}

class Home extends React.Component<HomeProps, any> {
  static propTypes = {};
  static defaultProps = {};
  context: typeof LocalContext;
  componentDidMount() {
    console.log(this.context);
  }

  render() {
    return (
      <LocalContext.Consumer>
        {({ meta, inject }) => {
          return (
            <PageLayout>
              <DocumentTitle title={inject.title} />
              <div>
                <div>
                  {meta.map((i) => {
                    const route = getFirstRoute(i.data.nodes);
                    return (
                      <div key={i.route}>
                        <Link to={route?.data.route || i.route}>{i.title}</Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </PageLayout>
          );
        }}
      </LocalContext.Consumer>
    );
  }
}

export default Home;
