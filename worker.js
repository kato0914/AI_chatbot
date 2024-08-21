export default {
  async fetch(request, env) {
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