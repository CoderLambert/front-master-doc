# React学习中心 - 详细设计文档

## 📦 核心组件API设计

### 1. CodePlayground 组件（完整版）

#### 组件概述
基于 `@codesandbox/sandpack-react` 的完整代码编辑器，支持多文件编辑、实时预览、代码保存。

#### API 设计

```typescript
interface CodePlaygroundProps {
  // 文件配置
  files: Record<string, string>;
  entry?: string;

  // 主题配置
  theme?: 'light' | 'dark' | 'auto';
  customTheme?: SandpackTheme;

  // 行为配置
  showConsole?: boolean;
  showTabs?: boolean;
  showLineNumbers?: boolean;
  showRefreshButton?: boolean;
  readOnly?: boolean;

  // 编辑器配置
  editorHeight?: number;
  editorWidthPercentage?: number;

  // 高级配置
  options?: SandpackConfig;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;

  // 事件回调
  onCodeChange?: (code: string, path: string) => void;
  onConsoleMessage?: (message: ConsoleMessage) => void;
  onError?: (error: Error) => void;
}
```

#### 使用示例

```jsx
// 基础使用
<CodePlayground
  files={{
    '/App.js': `
import React from 'react';

export default function App() {
  return <h1>Hello React!</h1>;
}
`,
    '/index.js': `
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
`
  }}
  entry="/index.js"
  theme="auto"
  showConsole={true}
  onCodeChange={(code, path) => {
    console.log(`${path} changed:`, code);
  }}
/>

// 高级配置示例
<CodePlayground
  files={{...}}
  options={{
    recompileMode: 'delayed',
    recompileDelay: 500,
    editorHeight: 500,
    wrapContent: true,
    editorWidthPercentage: 55,
    showTabs: true,
    showLineNumbers: true,
    closableTabs: false,
  }}
  dependencies={{
    'lodash': '4.17.21',
    'axios': '^1.3.0'
  }}
/>
```

#### 主题自定义

```javascript
// 自定义主题配置
const customLightTheme = {
  colors: {
    surface1: '#ffffff',
    surface2: '#f6f9fc',
    surface3: '#eef2f7',
    accent: '#0969da',
    error: '#d1242f',
    success: '#1a7f37'
  },
  syntax: {
    plain: '#24292f',
    comment: '#656d76',
    keyword: '#cf222e',
    string: '#0a3069',
    number: '#953800',
    boolean: '#cf222e'
  }
};
```

---

### 2. LiveCode 组件（轻量版）

#### 组件概述
基于 `react-live` 的轻量级实时代码预览，适合小代码片段的快速演示。

#### API 设计

```typescript
interface LiveCodeProps {
  // 代码内容
  code: string;
  scope?: Record<string, any>;

  // UI配置
  showEditor?: boolean;
  showPreview?: boolean;
  showError?: boolean;
  language?: 'jsx' | 'javascript' | 'typescript';

  // 主题
  theme?: 'light' | 'dark';

  // 行为
  noInline?: boolean;
  transformCode?: (code: string) => string;

  // 事件
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}
```

#### 使用示例

```jsx
// 基础使用 - useState示例
<LiveCode
  code={`
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ padding: '20px' }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
`}
  scope={{ React }}
/>

// 高级配置
<LiveCode
  code={code}
  scope={{ React, useState, useEffect, MyComponent }}
  theme="dark"
  showEditor={true}
  showPreview={true}
  showError={true}
  transformCode={(code) => {
    // 自动添加React导入
    return code.includes('import')
      ? code
      : `import React from 'react';\n${code}`;
  }}
/>
```

---

### 3. LearningPath 组件

#### 组件概述
可视化学习路径展示，显示技能树和学习进度。

#### API 设计

```typescript
interface LearningPathNode {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string; // '30min', '1h', '2h'
  prerequisites?: string[]; // 前置节点ID
  path: string; // 文档路径
  completed?: boolean;
  locked?: boolean;
}

interface LearningPathProps {
  nodes: LearningPathNode[];
  onNodeClick?: (node: LearningPathNode) => void;
  onNodeComplete?: (nodeId: string) => void;
  initialExpanded?: string[];
  showProgress?: boolean;
  layout?: 'vertical' | 'horizontal' | 'grid';
}
```

#### 使用示例

```jsx
// 基础学习路径
const hooksPath = [
  {
    id: 'useState',
    title: 'useState Hook',
    description: '学习状态管理基础',
    level: 'beginner' as const,
    estimatedTime: '45min',
    path: '/docs/hooks/basics/useState',
    completed: false,
    locked: false
  },
  {
    id: 'useEffect',
    title: 'useEffect Hook',
    description: '学习副作用处理',
    level: 'beginner' as const,
    estimatedTime: '60min',
    prerequisites: ['useState'],
    path: '/docs/hooks/basics/useEffect',
    completed: false,
    locked: false
  }
];

<LearningPath
  nodes={hooksPath}
  onNodeClick={(node) => navigate(node.path)}
  layout="vertical"
  showProgress={true}
/>
```

---

### 4. CopyButton 组件

#### API 设计

```typescript
interface CopyButtonProps {
  code: string;
  fileName?: string;
  showIcon?: boolean;
  showText?: boolean;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  onCopy?: (success: boolean) => void;
}
```

#### 使用示例

```jsx
<CopyButton
  code={sampleCode}
  fileName="App.js"
  showIcon={true}
  showText={true}
  tooltipPosition="top"
  onCopy={(success) => {
    if (success) {
      toast.success('代码已复制到剪贴板');
    }
  }}
/>
```

---

## 📚 学习路径详细内容规划

### 模块1: 基础入门 (Foundations)

#### 1.1 什么是React？ (What is React)

**文档路径**: `docs/foundations/what-is-react.mdx`
**预估时长**: 30分钟
**难度**: 初级

**内容大纲**:
```markdown
# 什么是React？

## 本章学习目标
- 理解React的核心概念
- 了解React的历史和设计哲学
- 掌握React的优势和适用场景
- 搭建第一个React应用

## 1. React简介
- React是由Facebook（现Meta）开发的前端框架
- 2011年首次应用于Facebook News Feed
- 2013年开源发布
- 当前版本：React 19（2025年）

## 2. 核心概念
- 组件化开发
- 声明式编程
- 虚拟DOM
- 单向数据流

## 3. React的优势
- 组件复用性
- 开发效率
- 生态系统
- 社区支持
- 性能优化

## 4. React vs 其他框架
- vs Vue.js
- vs Angular
- vs 原生JavaScript

## 交互式演示1：Hello React
<CodePlayground
  files={{
    '/App.js': `
import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Hello React!</h1>
      <p>Welcome to your first React component.</p>
    </div>
  );
}

export default App;
    `
  }}
/>

## 交互式演示2：组件化思维
<CodePlayground
  files={{
    '/components/Welcome.js': `
import React from 'react';

function Welcome({ name, age }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}

export default Welcome;
    `,
    '/App.js': `
import React from 'react';
import Welcome from './components/Welcome';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Welcome name="Alice" age={25} />
      <Welcome name="Bob" age={30} />
    </div>
  );
}

export default App;
    `
  }}
/>

## 实践练习
### 练习1：创建你的第一个组件
使用Sandbox编辑器，创建一个PersonalCard组件，显示姓名、职业和爱好。

### 练习2：组件复用
修改PersonalCard组件，使其可以显示多个人的信息。

## 本章小结
- React是用于构建用户界面的JavaScript库
- 组件是React的核心概念
- React支持组件复用和模块化开发

## 延伸阅读
- [React官方文档](https://react.dev)
- [React历史](https://reactjs.org/blog/2013/06/05/why-react.html)

## 下一章
[JSX语法详解 →](jsx-syntax)
```

---

#### 1.2 JSX语法详解 (JSX Syntax)

**文档路径**: `docs/foundations/jsx-syntax.mdx`
**预估时长**: 45分钟
**难度**: 初级

**内容大纲**:
```markdown
# JSX语法详解

## 本章学习目标
- 理解JSX的作用和优势
- 掌握JSX语法规则
- 学会在JSX中嵌入表达式
- 掌握条件渲染和列表渲染
- 理解JSX的工作原理

## 1. 什么是JSX？
JSX是一种JavaScript的语法扩展，允许在JavaScript中编写类似HTML的代码。

### JSX示例
```jsx
const element = <h1>Hello, world!</h1>;
```

## 2. JSX基础语法

### 2.1 标签闭合
```jsx
// 自闭合
<img src="logo.png" alt="Logo" />

// 配对闭合
<div>
  <h1>Title</h1>
  <p>Paragraph</p>
</div>
```

### 2.2 嵌套规则
- 只能有一个根元素
- 使用Fragment(<></>)避免额外div

## 3. 嵌入表达式

### 3.1 基本用法
<LiveCode
  code={`
function App() {
  const name = 'Alice';
  const age = 25;

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      <p>Next year you will be {age + 1}</p>
    </div>
  );
}
`}
/>

### 3.2 复杂表达式
<LiveCode
  code={`
function App() {
  const isLoggedIn = true;
  const user = { name: 'Bob', role: 'Admin' };

  return (
    <div>
      {isLoggedIn ? <p>Welcome back, {user.name}!</p> : <p>Please log in</p>}
      {user.role === 'Admin' && <button>Delete</button>}
    </div>
  );
}
`}
/>

## 4. 属性和Props

### 4.1 字符串常量
```jsx
<MyComponent message="Hello" />
```

### 4.2 JavaScript表达式
```jsx
<MyComponent message={variable} />
<MyComponent count={10 + 20} />
<MyComponent isActive={true} />
```

### 4.3 特殊属性
- `className` instead of `class`
- `htmlFor` instead of `for`
- `onClick` for click events
- `style` accepts objects

### 4.4 展开属性
```jsx
const props = { message: 'Hello', count: 5 };
<MyComponent {...props} />
```

## 5. 条件渲染

### 5.1 if语句
<LiveCode
  code={`
function App({ user }) {
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
    </div>
  );
}
`}
/>

### 5.2 三元运算符
<LiveCode
  code={`
function App({ isAdmin }) {
  return (
    <div>
      {isAdmin ? <AdminPanel /> : <UserPanel />}
    </div>
  );
}
`}
/>

### 5.3 逻辑与运算符
<LiveCode
  code={`
function App({ notifications }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {notifications.length > 0 && (
        <div className="notifications">
          You have {notifications.length} new notifications
        </div>
      )}
    </div>
  );
}
`}
/>

## 6. 列表渲染

### 6.1 使用map方法
<LiveCode
  code={`
function App() {
  const items = ['Apple', 'Banana', 'Cherry'];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
`}
/>

### 6.2 对象数组
<LiveCode
  code={`
function App() {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];

  return (
    <div>
      {users.map(user => (
        <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
`}
/>

## 7. 事件处理

### 7.1 基础事件
<LiveCode
  code={`
function App() {
  function handleClick() {
    alert('Button clicked!');
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
`}
/>

### 7.2 事件参数
<LiveCode
  code={`
function App() {
  function handleItemClick(item) {
    alert(\`Clicked: \${item}\`);
  }

  const items = ['React', 'Vue', 'Angular'];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => handleItemClick(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
}
`}
/>

## 8. 样式处理

### 8.1 内联样式
<LiveCode
  code={`
function App() {
  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <button style={buttonStyle}>
      Styled Button
    </button>
  );
}
`}
/>

### 8.2 className
```jsx
function App() {
  return (
    <div className="container">
      <h1 className="title">Hello</h1>
    </div>
  );
}
```

## 实践练习

### 练习1：个人信息卡片
创建一个ProfileCard组件，显示姓名、年龄、职业，并使用不同的条件渲染。

### 练习2：待办事项列表
创建一个TodoList组件，支持添加、显示、标记完成功能。

### 练习3：购物车
创建一个ShoppingCart组件，显示商品列表、数量、价格和总价。

## 常见错误

### 1. 未使用key属性
```jsx
// ❌ 错误
{items.map(item => <div>{item}</div>)}

// ✅ 正确
{items.map(item => <div key={item.id}>{item}</div>)}
```

### 2. 未闭合标签
```jsx
// ❌ 错误
<img src="image.png">

// ✅ 正确
<img src="image.png" />
```

### 3. 错误使用class
```jsx
// ❌ 错误
<div class="container">

// ✅ 正确
<div className="container">
```

## JSX工作原理

JSX不是合法的JavaScript语法，它需要被转译。React使用Babel或TypeScript编译器将JSX转换为`React.createElement()`调用。

```jsx
// JSX
const element = <h1 className="greeting">Hello, world!</h1>;

// 转译后
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

## 本章小结
- JSX是JavaScript的语法扩展
- 在JSX中可以使用{}嵌入表达式
- 使用map渲染列表时必须提供key属性
- 事件处理使用onClick等驼峰命名属性
- 样式可以使用内联对象或className

## 延伸阅读
- [JSX规范](https://facebook.github.io/jsx/)
- [React事件处理](https://react.dev/reference/react-dom/components/common)

## 下一章
[组件与Props →](components-props)
```

---

#### 1.3 组件与Props (Components & Props)

**文档路径**: `docs/foundations/components-props.mdx`
**预估时长**: 60分钟
**难度**: 初级

**内容大纲**:
```markdown
# 组件与Props

## 本章学习目标
- 理解React组件的概念和作用
- 掌握函数组件和类组件的写法
- 学会使用Props传递数据
- 理解Props的只读性
- 掌握Props的类型验证

## 1. 什么是组件？

组件是React应用的基本构建块，它是可复用的UI片段。

### 组件特性
- 可组合：多个组件组合成复杂UI
- 可复用：一次编写，多处使用
- 可维护：逻辑和样式封装
- 可测试：独立测试

## 2. 函数组件 vs 类组件

### 2.1 函数组件 (推荐)
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 2.2 类组件 (传统写法)
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 对比演示
<CodePlayground
  files={{
    '/components/FunctionalWelcome.js': `
import React from 'react';

function FunctionalWelcome(props) {
  return (
    <div style={{ border: '2px solid #28a745', padding: '20px', margin: '10px' }}>
      <h3>函数组件</h3>
      <p>Hello, {props.name}! You are {props.age} years old.</p>
    </div>
  );
}

export default FunctionalWelcome;
    `,
    '/components/ClassWelcome.js': `
import React from 'react';

class ClassWelcome extends React.Component {
  render() {
    return (
      <div style={{ border: '2px solid #007bff', padding: '20px', margin: '10px' }}>
        <h3>类组件</h3>
        <p>Hello, {this.props.name}! You are {this.props.age} years old.</p>
      </div>
    );
  }
}

export default ClassWelcome;
    `,
    '/App.js': `
import React from 'react';
import FunctionalWelcome from './components/FunctionalWelcome';
import ClassWelcome from './components/ClassWelcome';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>组件类型对比</h1>
      <FunctionalWelcome name="Alice" age={25} />
      <ClassWelcome name="Bob" age={30} />
    </div>
  );
}

export default App;
    `
  }}
/>

## 3. Props详解

### 3.1 Props是什么？
Props是组件的输入数据，它们从父组件传递给子组件。

### 3.2 传递Props
<LiveCode
  code={`
function App() {
  return (
    <div>
      <UserCard name="Alice" age={25} occupation="Developer" />
      <UserCard name="Bob" age={30} occupation="Designer" />
      <UserCard name="Charlie" age={35} occupation="Product Manager" />
    </div>
  );
}

function UserCard(props) {
  // 解构赋值
  const { name, age, occupation } = props;

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px 0'
    }}>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Occupation: {occupation}</p>
    </div>
  );
}
`}
/>

### 3.3 Props的只读性
Props是只读的，不能在子组件中修改。

<LiveCode
  code={`
function App() {
  return <Counter />;
}

function Counter() {
  let count = 0; // 这不是state，组件重新渲染时会被重置

  const increment = () => {
    count++; // ❌ 错误！不能直接修改props
    alert(count);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <p style={{ color: 'red', fontSize: '12px' }}>
        This won't work properly! Use useState instead.
      </p>
    </div>
  );
}
`}
/>

## 4. 组件组合

### 4.1 组合多个组件
<LiveCode
  code={`
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

function Header() {
  return <header style={{ background: '#333', color: 'white', padding: '20px' }}>
    <h1>My Website</h1>
  </header>;
}

function MainContent() {
  return <main style={{ padding: '20px' }}>
    <h2>Main Content</h2>
    <p>This is the main content area.</p>
  </main>;
}

function Footer() {
  return <footer style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
    <p>&copy; 2024 My Website</p>
  </footer>;
}
`}
/>

### 4.2 容器组件 vs 展示组件
<LiveCode
  code={`
// 容器组件 - 负责逻辑
function UserListContainer() {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  return <UserList users={users} />;
}

// 展示组件 - 负责UI
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
`}
/>

## 5. Props类型验证

### 5.1 PropTypes (运行时检查)
```bash
yarn add prop-types
```

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, isActive }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  isActive: PropTypes.bool
};
```

### 5.2 TypeScript (编译时检查)
```tsx
interface UserCardProps {
  name: string;
  age?: number;
  isActive: boolean;
}

function UserCard({ name, age, isActive }: UserCardProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}
```

### 5.3 默认Props
```jsx
function UserCard({ name, age = 18, isActive = false }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}

UserCard.defaultProps = {
  age: 18,
  isActive: false
};
```

## 6. 特殊Props

### 6.1 children
```jsx
function Card({ children }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px' }}>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>This is card content</p>
    </Card>
  );
}
```

### 6.2 ref (forwardRef)
```jsx
const Input = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

const inputRef = useRef(null);
<Input ref={inputRef} />
```

### 6.3 className和style
```jsx
function Button({ children, variant = 'primary', ...props }) {
  const baseStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const variantStyle = {
    primary: { background: '#007bff', color: 'white' },
    secondary: { background: '#6c757d', color: 'white' }
  };

  return (
    <button
      style={{ ...baseStyle, ...variantStyle[variant] }}
      {...props}
    >
      {children}
    </button>
  );
}
```

## 实践练习

### 练习1：创建Button组件
创建一个可复用的Button组件，支持：
- 不同变体（primary, secondary, danger）
- 不同尺寸（small, medium, large）
- 可选图标
- 加载状态

### 练习2：创建Form组件
创建一个Form组件，包含：
- 输入字段（姓名、邮箱、密码）
- 验证逻辑
- 提交处理

### 练习3：创建Widget组件
创建一个Dashboard Widget组件，包含：
- 标题
- 内容区域
- 操作按钮
- 可折叠/展开

## 组件设计最佳实践

### 1. 单一职责原则
每个组件只负责一个功能。

### 2. Props最小化
只传递组件真正需要的props。

### 3. 避免深层嵌套
深层嵌套会增加复杂性，考虑使用composition。

### 4. 保持组件纯函数
相同输入应该产生相同输出。

### 5. 使用解构赋值
```jsx
// ✅ 好
function UserCard({ name, age, occupation }) {
  return <div>{name}</div>;
}

// ❌ 不好
function UserCard(props) {
  return <div>{props.name}</div>;
}
```

## 常见错误

### 1. 修改Props
```jsx
// ❌ 错误
function MyComponent(props) {
  props.title = 'New Title'; // 不能修改props
  return <div>{props.title}</div>;
}

// ✅ 正确
function MyComponent(props) {
  const newTitle = props.title + '!';
  return <div>{newTitle}</div>;
}
```

### 2. 忘记key属性
```jsx
// ❌ 错误
{items.map(item => <div>{item}</div>)}

// ✅ 正确
{items.map(item => <div key={item.id}>{item}</div>)}
```

### 3. 直接传递对象而不解构
```jsx
// ❌ 可以，但不够清晰
<User user={user} />

// ✅ 更好
<User name={user.name} email={user.email} />
```

## 本章小结
- 组件是React的基本构建块
- 函数组件是现代React的首选写法
- Props是组件的输入，是只读的
- 使用组合来构建复杂UI
- PropTypes和TypeScript可以提高代码质量

## 延伸阅读
- [组件和Props官方文档](https://react.dev/learn/components-and-props)
- [组合vs继承](https://react.dev/learn/composition-vs-inheritance)

## 下一章
[State与生命周期 →](state-lifecycle)
```

---

### 模块2: React Hooks 详解

#### 2.1 useState Hook (基础)

**文档路径**: `docs/hooks/basics/useState.mdx`
**预估时长**: 60分钟
**难度**: 初级

**内容大纲**:
```markdown
# useState Hook 深入解析

## 本章学习目标
- 理解useState Hook的工作原理
- 掌握useState的基本语法
- 学会管理不同类型的状态
- 理解状态更新的异步特性
- 掌握函数式更新

## 1. 什么是useState？

useState是React提供的Hook，用于在函数组件中添加状态。

### 为什么需要useState？
- 函数组件在React 16.8之前无法使用状态
- Hook让函数组件具有类组件的所有能力
- 更简洁、更易测试、更易复用逻辑

## 2. useState基础语法

### 2.1 基本语法
```jsx
const [state, setState] = useState(initialValue);
```

- `state`: 当前状态值
- `setState`: 更新状态的函数
- `initialValue`: 状态的初始值

### 2.2 第一个例子：计数器
<LiveCode
  code={`
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>计数器</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          margin: '5px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        +
      </button>
      <button
        onClick={() => setCount(count - 1)}
        style={{
          margin: '5px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        -
      </button>
      <button
        onClick={() => setCount(0)}
        style={{
          margin: '5px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        重置
      </button>
    </div>
  );
}
`}
/>

## 3. 管理不同类型的状态

### 3.1 数字类型
<LiveCode
  code={`
function NumberInput() {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <h3>数字输入</h3>
      <input
        type="number"
        value={number}
        onChange={e => setNumber(parseInt(e.target.value) || 0)}
        style={{ padding: '5px', fontSize: '16px' }}
      />
      <p>当前值: {number}</p>
      <p>平方: {number * number}</p>
    </div>
  );
}
`}
/>

### 3.2 字符串类型
<LiveCode
  code={`
function TextInput() {
  const [text, setText] = useState('');

  return (
    <div>
      <h3>文本输入</h3>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="输入一些文字..."
        style={{ padding: '5px', fontSize: '16px', width: '300px' }}
      />
      <p>输入的文字: {text}</p>
      <p>字符数: {text.length}</p>
    </div>
  );
}
`}
/>

### 3.3 布尔类型
<LiveCode
  code={`
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <h3>开关控制</h3>
      <button
        onClick={() => setIsOn(!isOn)}
        style={{
          width: '60px',
          height: '30px',
          borderRadius: '15px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isOn ? '#4CAF50' : '#ccc',
          color: 'white',
          transition: 'background-color 0.3s'
        }}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
      <p>状态: {isOn ? '开启' : '关闭'}</p>
      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: isOn ? '#e8f5e9' : '#f5f5f5',
        transition: 'background-color 0.3s'
      }}>
        <p>灯是{isOn ? '亮着' : '关着'}的</p>
      </div>
    </div>
  );
}
`}
/>

### 3.4 对象类型
<LiveCode
  code={`
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: ''
  });

  const updateField = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <h3>用户资料</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>姓名: </label>
        <input
          type="text"
          value={user.name}
          onChange={e => updateField('name', e.target.value)}
          style={{ padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>邮箱: </label>
        <input
          type="email"
          value={user.email}
          onChange={e => updateField('email', e.target.value)}
          style={{ padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>年龄: </label>
        <input
          type="number"
          value={user.age}
          onChange={e => updateField('age', e.target.value)}
          style={{ padding: '5px' }}
        />
      </div>
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#f0f0f0',
        borderRadius: '5px'
      }}>
        <h4>预览:</h4>
        <p>姓名: {user.name}</p>
        <p>邮箱: {user.email}</p>
        <p>年龄: {user.age}</p>
      </div>
    </div>
  );
}
`}
/>

### 3.5 数组类型
<LiveCode
  code={`
function TodoList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim()) {
      setItems(prev => [...prev, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleItem = (id) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div>
      <h3>待办事项列表</h3>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addItem()}
          placeholder="添加新任务..."
          style={{ padding: '8px', width: '250px' }}
        />
        <button onClick={addItem} style={{ marginLeft: '10px', padding: '8px 15px' }}>
          添加
        </button>
      </div>
      <ul style={{ marginTop: '20px', listStyle: 'none' }}>
        {items.map(item => (
          <li key={item.id} style={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{
              textDecoration: item.completed ? 'line-through' : 'none',
              flex: 1
            }}>
              {item.text}
            </span>
            <button
              onClick={() => deleteItem(item.id)}
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
        总任务: {items.length} | 已完成: {items.filter(i => i.completed).length}
      </p>
    </div>
  );
}
`}
/>

## 4. 函数式更新

### 4.1 为什么需要函数式更新？
当新状态依赖于前一个状态时，应该使用函数式更新。

<LiveCode
  code={`
function CounterWithFunction() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>计数器（函数式更新）</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>递增</button>
      <button onClick={() => setCount(c => c - 1)}>递减</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  );
}
`}
/>

### 4.2 函数式更新的必要性
<LiveCode
  code={`
function BuggyCounter() {
  const [count, setCount] = useState(0);

  const incrementThreeTimes = () => {
    setCount(count + 1); // 会覆盖前面的更新
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div style={{ padding: '15px', border: '1px solid red', marginBottom: '20px' }}>
      <h4>❌ 错误的做法</h4>
      <p>Count: {count}</p>
      <button onClick={incrementThreeTimes}>
        点击三次（只会增加1）
      </button>
      <p style={{ color: 'red', fontSize: '12px' }}>
        问题：多次调用setCount会相互覆盖
      </p>
    </div>
  );
}

function CorrectCounter() {
  const [count, setCount] = useState(0);

  const incrementThreeTimes = () => {
    setCount(c => c + 1); // 使用函数式更新
    setCount(c => c + 1);
    setCount(c => c + 1);
  };

  return (
    <div style={{ padding: '15px', border: '1px solid green' }}>
      <h4>✅ 正确的做法</h4>
      <p>Count: {count}</p>
      <button onClick={incrementThreeTimes}>
        点击三次（会增加3）
      </button>
      <p style={{ color: 'green', fontSize: '12px' }}>
        正确：每次更新都基于前一次的状态
      </p>
    </div>
  );
}
`}
/>

## 5. 状态初始值

### 5.1 静态初始值
```jsx
const [count, setCount] = useState(0);
```

### 5.2 函数初始值（懒初始化）
当初始值需要复杂计算时，使用函数：

```jsx
const [state, setState] = useState(() => {
  // 只在组件初始化时执行一次
  return expensiveComputation();
});
```

<LiveCode
  code={`
function ExpensiveComponent() {
  const [users, setUsers] = useState(() => {
    console.log('执行昂贵计算...');
    return [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ];
  });

  return (
    <div>
      <h3>用户列表（函数初始值）</h3>
      <p>用户数量: {users.length}</p>
      <button onClick={() => setUsers([])}>
        清空列表
      </button>
      <button onClick={() => window.location.reload()}>
        重新加载组件
      </button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        打开控制台查看"执行昂贵计算..."只会在组件初始化时输出一次
      </p>
    </div>
  );
}
`}
/>

## 6. useState的规则

### 6.1 只能在顶层调用
```jsx
// ❌ 错误 - 在循环中调用
function MyComponent() {
  for (let i = 0; i < 10; i++) {
    const [state, setState] = useState(0); // 错误！
  }
  return <div>...</div>;
}

// ✅ 正确 - 在顶层调用
function MyComponent() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  return <div>...</div>;
}
```

### 6.2 只能在函数组件或自定义Hook中调用
```jsx
// ❌ 错误 - 在类组件中
class MyClassComponent extends React.Component {
  state = { count: 0 };
  // 不能在这里调用useState
}

// ✅ 正确 - 在函数组件中
function MyFunctionComponent() {
  const [count, setCount] = useState(0);
  return <div>Count: {count}</div>;
}
```

## 实践练习

### 练习1：简单的待办事项应用
创建一个Todo应用，支持：
- 添加任务
- 标记完成
- 删除任务
- 过滤任务（全部/已完成/未完成）

### 练习2：表单组件
创建一个登录表单，包含：
- 用户名输入
- 密码输入
- 显示/隐藏密码
- 表单验证

### 练习3：颜色选择器
创建一个颜色选择器，包含：
- 颜色预览
- RGB滑块
- 十六进制显示
- 预设颜色

## 常见错误

### 1. 直接修改状态
```jsx
// ❌ 错误
function MyComponent() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    items.push(newItem); // 直接修改数组
    setItems(items); // 这样不会触发重新渲染
  };

  return <div>...</div>;
}

// ✅ 正确
function MyComponent() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems(prev => [...prev, newItem]); // 创建新数组
  };

  return <div>...</div>;
}
```

### 2. 忘记解构数组
```jsx
// ❌ 可以工作但不清晰
const state = useState(0);
const setState = state[1];

// ✅ 清晰明了
const [state, setState] = useState(0);
```

### 3. 在循环、条件或嵌套函数中调用
```jsx
// ❌ 错误
function MyComponent() {
  if (condition) {
    const [state, setState] = useState(0);
  }

  const handleClick = () => {
    const [state, setState] = useState(0);
  };

  return <div>...</div>;
}

// ✅ 正确
function MyComponent() {
  const [state, setState] = useState(0);

  return <div>...</div>;
}
```

## 性能优化

### 1. 合理拆分状态
```jsx
// ❌ 不好 - 无关的状态放在一起
const [form, setForm] = useState({
  name: '',
  email: '',
  theme: 'light'
});

// ✅ 更好 - 相关状态放在一起，无关状态分开
const [user, setUser] = useState({ name: '', email: '' });
const [theme, setTheme] = useState('light');
```

### 2. 避免频繁状态更新
```jsx
// ❌ 每次输入都更新状态（性能较差）
<input onChange={e => setText(e.target.value)} />

// ✅ 或者使用防抖
const [text, setText] = useState('');
const debouncedSetText = useMemo(
  () => debounce(setText, 300),
  []
);
```

## 本章小结
- useState是React Hook，用于在函数组件中添加状态
- 使用数组解构获取状态值和更新函数
- 对于对象和数组状态，使用展开运算符创建新引用
- 当新状态依赖前一个状态时，使用函数式更新
- useState只能在函数组件的顶层调用

## 延伸阅读
- [useState API文档](https://react.dev/reference/react/useState)
- [State: Component的内存](https://react.dev/learn/state-a-components-memory)

## 下一章
[useEffect Hook深入 →](useEffect)
```

---

## 📐 线框图与原型设计

### 1. 学习中心主页线框图

```
┌─────────────────────────────────────────────────────────────┐
│  React Learning Center                    [Search]    [GitHub] │
├─────────────────────────────────────────────────────────────┤
│                                                                 │
│    🎯 你的React学习之旅从这里开始                              │
│                                                                 │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐     │
│  │   🚀 基础入门  │  │   🎣 React Hooks│  │   🧩 组件模式  │     │
│  │   8篇文档     │  │   20篇文档     │  │   12篇文档     │     │
│  │   [开始学习]   │  │   [开始学习]   │  │   [开始学习]   │     │
│  └───────────────┘  └───────────────┘  └───────────────┘     │
│                                                                 │
│  ┌───────────────┐  ┌───────────────┐                         │
│  │ 🌊 状态管理    │  │   ⚡ 性能优化  │                         │
│  │   10篇文档     │  │   8篇文档      │                         │
│  │   [开始学习]   │  │   [开始学习]   │                         │
│  └───────────────┘  └───────────────┘                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐
│  │              你的学习进度                                     │
│  │  ⬜ 基础入门 (0/8)                                          │
│  │  ⬜ React Hooks (0/20)                                      │
│  │  ⬜ 组件模式 (0/12)                                          │
│  │  ⬜ 状态管理 (0/10)                                          │
│  │  ⬜ 性能优化 (0/8)                                           │
│  └─────────────────────────────────────────────────────────────┘
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐
│  │              推荐学习路径                                     │
│  │                                                                 │
│  │  [基础入门] → [React Hooks] → [组件模式]                      │
│  │       ↓              ↓                 ↓                     │
│  │  [状态管理] → [性能优化] → [实战项目]                          │
│  └─────────────────────────────────────────────────────────────┘
│                                                                 │
└─────────────────────────────────────────────────────────────┘
```

### 2. 文档页面线框图

```
┌─────────────────────────────────────────────────────────────┐
│  React Learning Center                    [Search]    [GitHub] │
├─────────────────────────────────────────────────────────────┤
│  ← 返回上一页                                        [Progress] 33% │
├─────────────────────────────────────────────────────────────┤
│                                                                 │
│  📚 基础入门 / 什么是React                             [Progress] │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐
│  │ 本章学习目标                                                │
│  │ • 理解React的核心概念                                       │
│  │ • 了解React的历史和设计哲学                                 │
│  │ • 掌握React的优势和适用场景                                 │
│  └─────────────────────────────────────────────────────────────┘
│                                                                 │
│  ───────────────────────────────────────────────────────────   │
│                                                                 │
│  ## 1. 什么是React？                                          │
│                                                                 │
│  React是由Facebook（现Meta）开发的前端框架...                   │
│                                                                 │
│  ### 交互式示例1：Hello React                                  │
│  ┌─────────────────────────────────────────────────────────────┐
│  │ [App.js]  [index.js]           │ ┌─────────────────────────┐ │
│  │ import React from 'react'      │ │  Hello React!          │ │
│  │                                │ │  Welcome to your...    │ │
│  │ function App() {               │ └─────────────────────────┘ │
│  │   return <h1>Hello...</h1>     │                         │
│  │ }                              │  [Console]               │
│  └─────────────────────────────────┘  [Refresh]  [Theme]     │
│                                                                 │
│  📋 代码已复制到剪贴板 ✓                                       │
│                                                                 │
│  ───────────────────────────────────────────────────────────   │
│                                                                 │
│  [上一章：学习路线图]                            [下一章：JSX]  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐
│  │  💬 有什么问题？添加评论...                              [提交] │
│  └─────────────────────────────────────────────────────────────┘
│                                                                 │
└─────────────────────────────────────────────────────────────┘
```

### 3. 学习路径可视化组件

```jsx
function LearningPathDiagram() {
  const path = [
    { id: 'foundations', title: '基础入门', completed: true, current: false },
    { id: 'hooks-basic', title: 'Hooks基础', completed: true, current: true },
    { id: 'hooks-advanced', title: 'Hooks进阶', completed: false, current: false },
    { id: 'patterns', title: '组件模式', completed: false, current: false },
    { id: 'state', title: '状态管理', completed: false, current: false },
    { id: 'performance', title: '性能优化', completed: false, current: false }
  ];

  return (
    <div style={{ padding: '40px', background: '#f8f9fa' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>
        你的React学习路径
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {path.map((node, index) => (
          <React.Fragment key={node.id}>
            <div style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: `3px solid ${
                node.completed ? '#28a745' :
                node.current ? '#007bff' : '#dee2e6'
              }`,
              background: node.completed ? '#28a745' :
                        node.current ? '#007bff' : '#fff',
              color: node.completed || node.current ? '#fff' : '#6c757d',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                {node.title.split(' ')[0]}
              </div>
              <div style={{ fontSize: '11px', marginTop: '4px' }}>
                {node.title.split(' ').slice(1).join(' ')}
              </div>
              {node.completed && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#28a745',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  ✓
                </div>
              )}
            </div>

            {index < path.length - 1 && (
              <div style={{
                width: '80px',
                height: '2px',
                background: path[index + 1].completed || path[index + 1].current
                  ? '#007bff'
                  : '#dee2e6',
                margin: '0 20px'
              }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{
        marginTop: '40px',
        textAlign: 'center',
        padding: '20px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>当前进度</h3>
        <div style={{
          width: '400px',
          height: '20px',
          background: '#e9ecef',
          borderRadius: '10px',
          margin: '20px auto',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '33%',
            height: '100%',
            background: 'linear-gradient(to right, #007bff, #0056b3)',
            transition: 'width 0.3s'
          }} />
        </div>
        <p style={{ color: '#6c757d' }}>
          已完成 2/6 个模块 · 完成度 33%
        </p>
        <button style={{
          padding: '12px 24px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '10px'
        }}>
          继续学习 Hooks进阶
        </button>
      </div>
    </div>
  );
}
```

---

## 🎨 交互式组件设计规范

### CodePlayground 样式规范

```css
/* CodePlayground 容器 */
.sandpack-wrapper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

/* 主题切换按钮 */
.theme-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}

.theme-toggle:hover {
  background: rgba(0, 0, 0, 0.7);
}

/* 控制台输出 */
.sandpack-console {
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

/* 代码复制按钮 */
.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s;
}

.code-block:hover .copy-button {
  opacity: 1;
}

.copy-button.copied {
  background: #28a745;
}
```

### LiveCode 样式规范

```css
/* LiveCode 容器 */
.live-wrapper {
  border: 2px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
}

.live-editor {
  background: #f8f9fa;
  font-size: 14px;
}

.live-preview {
  padding: 20px;
  background: white;
  min-height: 100px;
}

.live-error {
  background: #f8d7da;
  color: #721c24;
  padding: 10px;
  font-family: monospace;
  font-size: 12px;
}

/* 加载状态 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

---

## 📝 内容创作模板

### 文档页面前置代码

```markdown
---
id: {document-id}
title: {文档标题}
description: {文档描述}
sidebar_position: {number}
tags: [{tag1}, {tag2}, {tag3}]
---

# {文档标题}

import { CodePlayground, LiveCode, CopyButton } from '@components';

## 本章学习目标

- {学习目标1}
- {学习目标2}
- {学习目标3}

## 概述

{概述内容}

## 示例

<CodePlayground
  files={{
    {文件路径}: `
{代码内容}
    `
  }}
  options={{}}
/>

## 练习

### 练习{编号}：{练习标题}

{练习描述}

<Exercise
  instructions={...}
  starterCode={...}
  solution={...}
/>

## 常见错误

### {错误标题}

```jsx
// ❌ 错误代码
{错误代码示例}
```

```jsx
// ✅ 正确代码
{正确代码示例}
```

## 本章小结

- {要点1}
- {要点2}
- {要点3}

## 延伸阅读

- [链接1](url1)
- [链接2](url2)

## 下一章

[下一章标题 →](下一章路径)
```

---

## 📊 数据结构设计

### 学习进度追踪

```typescript
interface LearningProgress {
  userId: string;
  completedTopics: string[];
  currentTopic: string;
  completionPercentage: number;
  lastAccessed: Date;
  timeSpent: number; // 秒
  bookmarkedTopics: string[];
  quizScores: Record<string, number>;
}
```

### 文档元数据

```typescript
interface DocumentMetadata {
  id: string;
  title: string;
  description: string;
  path: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // 分钟
  prerequisites?: string[];
  learningObjectives: string[];
  codeExamples: CodeExample[];
  exercises: Exercise[];
}
```

### 交互式示例

```typescript
interface CodeExample {
  id: string;
  title: string;
  description: string;
  files: Record<string, string>;
  entry: string;
  options: SandpackOptions;
  explanations?: string[];
}
```

---

这份详细设计文档提供了完整的实施蓝图，包括组件API、学习路径详细内容、线框图和设计规范。可以作为开发的直接参考文档。