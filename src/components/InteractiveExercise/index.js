import React, { useState } from 'react';
import { FiCheck, FiX, FiEye, FiCode } from 'react-icons/fi';

const InteractiveExercise = ({
  title,
  description,
  starterCode,
  solution,
  instructions,
  difficulty = 'beginner',
  showSolution = false,
}) => {
  const [showSolution, setShowSolution] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner':
        return '#4caf50';
      case 'intermediate':
        return '#ff9800';
      case 'advanced':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  return (
    <div style={{
      margin: '30px 0',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {/* 头部 */}
      <div style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '20px' }}>{title}</h3>
          <span style={{
            padding: '4px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            fontSize: '12px',
            textTransform: 'uppercase',
            fontWeight: 'bold'
          }}>
            {difficulty}
          </span>
        </div>
        {description && (
          <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
            {description}
          </p>
        )}
      </div>

      {/* 练习说明 */}
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>
          📋 练习说明
        </h4>
        <p style={{ margin: 0, color: '#666', lineHeight: '1.6' }}>
          {instructions}
        </p>
      </div>

      {/* 起始代码 */}
      <div style={{ padding: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>
          💻 起始代码
        </h4>
        <div style={{
          backgroundColor: '#f8f8f8',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '15px',
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          fontSize: '14px',
          lineHeight: '1.6',
          overflowX: 'auto'
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {starterCode}
          </pre>
        </div>
      </div>

      {/* 按钮组 */}
      <div style={{
        padding: '20px',
        backgroundColor: '#fafafa',
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {showCode ? <FiEye /> : <FiCode />}
          {showCode ? '隐藏' : '显示'}代码
        </button>

        <button
          onClick={() => setShowSolution(!showSolution)}
          style={{
            padding: '10px 20px',
            backgroundColor: getDifficultyColor(difficulty),
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {showSolution ? <FiX /> : <FiCheck />}
          {showSolution ? '隐藏' : '查看'}答案
        </button>
      </div>

      {/* 解决方案 */}
      {showSolution && (
        <div style={{ padding: '20px', borderTop: '1px solid #e0e0e0' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>
            ✅ 参考答案
          </h4>
          <div style={{
            backgroundColor: '#f0f0f0',
            border: '1px solid #d0d0d0',
            borderRadius: '8px',
            padding: '15px',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '14px',
            lineHeight: '1.6',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {solution}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveExercise;
