export default {
  async fetch(request, env) {
    // CORSヘッダーを設定する関数
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://ai-chatbot-dw16.vercel.app',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // プリフライトリクエスト（OPTIONS）に対応
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    if (request.method === 'POST') {
      const { message } = await request.json();
      
      // Cloudflare AI機能を使用してレスポンスを生成
      const response = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
        messages: [{ role: 'user', content: message }]
      });

      return new Response(JSON.stringify({ reply: response.response }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response('This endpoint only accepts POST requests', { status: 405 });
  }
};