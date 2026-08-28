import React, { useState, useEffect } from 'react';
import { Clock, ShieldAlert, CheckCircle2, XCircle, Check } from 'lucide-react';

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
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-heavy)',
        borderRadius: 'var(--radius-brutal)',
        boxShadow: 'var(--shadow-brutal)',
        padding: '20px 24px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: 'var(--color-black)', marginBottom: 4 }}>
            Specialist Review & Override Queue
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 500 }}>
            Claims flagged for fraud signals, composite lighting, or ambiguous damage.
          </p>
        </div>

        {actionSuccess && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'var(--neo-green-light)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-brutal-sm)',
            color: 'var(--color-black)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-brutal)',
            fontSize: 13,
            fontWeight: 800
          }}>
            <Check size={16} strokeWidth={2.5} />
            <span>{actionSuccess}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, fontWeight: 800, color: 'var(--text-muted)' }}>
          LOADING REVIEW QUEUE...
        </div>
      ) : queue.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 48, fontWeight: 800, color: 'var(--text-muted)' }}>
          NO PENDING CLAIMS IN QUEUE.
        </div>
      ) : (
        <div style={{
          backgroundColor: 'var(--color-white)',
          border: 'var(--border-heavy)',
          borderRadius: 'var(--radius-brutal)',
          boxShadow: 'var(--shadow-brutal)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-white)',
                textAlign: 'left',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase'
              }}>
                <th style={{ padding: '14px 18px' }}>Claim ID</th>
                <th style={{ padding: '14px 18px' }}>Customer & Product</th>
                <th style={{ padding: '14px 18px' }}>Purchase & Amount</th>
                <th style={{ padding: '14px 18px' }}>Route & Reason</th>
                <th style={{ padding: '14px 18px' }}>Risk Flags</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((item) => {
                const isResolved = item.status === 'resolved';
                return (
                  <tr
                    key={item.claim_id}
                    style={{
                      borderBottom: 'var(--border-thick)',
                      backgroundColor: isResolved ? '#F9F9F7' : 'var(--color-white)',
                      opacity: isResolved ? 0.6 : 1
                    }}
                  >
                    <td style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-black)' }}>
                      {item.claim_id}
                    </td>

                    <td style={{ padding: '16px 18px' }}>
                      <div style={{ fontWeight: 800, color: 'var(--color-black)' }}>{item.product}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}>{item.customer}</div>
                    </td>

                    <td style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)' }}>
                      <div style={{ fontWeight: 700 }}>{item.purchase_date}</div>
                      <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>₹{item.price.toLocaleString()} {item.currency}</div>
                    </td>

                    <td style={{ padding: '16px 18px', maxWidth: 300 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span className={`status-pill ${item.route === 'human_review' ? 'status-pill-deny' : 'status-pill-verify'}`} style={{ fontSize: 10 }}>
                          {item.route.toUpperCase()} ({item.confidence}%)
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--color-black)', lineHeight: 1.4, fontWeight: 500 }}>
                        {item.reason}
                      </div>
                    </td>

                    <td style={{ padding: '16px 18px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {item.risk_flags.map((flag, idx) => (
                          <span
                            key={idx}
                            className="font-mono"
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              color: 'var(--neo-red)',
                              backgroundColor: 'var(--neo-red-light)',
                              border: '1px solid var(--neo-red)',
                              padding: '2px 6px',
                              borderRadius: 'var(--radius-brutal)',
                              width: 'fit-content'
                            }}
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                      {isResolved ? (
                        <span className="font-mono" style={{ fontSize: 11, color: '#00A86B', fontWeight: 900 }}>
                          RESOLVED ({item.resolved_action?.toUpperCase()})
                        </span>
                      ) : (
                        <div style={{ display: 'inline-flex', gap: 8 }}>
                          <button
                            onClick={() => handleAction(item.claim_id, 'approve')}
                            className="btn-primary"
                            style={{
                              fontSize: 11,
                              padding: '6px 12px',
                              border: 'var(--border-thin)',
                              boxShadow: 'var(--shadow-brutal-sm)'
                            }}
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleAction(item.claim_id, 'deny')}
                            className="btn-secondary"
                            style={{
                              fontSize: 11,
                              padding: '6px 12px',
                              backgroundColor: 'var(--neo-red)',
                              color: 'var(--color-white)',
                              border: 'var(--border-thin)',
                              boxShadow: 'var(--shadow-brutal-sm)'
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
