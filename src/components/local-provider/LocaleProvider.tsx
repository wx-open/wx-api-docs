import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';
import localeData from './locale';
import { Lang } from './interface';
import { Locale } from 'antd/es/locale-provider';

export interface LocalProviderProps {
  lang: Lang;
}

export interface LocalProviderState {
  locale: Locale;
}
class LocaleProvider extends React.Component<LocalProviderProps, LocalProviderState> {
  static propTypes = {
    lang: PropTypes.oneOf(['zh_CN', 'zh_TW', 'en_US']),
  };
  static defaultProps = {
    locale: 'zh_CN',
  };
  constructor(props: LocalProviderProps) {
    super(props);
    this.state = {
      locale: localeData[props.lang],
    };
  }
  render() {
    return <ConfigProvider locale={this.state.locale || localeData.zh_CN}>{this.props.children}</ConfigProvider>;
  }
}

export default LocaleProvider;
