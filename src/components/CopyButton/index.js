import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

const CopyButton = ({
  code,
  fileName = '',
  showIcon = true,
  showText = true,
  tooltipPosition = 'top',
  className = '',
  onCopy,
  style = {},
  size = 'small', // 'small', 'medium', 'large'
}) => {
  const [copied, setCopied] = useState(false);

  // 处理复制
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      if (onCopy) {
        onCopy(true);
      }

      // 2秒后重置状态
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);

      if (onCopy) {
        onCopy(false);
      }
    }
  };

  // 尺寸样式
  const sizeStyles = {
    small: {
      padding: '4px 8px',
      fontSize: '11px',
    },
    medium: {
      padding: '6px 12px',
      fontSize: '12px',
    },
    large: {
      padding: '8px 16px',
      fontSize: '14px',
    },
  };

  // 位置样式
  const positionStyles = {
    top: {
      bottom: '100%',
      marginBottom: '8px',
    },
    bottom: {
      top: '100%',
      marginTop: '8px',
    },
    left: {
      right: '100%',
      marginRight: '8px',
    },
    right: {
      left: '100%',
      marginLeft: '8px',
    },
  };

  // Tooltip位置
  const tooltipStyle = {
    position: 'absolute',
    whiteSpace: 'nowrap',
    zIndex: 1000,
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    ...positionStyles[tooltipPosition],
  };

  return (
    <div
      className={`copy-button-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style
      }}
    >
      <button
        onClick={handleCopy}
        disabled={copied}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: sizeStyles[size].padding,
          border: '1px solid var(--ifm-toc-border-color)',
          background: copied ? '#28a745' : 'transparent',
          color: copied ? 'white' : 'var(--ifm-font-color-base)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: sizeStyles[size].fontSize,
          transition: 'all 0.2s ease',
          opacity: 0,
        }}
        className="copy-button"
      >
        {copied ? (
          <>
            {showIcon && <FaCheck />}
            {showText && (copied ? '已复制!' : '复制')}
          </>
        ) : (
          <>
            {showIcon && <FaCopy />}
            {showText && (fileName ? fileName : '复制')}
          </>
        )}
      </button>

      {/* Tooltip */}
      {copied && (
        <div style={tooltipStyle}>
          ✓ 已复制到剪贴板
        </div>
      )}
    </div>
  );
};

export default CopyButton;
