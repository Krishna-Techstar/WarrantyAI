import React from 'react';
import { ShieldCheck, Layers, Clock, PlusCircle } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, pendingCount, onNewClaim }) {
  return (
    <header style={{
      borderBottom: 'var(--border-heavy)',
      backgroundColor: 'var(--color-white)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 24px'
    }}>
      <div style={{
        maxWidth: 1360,
        margin: '0 auto',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand & System Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('submit')}
          >
            <div style={{
              width: 38,
              height: 38,
              backgroundColor: 'var(--neo-green)',
              border: 'var(--border-thick)',
              borderRadius: 'var(--radius-brutal)',
              boxShadow: 'var(--shadow-brutal-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-black)'
            }}>
              <ShieldCheck size={22} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 18,
                fontWeight: 900,
                color: 'var(--color-black)',
                letterSpacing: '-0.04em',
                lineHeight: 1
              }}>
                WARRANTY<span style={{ backgroundColor: 'var(--color-black)', color: 'var(--neo-green)', padding: '1px 4px', marginLeft: 2 }}>AI</span>
              </div>
              <div style={{
                fontSize: 10,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                marginTop: 2
              }}>
                ADJUDICATION ENGINE // ROCKETRIDE
              </div>
            </div>
          </div>

          <div style={{
            height: 24,
            width: 2.5,
            backgroundColor: 'var(--color-black)',
            margin: '0 6px'
          }} />

          {/* Engine Connectivity Status */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 10px',
            borderRadius: 'var(--radius-brutal)',
            backgroundColor: 'var(--surface-subtle)',
            border: 'var(--border-thin)',
            boxShadow: '2px 2px 0px #000000',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--color-black)'
          }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'var(--neo-green)',
              border: '1.5px solid #000000'
            }} />
            <span>DAP LIVE // GROQ LLaMA-120B</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setActiveTab('submit')}
            className={activeTab === 'submit' ? 'btn-primary' : 'btn-secondary'}
            style={{
              padding: '8px 14px',
              fontSize: 12
            }}
          >
            <PlusCircle size={15} strokeWidth={2.5} />
            <span>New Claim</span>
          </button>

          <button
            onClick={() => setActiveTab('result')}
            className={activeTab === 'result' ? 'btn-primary' : 'btn-secondary'}
            style={{
              padding: '8px 14px',
              fontSize: 12
            }}
          >
            <Layers size={15} strokeWidth={2.5} />
            <span>Adjudication Bento</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={activeTab === 'queue' ? 'btn-primary' : 'btn-secondary'}
            style={{
              padding: '8px 14px',
              fontSize: 12
            }}
          >
            <Clock size={15} strokeWidth={2.5} />
            <span>Review Queue</span>
            {pendingCount > 0 && (
              <span style={{
                backgroundColor: 'var(--neo-red)',
                color: 'var(--color-white)',
                border: '1.5px solid #000000',
                borderRadius: 'var(--radius-brutal)',
                padding: '0 6px',
                fontSize: 10,
                fontWeight: 800,
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
