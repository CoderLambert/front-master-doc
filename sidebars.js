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
        'foundations/state-lifecycle',
        'foundations/events',
        'foundations/conditional-rendering',
        'foundations/lists-and-keys',
        'foundations/forms',
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
          collapsed: true,
          items: [
            'hooks/basics/useState',
            'hooks/basics/useEffect',
            'hooks/basics/useContext',
          ]
        },
        {
          type: 'category',
          label: '进阶Hooks',
          collapsed: true,
          items: [
            'hooks/advanced/useReducer',
            'hooks/advanced/useCallback',
            'hooks/advanced/useMemo',
            'hooks/advanced/custom-hooks',
          ]
        }
      ]
    },
    {
      type: 'category',
      label: '🧩 组件模式',
      collapsed: true,
      items: [
        'patterns/basics/functional-components',
        'patterns/basics/higher-order-components',
        'patterns/basics/render-props',
        'patterns/basics/compound-components',
        'patterns/basics/container-presentational'
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
          collapsed: true,
          items: [
            'state-management/basics/local-vs-global',
            'state-management/basics/context-api',
          ]
        },
        {
          type: 'category',
          label: '中级方案',
          collapsed: true,
          items: [
            'state-management/intermediate/redux-fundamentals',
            'state-management/intermediate/zustand',
            'state-management/intermediate/jotai',
          ]
        }
      ]
    },
    {
      type: 'category',
      label: '⚡ 性能优化',
      collapsed: true,
      items: [
        'performance/basics/react-memo',
        'performance/basics/virtualization',
        'performance/basics/code-splitting',
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
        'foundations/state-lifecycle',
        'foundations/events',
        'foundations/conditional-rendering',
        'foundations/lists-and-keys',
        'foundations/forms',
      ]
    },
    {
      type: 'category',
      label: 'React Hooks',
      items: [
        'hooks/basics/useState',
        'hooks/basics/useEffect',
        'hooks/basics/useContext',
        'hooks/advanced/useReducer',
        'hooks/advanced/useCallback',
        'hooks/advanced/useMemo',
        'hooks/advanced/custom-hooks',
      ]
    },
    {
      type: 'category',
      label: '组件模式',
      items: [
        'patterns/basics/functional-components',
        'patterns/basics/higher-order-components',
        'patterns/basics/render-props',
        'patterns/basics/compound-components',
        'patterns/basics/container-presentational'
      ]
    },
    {
      type: 'category',
      label: '状态管理',
      items: [
        'state-management/basics/local-vs-global',
        'state-management/basics/context-api',
        'state-management/intermediate/redux-fundamentals',
        'state-management/intermediate/zustand',
        'state-management/intermediate/jotai',
      ]
    },
    {
      type: 'category',
      label: '性能优化',
      items: [
        'performance/basics/react-memo',
        'performance/basics/virtualization',
        'performance/basics/code-splitting',
      ]
    }
  ]
};

export default sidebars;
