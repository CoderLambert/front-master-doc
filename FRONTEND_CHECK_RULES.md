# 前端页面检查规则

本文档定义了React学习中心项目的前端页面检查规范，确保所有页面和功能正常工作。

---

## 1. 调试工具使用规范

### 1.1 优先使用 Chrome DevTools MCP
- ✅ **使用 `chrome-devtools-mcp` 进行页面调试**
- ❌ **避免使用 `playwright-mcp`**
- 原因：chrome-devtools-mcp 提供更直观的浏览器开发者工具访问

### 1.2 调试流程
1. 启动开发服务器：`npm run start`
2. 使用 chrome-devtools-mcp 打开浏览器
3. 访问目标页面
4. 监听 console 输出日志
5. 检查是否有错误、警告或异常

---

## 2. 页面验证标准

### 2.1 基础检查
每次验证页面时必须确认：

- [ ] 页面返回 HTTP 200 状态码
- [ ] 页面标题正确显示
- [ ] 所有静态资源（CSS、图片）正常加载
- [ ] 页面内容完整显示

### 2.2 Console 日志检查
**⚠️ 关键步骤：监听 console 输出**

验证页面时必须检查浏览器控制台：

```bash
# 使用 bash 测试页面响应
curl -s -o /dev/null -w "%{http_code}" http://localhost:3011/docs/foundations/your-page
```

Console 检查要点：
- ❌ 不应有 JavaScript 错误（红色错误信息）
- ⚠️ 警告信息应尽量避免或确认不影响功能
- ✅ 所有组件正常渲染，无未定义错误

### 2.3 常见错误类型
- `Expected component 'XXX' to be defined` - 组件未在 MDXComponents.js 中定义
- `children is not a function` - 组件 props 传递错误
- `Cannot read properties of undefined` - 数据访问错误
- `Unexpected closing tag` - MDX 标签闭合错误

---

## 3. MDX 文档编写规范

### 3.1 组件定义规则
**⚠️ 重要：在编写 MDX 文档时，如果使用到自定义组件，必须：**

1. **在 `src/theme/MDXComponents.js` 中定义组件**
2. **组件名使用 PascalCase 约定**
3. **为组件添加详细的注释说明**

### 3.2 组件开发规范

#### 3.2.1 组件结构
```javascript
// Xxx组件 - 功能描述
Xxx: ({ children }) => (
  <div
    style={{
      margin: '20px 0',
      padding: '20px',
      background: 'var(--ifm-background-surface-color)',
      border: '1px solid var(--ifm-toc-border-color)',
      borderRadius: '8px',
    }}
  >
    {children}
  </div>
),
```

#### 3.2.2 样式规范
- ✅ 使用 CSS 变量（`var(--ifm-*)`）支持深色/浅色主题
- ✅ 统一的圆角边框：`borderRadius: '8px'`
- ✅ 统一的间距：`margin: '20px 0'`，`padding: '20px'`
- ✅ 统一的主题色边框：`borderLeft: '4px solid [颜色]'`

### 3.3 已实现的 MDX 组件列表

#### 3.3.1 基础容器组件
- `Box` - 简单的容器组件
- `Highlighter` - 高亮显示文本（蓝色左边框）
- `BestPractices` - 最佳实践容器（绿色左边框）
- `ErrorBox` - 错误示例容器（红色左边框）
- `Rules` - 规则说明容器（橙色左边框）

#### 3.3.2 功能组件
- `Timeline` - 时间线展示
- `Compare` / `GoodBad` - 对比容器
- `Process` - 流程展示
- `Diagram` - 图表展示（等宽字体）
- `Example` - 示例容器
- `Grid` - 网格布局
- `Stats` - 统计信息
- `Expandable` - 可展开/折叠内容
- `Checklist` - 检查列表（带 ✅ 图标）

#### 3.3.3 结构组件
- `Table` - 表格容器（带横向滚动）
- `CompareTable` - 对比表格
- `CodeBlock` - 代码块容器

#### 3.3.4 渲染组件
- `code` - prism-react-renderer 代码高亮（自动处理语法检测）

---

## 4. 开发流程

### 4.1 编写 MDX 文档流程

1. **创建或编辑 MDX 文件**
   ```
   docs/foundations/your-page.mdx
   ```

2. **如果使用自定义组件**
   - 在 MDX 文件顶部导入（如果需要）
   - 在 `src/theme/MDXComponents.js` 中添加组件定义
   - 确保组件样式和功能正确

3. **测试验证**
   - 启动开发服务器
   - 访问页面：`http://localhost:3011/docs/foundations/your-page`
   - 检查 console 日志
   - 确认页面正常渲染

4. **提交代码**
   ```bash
   git add docs/... src/theme/MDXComponents.js
   git commit -m "feat: 添加新的 MDX 组件和页面"
   ```

### 4.2 页面测试命令

```bash
# 批量测试所有主要页面
curl -s -o /dev/null -w "主页: %{http_code}\n" http://localhost:3011/ && \
curl -s -o /dev/null -w "什么是React: %{http_code}\n" http://localhost:3011/docs/foundations/what-is-react && \
curl -s -o /dev/null -w "JSX语法: %{http_code}\n" http://localhost:3011/docs/foundations/jsx-syntax && \
curl -s -o /dev/null -w "组件与Props: %{http_code}\n" http://localhost:3011/docs/foundations/components-props && \
curl -s -o /dev/null -w "组件演示: %{http_code}\n" http://localhost:3011/components-demo
```

---

## 5. 常见问题解决

### 5.1 组件未定义错误
**错误信息：**
```
Expected component `Xxx` to be defined
```

**解决方案：**
1. 在 `src/theme/MDXComponents.js` 中添加组件定义
2. 检查组件名是否正确（大写字母开头）
3. 重新编译开发服务器

### 5.2 代码高亮错误
**错误信息：**
```
children is not a function
```

**解决方案：**
1. 检查 `code` 组件的实现
2. 确保正确传递 children 和 className
3. 参考 MDXComponents.js 中的 `code` 组件实现

### 5.3 MDX 标签闭合错误
**错误信息：**
```
Unexpected closing tag `</xxx>`, expected corresponding closing tag for `<Xxx>`
```

**解决方案：**
1. 检查 MDX 文件中标签的大小写
2. React 组件必须以大写字母开头
3. 确保开始和结束标签匹配

---

## 6. 最佳实践

### 6.1 组件设计原则
- **单一职责**：每个组件只负责一个功能
- **可复用性**：组件应该在多个地方可以重复使用
- **可维护性**：组件逻辑简单，样式清晰
- **一致性**：使用相同的样式模式和命名约定

### 6.2 文档编写原则
- **清晰的结构**：使用标题层级组织内容
- **丰富的示例**：提供可运行的代码示例
- **交互式组件**：使用可展开组件提供提示和答案
- **视觉引导**：使用不同颜色的容器区分内容类型

---

## 7. 参考资源

### 7.1 项目文件
- `src/theme/MDXComponents.js` - 所有自定义 MDX 组件定义
- `docs/` - 所有文档文件
- `src/pages/` - 自定义 React 页面

### 7.2 外部资源
- [React 官方文档](https://react.dev)
- [Docusaurus 文档](https://docusaurus.io)
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer)

---

## 8. 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2025-11-07 | v1.0 | 初始版本，定义基础规则 |
| 2025-11-07 | v1.1 | 添加组件定义规范和示例 |
| 2025-11-07 | v1.2 | 补充常见问题和解决方案 |

---

**记住：每次修改 MDX 文档或添加新组件后，都要测试页面并检查 console 日志！** ✅
