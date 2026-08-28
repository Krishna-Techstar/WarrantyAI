import React, { useState } from 'react';
import Header from './components/Header';
import ClaimSubmissionForm from './components/ClaimSubmissionForm';
import ProcessingView from './components/ProcessingView';
import BentoResultView from './components/BentoResultView';
import HumanReviewQueue from './components/HumanReviewQueue';
import ErrorModal from './components/ErrorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('submit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [adjudicationResult, setAdjudicationResult] = useState(null);
  const [error, setError] = useState(null);
  const [pendingCount, setPendingCount] = useState(2);
  const [lastSubmissionData, setLastSubmissionData] = useState(null);

  const handleClaimSubmit = async (formDataPayload) => {
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
    } catch (err) {
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-canvas)' }}>
      {/* Top Ops Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCount}
        onNewClaim={() => setActiveTab('submit')}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingBottom: 48 }}>
        {isProcessing ? (
          <ProcessingView />
        ) : activeTab === 'submit' ? (
          <ClaimSubmissionForm
            onSubmit={handleClaimSubmit}
            isProcessing={isProcessing}
          />
        ) : activeTab === 'result' ? (
          <BentoResultView
            result={adjudicationResult}
            onNewClaim={() => setActiveTab('submit')}
          />
        ) : activeTab === 'queue' ? (
          <HumanReviewQueue
            onInspectClaim={(claim) => {
              setAdjudicationResult(claim);
              setActiveTab('result');
            }}
          />
        ) : null}
      </main>

      {/* Loud Zero-Mock Error Modal */}
      <ErrorModal
        error={error}
        onClose={() => setError(null)}
        onRetry={handleRetry}
      />
    </div>
  );
}
