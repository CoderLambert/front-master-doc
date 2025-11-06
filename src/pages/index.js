import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            fontSize: '64px',
            marginRight: '20px'
          }}>⚛️</div>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
        </div>
        <p className="hero__subtitle" style={{
          fontSize: '24px',
          marginBottom: '30px'
        }}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{
              marginRight: '10px',
              marginBottom: '10px'
            }}>
            🚀 开始学习
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/roadmap"
            style={{
              marginRight: '10px',
              marginBottom: '10px'
            }}>
            📋 学习路线图
          </Link>
        </div>
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          maxWidth: '800px',
          margin: '40px auto 0'
        }}>
          <p style={{ margin: 0, fontSize: '16px' }}>
            ✨ 通过实际示例和交互式演示，系统掌握React开发技能
          </p>
        </div>
      </div>
    </header>
  );
}

function LearningPathCard({ icon, title, description, to, color }) {
  return (
    <div style={{
      padding: '30px',
      borderRadius: '8px',
      border: `2px solid ${color}`,
      background: 'var(--ifm-background-surface-color)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}>
      <div style={{
        fontSize: '48px',
        marginBottom: '15px'
      }}>{icon}</div>
      <h3 style={{
        fontSize: '24px',
        marginBottom: '10px',
        color: color
      }}>{title}</h3>
      <p style={{
        fontSize: '16px',
        color: 'var(--ifm-font-color-base)',
        marginBottom: '15px'
      }}>{description}</p>
      <Link
        to={to}
        style={{
          color: color,
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
        开始学习 →
      </Link>
    </div>
  );
}

function LearningModules() {
  return (
    <section className={styles.features} style={{ padding: '50px 0' }}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--12')} style={{ textAlign: 'center', marginBottom: '50px' }}>
            <Heading as="h2" style={{ fontSize: '36px', marginBottom: '20px' }}>
              📚 学习模块
            </Heading>
            <p style={{ fontSize: '18px', color: 'var(--ifm-font-color-base)' }}>
              五个核心模块，助你从零基础到精通React
            </p>
          </div>
        </div>

        <div className="row" style={{ marginBottom: '30px' }}>
          <div className={clsx('col col--4')}>
            <LearningPathCard
              icon="🚀"
              title="基础入门"
              description="React核心概念、JSX语法、组件与Props"
              to="/docs/foundations/what-is-react"
              color="#0969da"
            />
          </div>
          <div className={clsx('col col--4')}>
            <LearningPathCard
              icon="🎣"
              title="React Hooks"
              description="useState、useEffect、useContext等Hooks详解"
              to="/docs/hooks/basics/useState"
              color="#e11d48"
            />
          </div>
          <div className={clsx('col col--4')}>
            <LearningPathCard
              icon="🧩"
              title="组件模式"
              description="HOC、Render Props、组合模式等设计模式"
              to="/docs/patterns/basics/functional-components"
              color="#8b5cf6"
            />
          </div>
        </div>

        <div className="row">
          <div className={clsx('col col--6')}>
            <LearningPathCard
              icon="🌊"
              title="状态管理"
              description="Context API、Redux、Zustand等状态管理方案"
              to="/docs/state-management/basics/local-vs-global"
              color="#059669"
            />
          </div>
          <div className={clsx('col col--6')}>
            <LearningPathCard
              icon="⚡"
              title="性能优化"
              description="React.memo、虚拟化、代码分割等优化技巧"
              to="/docs/performance/basics/react-memo"
              color="#f59e0b"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section style={{
      padding: '60px 0',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <Heading as="h2" style={{
          fontSize: '36px',
          marginBottom: '20px',
          color: 'white'
        }}>
          💡 为什么选择我们的学习中心？
        </Heading>
        <div className="row" style={{ marginTop: '40px' }}>
          <div className={clsx('col col--3')}>
            <div style={{
              fontSize: '48px',
              marginBottom: '15px'
            }}>✨</div>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
              交互式学习
            </h3>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>
              每个概念都配有可编辑的代码示例
            </p>
          </div>
          <div className={clsx('col col--3')}>
            <div style={{
              fontSize: '48px',
              marginBottom: '15px'
            }}>🎯</div>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
              渐进式路径
            </h3>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>
              从基础到高级的系统化学习路径
            </p>
          </div>
          <div className={clsx('col col--3')}>
            <div style={{
              fontSize: '48px',
              marginBottom: '15px'
            }}>💪</div>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
              实战练习
            </h3>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>
              每章节后都有实践练习巩固所学
            </p>
          </div>
          <div className={clsx('col col--3')}>
            <div style={{
              fontSize: '48px',
              marginBottom: '15px'
            }}>🚀</div>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
              最佳实践
            </h3>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>
              学习React开发的最佳实践和技巧
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GettingStartedSection() {
  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--12')} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Heading as="h2" style={{ fontSize: '36px', marginBottom: '20px' }}>
              🎓 准备好开始了吗？
            </Heading>
            <p style={{ fontSize: '18px', color: 'var(--ifm-font-color-base)' }}>
              跟随我们的学习路径，2-3个月内掌握React开发
            </p>
          </div>
        </div>

        <div className="row" style={{ justifyContent: 'center' }}>
          <div className={clsx('col col--8')}>
            <div style={{
              background: 'var(--ifm-background-surface-color)',
              border: '1px solid var(--ifm-toc-border-color)',
              borderRadius: '8px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>
                第一步：阅读入门指南
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'var(--ifm-font-color-base)',
                marginBottom: '30px'
              }}>
                了解React学习中心的结构和使用方法
              </p>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                📖 阅读入门指南
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title={`React学习中心 - 从零基础到精通React`}
      description="React学习中心 - 提供从基础概念到高级主题的完整学习路径，通过实际示例和交互式演示帮助你更好地理解和掌握React">
      <HomepageHeader />
      <main>
        <LearningModules />
        <QuickStartSection />
        <GettingStartedSection />
      </main>
    </Layout>
  );
}
