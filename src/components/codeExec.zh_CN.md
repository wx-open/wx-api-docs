---
order: 2
title: 测试使用
toc: true
timeline: true
only: false

---

这是一个基本描述信息, 哈哈~~

---

# Button

![Hello World](wx://assets/entry.jpg)

## 代码示例

使用 `message` 显示消息, 使用 `message` 显示消息

```jsx
/**
 * @type run
 * @name 基本使用
 * @desc 如果世界上曾经有那个人出现过，其他的都会变成将就，而我不愿意将就！
 */
import React from 'react';
import { Button, message } from 'antd';
export default function () {
  return (
    <div className="dc-btn-line">
      <Button onClick={() => message.success('Hello React')}>点我一下试试</Button>
    </div>
  );
}
```

```jsx
/**
 * @type run
 * @name 配合标签
 * @desc 其实一个也不能少
 */
import React from 'react';
import { message, Tag } from 'antd';
export default function () {
  return (
    <div className="dc-btn-line">
      <div style={{ padding: '10px 0px' }}>
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="volcano">volcano</Tag>
        <Tag color="orange">orange</Tag>
        <Tag color="gold">gold</Tag>
        <Tag color="lime">lime</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
        <Tag color="blue">blue</Tag>
        <Tag color="geekblue">geekblue</Tag>
        <Tag color="purple">purple</Tag>
      </div>
    </div>
  );
}
```

### OpenGL

| 参数  | 必填 | 类型   | 长度限制 | 描述    |
| ----- | ---- | ------ | -------- | ------- |
| appId | yes  | string | 128      | 应用 ID |
| appId | yes  | string | 128      | 应用 ID |
| appId | yes  | string | 128      | 应用 ID |
| appId | yes  | string | 128      | 应用 ID |

---

增加点击事件

```jsx
import React from 'react';
import { Button } from 'antd';
export default function () {
  return (
    <div className="dc-btn-line">
      <Button onClick={() => console.log('Hello React')}>Get Started</Button>
    </div>
  );
}
```

## API 说明

### BaseMap

| 参数  | 必填 | 类型   | 长度限制 | 描述    |
| ----- | ---- | ------ | -------- | ------- |
| appId | yes  | string | 128      | 应用 ID |
| appId | yes  | string | 128      | 应用 ID |
| appId | yes  | string | 128      | 应用 ID |
| appId | yes  | string | 128      | 应用 ID |

## 参考

https://baidu.com
