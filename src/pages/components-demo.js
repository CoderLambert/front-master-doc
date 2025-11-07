import Layout from '@theme/Layout';
import { CodePlayground, LiveCode, CodeBlock, CopyButton } from '@site/src/components';
import { createPlaygroundFiles, createLiveCode } from '@site/src/utils/codeTransform';

// Import code examples as raw text (raw-loader handles .txt files)
import CounterCode from '!!raw-loader!@site/src/code-examples/Counter.tsx';
import TodoListCode from '!!raw-loader!@site/src/code-examples/TodoList.tsx';

function ComponentsDemo() {
  // 转换代码为 CodePlayground 格式
  const counterFiles = createPlaygroundFiles(CounterCode.trim(), 'Counter', { title: '计数器示例' });
  const todoListFiles = createPlaygroundFiles(TodoListCode.trim(), 'TodoList', { title: '待办事项列表' });

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
            files={counterFiles}
            showConsole={true}
            showTabs={true}
            editorHeight={400}
          />
        </section>


       <section style={{ marginBottom: '60px' }}>
          <h2>1. todoListFiles 组件</h2>
          <p>完整的代码编辑器，支持多文件编辑和实时预览</p>

          <CodePlayground
            files={todoListFiles}
            showConsole={true}
            showTabs={true}
            editorHeight={400}
          />
        </section>

        <section style={{ marginBottom: '60px' }}>
          <h2>2. LiveCode 组件</h2>
          <p>轻量级实时代码预览组件</p>

          <LiveCode
            code={CounterCode}
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
            {CounterCode}
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
                {CounterCode}
              </code>
            </pre>
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
              <CopyButton
                code={CounterCode}
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
          <p>noInline={true} 时必须使用 render 渲染组件</p>
          <LiveCode
            noInline={true}
            code={`${createLiveCode(TodoListCode, 'TodoList')};
            `}
          />
        </section>
      </div>
    </Layout>
  );
}

export default ComponentsDemo;
