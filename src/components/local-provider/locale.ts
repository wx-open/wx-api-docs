import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import zh_TW from 'antd/es/locale/zh_TW';
import { Locale } from 'antd/es/locale-provider';
import { Lang } from './interface';

const localeData: Record<Lang, Locale> = { zh_CN, zh_TW, en_US };
export default localeData;
