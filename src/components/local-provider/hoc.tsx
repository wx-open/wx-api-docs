import * as React from 'react';
import { Lang } from './interface';
import LocaleProvider from './LocaleProvider';
export interface LocaleProps {
  lang?: Lang;
}
function localize<P = any>() {
  return (C: React.ComponentType<P & LocaleProps>): React.ComponentType<P> =>
    class extends React.Component<P, any> {
      public static displayName = 'LocaleWrapperComponent';
      private readonly lang: Lang = 'zh_CN';
      render = () => {
        const props = {
          ...this.props,
          lang: this.lang,
        };
        return (
          <LocaleProvider lang={this.lang}>
            <C {...props} />
          </LocaleProvider>
        );
      };
    };
}

export default localize;
