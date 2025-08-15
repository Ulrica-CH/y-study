
# 📒 JavaScript 正则表达式笔记（由浅入深）

## 1. 基础概念

### 1.1 创建正则的两种方式

```js
// 字面量方式（常用，简单场景）
const reg1 = /abc/;

// 构造函数（动态生成时用）
const reg2 = new RegExp('abc', 'gi');
```

* **修饰符（flags）**

  * `g` 全局匹配
  * `i` 忽略大小写
  * `m` 多行匹配
  * `s` 允许 `.` 匹配换行符
  * `u` 支持 Unicode 码点
  * `y` 粘性匹配（从 `lastIndex` 位置开始匹配）

---

### 1.2 元字符（基础匹配符）

| 元字符  | 含义                  | 示例 |
| ---- | ------------------- | ---- |
| `.`  | 匹配除换行符以外的任意单个字符     | `/./.test('a')` → true |
| `\d` | 数字 `[0-9]`          | `/\d/.test('5')` → true |
| `\D` | 非数字                 | `/\D/.test('a')` → true |
| `\w` | 单词字符 `[A-Za-z0-9_]` | `/\w/.test('_')` → true |
| `\W` | 非单词字符               | `/\W/.test('@')` → true |
| `\s` | 空白字符（空格、制表符、换行等）    | `/\s/.test(' ')` → true |
| `\S` | 非空白字符               | `/\S/.test('a')` → true |

```js
// 特殊字符需要转义
/\$\.\+\*\?\[\]\(\)\{\}\|\^\\/.test('$'); // 匹配字面 $ 符号
```

---

### 1.3 量词（重复次数）

| 量词      | 含义       | 示例 |
| ------- | -------- | ---- |
| `*`     | 0 次或多次   | `/ab*/.test('a')` → true |
| `+`     | 1 次或多次   | `/ab+/.test('abbb')` → true |
| `?`     | 0 次或 1 次 | `/colou?r/.test('color')` → true |
| `{n}`   | 恰好 n 次   | `/\d{4}/.test('2025')` → true |
| `{n,}`  | 至少 n 次   | `/\d{2,}/.test('123')` → true |
| `{n,m}` | n 到 m 次  | `/\d{2,4}/.test('123')` → true |

```js
// 量词默认贪婪匹配
'<div>content</div>'.match(/<.*>/)[0]; // '<div>content</div>'

// 添加 ? 变为惰性匹配  
'<div>content</div>'.match(/<.*?>/)[0]; // '<div>'
```

---

### 1.4 边界符

| 符号   | 含义    | 示例 |
| ---- | ----- | ---- |
| `^`  | 行首匹配  | `/^abc/.test('abc123')` → true |
| `$`  | 行尾匹配  | `/123$/.test('abc123')` → true |
| `\b` | 单词边界  | `/\bcat\b/.test('cat dog')` → true |
| `\B` | 非单词边界 | `/\Bcat\B/.test('locate')` → true |

```js
// 单词边界实用例子
'javascript java'.replace(/\bjava\b/g, 'JS'); // "JS java"
'javascript java'.replace(/\Bjava/g, 'JS');   // "JSscript java"
```

---

### 1.5 分组与选择

```js
// 选择符 |
/(abc|def)/.test('def'); // true

// 分组重复
/(ab){3}/.test('ababab'); // true

// 捕获组 vs 非捕获组
'2025-08-14'.match(/(\d{4})-(\d{2})-(\d{2})/);
// ['2025-08-14', '2025', '08', '14']

'2025-08-14'.match(/(?:\d{4})-(\d{2})-(\d{2})/);
// ['2025-08-14', '08', '14'] - 第一个分组不捕获
```

### 1.6 字符类

```js
// 字符集合
/[abc]/.test('b');     // true
/[^abc]/.test('d');    // true（取反）
/[a-z]/.test('m');     // true（范围）
/[0-9a-fA-F]/.test('F'); // true（十六进制字符）

// 常见字符类
/[.,!?;]/.test('!');   // 标点符号
/[\u4e00-\u9fa5]/.test('中'); // 中文字符
```

---

## 2. 常用技巧（前端场景）

### 2.1 表单验证系列

#### 手机号（中国）

```js
// 基础版
/^1[3-9]\d{9}$/

// 严格版（支持最新号段）
/^1[3-9]\d{9}$|^1[3-9]\d{9}$/

function validatePhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}
```

#### 邮箱验证

```js
// 简单版
/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/

// 更严格版
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 实用函数
function validateEmail(email) {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
}
```

#### 身份证号

```js
// 18位身份证（含校验位）
/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// 15位或18位兼容版
/^(\d{15}|\d{17}[\dXx])$/
```

#### 密码强度

```js
function checkPasswordStrength(pwd) {
  const checks = {
    length: pwd.length >= 8,
    lowercase: /[a-z]/.test(pwd),
    uppercase: /[A-Z]/.test(pwd),
    number: /\d/.test(pwd),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  return { score, checks };
}
```

### 2.2 字符串处理

#### 提取 URL 参数

```js
function getUrlParams(url) {
  const params = {};
  const reg = /[?&]([^=]+)=([^&]*)/g;
  let match;
  
  while ((match = reg.exec(url)) !== null) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }
  
  return params;
}

// 使用示例
getUrlParams('https://test.com?name=张三&age=18');
// { name: '张三', age: '18' }
```

#### 驼峰与短横线转换

```js
// 驼峰转短横线
function camelToKebab(str) {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

// 短横线转驼峰
function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
```

#### 千分位分隔符

```js
function addCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

addCommas(1234567); // "1,234,567"
```

### 2.3 内容处理

#### 匹配并替换 HTML 标签

```js
// 移除所有HTML标签
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}

// 只保留特定标签
function keepTags(html, allowedTags = ['b', 'i', 'em', 'strong']) {
  const tagPattern = new RegExp(`<(?!/?(?:${allowedTags.join('|')})\\b)[^>]*>`, 'gi');
  return html.replace(tagPattern, '');
}
```

#### 提取和验证颜色值

```js
// 十六进制颜色
const hexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// RGB/RGBA
const rgbColor = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([01]?\.?\d*))?\s*\)$/;

function validateColor(color) {
  return hexColor.test(color) || rgbColor.test(color);
}
```

---

## 3. 进阶正则技巧

### 3.1 贪婪与懒惰匹配

```js
const html = '<div>第一个</div><div>第二个</div>';

// 贪婪匹配 - 匹配最长的
html.match(/<div>.*<\/div>/)[0]; 
// '<div>第一个</div><div>第二个</div>'

// 懒惰匹配 - 匹配最短的
html.match(/<div>.*?<\/div>/g); 
// ['<div>第一个</div>', '<div>第二个</div>']

// 常见场景：提取引号内容
const str = '"hello" and "world"';
str.match(/".*"/g);   // ['"hello" and "world"'] - 贪婪
str.match(/".*?"/g);  // ['"hello"', '"world"'] - 懒惰 ✅
```

### 3.2 零宽断言（Lookaround）

#### 先行断言（前瞻）

```js
// 正向先行断言 (?=...)
'password123'.match(/\w+(?=\d)/);     // ['password'] - 后面有数字的单词
'user@email.com'.match(/\w+(?=@)/);   // ['user'] - @符号前的用户名

// 负向先行断言 (?!...)
'file.txt'.match(/\w+(?!\.txt)/);     // null - 不匹配.txt前的单词
'file.pdf'.match(/\w+(?!\.txt)/);     // ['file'] - 匹配非.txt前的单词
```

#### 后行断言（后顾）

```js
// 正向后行断言 (?<=...)
'$100 €200'.match(/(?<=\$)\d+/);      // ['100'] - $符号后的数字
'prefix_content'.match(/(?<=_)\w+/);  // ['content'] - 下划线后的内容

// 负向后行断言 (?<!...)
'abc123def456'.match(/(?<![a-z])\d+/); // ['456'] - 前面不是字母的数字
```

#### 实用案例：密码验证

```js
// 至少包含一个数字且一个大写字母的8位密码
const strongPwd = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
strongPwd.test('Password1'); // true
strongPwd.test('password1'); // false（没有大写字母）
```

### 3.3 命名捕获组（ES2018+）

```js
// 基础语法
const dateReg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = '2025-08-14'.match(dateReg);

console.log(match.groups.year);  // '2025'
console.log(match.groups.month); // '08'
console.log(match.groups.day);   // '14'

// 在替换中使用
'2025-08-14'.replace(dateReg, '$<day>/$<month>/$<year>');
// '14/08/2025'

// 解构赋值
const { year, month, day } = '2025-08-14'.match(dateReg).groups;
```

### 3.4 Unicode 与国际化

```js
// Unicode 属性类（需要 u 标志）
/\p{Script=Han}/u.test('中');          // true - 中文字符
/\p{Script=Cyrillic}/u.test('я');      // true - 西里尔字符
/\p{Category=Number}/u.test('5');      // true - 数字类别
/\p{Emoji}/u.test('😀');               // true - emoji

// 实用场景：验证用户名（支持中文）
const usernameReg = /^[\p{L}\p{N}_-]{2,20}$/u;
usernameReg.test('张三_123');  // true
usernameReg.test('user-name'); // true

// 匹配所有文字字符（不限语言）
const textReg = /\p{Letter}+/gu;
'Hello 世界 мир'.match(textReg); // ['Hello', '世界', 'мир']
```

### 3.5 动态构建正则表达式

```js
// 转义特殊字符
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 动态关键词高亮
function highlightKeywords(text, keywords) {
  const escapedKeywords = keywords.map(escapeRegExp);
  const reg = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
  return text.replace(reg, '<mark>$1</mark>');
}

// 动态域名验证
function createDomainRegex(allowedDomains) {
  const escaped = allowedDomains.map(escapeRegExp);
  return new RegExp(`@(${escaped.join('|')})$`, 'i');
}

const emailRegex = createDomainRegex(['gmail.com', 'qq.com']);
emailRegex.test('user@gmail.com'); // true
```

### 3.6 粘性标志（y）与性能优化

```js
// 粘性匹配 - 从 lastIndex 位置精确匹配
const reg = /\d+/y;
const str = '123abc456';

reg.lastIndex = 0;
console.log(reg.exec(str)); // ['123']
console.log(reg.lastIndex); // 3

reg.lastIndex = 3;
console.log(reg.exec(str)); // null（位置3是字母，不匹配）

reg.lastIndex = 6;
console.log(reg.exec(str)); // ['456']

// 实用场景：高性能解析
function parseNumbers(str) {
  const reg = /\d+/y;
  const numbers = [];
  let pos = 0;
  
  while (pos < str.length) {
    if (str[pos] === ' ') {
      pos++;
      continue;
    }
    
    reg.lastIndex = pos;
    const match = reg.exec(str);
    
    if (match) {
      numbers.push(parseInt(match[0]));
      pos = reg.lastIndex;
    } else {
      pos++;
    }
  }
  
  return numbers;
}
```

---

## 4. 实战案例

### 4.1 表单输入控制

#### 实时输入限制

```js
// 只允许数字和小数点
function numericInput(input) {
  input.addEventListener('input', e => {
    // 移除非数字字符，但保留一个小数点
    let value = e.target.value.replace(/[^\d.]/g, '');
    
    // 确保只有一个小数点
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // 限制小数位数
    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].slice(0, 2);
    }
    
    e.target.value = value;
  });
}

// 中文姓名输入（只允许中文字符）
function chineseNameInput(input) {
  input.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^\u4e00-\u9fa5]/g, '');
  });
}

// 银行卡号格式化（4位一组）
function formatBankCard(input) {
  input.addEventListener('input', e => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^\d]/g, '');
    let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    if (formattedValue.length > 23) { // 限制最大长度
      formattedValue = formattedValue.slice(0, 23);
    }
    
    e.target.value = formattedValue;
  });
}
```

### 4.2 内容搜索与高亮

#### 智能搜索高亮

```js
function smartHighlight(text, keyword, options = {}) {
  const {
    caseSensitive = false,
    wholeWord = false,
    highlightClass = 'highlight'
  } = options;
  
  if (!keyword.trim()) return text;
  
  // 转义特殊字符
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // 构建正则
  let pattern = escapedKeyword;
  if (wholeWord) pattern = `\\b${pattern}\\b`;
  
  const flags = caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(`(${pattern})`, flags);
  
  return text.replace(regex, `<span class="${highlightClass}">$1</span>`);
}

// 使用示例
const text = 'JavaScript is a great programming language';
console.log(smartHighlight(text, 'script', { wholeWord: false }));
// Java<span class="highlight">Script</span> is a great programming language
```

#### 模糊搜索

```js
function fuzzySearch(list, query) {
  if (!query) return list;
  
  // 将搜索词转换为模糊匹配模式
  const fuzzyPattern = query
    .split('')
    .map(char => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('.*?');
  
  const regex = new RegExp(fuzzyPattern, 'i');
  
  return list.filter(item => regex.test(item));
}

// 使用示例
const cities = ['北京', '上海', '广州', '深圳', '杭州'];
console.log(fuzzySearch(cities, '广深')); // ['广州', '深圳']
```

### 4.3 数据清洗与验证

#### 清理用户输入

```js
class DataCleaner {
  // 清理HTML标签
  static stripHtml(str) {
    return str.replace(/<[^>]*>/g, '');
  }
  
  // 清理多余空白
  static normalizeWhitespace(str) {
    return str.replace(/\s+/g, ' ').trim();
  }
  
  // 清理特殊字符（保留中英文数字）
  static cleanSpecialChars(str) {
    return str.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, '');
  }
  
  // 手机号格式化
  static formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return phone;
  }
  
  // 身份证格式化（隐藏中间部分）
  static maskIdCard(idCard) {
    return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2');
  }
}
```

### 4.4 URL 和路由处理

#### URL 参数解析增强版

```js
class URLHelper {
  // 解析URL参数
  static parseQuery(url = window.location.href) {
    const params = new Map();
    const queryString = url.split('?')[1];
    
    if (!queryString) return params;
    
    // 支持数组参数和重复参数
    queryString.split('&').forEach(pair => {
      const [key, value = ''] = pair.split('=').map(decodeURIComponent);
      
      if (params.has(key)) {
        const existing = params.get(key);
        params.set(key, Array.isArray(existing) ? 
          [...existing, value] : [existing, value]);
      } else {
        params.set(key, value);
      }
    });
    
    return params;
  }
  
  // 构建查询字符串
  static buildQuery(params) {
    const pairs = [];
    
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach(v => pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`));
      } else {
        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
    
    return pairs.join('&');
  }
  
  // 提取域名
  static extractDomain(url) {
    const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/\?]+)/i);
    return match ? match[1] : null;
  }
  
  // 验证URL格式
  static validateURL(url) {
    const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return urlPattern.test(url);
  }
}
```

### 4.5 文本处理工具

#### 智能文本分析

```js
class TextAnalyzer {
  // 提取邮箱地址
  static extractEmails(text) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    return text.match(emailRegex) || [];
  }
  
  // 提取手机号
  static extractPhones(text) {
    const phoneRegex = /1[3-9]\d{9}/g;
    return text.match(phoneRegex) || [];
  }
  
  // 提取URL
  static extractUrls(text) {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    return text.match(urlRegex) || [];
  }
  
  // 提取@提及
  static extractMentions(text) {
    const mentionRegex = /@([a-zA-Z0-9_\u4e00-\u9fa5]+)/g;
    const mentions = [];
    let match;
    
    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push(match[1]);
    }
    
    return mentions;
  }
  
  // 提取话题标签
  static extractHashtags(text) {
    const hashtagRegex = /#([a-zA-Z0-9_\u4e00-\u9fa5]+)/g;
    const hashtags = [];
    let match;
    
    while ((match = hashtagRegex.exec(text)) !== null) {
      hashtags.push(match[1]);
    }
    
    return hashtags;
  }
  
  // 统计文字信息
  static analyze(text) {
    return {
      characters: text.length,
      words: text.split(/\s+/).filter(word => word.length > 0).length,
      lines: text.split('\n').length,
      emails: this.extractEmails(text).length,
      phones: this.extractPhones(text).length,
      urls: this.extractUrls(text).length,
      mentions: this.extractMentions(text).length,
      hashtags: this.extractHashtags(text).length
    };
  }
}
```

---

## 5. 面试高频考点

### 5.1 核心概念考察

#### Q1: 贪婪与惰性匹配的区别？

```js
// 题目：如何匹配HTML标签内的内容？
const html = '<div>内容1</div><span>内容2</span>';

// ❌ 贪婪匹配 - 会匹配到最后一个标签
html.match(/<.*>/)[0]; // '<div>内容1</div><span>内容2</span>'

// ✅ 惰性匹配 - 尽可能少匹配
html.match(/<.*?>/g); // ['<div>', '</div>', '<span>', '</span>']

// ✅ 更好的方案 - 明确指定不包含 >
html.match(/<[^>]*>/g); // 同上，但性能更好
```

#### Q2: 全局匹配的 `lastIndex` 陷阱

```js
const regex = /\d/g;
console.log(regex.test('a1b')); // true，lastIndex = 2
console.log(regex.test('a1b')); // false，从位置2开始找

// 解决方案：每次使用前重置
regex.lastIndex = 0;
```

#### Q3: 捕获组与非捕获组的性能差异

```js
// 性能测试
const text = 'a'.repeat(10000);

// 捕获组 - 需要保存匹配结果
console.time('capture');
/((a)+)+/.test(text + 'b');
console.timeEnd('capture');

// 非捕获组 - 不保存匹配结果
console.time('non-capture');
/(?:(?:a)+)+/.test(text + 'b');
console.timeEnd('non-capture'); // 通常更快
```

### 5.2 实战应用考察

#### Q4: 手写一个 trim 函数

```js
function myTrim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

// 进阶版：只去掉空格
function trimSpaces(str) {
  return str.replace(/^ +| +$/g, '');
}
```

#### Q5: 如何验证强密码？

```js
// 要求：至少8位，包含大小写字母、数字、特殊字符
function validateStrongPassword(pwd) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(pwd);
}

// 分步验证（更好调试）
function validatePasswordStep(pwd) {
  const checks = {
    minLength: pwd.length >= 8,
    hasLower: /[a-z]/.test(pwd),
    hasUpper: /[A-Z]/.test(pwd),
    hasNumber: /\d/.test(pwd),
    hasSpecial: /[!@#$%^&*]/.test(pwd)
  };
  
  return Object.values(checks).every(Boolean);
}
```

#### Q6: 如何实现模板字符串替换？

```js
function template(str, data) {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

// 使用
template('Hello {{name}}, you are {{age}} years old', {
  name: 'Alice',
  age: 25
}); // "Hello Alice, you are 25 years old"
```

### 5.3 性能与陷阱考察

#### Q7: 正则表达式回溯陷阱

```js
// ❌ 危险的回溯 - 可能导致页面卡死
const dangerous = /(a+)+$/;
dangerous.test('a'.repeat(30) + 'b'); // 可能超时

// ✅ 避免回溯的写法
const safe = /^a+$/;
safe.test('a'.repeat(30)); // 快速返回

// ✅ 使用原子组概念（JS中用边界模拟）
const atomic = /^(a+)b$/;
```

#### Q8: 如何优化大量文本的正则匹配？

```js
// ❌ 低效：每次都编译正则
function highlightKeywords(text, keywords) {
  keywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi'); // 每次都编译
    text = text.replace(regex, `<mark>${keyword}</mark>`);
  });
  return text;
}

// ✅ 高效：预编译正则
function highlightKeywordsOptimized(text, keywords) {
  const escapedKeywords = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
```

### 5.4 边界情况考察

#### Q9: 如何正确匹配中文字符？

```js
// ❌ 不完整
/[\u4e00-\u9fa5]/

// ✅ 完整的中文字符范围
/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/

// ✅ 使用 Unicode 属性（现代浏览器）
/\p{Script=Han}/u
```

#### Q10: 邮箱验证的边界情况

```js
// 简单版（面试够用）
const emailSimple = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 复杂版（考虑更多边界情况）
const emailComplex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// 实际项目中推荐
function validateEmail(email) {
  // 基础格式检查
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return false;
  }
  
  // 长度检查
  if (email.length > 254) {
    return false;
  }
  
  // 本地部分长度检查
  const [local] = email.split('@');
  if (local.length > 64) {
    return false;
  }
  
  return true;
}
```

### 5.5 JavaScript API 考察

#### Q11: `match()` vs `exec()` vs `test()` 的区别？

```js
const text = 'abc123def456';
const regex = /\d+/g;

// match() - 返回所有匹配（全局模式下）
console.log(text.match(regex)); // ['123', '456']

// exec() - 逐个返回匹配，需要循环
let match;
while ((match = regex.exec(text)) !== null) {
  console.log(match[0], match.index); // '123' 3, '456' 9
}

// test() - 只返回布尔值，但会改变 lastIndex
console.log(regex.test(text)); // true，lastIndex = 6
console.log(regex.test(text)); // true，lastIndex = 12
console.log(regex.test(text)); // false，lastIndex = 0
```

#### Q12: `replace()` 的高级用法

```js
// 使用函数作为替换值
'hello world'.replace(/\b\w/g, match => match.toUpperCase()); // "Hello World"

// 使用特殊变量
'2025-08-14'.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1'); // "14/08/2025"

// 命名捕获组替换
'2025-08-14'.replace(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
  '$<day>/$<month>/$<year>'
); // "14/08/2025"
```

---

## 6. 速查表

### 6.1 常用验证正则

| 类型 | 正则表达式 | 说明 |
|------|-----------|------|
| 手机号 | `/^1[3-9]\d{9}$/` | 11位，1开头，第二位3-9 |
| 邮箱 | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | 基础邮箱格式 |
| 身份证 | `/^[1-9]\d{5}(18\|19\|20)\d{2}((0[1-9])\|(1[0-2]))(([0-2][1-9])\|10\|20\|30\|31)\d{3}[0-9Xx]$/` | 18位身份证 |
| URL | `/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/` | HTTP/HTTPS URL |
| IP地址 | `/^((25[0-5]\|2[0-4]\d\|[01]?\d\d?)\.){3}(25[0-5]\|2[0-4]\d\|[01]?\d\d?)$/` | IPv4地址 |
| 中文 | `/^[\u4e00-\u9fa5]+$/` | 纯中文字符 |
| 英文 | `/^[A-Za-z]+$/` | 纯英文字母 |
| 数字 | `/^\d+$/` | 纯数字 |
| 日期 | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | YYYY-MM-DD格式 |
| 时间 | `/^([01]?\d\|2[0-3]):[0-5]\d:[0-5]\d$/` | HH:MM:SS格式 |

### 6.2 元字符速查

| 字符 | 含义 | 示例 |
|------|------|------|
| `.` | 任意字符（除换行） | `/a.c/` 匹配 `abc` |
| `*` | 0次或多次 | `/ab*/` 匹配 `a`, `ab`, `abb` |
| `+` | 1次或多次 | `/ab+/` 匹配 `ab`, `abb` |
| `?` | 0次或1次 | `/ab?/` 匹配 `a`, `ab` |
| `^` | 行首 | `/^a/` 匹配行首的 `a` |
| `$` | 行尾 | `/a$/` 匹配行尾的 `a` |
| `\b` | 单词边界 | `/\bcat\b/` 匹配单独的 `cat` |
| `\d` | 数字 `[0-9]` | `/\d+/` 匹配数字 |
| `\w` | 单词字符 `[A-Za-z0-9_]` | `/\w+/` 匹配单词 |
| `\s` | 空白字符 | `/\s+/` 匹配空白 |

### 6.3 标志位速查

| 标志 | 含义 | 示例 |
|------|------|------|
| `g` | 全局匹配 | `/a/g` 匹配所有 `a` |
| `i` | 忽略大小写 | `/a/i` 匹配 `a` 和 `A` |
| `m` | 多行模式 | `/^a/m` 匹配每行开头的 `a` |
| `s` | dotAll模式 | `/./s` 匹配包括换行的所有字符 |
| `u` | Unicode模式 | `/\p{Script=Han}/u` 匹配中文 |
| `y` | 粘性匹配 | 从 `lastIndex` 精确匹配 |

### 6.4 字符类速查

| 表达式 | 含义 | 等价 |
|--------|------|------|
| `[abc]` | a或b或c | 无 |
| `[^abc]` | 除了a、b、c之外 | 无 |
| `[a-z]` | 小写字母 | 无 |
| `[A-Z]` | 大写字母 | 无 |
| `[0-9]` | 数字 | `\d` |
| `[a-zA-Z0-9_]` | 单词字符 | `\w` |
| `[\s\S]` | 任意字符（包括换行） | `/./s` |

### 6.5 断言速查

| 断言 | 含义 | 示例 |
|------|------|------|
| `(?=...)` | 正向先行断言 | `/\w+(?=\d)/` 后面有数字的单词 |
| `(?!...)` | 负向先行断言 | `/\w+(?!\d)/` 后面没数字的单词 |
| `(?<=...)` | 正向后行断言 | `/(?<=\$)\d+/` 前面有$的数字 |
| `(?<!...)` | 负向后行断言 | `/(?<!\$)\d+/` 前面没$的数字 |

### 6.6 JavaScript 方法速查

| 方法 | 返回值 | 用途 |
|------|--------|------|
| `regex.test(str)` | Boolean | 测试是否匹配 |
| `regex.exec(str)` | Array/null | 获取匹配详情 |
| `str.match(regex)` | Array/null | 获取匹配结果 |
| `str.matchAll(regex)` | Iterator | 获取所有匹配（需要g标志） |
| `str.replace(regex, replacement)` | String | 替换匹配内容 |
| `str.replaceAll(regex, replacement)` | String | 替换所有匹配（需要g标志） |
| `str.search(regex)` | Number | 查找匹配位置 |
| `str.split(regex)` | Array | 按正则分割字符串 |

### 6.7 性能优化提示

1. **预编译正则**：频繁使用的正则应该预先编译
2. **使用非捕获组**：不需要捕获时用 `(?:...)` 而不是 `(...)`
3. **避免回溯**：小心嵌套量词如 `(a+)+`
4. **具体字符类**：用 `[0-9]` 而不是 `\d`（在某些情况下）
5. **边界限制**：使用 `^` 和 `$` 明确边界
6. **重置 lastIndex**：全局正则复用前要重置

### 6.8 常见陷阱

```js
// ❌ 全局正则的 lastIndex 陷阱
const regex = /\d/g;
regex.test('a1'); // true
regex.test('a1'); // false（lastIndex 影响）

// ❌ 贪婪匹配陷阱
'<div>a</div><div>b</div>'.match(/<.*>/)[0]; // 匹配整个字符串

// ❌ 点号不匹配换行
/a.b/.test('a\nb'); // false

// ❌ 忘记转义特殊字符
const keyword = 'a+b';
new RegExp(keyword); // 错误：a+ 被解释为量词

// ✅ 正确的做法
keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 转义特殊字符
```

---

## 7. 总结

正则表达式是前端开发中不可或缺的工具，掌握以下几点对面试和实际工作都很重要：

1. **基础语法**：元字符、量词、边界符的准确使用
2. **高级特性**：断言、命名捕获组、Unicode 支持
3. **性能意识**：避免回溯陷阱，合理使用标志位
4. **实战应用**：表单验证、文本处理、数据清洗
5. **调试技巧**：理解 `lastIndex`、选择合适的 API

**面试建议**：

* 能手写常见验证正则（手机号、邮箱等）
* 理解贪婪与惰性匹配的区别
* 知道正则性能陷阱及避免方法  
* 能解释 JavaScript 中各个正则 API 的差异
* 掌握动态构建正则的安全做法

这份笔记涵盖了从基础到高级的所有重要知识点，既适合学习积累，也适合面试前快速复习。
