# SafeNumber.js

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

SafeNumber.js 是一个轻量级的 JavaScript 库，用于解决 JavaScript 中的数值处理问题，包括大数值精度、浮点数计算和特殊数值字段的处理。

## 🌟 特性

- 🔢 **大数值处理**：自动处理超出 JavaScript 安全整数范围的数字
- 🎯 **浮点数精度**：解决 JavaScript 浮点数计算的精度问题
- 🔄 **递归处理**：支持处理嵌套的对象和数组
- 🛡️ **特殊字段保护**：为 ID 等特殊字段提供额外的安全保障
- ⚙️ **灵活配置**：提供多种配置选项以满足不同需求
- 💰 **货币格式化**：支持多币种的货币格式化
- 🔍 **错误处理**：完善的错误处理和验证机制
- 🚀 **批量处理**：支持数组的批量处理
- 📦 **模块化**：支持 CommonJS 和 ES Module

## 📦 安装

```bash
npm install safe-number-js
```

## 🚀 快速开始

```javascript
// 导入库
const SafeNumber = require("safe-number-js");

// 创建实例
const safeNumber = new SafeNumber({
  convertAll: false,
  decimalPlaces: 2,
  specialKeys: ["id", "userId"],
});

// 处理数据
const data = {
  id: "9007199254740993",
  price: 0.1 + 0.2,
  items: [{ id: "9007199254740994", amount: 99.999 }],
};

const result = safeNumber.handleResponse(data);
console.log(result);
```

## ⚙️ 配置选项

| 选项          | 类型     | 默认值                      | 描述                       |
| ------------- | -------- | --------------------------- | -------------------------- |
| convertAll    | boolean  | false                       | 是否将所有数字转换为字符串 |
| ignoreKeys    | string[] | []                          | 不需要处理的键名列表       |
| specialKeys   | string[] | ['id', 'userId', 'orderId'] | 需要特殊处理的键名列表     |
| decimalPlaces | number   | 2                           | 小数位数                   |

## 🌰 使用示例

### 1. 处理大数值

```javascript
const bigNumber = {
  id: 9007199254740992n,
};
safeNumber.handleResponse(bigNumber);
// 输出: { success: true, data: { id: "9007199254740992" } }
```

### 2. 处理浮点数精度

```javascript
const floatNumbers = {
  price: 0.1 + 0.2,
  amount: 10.345,
};
safeNumber.handleResponse(floatNumbers);
// 输出: { success: true, data: { price: 0.3, amount: 10.35 } }
```

### 3. 处理 API 响应

```javascript
const apiResponse = {
  code: 200,
  data: {
    userId: "9007199254740993",
    balance: 9007199254740992,
    items: [{ id: "9007199254740994", amount: 99.999 }],
  },
};
safeNumber.handleResponse(apiResponse);
```

### 4. 货币格式化

```javascript
const price = 1234.56;
safeNumber.formatCurrency(price); // ¥1,234.56
safeNumber.formatCurrency(price, "USD"); // $1,234.56
```

### 5. 自定义舍入

```javascript
const number = 10.345;
safeNumber.customRound(number, 2); // 10.35
safeNumber.customRound(number, 2, "floor"); // 10.34
safeNumber.customRound(number, 2, "ceil"); // 10.35
```

## 🔍 应用场景

- 金融系统：处理精确的金额计算
- 大数据处理：处理大数值 ID 和统计数据
- 电商平台：处理商品价格和订单金额
- API 集成：统一处理后端返回的数值数据

## 📝 许可证

本项目基于 MIT 许可证开源。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交改动：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📞 联系方式

- 作者：Casdoor Team
- Email：admin@casbin.org
- GitHub：https://github.com/casdoor

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

如果这个项目对你有帮助，请给它一个 ⭐️！
