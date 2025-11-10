import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';
import { FiEdit2, FiEye, FiRotateCw, FiShare } from 'react-icons/fi';
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
  // 新增属性
  autoSave = true,
  enableShare = true,
  enableReset = true,
  storageKey = null,
}) => {
  const { colorMode } = useColorMode();
  const [copied, setCopied] = useState(false);
  const [showEditorState, setShowEditor] = useState(false);
  const [currentCode, setCurrentCode] = useState(code);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // 生成唯一存储键
  const key = storageKey || `livecode_${code.substring(0, 50)}`;

  // 从localStorage加载保存的代码
  useEffect(() => {
    if (!autoSave) return;
    try {
      const saved = localStorage.getItem(`saved_${key}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.timestamp && Date.now() - parsed.timestamp < 30 * 24 * 60 * 60 * 1000) {
          setCurrentCode(parsed.code);
          setHasUnsavedChanges(true);
        }
      }
    } catch (err) {
      console.warn('Failed to load saved code:', err);
    }
  }, [key, autoSave]);

  // 保存代码到localStorage
  const saveCode = (newCode) => {
    if (!autoSave) return;
    try {
      localStorage.setItem(`saved_${key}`, JSON.stringify({
        code: newCode,
        timestamp: Date.now()
      }));
      setHasUnsavedChanges(true);
    } catch (err) {
      console.warn('Failed to save code:', err);
    }
  };

  // 重置代码
  const handleReset = () => {
    if (!enableReset) return;
    localStorage.removeItem(`saved_${key}`);
    setCurrentCode(code);
    setHasUnsavedChanges(false);
  };

  // 分享代码
  const handleShare = async () => {
    if (!enableShare) return;
    const shareData = {
      code: currentCode,
      scope: Object.keys(scope),
      timestamp: Date.now()
    };
    const encoded = btoa(JSON.stringify(shareData));
    const url = `${window.location.origin}${window.location.pathname}#livecode=${encoded}`;

    try {
      await navigator.clipboard.writeText(url);
      alert('分享链接已复制到剪贴板！');
    } catch (err) {
      console.error('Failed to share:', err);
      prompt('请复制此链接:', url);
    }
  };

  // 处理代码变化
  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
    saveCode(newCode);
  };

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
          alignItems: 'center',
        }}>
          {/* 重置按钮 */}
          {enableReset && (
            <button
              onClick={handleReset}
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
              title="重置为初始代码"
            >
              <FiRotateCw />
              重置
            </button>
          )}

          {/* 分享按钮 */}
          {enableShare && (
            <button
              onClick={handleShare}
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
              title="分享代码"
            >
              <FiShare />
              分享
            </button>
          )}

          {/* 显示/隐藏编辑器 */}
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

          {/* 复制按钮 */}
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
        code={transformCodeFn(currentCode)}
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
              code={currentCode}
              onChange={handleCodeChange}
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

      {/* 未保存更改提示 */}
      {hasUnsavedChanges && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: '#3b82f6',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}>
          <span>已保存</span>
        </div>
      )}
    </div>
  );
};

export default LiveCode;
