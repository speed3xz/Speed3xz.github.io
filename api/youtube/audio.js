// API YouTube Audio - speed3xz.bot.nu
// Creado por Speed3xz

const API_SOURCES = [
  {
    name: 'SkyAPI',
    url: (videoId) => `https://api-sky.ultraplus.click/api/download/yt.php?url=https://youtu.be/${videoId}&format=audio`,
    headers: { 
      Authorization: 'Bearer Russellxz',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    extractor: (data) => data?.data?.audio || data?.data?.video || data?.audio
  },
  {
    name: 'RubyCore',
    url: (videoId) => `https://ruby-core.vercel.app/api/download/youtube/mp3?url=https://youtu.be/${videoId}`,
    extractor: (data) => data?.url || data?.audioUrl
  },
  {
    name: 'Adonix',
    url: (videoId) => `https://api-adonix.ultraplus.click/download/ytmp3?url=https://youtu.be/${videoId}`,
    extractor: (data) => data?.data?.url
  }
];

// Cache para mejorar rendimiento
const requestCache = new Map();
const CACHE_DURATION = 30000; // 30 segundos

function getCacheKey(videoId) {
  return `audio_${videoId}`;
}

function getCachedResult(key) {
  const cached = requestCache.get(key);
  if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
    return cached.data;
  }
  return null;
}

function setCachedResult(key, data) {
  requestCache.set(key, {
    data: data,
    timestamp: Date.now()
  });
}

async function handleRequest(request) {
  const { searchParams } = new URL(request.url);
  const youtubeUrl = searchParams.get('url');
  const nocache = searchParams.get('nocache');
  
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'X-Developer': 'Speed3xz',
    'X-API-Version': '1.0'
  };

  // Manejar preflight OPTIONS
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // Si no hay URL, mostrar información de la API
  if (!youtubeUrl) {
    return new Response(JSON.stringify({
      status: 'success',
      message: '🚀 YouTube Audio API - By Speed3xz',
      domain: 'speed3xz.bot.nu',
      endpoints: {
        audio: '/api/youtube/audio.js?url=YOUTUBE_URL',
        status: '/api/youtube/status.js'
      },
      usage: 'GET /api/youtube/audio.js?url=https://youtu.be/VIDEO_ID',
      sources: API_SOURCES.map(s => s.name)
    }), { headers });
  }

  try {
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      return new Response(JSON.stringify({
        status: 'error',
        error: '❌ URL de YouTube inválida'
      }), { status: 400, headers });
    }

    // Verificar cache (a menos que se pida nocache)
    const cacheKey = getCacheKey(videoId);
    if (!nocache) {
      const cached = getCachedResult(cacheKey);
      if (cached) {
        console.log(`✅ Cache hit para: ${videoId}`);
        return new Response(JSON.stringify({
          ...cached,
          cached: true,
          timestamp: new Date().toISOString()
        }), { headers });
      }
    }

    console.log(`🔍 Buscando audio para: ${videoId}`);
    
    const audioResult = await getFastestAudio(videoId);
    
    // Guardar en cache
    setCachedResult(cacheKey, audioResult);
    
    return new Response(JSON.stringify({
      status: 'success',
      url: audioResult.audioUrl,
      title: audioResult.title,
      source: audioResult.source,
      videoId: videoId,
      timestamp: new Date().toISOString(),
      domain: 'speed3xz.bot.nu'
    }), { headers });

  } catch (error) {
    console.error('❌ Error en API:', error);
    
    return new Response(JSON.stringify({
      status: 'error',
      error: error.message,
      videoId: extractVideoId(youtubeUrl),
      timestamp: new Date().toISOString()
    }), { status: 500, headers });
  }
}

function extractVideoId(url) {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function getFastestAudio(videoId) {
  const promises = API_SOURCES.map(async (source) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(source.url(videoId), {
        headers: source.headers,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      const audioUrl = source.extractor(data);
      
      if (audioUrl) {
        return {
          success: true,
          source: source.name,
          audioUrl: audioUrl,
          title: data.title || data.data?.title || `Audio ${videoId}`,
          responseTime: Date.now()
        };
      } else {
        throw new Error('URL de audio no encontrada');
      }
    } catch (error) {
      return {
        success: false,
        source: source.name,
        error: error.message
      };
    }
  });

  const results = await Promise.all(promises);
  const successful = results.filter(r => r.success);
  
  if (successful.length === 0) {
    const errors = results.map(r => `${r.source}: ${r.error}`).join(', ');
    throw new Error(`Todas las APIs fallaron: ${errors}`);
  }
  
  // Devolver el primer resultado exitoso
  return successful[0];
}

// Exportar para GitHub Pages
if (typeof window === 'undefined') {
  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
}
