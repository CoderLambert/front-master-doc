// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Main sidebar for React Learning Center
  reactLearningCenter: [
    'intro',
    'roadmap',
    {
      type: 'category',
      label: '🚀 基础入门',
      collapsed: false,
      items: [
        'foundations/what-is-react',
        'foundations/jsx-syntax',
        'foundations/components-props',
        // 'foundations/state-lifecycle', // 即将推出
      ]
    },
    {
      type: 'category',
      label: '🎣 React Hooks',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: '基础Hooks',
          items: [
            // 'hooks/basics/useState', // 即将推出
            // 'hooks/basics/useEffect', // 即将推出
            // 'hooks/basics/useContext', // 即将推出
          ]
        },
        {
          type: 'category',
          label: '高级Hooks',
          items: [
            // 'hooks/advanced/useReducer', // 即将推出
            // 'hooks/advanced/useCallback', // 即将推出
            // 'hooks/advanced/useMemo', // 即将推出
            // 'hooks/advanced/custom-hooks', // 即将推出
          ]
        }
      ]
    },
    {
      type: 'category',
      label: '🧩 组件模式',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: '基础模式',
          items: [
            // 'patterns/basics/functional-components', // 即将推出
            // 'patterns/basics/higher-order-components', // 即将推出
            // 'patterns/basics/render-props', // 即将推出
            // 'patterns/basics/compound-components', // 即将推出
          ]
        },
        {
          type: 'category',
          label: '高级模式',
          items: [
            // 'patterns/advanced/context-patterns', // 即将推出
            // 'patterns/advanced/hooks-patterns', // 即将推出
            // 'patterns/advanced/error-boundaries', // 即将推出
          ]
        }
      ]
    },
    {
      type: 'category',
      label: '🌊 状态管理',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: '基础概念',
          items: [
            // 'state-management/basics/local-vs-global', // 即将推出
          ]
        },
        {
          type: 'category',
          label: '中间方案',
          items: [
            // 'state-management/intermediate/context-api', // 即将推出
            // 'state-management/intermediate/redux-fundamentals', // 即将推出
            // 'state-management/intermediate/zustand', // 即将推出
          ]
        }
      ]
    },
    {
      type: 'category',
      label: '⚡ 性能优化',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: '基础优化',
          items: [
            // 'performance/basics/react-memo', // 即将推出
            // 'performance/basics/virtualization', // 即将推出
            // 'performance/basics/code-splitting', // 即将推出
          ]
        },
        {
          type: 'category',
          label: '高级优化',
          items: [
            // 'performance/advanced/profiling', // 即将推出
            // 'performance/advanced/concurrent-features', // 即将推出
          ]
        }
      ]
    }
  ],

  // Legacy sidebar for backward compatibility
  tutorialSidebar: [
    'intro',
    'roadmap',
    {
      type: 'category',
      label: '基础入门',
      items: [
        'foundations/what-is-react',
        'foundations/jsx-syntax',
        'foundations/components-props',
      ]
    }
  ]
};

export default sidebars;
