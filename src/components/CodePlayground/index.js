import React, { useState } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { useColorMode } from '@docusaurus/theme-common';
import { FiSun, FiMoon } from 'react-icons/fi';

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
}) => {
  const { colorMode } = useColorMode();
  const [showCode, setShowCode] = useState(true);

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
    ...files,
  };

  // 主题 - 使用默认主题，根据colorMode调整
  const theme = customTheme || (colorMode === 'dark' ? 'dark' : 'light');

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
        }}>
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
    </div>
  );
};

export default CodePlayground;
