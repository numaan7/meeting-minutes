import React, { useState, useEffect } from 'react';
import './App.css';
import MeetingInput from './components/MeetingInput';
import OutputArea from './components/OutputArea';
import History from './components/History';

function App() {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const savedHistory = JSON.parse(localStorage.getItem('meetingHistory') || '[]');
    setHistory(savedHistory);
  };

  const saveToHistory = (content) => {
    const historyItem = {
      id: Date.now(),
      title: content.substring(0, 50).replace(/\n/g, ' ') + '...',
      date: new Date().toISOString().split('T')[0],
      content: content,
      timestamp: new Date().toISOString()
    };

    let newHistory = [historyItem, ...history];
    if (newHistory.length > 10) {
      newHistory = newHistory.slice(0, 10);
    }

    localStorage.setItem('meetingHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const handleGenerateOutput = async (content) => {
    setOutput(content);
    saveToHistory(content);
  };

  const loadHistoryItem = (item) => {
    setOutput(item.content);
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>📝 AI Meeting Minutes</h1>
          <p className="subtitle">Generate and manage professional meeting minutes with AI assistance</p>
        </header>

        <div className="main-content">
          <MeetingInput 
            onGenerateOutput={handleGenerateOutput}
            loading={loading}
            setLoading={setLoading}
          />
          <OutputArea output={output} loading={loading} />
        </div>

        <History history={history} onLoadItem={loadHistoryItem} />
      </div>

      <footer>
        <p>Powered by AI | &copy; 2025 Meeting Minutes App</p>
      </footer>
    </div>
  );
}

export default App;
