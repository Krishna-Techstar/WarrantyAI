import React, { useState, useEffect } from 'react';
import { Clock, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, ArrowUpRight, Check } from 'lucide-react';

export default function HumanReviewQueue({ onInspectClaim }) {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState(null);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://127.0.0.1:8000/api/queue');
      const data = await res.json();
      setQueue(data.queue || []);
    } catch (err) {
      console.error('Failed to fetch queue:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (claimId, action) => {
    try {
      const formData = new FormData();
      formData.append('action', action);
      formData.append('notes', `Specialist manual override: ${action}`);

      const res = await fetch(`http://127.0.0.1:8000/api/queue/${claimId}/action`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setActionSuccess(`Claim ${claimId} successfully ${action}d.`);
        fetchQueue();
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Action failed:', err);
    }
  };

  return (
    <div style={{ maxWidth: 1360, margin: '36px auto', padding: '0 20px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
            Specialist Review & Verification Queue
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            Claims flagged for fraud signals, ambiguous physical damage, or warranty expiration edge-cases.
          </p>
        </div>

        {actionSuccess && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'var(--status-approve-bg)',
            border: '1px solid var(--status-approve-border)',
            color: 'var(--status-approve)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: 13,
            fontWeight: 600
          }}>
            <Check size={16} />
            <span>{actionSuccess}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>
          Loading review queue...
        </div>
      ) : queue.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>
          No pending claims in the review queue.
        </div>
      ) : (
        <div style={{
          backgroundColor: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{
                backgroundColor: 'var(--surface-subtle)',
                borderBottom: '1px solid var(--border-default)',
                color: 'var(--text-muted)',
                textAlign: 'left',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase'
              }}>
                <th style={{ padding: '12px 16px' }}>Claim ID</th>
                <th style={{ padding: '12px 16px' }}>Customer & Product</th>
                <th style={{ padding: '12px 16px' }}>Purchase & Amount</th>
                <th style={{ padding: '12px 16px' }}>Route & Reason</th>
                <th style={{ padding: '12px 16px' }}>Risk Flags</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((item) => {
                const isResolved = item.status === 'resolved';
                return (
                  <tr
                    key={item.claim_id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      backgroundColor: isResolved ? 'rgba(0,0,0,0.2)' : 'transparent',
                      opacity: isResolved ? 0.6 : 1
                    }}
                  >
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.claim_id}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.product}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{item.customer}</div>
                    </td>

                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)' }}>
                      <div>{item.purchase_date}</div>
                      <div style={{ color: 'var(--text-muted)' }}>₹{item.price.toLocaleString()} {item.currency}</div>
                    </td>

                    <td style={{ padding: '14px 16px', maxWidth: 300 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span className={`status-pill ${item.route === 'human_review' ? 'status-pill-deny' : 'status-pill-verify'}`} style={{ fontSize: 10 }}>
                          {item.route.toUpperCase()} ({item.confidence}%)
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {item.reason}
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {item.risk_flags.map((flag, idx) => (
                          <span
                            key={idx}
                            className="font-mono"
                            style={{
                              fontSize: 10,
                              color: 'var(--status-deny)',
                              backgroundColor: 'var(--status-deny-bg)',
                              padding: '2px 6px',
                              borderRadius: 'var(--radius-sm)',
                              width: 'fit-content'
                            }}
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      {isResolved ? (
                        <span className="font-mono" style={{ fontSize: 11, color: 'var(--status-approve)', fontWeight: 600 }}>
                          RESOLVED ({item.resolved_action?.toUpperCase()})
                        </span>
                      ) : (
                        <div style={{ display: 'inline-flex', gap: 6 }}>
                          <button
                            onClick={() => handleAction(item.claim_id, 'approve')}
                            className="btn-secondary"
                            style={{
                              fontSize: 12,
                              padding: '5px 10px',
                              borderColor: 'var(--status-approve-border)',
                              color: 'var(--status-approve)'
                            }}
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleAction(item.claim_id, 'deny')}
                            className="btn-secondary"
                            style={{
                              fontSize: 12,
                              padding: '5px 10px',
                              borderColor: 'var(--status-deny-border)',
                              color: 'var(--status-deny)'
                            }}
                          >
                            Deny
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
