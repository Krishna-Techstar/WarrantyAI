import React, { useState } from 'react';
import { Upload, FileText, Image as ImageIcon, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    <div style={{ maxWidth: 880, margin: '36px auto', padding: '0 16px' }}>
      {/* Top Banner */}
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
            Claim Intake & Multi-Agent Dispatch
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 500 }}>
            Upload authentic customer invoice and defect media to route through the DAG decision engine.
          </p>
        </div>

        {/* Quick Sample Button */}
        <button
          type="button"
          onClick={handleLoadSample}
          className="btn-secondary"
          style={{
            backgroundColor: isSampleLoaded ? 'var(--neo-green-light)' : 'var(--color-white)',
            borderColor: isSampleLoaded ? 'var(--neo-green)' : 'var(--color-black)',
            color: 'var(--color-black)'
          }}
        >
          <Sparkles size={15} strokeWidth={2.5} color={isSampleLoaded ? '#00A86B' : 'var(--color-black)'} />
          <span>{isSampleLoaded ? 'Sample Evidence Loaded' : 'Load Sample (Evidson X55i)'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Dual Evidence Upload Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Invoice File Intake */}
          <div style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-heavy)',
            borderRadius: 'var(--radius-brutal)',
            boxShadow: 'var(--shadow-brutal)',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-white)',
                padding: '3px 6px',
                borderRadius: 'var(--radius-brutal)',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 800
              }}>01</div>
              <label style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-black)' }}>
                Purchase Invoice / Bill
              </label>
            </div>

            <div style={{
              border: '2px dashed #000000',
              borderRadius: 'var(--radius-brutal)',
              padding: '24px 16px',
              textAlign: 'center',
              backgroundColor: invoiceFile ? 'var(--neo-green-light)' : 'var(--surface-subtle)',
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
                  <CheckCircle2 size={26} color="#00A86B" strokeWidth={2.5} />
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--color-black)' }}>
                    {invoiceFile.name}
                  </div>
                  <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>
                    {(invoiceFile.size / 1024).toFixed(1)} KB // EXTRACTION READY
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Upload size={24} color="var(--color-black)" strokeWidth={2.5} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-black)' }}>
                    Drop invoice image or PDF
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
                    JPG, PNG, WebP up to 10MB
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Damage File Intake */}
          <div style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-heavy)',
            borderRadius: 'var(--radius-brutal)',
            boxShadow: 'var(--shadow-brutal)',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-white)',
                padding: '3px 6px',
                borderRadius: 'var(--radius-brutal)',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 800
              }}>02</div>
              <label style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-black)' }}>
                Visual Damage Evidence
              </label>
            </div>

            <div style={{
              border: '2px dashed #000000',
              borderRadius: 'var(--radius-brutal)',
              padding: '24px 16px',
              textAlign: 'center',
              backgroundColor: damageFile ? 'var(--neo-green-light)' : 'var(--surface-subtle)',
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
                  <CheckCircle2 size={26} color="#00A86B" strokeWidth={2.5} />
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--color-black)' }}>
                    {damageFile.name}
                  </div>
                  <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>
                    {(damageFile.size / 1024).toFixed(1)} KB // VISION INSPECTION READY
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Upload size={24} color="var(--color-black)" strokeWidth={2.5} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-black)' }}>
                    Drop product damage photo
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
                    Close-up defect or fracture photo
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Issue Description Field */}
        <div style={{
          backgroundColor: 'var(--color-white)',
          border: 'var(--border-heavy)',
          borderRadius: 'var(--radius-brutal)',
          boxShadow: 'var(--shadow-brutal)',
          padding: 20
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-white)',
                padding: '3px 6px',
                borderRadius: 'var(--radius-brutal)',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 800
              }}>03</div>
              <label style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-black)' }}>
                Customer Statement & Issue Description
              </label>
            </div>
            <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
              {description.length} / 1000 CHARS
            </span>
          </div>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., The earphone is broken from earplugs. Casing cracked suddenly during usage..."
            style={{
              width: '100%',
              backgroundColor: 'var(--surface-subtle)',
              border: 'var(--border-thick)',
              borderRadius: 'var(--radius-brutal)',
              padding: '12px 14px',
              color: 'var(--color-black)',
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
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
              padding: '14px 28px',
              fontSize: 15,
              opacity: isProcessing || !description.trim() ? 0.6 : 1,
              cursor: isProcessing || !description.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            <span>{isProcessing ? 'Adjudicating Claim...' : 'Execute Live Adjudication'}</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </div>
  );
}
