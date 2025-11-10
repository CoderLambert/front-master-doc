import React, { useState, useEffect, useMemo } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { FaCopy, FaCheck, FaRotate, FaShare, FaHistory } from 'react-icons/fa';
import { useColorMode } from '@docusaurus/theme-common';
import { FiSun, FiMoon, FiAlertCircle } from 'react-icons/fi';

const CodePlayground = ({
  files = {},
  entry = '/App.js',
  showConsole = true,
  showTabs = true,
  showLineNumbers = true,
  showRefreshButton = true,
  readOnly = false,
  editorHeight = 600,
  editorWidthPercentage = 55,
  customTheme = null,
  dependencies = {},
  devDependencies = {},
  style = {},
  className = '',
  onCodeChange,
  onConsoleMessage,
  onError,
  // 新增属性
  autoSave = true,
  enableShare = true,
  enableReset = true,
  storageKey = null,
}) => {
  const { colorMode } = useColorMode();
  const [showCode, setShowCode] = useState(true);

  // 代码版本管理
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // 生成唯一存储键
  const key = useMemo(() => {
    if (storageKey) return storageKey;
    return `codeplayground_${JSON.stringify(files)}_${entry}`;
  }, [storageKey, files, entry]);

  // 从localStorage加载保存的代码
  const loadSavedCode = () => {
    if (!autoSave) return files;
    try {
      const saved = localStorage.getItem(`saved_${key}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.timestamp && Date.now() - parsed.timestamp < 30 * 24 * 60 * 60 * 1000) { // 30天
          return parsed.files;
        }
      }
    } catch (err) {
      console.warn('Failed to load saved code:', err);
    }
    return files;
  };

  const [initialFiles, setInitialFiles] = useState(() => loadSavedCode());

  // 保存代码到localStorage
  const saveCode = (newFiles) => {
    if (!autoSave) return;
    try {
      localStorage.setItem(`saved_${key}`, JSON.stringify({
        files: newFiles,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.warn('Failed to save code:', err);
    }
  };

  // 重置代码
  const handleReset = () => {
    if (!enableReset) return;
    localStorage.removeItem(`saved_${key}`);
    setInitialFiles(files);
    setHasUnsavedChanges(false);
    setShowResetConfirm(false);
  };

  // 分享代码
  const handleShare = async () => {
    if (!enableShare) return;
    const shareData = {
      files: initialFiles,
      entry,
      timestamp: Date.now()
    };
    const encoded = btoa(JSON.stringify(shareData));
    const url = `${window.location.origin}${window.location.pathname}#code=${encoded}`;

    try {
      await navigator.clipboard.writeText(url);
      alert('分享链接已复制到剪贴板！');
    } catch (err) {
      console.error('Failed to share:', err);
      prompt('请复制此链接:', url);
    }
  };

  // 获取默认文件
  const defaultFiles = {
    '/App.js': `
import React from 'react';

function App() {
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#61dafb' }}>
        Hello, React! ⚛️
      </h1>
      <p>Start editing to see your changes!</p>
    </div>
  );
}

export default App;
    `,
    '/index.js': `
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
    `,
    '/public/index.html': `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
    `,
  };

  // 合并文件
  const allFiles = {
    ...defaultFiles,
    ...initialFiles,
  };

  // 主题 - 使用默认主题，根据colorMode调整
  const theme = customTheme || (colorMode === 'dark' ? 'dark' : 'light');

  // 处理代码变化
  const handleCodeChange = (newFiles) => {
    setInitialFiles(newFiles);
    setHasUnsavedChanges(true);
    saveCode(newFiles);
    if (onCodeChange) {
      onCodeChange(newFiles);
    }
  };

  // Sandpack配置
  const options = {
    recompileMode: 'delayed',
    recompileDelay: 500,
    editorHeight,
    editorWidthPercentage,
    showTabs,
    showLineNumbers,
    showRefreshButton,
    closableTabs: false,
    wrapContent: true,
    editorStyle: {
      fontSize: '14px',
      lineHeight: '1.5',
    },
    ...(showConsole && { showConsoleButton: true }),
  };

  return (
    <div
      className={`code-playground ${className}`}
      style={{
        margin: '20px 0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
          <span>📦</span>
          <span>Interactive Playground</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          {/* 重置按钮 */}
          {enableReset && (
            <button
              onClick={() => setShowResetConfirm(true)}
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
              <FaRotate />
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
              <FaShare />
              分享
            </button>
          )}

          {/* 显示/隐藏代码按钮 */}
          <button
            onClick={() => setShowCode(!showCode)}
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
            {showCode ? <FiMoon /> : <FiSun />}
            {showCode ? '隐藏代码' : '显示代码'}
          </button>
        </div>
      </div>

      {/* Sandpack 编辑器 */}
      {showCode && (
        <Sandpack
          template="react"
          files={allFiles}
          entry={entry}
          theme={theme}
          options={options}
          customSetup={{
            dependencies: {
              react: '^18.2.0',
              'react-dom': '^18.2.0',
              ...dependencies,
            },
            devDependencies: {
              ...devDependencies,
            },
          }}
          onFilesChange={handleCodeChange}
        />
      )}

      {/* 仅预览模式 */}
      {!showCode && (
        <Sandpack
          template="react"
          files={allFiles}
          entry={entry}
          theme={theme}
          options={{
            ...options,
            showTabs: false,
            showConsoleButton: false,
            showLineNumbers: false,
            showRefreshButton: false,
            editorHeight: 0,
            editorWidthPercentage: 0,
          }}
          customSetup={{
            dependencies: {
              react: '^18.2.0',
              'react-dom': '^18.2.0',
              ...dependencies,
            },
            devDependencies: {
              ...devDependencies,
            },
          }}
        />
      )}

      {/* 重置确认对话框 */}
      {showResetConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
        }}>
          <div style={{
            background: 'var(--ifm-background-surface-color)',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              color: 'var(--ifm-font-color-base)',
            }}>
              <FiAlertCircle size={24} color="#f59e0b" />
              <h3 style={{ margin: 0 }}>确认重置</h3>
            </div>
            <p style={{ color: 'var(--ifm-font-color-base)', marginBottom: '20px' }}>
              您确定要重置代码吗？这将删除您所有的修改，并恢复到初始状态。
            </p>
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => setShowResetConfirm(false)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid var(--ifm-toc-border-color)',
                  background: 'transparent',
                  color: 'var(--ifm-font-color-base)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                取消
              </button>
              <button
                onClick={handleReset}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                确认重置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 未保存更改提示 */}
      {hasUnsavedChanges && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#3b82f6',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          animation: 'slideIn 0.3s ease-out',
        }}>
          <FaHistory size={16} />
          <span>代码已自动保存</span>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CodePlayground;
