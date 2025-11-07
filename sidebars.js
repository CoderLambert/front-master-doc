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
    // 注：更多学习模块即将推出
    // {
    //   type: 'category',
    //   label: '🎣 React Hooks',
    //   collapsed: true,
    //   items: []
    // },
    // {
    //   type: 'category',
    //   label: '🧩 组件模式',
    //   collapsed: true,
    //   items: []
    // },
    // {
    //   type: 'category',
    //   label: '🌊 状态管理',
    //   collapsed: true,
    //   items: []
    // },
    // {
    //   type: 'category',
    //   label: '⚡ 性能优化',
    //   collapsed: true,
    //   items: []
    // }
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
    }
  ]
};

export default sidebars;
