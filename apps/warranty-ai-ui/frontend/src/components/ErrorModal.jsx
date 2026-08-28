import React from 'react';
import { AlertOctagon, X, RefreshCw } from 'lucide-react';

export default function ErrorModal({ error, onClose, onRetry }) {
  if (!error) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 16
    }}>
      <div style={{
        maxWidth: 600,
        width: '100%',
        backgroundColor: 'var(--color-white)',
        border: '3px solid var(--color-black)',
        borderRadius: 'var(--radius-brutal)',
        padding: 28,
        boxShadow: '8px 8px 0px #FF3B30'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-brutal)',
              backgroundColor: 'var(--neo-red)',
              border: 'var(--border-thick)',
              boxShadow: 'var(--shadow-brutal-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-white)'
            }}>
              <AlertOctagon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 900, color: 'var(--color-black)', letterSpacing: '-0.02em' }}>
                PIPELINE EXECUTION FAILED
              </h2>
              <p className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--neo-red)' }}>
                ZERO MOCK FALLBACK POLICY ACTIVE (AGENTS.MD)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-black)',
              cursor: 'pointer',
              fontWeight: 800
            }}
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        <div style={{
          backgroundColor: 'var(--neo-red-light)',
          border: '2px solid var(--neo-red)',
          borderRadius: 'var(--radius-brutal)',
          padding: 16,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 700,
          color: '#B91C1C',
          marginBottom: 20,
          lineHeight: 1.5,
          wordBreak: 'break-word'
        }}>
          {error}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} className="btn-secondary">
            Dismiss
          </button>
          {onRetry && (
            <button onClick={onRetry} className="btn-primary" style={{ backgroundColor: 'var(--neo-red)', color: 'var(--color-white)' }}>
              <RefreshCw size={15} strokeWidth={2.5} />
              <span>Retry Execution</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
