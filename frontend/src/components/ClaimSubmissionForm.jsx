import React, { useState } from 'react';
import { Upload, FileText, Image as ImageIcon, Sparkles, ArrowRight, CheckCircle2, Sliders, RefreshCw, Smartphone, Headphones, Laptop } from 'lucide-react';

const PRESETS = [
  {
    id: 'earphone_expired',
    label: '1. Evidson Earphones (Expired / Crushed)',
    icon: Headphones,
    tag: 'POLICY DENIAL',
    tagColor: 'var(--neo-red)',
    productName: 'Evidson Audio X55i In-Ear Earphones with Mic (Black)',
    purchaseDate: '2018-10-06',
    price: 549,
    currency: 'INR',
    retailer: 'Amazon.in (Revnova Technology)',
    damageType: 'Crushed earbud casing with internal wiring exposed; torn cable near 3.5mm jack',
    description: 'bill defected product issue is the earphone is broken from earplugs. Casing cracked during use.'
  },
  {
    id: 'samsung_in_warranty',
    label: '2. Samsung S23 Ultra (In-Warranty / Defect)',
    icon: Smartphone,
    tag: 'APPROVED REPAIR',
    tagColor: 'var(--neo-green)',
    productName: 'Samsung Galaxy S23 Ultra 5G (Phantom Black, 256GB)',
    purchaseDate: '2026-07-15',
    price: 104999,
    currency: 'INR',
    retailer: 'Samsung Official Online Store',
    damageType: 'Vertical bright green OLED line across display; zero glass cracks or drop marks',
    description: 'The phone developed a bright vertical green line on the AMOLED screen after a software update. There are no physical drops, cracks, or liquid exposure.'
  },
  {
    id: 'macbook_liquid',
    label: '3. MacBook Air M2 (Liquid Damage / Spill)',
    icon: Laptop,
    tag: 'UNCOVERED DAMAGE',
    tagColor: 'var(--neo-red)',
    productName: 'Apple MacBook Air 13" M2 (Midnight, 512GB)',
    purchaseDate: '2025-11-20',
    price: 114900,
    currency: 'INR',
    retailer: 'Apple Store India',
    damageType: 'Sticky residue on keyboard keys and corrosion on USB-C logic board port',
    description: 'Spilled coffee accidentally on the top row of the keyboard. Keys are sticky and machine fails to charge.'
  }
];

export default function ClaimSubmissionForm({ onSubmit, isProcessing }) {
  const [selectedPreset, setSelectedPreset] = useState('earphone_expired');
  const [productName, setProductName] = useState(PRESETS[0].productName);
  const [purchaseDate, setPurchaseDate] = useState(PRESETS[0].purchaseDate);
  const [price, setPrice] = useState(PRESETS[0].price);
  const [currency, setCurrency] = useState(PRESETS[0].currency);
  const [retailer, setRetailer] = useState(PRESETS[0].retailer);
  const [damageType, setDamageType] = useState(PRESETS[0].damageType);
  const [description, setDescription] = useState(PRESETS[0].description);
  
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [damageFile, setDamageFile] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(true);

  const applyPreset = (preset) => {
    setSelectedPreset(preset.id);
    setProductName(preset.productName);
    setPurchaseDate(preset.purchaseDate);
    setPrice(preset.price);
    setCurrency(preset.currency);
    setRetailer(preset.retailer);
    setDamageType(preset.damageType);
    setDescription(preset.description);
    setInvoiceFile({ name: `${preset.id}_invoice.png`, size: 145000, isPreset: true });
    setDamageFile({ name: `${preset.id}_evidence.png`, size: 480000, isPreset: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    onSubmit({
      invoice: invoiceFile?.isPreset ? null : invoiceFile,
      damage: damageFile?.isPreset ? null : damageFile,
      description: description.trim(),
      product_name: productName.trim(),
      purchase_date: purchaseDate,
      price: Number(price),
      currency: currency,
      retailer: retailer.trim(),
      damage_type: damageType.trim(),
      use_sample: selectedPreset === 'earphone_expired' && !invoiceFile
    });
  };

  return (
    <div style={{ maxWidth: 960, margin: '32px auto', padding: '0 16px' }}>
      {/* Top Preset Selector Strip */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-heavy)',
        borderRadius: 'var(--radius-brutal)',
        boxShadow: 'var(--shadow-lg)',
        padding: '18px 24px',
        marginBottom: 24
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              backgroundColor: 'var(--color-black)',
              color: 'var(--neo-green)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-brutal)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 900
            }}>DATASET SELECTOR</span>
            <span style={{ fontSize: 13, fontWeight: 900, color: 'var(--color-black)', textTransform: 'uppercase' }}>
              Choose a Claim Scenario or Enter Custom Data:
            </span>
          </div>
          <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
            100% DYNAMIC EVALUATION
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {PRESETS.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPreset === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '12px 14px',
                  backgroundColor: isSelected ? 'var(--color-black)' : 'var(--surface-subtle)',
                  color: isSelected ? 'var(--color-white)' : 'var(--color-black)',
                  border: 'var(--border-thick)',
                  borderRadius: 'var(--radius-brutal)',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transform: isSelected ? 'translate(-2px, -2px)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 6 }}>
                  <Icon size={18} color={isSelected ? 'var(--neo-green)' : 'var(--color-black)'} strokeWidth={2.5} />
                  <span style={{
                    fontSize: 9,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 900,
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-brutal)',
                    backgroundColor: p.tagColor,
                    color: p.tagColor === 'var(--neo-green)' ? '#000' : '#fff'
                  }}>
                    {p.tag}
                  </span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, lineHeight: 1.3 }}>
                  {p.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Dynamic Product & Invoice Attributes (Full Customizability) */}
        <div style={{
          backgroundColor: 'var(--color-white)',
          border: 'var(--border-heavy)',
          borderRadius: 'var(--radius-brutal)',
          boxShadow: 'var(--shadow-lg)',
          padding: 22
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
            paddingBottom: 10,
            borderBottom: 'var(--border-thick)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                Product & Purchase Invoice Details
              </label>
            </div>
            <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
              EDITABLE ATTRIBUTES
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                Product Name & Model
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => { setProductName(e.target.value); setSelectedPreset('custom'); }}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--surface-subtle)',
                  border: 'var(--border-thick)',
                  borderRadius: 'var(--radius-brutal)',
                  padding: '9px 12px',
                  color: 'var(--color-black)',
                  fontSize: 13,
                  fontWeight: 700,
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                Purchase Date (YYYY-MM-DD)
              </label>
              <input
                type="text"
                value={purchaseDate}
                onChange={(e) => { setPurchaseDate(e.target.value); setSelectedPreset('custom'); }}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--surface-subtle)',
                  border: 'var(--border-thick)',
                  borderRadius: 'var(--radius-brutal)',
                  padding: '9px 12px',
                  color: 'var(--color-black)',
                  fontSize: 13,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                Price Paid ({currency})
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => { setPrice(e.target.value); setSelectedPreset('custom'); }}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--surface-subtle)',
                  border: 'var(--border-thick)',
                  borderRadius: 'var(--radius-brutal)',
                  padding: '9px 12px',
                  color: 'var(--color-black)',
                  fontSize: 13,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                Retailer / Store / Platform
              </label>
              <input
                type="text"
                value={retailer}
                onChange={(e) => { setRetailer(e.target.value); setSelectedPreset('custom'); }}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--surface-subtle)',
                  border: 'var(--border-thick)',
                  borderRadius: 'var(--radius-brutal)',
                  padding: '9px 12px',
                  color: 'var(--color-black)',
                  fontSize: 13,
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                Visual Defect / Failure Type
              </label>
              <input
                type="text"
                value={damageType}
                onChange={(e) => { setDamageType(e.target.value); setSelectedPreset('custom'); }}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--surface-subtle)',
                  border: 'var(--border-thick)',
                  borderRadius: 'var(--radius-brutal)',
                  padding: '9px 12px',
                  color: 'var(--color-black)',
                  fontSize: 13,
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Dual Evidence File Dropzones */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Invoice File Intake */}
          <div style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-heavy)',
            borderRadius: 'var(--radius-brutal)',
            boxShadow: 'var(--shadow-md)',
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  backgroundColor: 'var(--color-black)',
                  color: 'var(--color-white)',
                  width: 22,
                  height: 22,
                  borderRadius: 'var(--radius-brutal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900
                }}>02</div>
                <label style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-black)' }}>
                  Attach Invoice File
                </label>
              </div>
              <span className="font-mono" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>OPTIONAL</span>
            </div>

            <div style={{
              border: '2px dashed #050505',
              borderRadius: 'var(--radius-brutal)',
              padding: '20px 14px',
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
                    setSelectedPreset('custom');
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
                  <CheckCircle2 size={24} color="#00A86B" strokeWidth={2.5} />
                  <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--color-black)' }}>
                    {invoiceFile.name}
                  </div>
                  <div className="font-mono" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>
                    ATTACHED FOR DAG EXTRACTION
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Upload size={24} color="var(--color-black)" strokeWidth={2.5} />
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--color-black)' }}>
                    Drop custom invoice image or PDF
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
            boxShadow: 'var(--shadow-md)',
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  backgroundColor: 'var(--color-black)',
                  color: 'var(--color-white)',
                  width: 22,
                  height: 22,
                  borderRadius: 'var(--radius-brutal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900
                }}>03</div>
                <label style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-black)' }}>
                  Attach Defect Photo
                </label>
              </div>
              <span className="font-mono" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>OPTIONAL</span>
            </div>

            <div style={{
              border: '2px dashed #050505',
              borderRadius: 'var(--radius-brutal)',
              padding: '20px 14px',
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
                    setSelectedPreset('custom');
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
                  <CheckCircle2 size={24} color="#00A86B" strokeWidth={2.5} />
                  <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--color-black)' }}>
                    {damageFile.name}
                  </div>
                  <div className="font-mono" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>
                    ATTACHED FOR VISION ANALYSIS
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Upload size={24} color="var(--color-black)" strokeWidth={2.5} />
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--color-black)' }}>
                    Drop custom defect photo
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
              }}>04</div>
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
            onChange={(e) => { setDescription(e.target.value); setSelectedPreset('custom'); }}
            placeholder="Describe the defect, usage scenario, or failure mode in detail..."
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
              padding: '16px 34px',
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
