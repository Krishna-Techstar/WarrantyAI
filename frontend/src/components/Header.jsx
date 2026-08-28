import React from 'react';
import { ShieldCheck, Layers, Clock, PlusCircle, Sparkles, Activity } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, pendingCount, onNewClaim }) {
  return (
    <>
      {/* Top Brutalist Ticker Marquee Strip */}
      <div style={{
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-white)',
        borderBottom: 'var(--border-thin)',
        padding: '5px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: 11,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        letterSpacing: '0.06em'
      }}>
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'center' }}>
          <span>● ROCKETRIDE DAP: 100% ONLINE</span>
          <span>//</span>
          <span>⚡ REAL GROQ-120B INFERENCE</span>
          <span>//</span>
          <span>🛡️ ZERO MOCK POLICY (AGENTS.MD)</span>
          <span>//</span>
          <span>⚖️ 5-AGENT DAG ACTIVE</span>
        </div>
      </div>

      {/* Main Header */}
      <header style={{
        borderBottom: 'var(--border-heavy)',
        backgroundColor: 'var(--color-white)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '0 24px',
        boxShadow: '0 4px 0px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: 1360,
          margin: '0 auto',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Brand & System Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('submit')}
            >
              <div style={{
                width: 42,
                height: 42,
                backgroundColor: 'var(--neo-green)',
                border: 'var(--border-heavy)',
                borderRadius: 'var(--radius-brutal)',
                boxShadow: '3px 3px 0px #050505',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-black)',
                transform: 'rotate(-2deg)'
              }}>
                <ShieldCheck size={26} strokeWidth={2.5} />
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 20,
                  fontWeight: 900,
                  color: 'var(--color-black)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  WARRANTY<span style={{
                    backgroundColor: 'var(--color-black)',
                    color: 'var(--neo-green)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-brutal)',
                    transform: 'rotate(2deg)'
                  }}>AI</span>
                </div>
                <div style={{
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  marginTop: 3
                }}>
                  MULTI-AGENT ADJUDICATION // v1.0
                </div>
              </div>
            </div>

            <div style={{
              height: 28,
              width: 3,
              backgroundColor: 'var(--color-black)',
              margin: '0 8px'
            }} />

            {/* Live Engine Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 'var(--radius-brutal)',
              backgroundColor: 'var(--neo-green-light)',
              border: 'var(--border-thin)',
              boxShadow: 'var(--shadow-sm)',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              color: 'var(--color-black)'
            }}>
              <span style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: 'var(--neo-green)',
                border: '2px solid #050505',
                boxShadow: '0 0 6px var(--neo-green)'
              }} />
              <span>DAP ENGINE // GROQ-120B</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setActiveTab('submit')}
              className={activeTab === 'submit' ? 'btn-primary' : 'btn-secondary'}
              style={{
                padding: '10px 18px',
                fontSize: 13
              }}
            >
              <PlusCircle size={16} strokeWidth={2.5} />
              <span>New Claim</span>
            </button>

            <button
              onClick={() => setActiveTab('result')}
              className={activeTab === 'result' ? 'btn-primary' : 'btn-secondary'}
              style={{
                padding: '10px 18px',
                fontSize: 13
              }}
            >
              <Layers size={16} strokeWidth={2.5} />
              <span>Adjudication Bento</span>
            </button>

            <button
              onClick={() => setActiveTab('queue')}
              className={activeTab === 'queue' ? 'btn-primary' : 'btn-secondary'}
              style={{
                padding: '10px 18px',
                fontSize: 13
              }}
            >
              <Clock size={16} strokeWidth={2.5} />
              <span>Review Queue</span>
              {pendingCount > 0 && (
                <span style={{
                  backgroundColor: 'var(--neo-red)',
                  color: 'var(--color-white)',
                  border: '2px solid #050505',
                  borderRadius: 'var(--radius-brutal)',
                  padding: '1px 7px',
                  fontSize: 11,
                  fontWeight: 900,
                  fontFamily: 'var(--font-mono)'
                }}>
                  {pendingCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
