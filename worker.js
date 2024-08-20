addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const { message } = await request.json()
    
    // ここでAIモデルとの対話処理を実装します
    // この例では、簡単なエコーレスポンスを返します
    const response = { reply: `AIからの応答: "${message}"` }
    
    return new Response(JSON.stringify(response), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  return new Response('このエンドポイントはPOSTリクエストのみを受け付けます', { status: 405 })
}