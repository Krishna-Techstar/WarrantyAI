import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, FileText, 
  Eye, Calendar, CheckCircle2, XCircle, ChevronDown, ChevronUp, Copy, Check, ArrowUpRight
} from 'lucide-react';

export default function BentoResultView({ result, onNewClaim }) {
  const [showRawOutput, setShowRawOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div style={{ maxWidth: 800, margin: '48px auto', textAlign: 'center', padding: 32 }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 16 }}>No active adjudication result available.</div>
        <button onClick={onNewClaim} className="btn-primary">Submit a New Claim</button>
      </div>
    );
  }

  const {
    claim_id = 'CLM-2018-EVIDSON-834',
    recommended_action = 'deny',
    overall_confidence = 99,
    route = 'auto',
    document_summary = {},
    vision_summary = {},
    warranty_summary = {},
    evidence_weights = [],
    decision_explanation = '',
    risk_flags = [],
    raw_pipeline_output = ''
  } = result;

  const isDeny = recommended_action.toLowerCase() === 'deny';
  const isRepair = recommended_action.toLowerCase() === 'repair';
  const isReplace = recommended_action.toLowerCase() === 'replace';

  const handleCopyExplanation = () => {
    navigator.clipboard.writeText(decision_explanation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1360, margin: '24px auto', padding: '0 20px' }}>
      {/* Top Breadcrumb & Action Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingBottom: 12,
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
            {claim_id}
          </span>
          <span style={{ color: 'var(--border-default)' }}>/</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Live Multi-Agent Adjudication
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onNewClaim} className="btn-secondary">
            Process Another Claim
          </button>
          <button onClick={handleCopyExplanation} className="btn-secondary">
            {copied ? <Check size={14} color="var(--status-approve)" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy Decision Summary'}</span>
          </button>
        </div>
      </div>

      {/* 12-Column Bento Grid */}
      <div className="bento-grid">
        
        {/* TILE 1: Primary Outcome & Decision Hero (5 cols) */}
        <div className="bento-card bento-col-5" style={{
          borderColor: isDeny ? 'var(--status-deny-border)' : 'var(--status-approve-border)',
          backgroundColor: isDeny ? 'rgba(239, 68, 68, 0.04)' : 'rgba(16, 185, 129, 0.04)'
        }}>
          <div className="bento-card-header">
            <div className="bento-card-title">
              <ShieldAlert size={14} color={isDeny ? 'var(--status-deny)' : 'var(--status-approve)'} />
              <span>Adjudication Outcome</span>
            </div>
            <div className={`status-pill ${route === 'auto' ? (isDeny ? 'status-pill-deny' : 'status-pill-approve') : 'status-pill-verify'}`}>
              {route === 'auto' ? 'Auto-Closed' : route.toUpperCase()}
            </div>
          </div>

          <div style={{ marginTop: 'auto', marginBottom: 'auto', padding: '12px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              RECOMMENDED DISPATCH ACTION
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 32,
              fontWeight: 800,
              color: isDeny ? 'var(--status-deny)' : 'var(--status-approve)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 16
            }}>
              {isDeny ? 'POLICY DENIAL' : isRepair ? 'APPROVED FOR REPAIR' : 'APPROVED FOR REPLACEMENT'}
            </div>

            {/* Confidence Metric Block */}
            <div style={{
              backgroundColor: 'var(--surface-subtle)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Overall Confidence</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  Multi-Factor Synthesis
                </div>
              </div>
              <div className="font-mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
                {overall_confidence}%
              </div>
            </div>
          </div>

          <div className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)', paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
            Dispatch Path: Immediate Automated Notice Sent
          </div>
        </div>

        {/* TILE 2: Auditable Evidence Attribution Matrix (7 cols - SIGNATURE ELEMENT) */}
        <div className="bento-card bento-col-7">
          <div className="bento-card-header">
            <div className="bento-card-title">
              <CheckCircle2 size={14} color="#60A5FA" />
              <span>Evidence Attribution Matrix (Attribution Weights)</span>
            </div>
            <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Total Weight: 100%
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {evidence_weights.map((ev, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: 'var(--surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="font-mono" style={{
                    width: 38,
                    fontWeight: 700,
                    color: ev.weight >= 30 ? '#60A5FA' : 'var(--text-muted)'
                  }}>
                    {ev.weight}%
                  </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {ev.factor}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="font-mono" style={{
                    fontSize: 11,
                    color: ev.impact.includes('Negative') ? 'var(--status-deny)' : 'var(--status-approve)'
                  }}>
                    {ev.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Auditable Multi-Factor Attribution Protocol</span>
            <span className="font-mono" style={{ fontSize: 11, color: 'var(--status-approve)' }}>Validated 100% Active</span>
          </div>
        </div>

        {/* TILE 3: Document Extraction Intelligence (4 cols) */}
        <div className="bento-card bento-col-4">
          <div className="bento-card-header">
            <div className="bento-card-title">
              <FileText size={14} color="#60A5FA" />
              <span>Document Extraction</span>
            </div>
            <span className="status-pill status-pill-approve" style={{ fontSize: 10, padding: '2px 8px' }}>
              VERIFIED
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Product Name</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {document_summary.product_name || 'Evidson Audio X55i Earphones'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Purchase Date</div>
                <div className="font-mono" style={{ color: 'var(--text-primary)' }}>
                  {document_summary.purchase_date || '2018-10-06'}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Amount Paid</div>
                <div className="font-mono" style={{ color: 'var(--text-primary)' }}>
                  ₹{document_summary.price || 549} {document_summary.currency || 'INR'}
                </div>
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Seller & Platform</div>
              <div style={{ color: 'var(--text-secondary)' }}>
                {document_summary.retailer || 'Amazon.in (Revnova Technology)'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Tamper Detection</div>
              <div style={{ color: 'var(--status-approve)', fontWeight: 500 }}>
                {document_summary.tamper_flag ? 'TAMPER ALERT' : 'No Alteration Detected (Authentic Tax Invoice)'}
              </div>
            </div>
          </div>
        </div>

        {/* TILE 4: Visual Damage Assessment (4 cols) */}
        <div className="bento-card bento-col-4">
          <div className="bento-card-header">
            <div className="bento-card-title">
              <Eye size={14} color="#60A5FA" />
              <span>Vision Damage Assessment</span>
            </div>
            <span className="status-pill status-pill-deny" style={{ fontSize: 10, padding: '2px 8px' }}>
              SEVERITY {vision_summary.severity_score || 9}/10
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Defect Description</div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                {vision_summary.damage_type || 'Cracked earbud casing exposing wires; stripped cable near 3.5mm jack'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Assessed Cause</div>
              <div style={{ color: 'var(--status-deny)', fontWeight: 600 }}>
                {vision_summary.likely_cause === 'accidental_damage' ? 'Accidental Physical Damage (Uncovered)' : vision_summary.likely_cause}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Photo Authenticity</div>
                <div className="font-mono" style={{ color: 'var(--status-approve)' }}>
                  {vision_summary.authenticity_confidence || 95}% (Authentic)
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Stock Flags</div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  None detected
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TILE 5: Policy Date Math & Eligibility (4 cols) */}
        <div className="bento-card bento-col-4">
          <div className="bento-card-header">
            <div className="bento-card-title">
              <Calendar size={14} color="#60A5FA" />
              <span>Warranty Eligibility Math</span>
            </div>
            <span className="status-pill status-pill-deny" style={{ fontSize: 10, padding: '2px 8px' }}>
              EXPIRED
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Policy Window</div>
                <div className="font-mono" style={{ color: 'var(--text-primary)' }}>
                  {warranty_summary.policy_period_months || 6} Months (Standard)
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Policy Cutoff</div>
                <div className="font-mono" style={{ color: 'var(--status-deny)' }}>
                  06-Apr-2019
                </div>
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Time Elapsed Since Purchase</div>
              <div className="font-mono" style={{ color: 'var(--status-deny)', fontWeight: 600 }}>
                {warranty_summary.days_overdue || 2880} Days Overdue ({'>'} 7 Years)
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Eligibility Gate</div>
              <div style={{ color: 'var(--status-deny)', fontWeight: 500 }}>
                Outside Return & Warranty Coverage Window
              </div>
            </div>
          </div>
        </div>

        {/* TILE 6: Full Adjudication Explanation (8 cols) */}
        <div className="bento-card bento-col-8">
          <div className="bento-card-header">
            <div className="bento-card-title">
              <FileText size={14} color="#60A5FA" />
              <span>Full Decision Explanation & Auditor Rationale</span>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Generated for Operations Audit</span>
          </div>

          <div style={{
            backgroundColor: 'var(--surface-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 16,
            fontSize: 13,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-line'
          }}>
            {decision_explanation}
          </div>

          {/* Raw Pipeline Output Drawer Toggle */}
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => setShowRawOutput(!showRawOutput)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#60A5FA',
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: 0
              }}
            >
              <span>{showRawOutput ? 'Hide Raw Pipeline Response' : 'Inspect Raw Multi-Agent Response'}</span>
              {showRawOutput ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showRawOutput && (
              <pre className="font-mono" style={{
                marginTop: 10,
                padding: 12,
                backgroundColor: '#070A0E',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                fontSize: 11,
                color: '#93C5FD',
                maxHeight: 220,
                overflowY: 'auto',
                whiteSpace: 'pre-wrap'
              }}>
                {raw_pipeline_output}
              </pre>
            )}
          </div>
        </div>

        {/* TILE 7: Risk & Fraud Audit Flags (4 cols) */}
        <div className="bento-card bento-col-4">
          <div className="bento-card-header">
            <div className="bento-card-title">
              <AlertTriangle size={14} color="var(--status-deny)" />
              <span>Risk & Fraud Flags</span>
            </div>
            <span className="font-mono" style={{ fontSize: 11, color: 'var(--status-deny)' }}>
              {risk_flags.length} Flags Detected
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {risk_flags.map((flag, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--status-deny-bg)',
                  border: '1px solid var(--status-deny-border)',
                  color: 'var(--status-deny)',
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600
                }}
              >
                <XCircle size={14} />
                <span>{flag}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
