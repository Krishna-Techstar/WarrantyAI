import React from 'react';
import { ShieldCheck, Layers, Clock, AlertTriangle, Cpu, PlusCircle } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, pendingCount, onNewClaim }) {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-default)',
      backgroundColor: 'var(--surface-card)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 24px'
    }}>
      <div style={{
        maxWidth: 1360,
        margin: '0 auto',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand & System Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer'
          }} onClick={() => setActiveTab('submit')}>
            <div style={{
              width: 34,
              height: 34,
              backgroundColor: 'var(--accent-action-subtle)',
              border: '1px solid #3B82F6',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#60A5FA'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 16,
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1
              }}>
                WARRANTY<span style={{ color: '#3B82F6' }}>AI</span>
              </div>
              <div style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)'
              }}>
                CLAIM ADJUDICATION ENGINE
              </div>
            </div>
          </div>

          <div style={{
            height: 20,
            width: 1,
            backgroundColor: 'var(--border-default)',
            margin: '0 4px'
          }} />

          {/* Engine Connectivity Status */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 9px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--surface-subtle)',
            border: '1px solid var(--border-subtle)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)'
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'var(--status-approve)',
              boxShadow: '0 0 6px var(--status-approve)'
            }} />
            <span>RocketRide DAP // Groq LLaMA-120B</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={() => setActiveTab('submit')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              border: activeTab === 'submit' ? '1px solid var(--border-focus)' : '1px solid transparent',
              backgroundColor: activeTab === 'submit' ? 'var(--surface-subtle)' : 'transparent',
              color: activeTab === 'submit' ? 'var(--text-primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <PlusCircle size={15} />
            <span>New Claim</span>
          </button>

          <button
            onClick={() => setActiveTab('result')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              border: activeTab === 'result' ? '1px solid var(--border-focus)' : '1px solid transparent',
              backgroundColor: activeTab === 'result' ? 'var(--surface-subtle)' : 'transparent',
              color: activeTab === 'result' ? 'var(--text-primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Layers size={15} />
            <span>Adjudication Bento</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              border: activeTab === 'queue' ? '1px solid var(--border-focus)' : '1px solid transparent',
              backgroundColor: activeTab === 'queue' ? 'var(--surface-subtle)' : 'transparent',
              color: activeTab === 'queue' ? 'var(--text-primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Clock size={15} />
            <span>Review Queue</span>
            {pendingCount > 0 && (
              <span style={{
                backgroundColor: 'var(--status-verify-bg)',
                color: 'var(--status-verify)',
                border: '1px solid var(--status-verify-border)',
                borderRadius: 'var(--radius-pill)',
                padding: '1px 6px',
                fontSize: 10,
                fontWeight: 700,
                fontFamily: 'var(--font-mono)'
              }}>
                {pendingCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
