import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 'doc', label: 'Document Intake & Purchase Extraction', agent: 'Agent 1 (Invoice Specialist)', duration: 1200 },
  { id: 'vision', label: 'Visual Damage & Authenticity Assessment', agent: 'Agent 2 (Vision Specialist)', duration: 1500 },
  { id: 'warranty', label: 'Policy Window & Expiry Arithmetic', agent: 'Agent 3 (Policy Engine)', duration: 900 },
  { id: 'claim', label: 'Cross-Evidence Plausibility Synthesis', agent: 'Agent 4 (Consistency Auditor)', duration: 1400 },
  { id: 'decision', label: 'Final Adjudication & Route Assignment', agent: 'Agent 5 (Decision Synthesizer)', duration: 1100 }
];

export default function ProcessingView() {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => (prev < PIPELINE_STAGES.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: 720, margin: '48px auto', padding: '0 16px' }}>
      <div style={{
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 32,
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--accent-action-subtle)',
            border: '1px solid #3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#60A5FA'
          }}>
            <Cpu size={22} className="pulse-icon" />
          </div>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
              Executing 5-Agent Adjudication Pipeline
            </h2>
            <p className="font-mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              RocketRide DAP Server // Real-time DAG evaluation
            </p>
          </div>
        </div>

        {/* Real Stage Ticker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PIPELINE_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;
            const isPending = idx > currentStageIdx;

            return (
              <div
                key={stage.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isCurrent ? 'var(--surface-subtle)' : 'transparent',
                  border: isCurrent ? '1px solid var(--border-focus)' : '1px solid var(--border-subtle)',
                  opacity: isPending ? 0.4 : 1,
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {isCompleted ? (
                    <CheckCircle2 size={18} color="var(--status-approve)" />
                  ) : isCurrent ? (
                    <span style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: '#3B82F6',
                      boxShadow: '0 0 8px #3B82F6'
                    }} />
                  ) : (
                    <Clock size={16} color="var(--text-dim)" />
                  )}

                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: isCurrent ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {stage.label}
                    </div>
                    <div className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {stage.agent}
                    </div>
                  </div>
                </div>

                <div className="font-mono" style={{
                  fontSize: 11,
                  color: isCompleted ? 'var(--status-approve)' : isCurrent ? '#60A5FA' : 'var(--text-dim)'
                }}>
                  {isCompleted ? 'COMPLETED' : isCurrent ? 'EVALUATING...' : 'QUEUED'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
