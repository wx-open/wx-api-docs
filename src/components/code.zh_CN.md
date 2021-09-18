---
order: 2
title: 测试
cate: 开始使用
toc: false
timeline: true

---

这是一个基本描述信息, 哈哈~~

---

# Button

![Hello World](wx://assets/entry.jpg)

## 代码示例

使用 `message` 显示消息, 使用 `message` 显示消息

```jsx
/*
 * @type run
 * @name 使用消息展示
 * @desc 使用 message 显示消息
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
/*
 * @type run
 * @name 嵌套使用测试
 * @desc 使用 message 显示消息
 */
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
