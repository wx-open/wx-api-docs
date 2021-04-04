import * as React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../page-layout";
import { LocalContext } from "../../context";
import DocumentTitle from "react-document-title";

export interface HomeProps {
}

class Home extends React.Component<HomeProps, any> {
  static propTypes = {};
  static defaultProps = {};

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
                    return (
                      <div key={i.route}>
                        <Link to={i.route}>{i.title}</Link>
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
