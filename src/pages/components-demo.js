import React from 'react';
import Layout from '@theme/Layout';
import { CodePlayground, LiveCode, CodeBlock, CopyButton } from '@site/src/components';

function ComponentsDemo() {
  const codeExample = `
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>计数器</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          margin: '5px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        +1
      </button>
    </div>
  );
}
  `.trim();

  return (
    <Layout
      title="组件演示"
      description="交互式组件演示页面"
    >
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>交互式组件演示</h1>

        <section style={{ marginBottom: '60px' }}>
          <h2>1. CodePlayground 组件</h2>
          <p>完整的代码编辑器，支持多文件编辑和实时预览</p>

          <CodePlayground
            files={{
              '/App.js': codeExample,
            }}
            showConsole={true}
            showTabs={true}
            editorHeight={400}
          />
        </section>

        <section style={{ marginBottom: '60px' }}>
          <h2>2. LiveCode 组件</h2>
          <p>轻量级实时代码预览组件</p>

          <LiveCode
            code={codeExample}
            showEditor={true}
            showPreview={true}
            showError={true}
          />
        </section>

        <section style={{ marginBottom: '60px' }}>
          <h2>3. CodeBlock 组件</h2>
          <p>增强的代码块组件，支持语法高亮和复制</p>

          <CodeBlock
            language="jsx"
            showLineNumbers={true}
            showCopyButton={true}
          >
{codeExample}
          </CodeBlock>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <h2>4. CopyButton 组件</h2>
          <p>独立的复制按钮组件</p>

          <div style={{
            position: 'relative',
            padding: '20px',
            border: '1px solid var(--ifm-toc-border-color)',
            borderRadius: '8px',
            background: 'var(--ifm-background-surface-color)',
          }}>
            <pre style={{ margin: 0 }}>
              <code>
{codeExample}
              </code>
            </pre>
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
              <CopyButton
                code={codeExample}
                showIcon={true}
                showText={true}
                size="medium"
              />
            </div>
          </div>
        </section>

        <section>
          <h2>5. 综合示例</h2>
          <p>多个组件一起使用</p>

          <LiveCode
            code={`
function TodoList() {
  const [todos, setTodos] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const addItem = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleItem = (id) => {
    setTodos(todos.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>待办事项列表</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addItem()}
          placeholder="添加新任务..."
          style={{ padding: '8px', width: '250px', marginRight: '10px' }}
        />
        <button onClick={addItem} style={{ padding: '8px 15px' }}>
          添加
        </button>
      </div>
      <ul style={{ marginTop: '20px', listStyle: 'none' }}>
        {todos.map(item => (
          <li key={item.id} style={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{
              textDecoration: item.completed ? 'line-through' : 'none',
              flex: 1
            }}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
            `.trim()}
          />
        </section>
      </div>
    </Layout>
  );
}

export default ComponentsDemo;
