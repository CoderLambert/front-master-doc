import React, { useState } from 'react';
import { Highlight } from 'prism-react-renderer';

// 自定义MDX组件映射
const MDXComponents = {
  // Badge组件
  Badge: ({ children, color = 'blue' }) => {
    const colorMap = {
      blue: '#1e88e5',
      green: '#43a047',
      orange: '#fb8c00',
      purple: '#8e24aa',
      pink: '#d81b60',
      indigo: '#5e35b1',
      teal: '#00897b',
      cyan: '#00acc1',
      red: '#e53935',
    };

    const bgColor = colorMap[color] || '#1e88e5';

    return (
      <span
        style={{
          display: 'inline-block',
          padding: '2px 8px',
          margin: '0 4px',
          borderRadius: '4px',
          backgroundColor: bgColor,
          color: 'white',
          fontSize: '0.85em',
          fontWeight: 'bold',
        }}
      >
        {children}
      </span>
    );
  },

  // Box组件 - 简单的容器组件
  Box: ({ children, style = {}, ...props }) => (
    <div
      style={{
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ),

  // Compare组件 - 对比容器
  Compare: ({ children }) => (
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

  // Process组件 - 流程容器
  Process: ({ children }) => (
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

  // Diagram组件 - 图表容器
  Diagram: ({ children }) => (
    <div
      style={{
        margin: '20px 0',
        padding: '20px',
        background: 'var(--ifm-background-surface-color)',
        border: '1px solid var(--ifm-toc-border-color)',
        borderRadius: '8px',
        fontFamily: 'monospace',
        whiteSpace: 'pre',
        overflowX: 'auto',
      }}
    >
      {children}
    </div>
  ),

  // Example组件 - 示例容器
  Example: ({ children }) => (
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

  // Grid组件 - 网格布局
  Grid: ({ children }) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        margin: '20px 0',
      }}
    >
      {children}
    </div>
  ),

  // Stats组件 - 统计信息
  Stats: ({ children }) => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        margin: '20px 0',
        justifyContent: 'space-around',
      }}
    >
      {children}
    </div>
  ),

  // Expandable组件 - 可展开内容
  Expandable: ({ children, title = '点击展开' }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div
        style={{
          margin: '20px 0',
          border: '1px solid var(--ifm-toc-border-color)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '100%',
            padding: '15px 20px',
            textAlign: 'left',
            background: 'var(--ifm-background-color)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1em',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {title}
          <span>{isExpanded ? '▼' : '▶'}</span>
        </button>
        {isExpanded && (
          <div
            style={{
              padding: '20px',
              background: 'var(--ifm-background-surface-color)',
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  },

  // Checklist组件 - 检查列表
  Checklist: ({ children }) => {
    // 将每个列表项前的 ✅ 替换为复选框样式
    const items = React.Children.toArray(children).map((item, index) => (
      <li key={index} style={{ marginBottom: '8px', listStyle: 'none' }}>
        <span style={{ marginRight: '8px' }}>✅</span>
        {item}
      </li>
    ));

    return (
      <ul style={{ paddingLeft: '0', margin: '20px 0' }}>
        {items}
      </ul>
    );
  },

  // Highlight组件 - 高亮显示文本
  Highlight: ({ children }) => (
    <div
      style={{
        margin: '20px 0',
        padding: '20px',
        background: 'var(--ifm-background-surface-color)',
        border: '1px solid var(--ifm-toc-border-color)',
        borderRadius: '8px',
        borderLeft: '4px solid var(--ifm-color-primary)',
      }}
    >
      {children}
    </div>
  ),

  // CodeBlock组件 - 代码块容器
  CodeBlock: ({ children }) => (
    <div
      style={{
        margin: '20px 0',
        border: '1px solid var(--ifm-toc-border-color)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'var(--ifm-background-surface-color)',
      }}
    >
      {children}
    </div>
  ),

  // CompareTable组件
  CompareTable: ({ children }) => (
    <div
      style={{
        overflowX: 'auto',
        margin: '16px 0',
      }}
    >
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          border: '1px solid var(--ifm-toc-border-color)',
        }}
      >
        {children}
      </table>
    </div>
  ),

  // 使用默认的Highlight
  code: (props) => <Highlight {...props} />,
};

export default MDXComponents;
