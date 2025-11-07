import React from 'react';
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
