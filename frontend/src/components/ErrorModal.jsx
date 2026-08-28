import React from 'react';
import { AlertOctagon, X, RefreshCw } from 'lucide-react';

export default function ErrorModal({ error, onClose, onRetry }) {
  if (!error) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 16
    }}>
      <div style={{
        maxWidth: 580,
        width: '100%',
        backgroundColor: 'var(--surface-card)',
        border: '2px solid var(--status-deny)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--status-deny-bg)',
              border: '1px solid var(--status-deny-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-deny)'
            }}>
              <AlertOctagon size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--status-deny)', letterSpacing: '-0.01em' }}>
                PIPELINE CALL FAILED — NO REAL DATA
              </h2>
              <p className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Zero Mock Fallback Policy Active (AGENTS.md)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{
          backgroundColor: '#070A0E',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          padding: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: '#FCA5A5',
          marginBottom: 18,
          lineHeight: 1.5,
          wordBreak: 'break-word'
        }}>
          {error}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button onClick={onClose} className="btn-secondary">
            Dismiss
          </button>
          {onRetry && (
            <button onClick={onRetry} className="btn-primary" style={{ backgroundColor: 'var(--status-deny)', borderColor: 'var(--status-deny)' }}>
              <RefreshCw size={14} />
              <span>Retry Execution</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
