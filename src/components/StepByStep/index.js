import React, { useState } from 'react';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';

const StepByStep = ({
  title,
  steps = [],
  defaultExpanded = false,
  showProgress = true,
}) => {
  const [expandedSteps, setExpandedSteps] = useState(
    defaultExpanded ? steps.map((_, i) => i) : [0]
  );
  const [completedSteps, setCompletedSteps] = useState([]);

  const toggleStep = (index) => {
    setExpandedSteps(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const markComplete = (index) => {
    if (!completedSteps.includes(index)) {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const progress = steps.length > 0
    ? Math.round((completedSteps.length / steps.length) * 100)
    : 0;

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
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>
          {title || '分步指导'}
        </h3>

        {showProgress && steps.length > 0 && (
          <div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: 'white',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '14px',
              opacity: 0.9
            }}>
              进度: {completedSteps.length}/{steps.length} ({progress}%)
            </p>
          </div>
        )}
      </div>

      {/* 步骤列表 */}
      <div>
        {steps.map((step, index) => {
          const isExpanded = expandedSteps.includes(index);
          const isCompleted = completedSteps.includes(index);

          return (
            <div
              key={index}
              style={{
                borderBottom: index < steps.length - 1 ? '1px solid #e0e0e0' : 'none'
              }}
            >
              {/* 步骤标题 */}
              <div
                onClick={() => toggleStep(index)}
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  backgroundColor: isExpanded ? '#f9f9f9' : 'white',
                  transition: 'background-color 0.2s'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted
                      ? '#4caf50'
                      : isExpanded
                      ? '#2196f3'
                      : '#e0e0e0',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    flexShrink: 0
                  }}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{
                    margin: '0 0 5px 0',
                    color: '#333',
                    fontSize: '16px'
                  }}>
                    {step.title}
                  </h4>
                  {step.description && (
                    <p style={{
                      margin: 0,
                      color: '#666',
                      fontSize: '14px'
                    }}>
                      {step.description}
                    </p>
                  )}
                </div>

                {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
              </div>

              {/* 步骤内容 */}
              {isExpanded && (
                <div style={{
                  padding: '20px',
                  backgroundColor: '#fafafa',
                  borderTop: '1px solid #e0e0e0'
                }}>
                  <div
                    style={{
                      marginBottom: '15px',
                      lineHeight: '1.6',
                      color: '#444'
                    }}
                    dangerouslySetInnerHTML={{ __html: step.content }}
                  />

                  {step.code && (
                    <div style={{
                      backgroundColor: '#282c34',
                      color: '#abb2bf',
                      padding: '15px',
                      borderRadius: '8px',
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      fontSize: '14px',
                      overflowX: 'auto',
                      marginBottom: '15px'
                    }}>
                      <pre style={{ margin: 0 }}>
                        {step.code}
                      </pre>
                    </div>
                  )}

                  {!isCompleted && (
                    <button
                      onClick={() => markComplete(index)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      标记为已完成
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepByStep;
