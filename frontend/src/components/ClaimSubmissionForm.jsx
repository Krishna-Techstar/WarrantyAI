import React, { useState } from 'react';
import { Upload, FileText, Image as ImageIcon, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ClaimSubmissionForm({ onSubmit, isProcessing }) {
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [damageFile, setDamageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isSampleLoaded, setIsSampleLoaded] = useState(false);

  const handleLoadSample = () => {
    setIsSampleLoaded(true);
    setDescription('bill defected product issue is the earphone is broken from earplugs');
    setInvoiceFile({ name: 'sample_bill.png', size: 142918, isSample: true });
    setDamageFile({ name: 'sample_damage.png', size: 657189, isSample: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    onSubmit({
      invoice: invoiceFile?.isSample ? null : invoiceFile,
      damage: damageFile?.isSample ? null : damageFile,
      description: description.trim(),
      use_sample: isSampleLoaded || (!invoiceFile && !damageFile)
    });
  };

  return (
    <div style={{ maxWidth: 840, margin: '36px auto', padding: '0 16px' }}>
      {/* Top Banner */}
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
            Claim Intake & Adjudication Dispatch
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            Upload authentic customer invoice and defect media to route through the multi-agent decision engine.
          </p>
        </div>

        {/* Quick Sample Button */}
        <button
          type="button"
          onClick={handleLoadSample}
          className="btn-secondary"
          style={{
            borderColor: isSampleLoaded ? '#3B82F6' : 'var(--border-default)',
            color: isSampleLoaded ? '#93C5FD' : 'var(--text-secondary)'
          }}
        >
          <Sparkles size={14} color={isSampleLoaded ? '#60A5FA' : 'var(--text-muted)'} />
          <span>{isSampleLoaded ? 'Sample Evidence Loaded' : 'Load Real Sample (Evidson X55i)'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Dual Evidence Upload Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Invoice File Intake */}
          <div style={{
            backgroundColor: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <FileText size={16} color="#60A5FA" />
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                1. Purchase Invoice / Bill
              </label>
            </div>

            <div style={{
              border: '1px dashed var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 16px',
              textAlign: 'center',
              backgroundColor: invoiceFile ? 'var(--surface-subtle)' : 'transparent',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setInvoiceFile(e.target.files[0]);
                    setIsSampleLoaded(false);
                  }
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  width: '100%'
                }}
              />
              {invoiceFile ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <CheckCircle2 size={24} color="var(--status-approve)" />
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {invoiceFile.name}
                  </div>
                  <div className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {(invoiceFile.size / 1024).toFixed(1)} KB // Ready for extraction
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Upload size={22} color="var(--text-muted)" />
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    Drop invoice image or PDF
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    JPG, PNG, WebP up to 10MB
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Damage File Intake */}
          <div style={{
            backgroundColor: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <ImageIcon size={16} color="#60A5FA" />
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                2. Visual Damage Evidence
              </label>
            </div>

            <div style={{
              border: '1px dashed var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 16px',
              textAlign: 'center',
              backgroundColor: damageFile ? 'var(--surface-subtle)' : 'transparent',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setDamageFile(e.target.files[0]);
                    setIsSampleLoaded(false);
                  }
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  width: '100%'
                }}
              />
              {damageFile ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <CheckCircle2 size={24} color="var(--status-approve)" />
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {damageFile.name}
                  </div>
                  <div className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {(damageFile.size / 1024).toFixed(1)} KB // Visual inspection ready
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Upload size={22} color="var(--text-muted)" />
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    Drop product damage photo
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    High-res defect photo or close-up
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Issue Description Field */}
        <div style={{
          backgroundColor: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: 18
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              3. Customer Reported Issue & Statement
            </label>
            <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {description.length} / 1000 chars
            </span>
          </div>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., The earphone is broken from earplugs. The wire was pulled and casing cracked suddenly during usage..."
            style={{
              width: '100%',
              backgroundColor: 'var(--surface-subtle)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              color: 'var(--text-primary)',
              fontSize: 13,
              fontFamily: 'var(--font-sans)',
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, alignItems: 'center' }}>
          <button
            type="submit"
            disabled={isProcessing || !description.trim()}
            className="btn-primary"
            style={{
              opacity: isProcessing || !description.trim() ? 0.6 : 1,
              cursor: isProcessing || !description.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            <span>{isProcessing ? 'Adjudicating Claim...' : 'Execute Live Adjudication'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
