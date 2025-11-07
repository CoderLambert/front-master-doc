/**
 * 将单个 React 组件代码转换为 CodePlayground 可用的多文件结构
 */

/**
 * 转换组件代码为完整的应用结构
 * @param {string} componentCode - 组件代码字符串
 * @param {string} componentName - 组件名（首字母大写）
 * @param {Object} options - 选项
 * @param {string} options.title - 应用标题
 * @returns {Object} CodePlayground 格式的文件对象
 */
export function createPlaygroundFiles(componentCode, componentName = 'App', options = {}) {
  const { title = 'React App' } = options;

  // 包装组件代码，确保 export default 存在
  let wrappedCode = componentCode;

  // 如果没有 export default，添加它
  if (!wrappedCode.includes('export default')) {
    wrappedCode = `${componentCode}

export default ${componentName};`;
  }

  // 确保有 React 导入
  if (!wrappedCode.includes('import React')) {
    wrappedCode = `import React from 'react';\n${wrappedCode}`;
  }

  return {
    '/App.js': wrappedCode,
    '/index.js': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
    '/index.html': `<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
  };
}


const renderRegex = /render\s*\(\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\)/;

/**
 * 为 LiveCode 创建单文件代码
 * @param {string} componentCode - 组件代码
 * @param {string} componentName - 组件名
 * @returns {string} 完整的可执行代码
 */
export function createLiveCode(componentCode, componentName = 'App') {
  let code = componentCode;
  const hasRender = renderRegex.test(componentCode);
  // 如果没有 export default，添加它
  if (!hasRender) {
    code = `${code}\nrender(<${componentName} />);`;
  }

  return code;
}
