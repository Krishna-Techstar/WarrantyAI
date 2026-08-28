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
    <div style={{ maxWidth: 920, margin: '36px auto', padding: '0 16px' }}>
      {/* Top Banner with Sticker Tag */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-heavy)',
        borderRadius: 'var(--radius-brutal)',
        boxShadow: 'var(--shadow-xl)',
        padding: '24px 28px',
        marginBottom: 26,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{
              backgroundColor: 'var(--color-black)',
              color: 'var(--neo-green)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-brutal)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 900
            }}>INTAKE PROTOCOL</span>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--color-black)' }}>
              Claim Evidence & Dispatch
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>
            Submit authentic customer proof of purchase and damage media for parallel DAG evaluation.
          </p>
        </div>

        {/* Quick Sample Loader */}
        <button
          type="button"
          onClick={handleLoadSample}
          className="btn-secondary"
          style={{
            backgroundColor: isSampleLoaded ? 'var(--neo-green)' : 'var(--color-white)',
            color: 'var(--color-black)',
            transform: isSampleLoaded ? 'rotate(1deg)' : 'none'
          }}
        >
          <Sparkles size={16} strokeWidth={2.5} />
          <span>{isSampleLoaded ? 'Sample Evidence Attached ✓' : 'Load Real Sample (Evidson X55i)'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Dual Evidence Upload Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          {/* Invoice File Intake */}
          <div style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-heavy)',
            borderRadius: 'var(--radius-brutal)',
            boxShadow: 'var(--shadow-lg)',
            padding: 22,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.15s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  backgroundColor: 'var(--color-black)',
                  color: 'var(--color-white)',
                  width: 24,
                  height: 24,
                  borderRadius: 'var(--radius-brutal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900
                }}>01</div>
                <label style={{ fontSize: 14, fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-black)' }}>
                  Purchase Invoice / Bill
                </label>
              </div>
              <span className="font-mono" style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)' }}>PDF / IMAGE</span>
            </div>

            <div style={{
              border: '2.5px dashed #050505',
              borderRadius: 'var(--radius-brutal)',
              padding: '28px 18px',
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={30} color="#00A86B" strokeWidth={2.5} />
                  <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--color-black)' }}>
                    {invoiceFile.name}
                  </div>
                  <div className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
                    {(invoiceFile.size / 1024).toFixed(1)} KB // EXTRACTION READY
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <Upload size={28} color="var(--color-black)" strokeWidth={2.5} />
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-black)' }}>
                    Drop receipt or bill image
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                    PNG, JPG, PDF up to 10MB
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
            boxShadow: 'var(--shadow-lg)',
            padding: 22,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.15s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  backgroundColor: 'var(--color-black)',
                  color: 'var(--color-white)',
                  width: 24,
                  height: 24,
                  borderRadius: 'var(--radius-brutal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900
                }}>02</div>
                <label style={{ fontSize: 14, fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-black)' }}>
                  Visual Defect Evidence
                </label>
              </div>
              <span className="font-mono" style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)' }}>PHOTO / MEDIA</span>
            </div>

            <div style={{
              border: '2.5px dashed #050505',
              borderRadius: 'var(--radius-brutal)',
              padding: '28px 18px',
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={30} color="#00A86B" strokeWidth={2.5} />
                  <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--color-black)' }}>
                    {damageFile.name}
                  </div>
                  <div className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
                    {(damageFile.size / 1024).toFixed(1)} KB // VISION INSPECTION READY
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <Upload size={28} color="var(--color-black)" strokeWidth={2.5} />
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-black)' }}>
                    Drop product damage photo
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                    Close-up fracture or failure photo
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
          boxShadow: 'var(--shadow-lg)',
          padding: 22
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-white)',
                width: 24,
                height: 24,
                borderRadius: 'var(--radius-brutal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 900
              }}>03</div>
              <label style={{ fontSize: 14, fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-black)' }}>
                Customer Issue Statement
              </label>
            </div>
            <span className="font-mono" style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)' }}>
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
              padding: '14px 16px',
              color: 'var(--color-black)',
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 14, alignItems: 'center' }}>
          <button
            type="submit"
            disabled={isProcessing || !description.trim()}
            className="btn-primary"
            style={{
              padding: '16px 32px',
              fontSize: 16,
              opacity: isProcessing || !description.trim() ? 0.6 : 1,
              cursor: isProcessing || !description.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            <span>{isProcessing ? 'Adjudicating Claim...' : 'Execute Live Adjudication'}</span>
            <ArrowRight size={20} strokeWidth={3} />
          </button>
        </div>
      </form>
    </div>
  );
}
