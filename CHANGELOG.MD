# 更新说明

### 2.0.1 (2021 年 9 月 13 日)

- [feat] 支持自动导入 ChangeLog

---

- 配置文件新增属性

| 参数             | 必填 | 类型                                              | 描述             | 默认    |
| ---------------- | ---- | ------------------------------------------------- | ---------------- | ------- |
| `sniffChangeLog` | no   | `boolean`/[SniffChangeConfig](#SniffChangeConfig) | 是否插入更新日志 | `false` |

- <a name="SniffChangeConfig"> SniffChangeConfig </a>
  | 参数 | 必填 | 类型 | 描述 |默认 |
  | ----- | ---- | ------ | -------- | ------- |
  | `title` | no | `string` | 标题信息 |`更新日志`|
  | `desc` | no | `string` | 补充描述信息 |-|
  | `changeLogKey` | no | `string` | 更新日志路由标识 |`CHANGELOG`|

### 2.0.0 (2021 年 9 月 18 日)

- [feat] 支持多代码块解析

---

- [fix] 修复部分 bug
- [fix] 调整部分样式

### 1.0.7 (2021 年 05 月 06 日)

- [fix] `@babel/plugin-proposal-private-methods` warning

### 1.0.0 (2021 年 04 月 04 日)

- [feat] 支持 Markdown 文档展示，和 JS 代码块执行
