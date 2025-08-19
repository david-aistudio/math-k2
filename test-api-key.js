// Test API key dengan fetch langsung
async function testApiKey() {
  try {
    console.log('Testing API key...');
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'API Key Test'
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2:free',
        messages: [
          {
            role: 'user',
            content: 'Hello, just testing if the API key works.'
          }
        ],
        temperature: 0.1,
        max_tokens: 100
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API key WORKS!');
      console.log('Response:', data.choices?.[0]?.message?.content);
    } else {
      const errorText = await response.text();
      console.log('❌ API key FAILED');
      console.log('Status:', response.status);
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ API key TEST FAILED with exception');
    console.log('Exception:', error);
  }
}

// Jalankan test
testApiKey();