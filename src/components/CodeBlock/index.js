import React, { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import themeLight from 'prism-react-renderer/themes/github';
import themeDark from 'prism-react-renderer/themes/dracula';
import { useColorMode } from '@docusaurus/theme-common';
import { FiCopy, FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import CopyButton from '../CopyButton';
import styles from './index.module.css';

const CodeBlock = ({
  children,
  className = '',
  metastring = '',
  showLineNumbers = true,
  wrapLines = false,
  showCopyButton = true,
  title = '',
  collapsed = false,
  editable = false,
  onCodeChange,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [code, setCode] = useState(children.trim());

  // 解析语言
  const language = className.replace(/language-/, '') || 'jsx';

  // 主题
  const theme = colorMode === 'dark' ? themeDark : themeLight;

  // 复制处理
  const handleCopy = async (success) => {
    setCopied(success);
    setTimeout(() => setCopied(false), 2000);
  };

  // 代码变化处理
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  return (
    <div className={`code-block-wrapper ${className}`} style={{ margin: '20px 0' }}>
      {/* 标题栏 */}
      {title && (
        <div
          style={{
            padding: '12px 16px',
            background: 'var(--ifm-background-surface-color)',
            borderBottom: '1px solid var(--ifm-toc-border-color)',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
            {title}
          </span>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {editable && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                  padding: '4px 8px',
                  border: '1px solid var(--ifm-toc-border-color)',
                  background: 'transparent',
                  color: 'var(--ifm-font-color-base)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
                {isCollapsed ? '展开' : '折叠'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 代码块 */}
      {!isCollapsed && (
        <Highlight
          {...defaultProps}
          code={code}
          language={language}
          theme={theme}
          {...props}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <div className={styles.codeBlockContainer}>
              {/* 复制按钮 */}
              {showCopyButton && !editable && (
                <CopyButton
                  code={code}
                  showIcon={false}
                  showText={true}
                  size="small"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    zIndex: 10,
                  }}
                  onCopy={handleCopy}
                />
              )}

              {/* 代码区域 */}
              <pre
                className={className}
                style={{
                  ...style,
                  margin: 0,
                  padding: '16px',
                  overflow: 'auto',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}
              >
                <code>
                  {tokens.map((line, i) => {
                    const lineProps = getLineProps({ line, key: i });
                    return (
                      <div key={i} {...lineProps}>
                        {showLineNumbers && (
                          <span
                            className={styles.lineNumber}
                            style={{
                              display: 'inline-block',
                              width: '30px',
                              marginRight: '16px',
                              textAlign: 'right',
                              opacity: 0.3,
                              userSelect: 'none',
                            }}
                          >
                            {i + 1}
                          </span>
                        )}
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    );
                  })}
                </code>
              </pre>
            </div>
          )}
        </Highlight>
      )}
    </div>
  );
};

export default CodeBlock;
