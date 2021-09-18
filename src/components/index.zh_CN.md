---
order: 2
title: 开始使用
toc: true
timeline: true
only: true

---

这是一个基本描述信息, 哈哈~~

---

# ღ react-iaux

一个 React UI Library, 使用简单

[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![license][license]][license-url]
[![last-commit][last-commit]][last-commit-url]
[![release][release]][release-url]
[![prs][prs]][prs-url]
[![download][download]][download-url]

![Hello World](wx://assets/entry.jpg)

## Get Started ☆

### install

```
npm i -S react-iaux
```

### Usage

```tsx
import * as React from 'react';
import MdBlock from '../md-block/MdBlock';
import { loadMd, MenuNode } from '../../context';
import CodeSection from './CodeSection';
import LoadingLine from '../load-line';
import MdSection from './MdSection';
import { filterToc } from './helper';

export interface CodeBlockProps {
  meta: MenuNode;
}

export interface CodeBlockState {
  loading: boolean;
  meta: Record<string, any>;
  doc: string;
  sections: MenuNode[];
  error: boolean;
}

class CodeBlock extends React.Component<CodeBlockProps, CodeBlockState> {
  static propTypes = {};
  static defaultProps = {};
  state: CodeBlockState = {
    loading: true,
    meta: {},
    doc: '',
    sections: [],
    error: false,
  };

  async componentDidMount() {
    await this.load();
  }

  async componentDidUpdate(prevProps: CodeBlockProps) {
    const { routeKey: oldId } = prevProps.meta.data;
    const { routeKey: id } = this.props.meta.data;
    if (id !== oldId) {
      await this.load();
    }
  }

  private async load() {
    this.setState({ loading: true, error: false });
    try {
      const { meta } = this.props;
      const n = meta.data.contextPath;
      const doc = await loadMd(n);
      let sections: MenuNode[] = [];
      if (meta) {
        const { children } = meta;
        if (children) {
          sections = children;
        }
      }
      this.setState({
        loading: false,
        meta: doc.html.meta,
        sections,
        doc: filterToc(doc.html.source),
      });
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    const { sections, meta, doc, error, loading } = this.state;
    if (error) {
      return (
        <div className="v-page-markdown-load-error">
          {loading && <LoadingLine loading={loading} />}
          <h2>内容加载失败！</h2>
        </div>
      );
    }
    if (meta.toc === 'true') {
      return (
        <div className="v-page-markdown">
          {loading && <LoadingLine loading={loading} />}
          <div>
            <MdBlock hashList={this.props.meta.data.tocNodes} content={doc} />
          </div>
          <div style={{ marginTop: 20 }}>
            {sections.map((i) => {
              if (i.data.toc === 'true' || i.data.only === 'true') {
                return (
                  <div key={i.data.route} className="v-md-section-container">
                    <MdSection meta={i} />
                  </div>
                );
              }
              return (
                <div key={i.data.route} className="v-code-section-container">
                  <CodeSection meta={i} />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return (
      <div style={{ marginTop: 20 }}>
        {loading && <LoadingLine loading={loading} />}
        {sections.map((i) => {
          return (
            <div key={i.data.route}>
              <CodeSection meta={i} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default CodeBlock;
```

[npm]: https://img.shields.io/npm/v/react-iaux
[npm-url]: https://www.npmjs.com/package/react-iaux
[node]: https://badgen.net/npm/node/react-iaux
[node-url]: https://nodejs.org
[deps]: https://img.shields.io/david/webpack/webpack.svg
[deps-url]: #
[prs]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs-url]: https://github.com/iovx/iovx/react-iaux
[tag]: https://badgen.net/github/tags/iovx/react-iaux
[tag-url]: #
[release]: https://badgen.net/github/release/iovx/react-iaux
[release-url]: #
[license]: https://img.shields.io/github/license/iovx/react-iaux
[license-url]: #
[tests-url]: https://travis-ci.com/github/iovx/react-iaux/builds
[tests]: https://badgen.net/travis/iovx/react-iaux
[last-commit-url]: https://travis-ci.com/github/iovx/react-iaux/builds
[last-commit]: https://badgen.net/github/last-commit/iovx/react-iaux
[cover-url]: https://codecov.io/github/react-iaux/
[cover]: https://badgen.net/codecov/c/github/react-iaux/master
[download-url]: https://www.npmjs.com/package/react-iaux
[download]: https://badgen.net/npm/dw/react-iaux
