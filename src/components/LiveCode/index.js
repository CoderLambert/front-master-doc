import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';
import { FiEdit2, FiEye } from 'react-icons/fi';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { useColorMode } from '@docusaurus/theme-common';
import * as ReactModule from 'react';
import { themes } from 'prism-react-renderer';

const LiveCode = ({
  code,
  scope = {},
  showEditor = true,
  showPreview = true,
  showError = true,
  language = 'jsx',
  theme = 'auto',
  noInline = false,
  transformCode,
  onError,
  onSuccess,
  style = {},
  className = '',
}) => {
  const { colorMode } = useColorMode();
  const [copied, setCopied] = useState(false);
  const [showEditorState, setShowEditor] = useState(false);

  // 默认scope包含React
  const defaultScope = {
    React: ReactModule,
    useState: ReactModule.useState,
    useEffect: ReactModule.useEffect,
    useContext: ReactModule.useContext,
    useReducer: ReactModule.useReducer,
    useCallback: ReactModule.useCallback,
    useMemo: ReactModule.useMemo,
    useRef: ReactModule.useRef,
    ...scope,
  };

  // 主题
  const reactLiveTheme = theme === 'auto'
    ? (colorMode === 'dark' ? themes.dracula : themes.github)
    : theme;

  // 复制代码
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // 处理代码转换
  const transformCodeFn = (code) => {
    if (transformCode) {
      return transformCode(code);
    }

    // 默认转换：如果代码中已包含React import，则保留；否则不添加，因为默认scope已提供React
    const hasReactImport = /import\s+React\s+from\s+['"]react['"]/.test(code);

    if (hasReactImport) {
      return code;
    }
    return code;
  };

  return (
    <div
      className={`live-code ${className}`}
      style={{
        margin: '20px 0',
        borderRadius: '8px',
        overflow: 'hidden',
        border: `1px solid var(--ifm-toc-border-color)`,
        ...style
      }}
    >
      {/* 工具栏 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'var(--ifm-background-surface-color)',
        borderBottom: '1px solid var(--ifm-toc-border-color)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'var(--ifm-font-color-base)',
        }}>
          <span>✨</span>
          <span>Live Code</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
        }}>
          {showEditor && (
            <button
              onClick={() => setShowEditor(!showEditorState)}
              style={{
                padding: '6px 12px',
                border: '1px solid var(--ifm-toc-border-color)',
                background: 'transparent',
                color: 'var(--ifm-font-color-base)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {showEditorState ? <FiEye /> : <FiEdit2 />}
              {showEditorState ? '隐藏编辑' : '显示编辑'}
            </button>
          )}

          <button
            onClick={handleCopy}
            style={{
              padding: '6px 12px',
              border: '1px solid var(--ifm-toc-border-color)',
              background: 'transparent',
              color: 'var(--ifm-font-color-base)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {copied ? <FaCheck /> : <FaCopy />}
            {copied ? '已复制!' : '复制代码'}
          </button>
        </div>
      </div>

      {/* Live Provider */}
      <LiveProvider
        code={transformCodeFn(code)}
        scope={defaultScope}
        theme={reactLiveTheme}
        noInline={noInline}
        onError={(error) => {
          if (onError) onError(error);
        }}
        onSuccess={onSuccess}
      >
        {/* 编辑器 */}
        {showEditor && showEditorState && (
          <div style={{
            borderBottom: '1px solid var(--ifm-toc-border-color)',
            position: 'relative',
          }}>
            <LiveEditor
              style={{
                fontSize: '14px',
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                outline: 'none',
                minHeight: '200px',
              }}
            />
          </div>
        )}

        {/* 预览 */}
        {showPreview && (
          <div
            style={{
              padding: '20px',
              background: 'var(--ifm-background-surface-color)',
              minHeight: '100px',
            }}
          >
            <LivePreview />
          </div>
        )}

        {/* 错误信息 */}
        {showError && (
          <LiveError
            style={{
              padding: '12px 16px',
              background: '#ffebee',
              color: '#c62828',
              fontSize: '13px',
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          />
        )}
      </LiveProvider>
    </div>
  );
};

export default LiveCode;
