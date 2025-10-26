// Status API - speed3xz.bot.nu
// Creado por Speed3xz

const API_SOURCES = [
  {
    name: 'SkyAPI',
    url: 'https://api-sky.ultraplus.click/api/status'
  },
  {
    name: 'RubyCore', 
    url: 'https://ruby-core.vercel.app/api/status'
  },
  {
    name: 'Adonix',
    url: 'https://api-adonix.ultraplus.click/status'
  }
];

async function handleRequest(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'X-Developer': 'Speed3xz'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    // Verificar estado de todas las APIs
    const statusChecks = API_SOURCES.map(async (api) => {
      try {
        const startTime = Date.now();
        const response = await fetch(api.url, { signal: AbortSignal.timeout(5000) });
        const responseTime = Date.now() - startTime;
        
        return {
          name: api.name,
          status: response.ok ? 'online' : 'error',
          responseTime: responseTime,
          code: response.status
        };
      } catch (error) {
        return {
          name: api.name,
          status: 'offline',
          error: error.message
        };
      }
    });

    const results = await Promise.all(statusChecks);
    
    const onlineCount = results.filter(r => r.status === 'online').length;
    const totalCount = results.length;
    
    return new Response(JSON.stringify({
      status: 'success',
      domain: 'speed3xz.bot.nu',
      overall: {
        online: onlineCount,
        total: totalCount,
        health: onlineCount === totalCount ? 'excellent' : 
                onlineCount >= 2 ? 'good' : 'poor'
      },
      apis: results,
      timestamp: new Date().toISOString()
    }), { headers });

  } catch (error) {
    return new Response(JSON.stringify({
      status: 'error',
      error: error.message
    }), { status: 500, headers });
  }
}

if (typeof window === 'undefined') {
  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
}
