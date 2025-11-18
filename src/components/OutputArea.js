import React, { useState } from 'react';

function OutputArea({ output, loading }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    if (!output || output.includes('will appear here')) {
      alert('No content to copy');
      return;
    }

    navigator.clipboard.writeText(output).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  return (
    <div className="card">
      <div className="output-header">
        <h2>Generated Minutes</h2>
        <button
          className={`btn btn-small ${copySuccess ? 'btn-success' : ''}`}
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copySuccess ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>AI is processing your request...</p>
        </div>
      ) : (
        <div className="output-area">
          {output ? (
            <pre>{output}</pre>
          ) : (
            <p className="placeholder">Your generated meeting minutes will appear here...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OutputArea;
