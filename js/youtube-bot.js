// Cliente YouTube API para tu bot - speed3xz.bot.nu
// Creado por Speed3xz

class YouTubeAPI {
  constructor() {
    this.baseURL = 'https://speed3xz.bot.nu/api/youtube';
    this.cache = new Map();
  }

  async downloadAudio(youtubeUrl) {
    try {
      console.log(`🎵 Buscando audio: ${youtubeUrl}`);
      
      const response = await fetch(`${this.baseURL}/audio.js?url=${encodeURIComponent(youtubeUrl)}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        return {
          success: true,
          url: data.url,
          title: data.title,
          source: data.source,
          videoId: data.videoId
        };
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('❌ Error con API personalizada:', error);
      
      // Fallback a APIs directas
      return await this.fallbackDownload(youtubeUrl);
    }
  }

  async fallbackDownload(youtubeUrl) {
    const fallbackAPIs = [
      {
        name: 'SkyAPI',
        url: `https://api-sky.ultraplus.click/api/download/yt.php?url=${encodeURIComponent(youtubeUrl)}&format=audio`,
        headers: { Authorization: 'Bearer Russellxz' },
        extractor: (data) => data?.data?.audio || data?.data?.video
      },
      {
        name: 'RubyCore',
        url: `https://ruby-core.vercel.app/api/download/youtube/mp3?url=${encodeURIComponent(youtubeUrl)}`,
        extractor: (data) => data?.url
      }
    ];

    for (const api of fallbackAPIs) {
      try {
        const response = await fetch(api.url, {
          headers: api.headers,
          signal: AbortSignal.timeout(8000)
        });
        const data = await response.json();
        const audioUrl = api.extractor(data);
        
        if (audioUrl) {
          return {
            success: true,
            url: audioUrl,
            title: data.title,
            source: api.name + ' (fallback)',
            videoId: this.extractVideoId(youtubeUrl)
          };
        }
      } catch (error) {
        console.log(`❌ Fallback ${api.name} falló:`, error.message);
      }
    }
    
    throw new Error('Todas las APIs fallaron');
  }

  extractVideoId(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  async getStatus() {
    try {
      const response = await fetch(`${this.baseURL}/status.js`);
      return await response.json();
    } catch (error) {
      return {
        status: 'error',
        error: error.message
      };
    }
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.YouTubeAPI = new YouTubeAPI();
}

// Exportar para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = YouTubeAPI;
}
