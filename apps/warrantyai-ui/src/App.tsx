// =============================================================================
// WarrantyAI — Root Component for RocketRide App (warranty-ai-ui)
// =============================================================================

import React, { useState } from 'react';
import type { ShellAppProps } from 'shell';
import { AppLayout } from 'shell';
import './index.css';

import Header from './components/Header';
import ClaimSubmissionForm from './components/ClaimSubmissionForm';
import ProcessingView from './components/ProcessingView';
import BentoResultView from './components/BentoResultView';
import HumanReviewQueue from './components/HumanReviewQueue';
import ErrorModal from './components/ErrorModal';

export const App: React.FC<ShellAppProps> = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'result' | 'queue'>('submit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [adjudicationResult, setAdjudicationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingCount, setPendingCount] = useState(2);
  const [lastSubmissionData, setLastSubmissionData] = useState<any>(null);

  const handleClaimSubmit = async (formDataPayload: any) => {
    setLastSubmissionData(formDataPayload);
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      if (formDataPayload.invoice) {
        formData.append('invoice', formDataPayload.invoice);
      }
      if (formDataPayload.damage) {
        formData.append('damage', formDataPayload.damage);
      }
      formData.append('description', formDataPayload.description);
      formData.append('use_sample', formDataPayload.use_sample ? 'true' : 'false');
      if (formDataPayload.product_name) formData.append('product_name', formDataPayload.product_name);
      if (formDataPayload.purchase_date) formData.append('purchase_date', formDataPayload.purchase_date);
      if (formDataPayload.price) formData.append('price', formDataPayload.price);
      if (formDataPayload.currency) formData.append('currency', formDataPayload.currency);
      if (formDataPayload.retailer) formData.append('retailer', formDataPayload.retailer);
      if (formDataPayload.damage_type) formData.append('damage_type', formDataPayload.damage_type);

      const response = await fetch('http://127.0.0.1:8000/api/adjudicate', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({ detail: response.statusText }));
        throw new Error(errJson.detail || `Server returned error status ${response.status}`);
      }

      const resultData = await response.json();
      setAdjudicationResult(resultData);
      setIsProcessing(false);
      setActiveTab('result');
    } catch (err: any) {
      console.error('Adjudication API failed:', err);
      setIsProcessing(false);
      setError(err.message || 'Pipeline execution failed. Zero mock fallback policy active.');
    }
  };

  const handleRetry = () => {
    if (lastSubmissionData) {
      handleClaimSubmit(lastSubmissionData);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-canvas)' }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCount}
        onNewClaim={() => setActiveTab('submit')}
      />

      <main style={{ paddingBottom: 64 }}>
        {isProcessing && <ProcessingView />}

        {!isProcessing && activeTab === 'submit' && (
          <ClaimSubmissionForm onSubmit={handleClaimSubmit} isProcessing={isProcessing} />
        )}

        {!isProcessing && activeTab === 'result' && (
          <BentoResultView
            result={adjudicationResult}
            onNewClaim={() => setActiveTab('submit')}
          />
        )}

        {!isProcessing && activeTab === 'queue' && (
          <HumanReviewQueue
            onInspectClaim={(claim: any) => {
              setAdjudicationResult(claim);
              setActiveTab('result');
            }}
          />
        )}
      </main>

      <ErrorModal
        error={error}
        onClose={() => setError(null)}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default App;
