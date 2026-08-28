import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, Clock } from 'lucide-react';

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
    <div style={{ maxWidth: 760, margin: '48px auto', padding: '0 16px' }}>
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-heavy)',
        borderRadius: 'var(--radius-brutal)',
        padding: 32,
        boxShadow: 'var(--shadow-brutal-lg)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: 'var(--border-thick)'
        }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 'var(--radius-brutal)',
            backgroundColor: 'var(--neo-green)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-brutal-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-black)'
          }}>
            <Cpu size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: 'var(--color-black)' }}>
              Executing 5-Agent Adjudication DAG
            </h2>
            <p className="font-mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>
              ROCKETRIDE DAP // LIVE MULTI-AGENT INFERENCE
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
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-brutal)',
                  backgroundColor: isCurrent ? 'var(--neo-green-light)' : isCompleted ? 'var(--surface-subtle)' : 'var(--color-white)',
                  border: isCurrent ? '2.5px solid var(--neo-green)' : 'var(--border-thick)',
                  boxShadow: isCurrent ? 'var(--shadow-brutal-green)' : isCompleted ? 'var(--shadow-brutal-sm)' : 'none',
                  opacity: isPending ? 0.4 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {isCompleted ? (
                    <CheckCircle2 size={22} color="#00A86B" strokeWidth={2.5} />
                  ) : isCurrent ? (
                    <span style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-black)',
                      border: '2px solid var(--neo-green)',
                      boxShadow: '0 0 8px var(--neo-green)'
                    }} />
                  ) : (
                    <Clock size={20} color="var(--text-muted)" strokeWidth={2} />
                  )}

                  <div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: 'var(--color-black)',
                      textTransform: 'uppercase'
                    }}>
                      {stage.label}
                    </div>
                    <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>
                      {stage.agent}
                    </div>
                  </div>
                </div>

                <div className="font-mono" style={{
                  fontSize: 11,
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-brutal)',
                  border: '1.5px solid #000000',
                  backgroundColor: isCompleted ? 'var(--neo-green)' : isCurrent ? 'var(--color-black)' : 'var(--surface-subtle)',
                  color: isCompleted ? 'var(--color-black)' : isCurrent ? 'var(--color-white)' : 'var(--text-muted)'
                }}>
                  {isCompleted ? 'COMPLETED' : isCurrent ? 'EVALUATING' : 'QUEUED'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
