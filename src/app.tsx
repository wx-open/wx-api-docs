import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Redirect, Route, RouteComponentProps, Router, Switch } from 'react-router';
import { ContextData, LocalContext } from './context';
import data from './data';
import './styles/page.less';
import LoadingLine from './components/load-line';
import { localize } from './components/local-provider';

const ComponentPage = React.lazy(() => import(/* webpackChunkName: "page-api-docs" */ './routes/api-docs'));
const HomePage = React.lazy(() => import(/* webpackChunkName: "page-home" */ './routes/home'));
const history = createBrowserHistory();

const contextData = (data as unknown) as ContextData;

class App extends React.Component<any, any> {
  render() {
    return (
      <React.Suspense fallback={<LoadingLine loading />}>
        <Router history={history}>
          <LocalContext.Provider value={contextData}>
            <Switch>
              {contextData.meta.map((i) => (
                <Route
                  exact
                  key={i.route}
                  path={`${i.route}${/\/$/.test(i.route) ? '' : '/'}:id?`}
                  render={(props: RouteComponentProps<{ id: string }>) => <ComponentPage {...props} route={i.route} />}
                />
              ))}
              <Route exact path="/" component={HomePage} />
              <Redirect to="/" />
            </Switch>
          </LocalContext.Provider>
        </Router>
      </React.Suspense>
    );
  }
}

const Page = localize()(App);
ReactDOM.render(<Page />, document.getElementById('root'));
