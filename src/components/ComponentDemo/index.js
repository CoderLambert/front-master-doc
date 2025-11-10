import React from 'react';
import { LiveCode } from '../LiveCode';

const ComponentDemo = ({
  title,
  description,
  code,
  scope = {},
  showEditor = true,
  showPreview = true,
  height = 500,
  style = {},
  className = '',
}) => {
  return (
    <div
      className={`component-demo ${className}`}
      style={{
        margin: '30px 0',
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        ...style
      }}
    >
      {/* 头部 */}
      <div style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>
          {title || '组件演示'}
        </h3>
        {description && (
          <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
            {description}
          </p>
        )}
      </div>

      {/* 代码演示 */}
      <LiveCode
        code={code}
        scope={scope}
        showEditor={showEditor}
        showPreview={showPreview}
        style={{ height }}
      />
    </div>
  );
};

export default ComponentDemo;
