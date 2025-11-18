// API Configuration
const API_CONFIG = {
  endpoint: 'https://aicafe.hcl.com/AICafeService/api/v1/subscription/openai/deployments/gpt-4.1/chat/completions',
  apiVersion: '2024-12-01-preview',
  apiKey: '',
  model: 'gpt-4.1'
};

export async function callAI(userPrompt) {
  const url = `${API_CONFIG.endpoint}?api-version=${API_CONFIG.apiVersion}`;

  const requestBody = {
    model: API_CONFIG.model,
    messages: [
      {
        role: "system",
        content: "You are a professional assistant specialized in creating clear, well-structured meeting minutes and documentation. You help organize meeting information in a professional and easy-to-read format."
      },
      {
        role: "user",
        content: userPrompt
      }
    ],
    maxTokens: 1500,
    temperature: 0.7
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_CONFIG.apiKey
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error('No response content received from API');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
