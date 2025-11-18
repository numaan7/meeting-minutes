import React, { useState } from 'react';
import { callAI } from '../services/aiService';

function MeetingInput({ onGenerateOutput, loading, setLoading }) {
  const [meetingNotes, setMeetingNotes] = useState('');

  const handleGenerate = async (promptType) => {
    if (!meetingNotes.trim()) {
      alert('Please enter meeting notes.');
      return;
    }

    let prompt = '';

    switch (promptType) {
      case 'generate':
        prompt = `Generate professional meeting minutes based on the following meeting notes:

${meetingNotes}

Please format the minutes professionally with the following sections:
1. Overview/Summary
2. Agenda/Topics Discussed
3. Key Discussion Points
4. Decisions Made
5. Action Items (with responsible persons if mentioned)
6. Next Steps

Make it clear, organized, and professional.`;
        break;

      case 'summarize':
        prompt = `Provide a concise summary of the following meeting notes. Focus on the most important points, decisions, and outcomes:

${meetingNotes}

Create a brief but comprehensive summary that captures the essence of the meeting.`;
        break;

      case 'actions':
        prompt = `Extract and list all action items from the following meeting notes. For each action item, identify:
- The task/action
- Responsible person (if mentioned)
- Deadline (if mentioned)
- Priority (if mentioned)

Meeting Notes:
${meetingNotes}

Format as a clear, numbered list of action items.`;
        break;

      default:
        return;
    }

    setLoading(true);
    try {
      const result = await callAI(prompt);
      onGenerateOutput(result);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Meeting Notes</h2>
      <div className="form-group">
        <label htmlFor="meetingNotes">Enter your meeting notes or discussion points</label>
        <textarea
          id="meetingNotes"
          rows="12"
          placeholder="Enter your raw meeting notes here..."
          value={meetingNotes}
          onChange={(e) => setMeetingNotes(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button
          className="btn btn-primary"
          onClick={() => handleGenerate('generate')}
          disabled={loading}
        >
          ✨ Generate Minutes
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleGenerate('summarize')}
          disabled={loading}
        >
          📋 Summarize
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleGenerate('actions')}
          disabled={loading}
        >
          ✅ Extract Action Items
        </button>
      </div>
    </div>
  );
}

export default MeetingInput;
