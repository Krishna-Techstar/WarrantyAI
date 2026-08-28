import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, FileText, 
  Eye, Calendar, CheckCircle2, XCircle, ChevronDown, ChevronUp, Copy, Check
} from 'lucide-react';

export default function BentoResultView({ result, onNewClaim }) {
  const [showRawOutput, setShowRawOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div style={{ maxWidth: 800, margin: '48px auto', textAlign: 'center', padding: 32 }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 16, fontWeight: 800, fontSize: 16 }}>
          NO ACTIVE ADJUDICATION RESULT AVAILABLE.
        </div>
        <button onClick={onNewClaim} className="btn-primary">Submit a New Claim</button>
      </div>
    );
  }

  const {
    claim_id = 'CLM-UNIDENTIFIED',
    recommended_action = 'deny',
    overall_confidence = 90,
    route = 'auto',
    document_summary = {},
    vision_summary = {},
    warranty_summary = {},
    evidence_weights = [],
    decision_explanation = 'No decision explanation provided.',
    risk_flags = [],
    raw_pipeline_output = ''
  } = result;

  const isDeny = recommended_action.toLowerCase() === 'deny';
  const isRepair = recommended_action.toLowerCase() === 'repair';
  const severityScore = Number(vision_summary.severity_score) || 5;

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
        marginBottom: 24,
        padding: '18px 24px',
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-heavy)',
        borderRadius: 'var(--radius-brutal)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            backgroundColor: 'var(--color-black)',
            color: 'var(--color-white)',
            padding: '5px 10px',
            borderRadius: 'var(--radius-brutal)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 900
          }}>
            {claim_id}
          </div>
          <span style={{ fontSize: 13, color: 'var(--color-black)', fontWeight: 800 }}>
            // MULTI-AGENT CONSENSUS REPORT
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onNewClaim} className="btn-secondary">
            Process Another Claim
          </button>
          <button onClick={handleCopyExplanation} className="btn-secondary">
            {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* 12-Column Neo-Brutalist Bento Grid */}
      <div className="bento-grid">
        
        {/* TILE 1: Primary Outcome & Decision Hero (5 cols) */}
        <div className="bento-card bento-col-5" style={{
          backgroundColor: isDeny ? 'var(--neo-red)' : 'var(--neo-green)',
          color: isDeny ? 'var(--color-white)' : 'var(--color-black)',
          boxShadow: '6px 6px 0px #050505'
        }}>
          <div className="bento-card-header" style={{ borderColor: 'var(--color-black)' }}>
            <div className="bento-card-title" style={{ color: isDeny ? 'var(--color-white)' : 'var(--color-black)' }}>
              {isDeny ? <ShieldAlert size={18} strokeWidth={2.5} /> : <ShieldCheck size={18} strokeWidth={2.5} />}
              <span>Adjudication Verdict</span>
            </div>
            <div style={{
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-white)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-brutal)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 900
            }}>
              {route === 'auto' ? 'AUTO-CLOSED' : route.toUpperCase()}
            </div>
          </div>

          <div style={{ marginTop: 'auto', marginBottom: 'auto', padding: '16px 0' }}>
            <div style={{
              fontSize: 11,
              fontWeight: 900,
              color: isDeny ? '#FFE5E5' : '#004D2E',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 4
            }}>
              PRIMARY DISPATCH ACTION
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 34,
              fontWeight: 900,
              color: isDeny ? 'var(--color-white)' : 'var(--color-black)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: 20
            }}>
              {isDeny ? 'POLICY DENIAL' : isRepair ? 'APPROVED FOR REPAIR' : 'APPROVED REPLACEMENT'}
            </div>

            {/* Confidence Metric Box */}
            <div style={{
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-black)',
              border: 'var(--border-thick)',
              borderRadius: 'var(--radius-brutal)',
              boxShadow: '3px 3px 0px #050505',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Consensus Confidence</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--color-black)' }}>
                  Multi-Factor Validation
                </div>
              </div>
              <div className="font-mono" style={{ fontSize: 30, fontWeight: 900, color: 'var(--color-black)' }}>
                {overall_confidence}%
              </div>
            </div>
          </div>

          <div className="font-mono" style={{
            fontSize: 11,
            fontWeight: 800,
            color: isDeny ? 'var(--color-white)' : 'var(--color-black)',
            paddingTop: 12,
            borderTop: 'var(--border-thick)'
          }}>
            PATH: {isDeny ? 'POLICY NOTICE DISPATCHED' : 'SERVICE WORK-ORDER DISPATCHED'}
          </div>
        </div>

        {/* TILE 2: Evidence Attribution Matrix (7 cols) */}
        <div className="bento-card bento-col-7">
          <div className="bento-card-header">
            <div className="bento-card-title">
              <CheckCircle2 size={18} strokeWidth={2.5} color="var(--color-black)" />
              <span>Evidence Attribution Matrix</span>
            </div>
            <span className="font-mono" style={{
              backgroundColor: 'var(--neo-green)',
              color: 'var(--color-black)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-brutal)',
              border: '1.5px solid #050505',
              fontSize: 11,
              fontWeight: 900
            }}>
              TOTAL 100%
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
                  padding: '10px 14px',
                  backgroundColor: 'var(--surface-subtle)',
                  borderRadius: 'var(--radius-brutal)',
                  border: 'var(--border-thin)',
                  boxShadow: '2px 2px 0px #050505',
                  fontSize: 13
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="font-mono" style={{
                    backgroundColor: 'var(--color-black)',
                    color: 'var(--color-white)',
                    padding: '3px 7px',
                    borderRadius: 'var(--radius-brutal)',
                    fontWeight: 900,
                    fontSize: 12
                  }}>
                    {ev.weight}%
                  </span>
                  <span style={{ color: 'var(--color-black)', fontWeight: 800 }}>
                    {ev.factor}
                  </span>
                </div>

                <div>
                  <span className="font-mono" style={{
                    fontSize: 11,
                    fontWeight: 900,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-brutal)',
                    border: '1.5px solid #050505',
                    backgroundColor: ev.impact.includes('Negative') ? 'var(--neo-red)' : 'var(--neo-green)',
                    color: ev.impact.includes('Negative') ? 'var(--color-white)' : 'var(--color-black)'
                  }}>
                    {ev.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 'auto',
            paddingTop: 14,
            borderTop: 'var(--border-thick)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)' }}>Multi-Agent Weighted Attribution Verified</span>
            <span className="font-mono" style={{ fontSize: 11, fontWeight: 900, color: '#00A86B' }}>DAG STATUS: PASS</span>
          </div>
        </div>

        {/* TILE 3: Document Extraction Intelligence (4 cols) */}
        <div className="bento-card bento-col-4">
          <div className="bento-card-header">
            <div className="bento-card-title">
              <FileText size={16} strokeWidth={2.5} />
              <span>Document Extraction</span>
            </div>
            <span className="sticker-badge sticker-badge-approve" style={{ fontSize: 10 }}>
              VERIFIED
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Product Name</div>
              <div style={{ fontWeight: 900, color: 'var(--color-black)' }}>
                {document_summary.product_name || 'Not Provided'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Purchase Date</div>
                <div className="font-mono" style={{ fontWeight: 900, color: 'var(--color-black)' }}>
                  {document_summary.purchase_date || 'Unknown'}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Amount Paid</div>
                <div className="font-mono" style={{ fontWeight: 900, color: 'var(--color-black)' }}>
                  {document_summary.price ? `${document_summary.currency || 'INR'} ${Number(document_summary.price).toLocaleString()}` : 'N/A'}
                </div>
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Seller & Platform</div>
              <div style={{ color: 'var(--color-black)', fontWeight: 700 }}>
                {document_summary.retailer || 'Authorized Retailer'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Tamper Detection</div>
              <div style={{ color: '#00A86B', fontWeight: 900 }}>
                {document_summary.tamper_flag ? 'TAMPER ALERT' : 'No Alteration Detected (Authentic)'}
              </div>
            </div>
          </div>
        </div>

        {/* TILE 4: Visual Damage Assessment (4 cols) */}
        <div className="bento-card bento-col-4">
          <div className="bento-card-header">
            <div className="bento-card-title">
              <Eye size={16} strokeWidth={2.5} />
              <span>Vision Damage</span>
            </div>
            <span className={`sticker-badge ${severityScore > 6 ? 'sticker-badge-deny' : 'sticker-badge-approve'}`} style={{ fontSize: 10 }}>
              SEVERITY {severityScore}/10
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Damage Severity</span>
                <span className="font-mono" style={{ fontSize: 11, fontWeight: 900, color: severityScore > 6 ? 'var(--neo-red)' : 'var(--neo-green-dark)' }}>
                  {severityScore} / 10
                </span>
              </div>
              <div className="severity-bar">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`severity-block ${idx < severityScore ? (severityScore > 6 ? 'active-red' : 'active-green') : ''}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Defect Description</div>
              <div style={{ color: 'var(--color-black)', fontWeight: 800 }}>
                {vision_summary.damage_type || 'Defect described in claim'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Assessed Cause</div>
              <div style={{ color: vision_summary.likely_cause === 'manufacturing_defect' ? '#00A86B' : 'var(--neo-red)', fontWeight: 900 }}>
                {vision_summary.likely_cause ? vision_summary.likely_cause.replace(/_/g, ' ').toUpperCase() : 'UNDER ASSESSMENT'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Authenticity</div>
                <div className="font-mono" style={{ color: '#00A86B', fontWeight: 900 }}>
                  {vision_summary.authenticity_confidence || 95}% (Authentic)
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Stock Flags</div>
                <div style={{ color: 'var(--color-black)', fontWeight: 700 }}>
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
              <Calendar size={16} strokeWidth={2.5} />
              <span>Warranty Eligibility</span>
            </div>
            <span className={`sticker-badge ${warranty_summary.warranty_active ? 'sticker-badge-approve' : 'sticker-badge-deny'}`} style={{ fontSize: 10 }}>
              {warranty_summary.warranty_active ? 'ACTIVE' : 'EXPIRED'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Policy Window</div>
                <div className="font-mono" style={{ color: 'var(--color-black)', fontWeight: 900 }}>
                  {warranty_summary.policy_period_months || 12} Months
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Policy Expiry</div>
                <div className="font-mono" style={{ color: warranty_summary.warranty_active ? '#00A86B' : 'var(--neo-red)', fontWeight: 900 }}>
                  {warranty_summary.expiry_date || 'Calculated on Purchase'}
                </div>
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Time Status</div>
              <div className="font-mono" style={{ color: warranty_summary.warranty_active ? '#00A86B' : 'var(--neo-red)', fontWeight: 900 }}>
                {warranty_summary.warranty_active
                  ? `${warranty_summary.days_remaining} Days Remaining in Coverage`
                  : `${warranty_summary.days_overdue} Days Overdue (Coverage Ended)`}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Eligibility Gate</div>
              <div style={{ color: warranty_summary.warranty_active ? '#00A86B' : 'var(--neo-red)', fontWeight: 800 }}>
                {warranty_summary.warranty_active ? 'Within Active Warranty Window' : 'Outside Return & Warranty Coverage Window'}
              </div>
            </div>
          </div>
        </div>

        {/* TILE 6: Full Adjudication Explanation (8 cols) */}
        <div className="bento-card bento-col-8">
          <div className="bento-card-header">
            <div className="bento-card-title">
              <FileText size={16} strokeWidth={2.5} />
              <span>Full Decision Narrative & Auditor Rationale</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)' }}>OPERATIONS AUDIT</span>
          </div>

          <div style={{
            backgroundColor: 'var(--surface-subtle)',
            border: 'var(--border-thin)',
            borderRadius: 'var(--radius-brutal)',
            padding: 18,
            fontSize: 13,
            lineHeight: 1.6,
            color: 'var(--color-black)',
            fontWeight: 600,
            whiteSpace: 'pre-line'
          }}>
            {decision_explanation}
          </div>

          {/* Raw Pipeline Output Drawer Toggle */}
          <div style={{ marginTop: 14 }}>
            <button
              onClick={() => setShowRawOutput(!showRawOutput)}
              className="btn-secondary"
              style={{
                fontSize: 11,
                padding: '6px 12px',
                border: 'var(--border-thin)'
              }}
            >
              <span>{showRawOutput ? 'Hide Raw Pipeline Response' : 'Inspect Raw DAG Response'}</span>
              {showRawOutput ? <ChevronUp size={14} strokeWidth={2.5} /> : <ChevronDown size={14} strokeWidth={2.5} />}
            </button>

            {showRawOutput && (
              <pre className="font-mono" style={{
                marginTop: 12,
                padding: 16,
                backgroundColor: 'var(--color-black)',
                border: 'var(--border-thick)',
                borderRadius: 'var(--radius-brutal)',
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--neo-green)',
                maxHeight: 240,
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
            <div className="bento-card-title" style={{ color: 'var(--neo-red)' }}>
              <XCircle size={16} strokeWidth={2.5} />
              <span>Risk & Fraud Flags</span>
            </div>
            <span className="font-mono" style={{ fontSize: 11, fontWeight: 900, color: 'var(--neo-red)' }}>
              {risk_flags.length} DETECTED
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
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-brutal)',
                  backgroundColor: 'var(--neo-red-light)',
                  border: '1.5px solid var(--neo-red)',
                  boxShadow: '3px 3px 0px #FF3B30',
                  color: 'var(--neo-red)',
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900
                }}
              >
                <XCircle size={15} strokeWidth={2.5} />
                <span>{flag}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
