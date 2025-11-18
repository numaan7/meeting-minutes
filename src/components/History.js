import React from 'react';

function History({ history, onLoadItem }) {
  if (history.length === 0) {
    return (
      <div className="card">
        <h2>📚 Recent Minutes</h2>
        <div className="history-container">
          <p className="placeholder">No saved minutes yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📚 Recent Minutes</h2>
      <div className="history-container">
        {history.map((item) => (
          <div
            key={item.id}
            className="history-item"
            onClick={() => onLoadItem(item)}
          >
            <h3>{item.title}</h3>
            <div className="meta">
              <span>📅 {item.date}</span>
            </div>
            <div className="preview">
              {item.content.substring(0, 100)}...
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
