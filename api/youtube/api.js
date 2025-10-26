// YouTube API - Speed3xz
// Archivo: api/youtube/api.js

class Speed3xzYouTubeAPI {
    constructor() {
        this.sources = [
            {
                name: 'SkyAPI',
                url: (videoId) => `https://api-sky.ultraplus.click/api/download/yt.php?url=https://youtu.be/${videoId}&format=audio`,
                headers: { 
                    'Authorization': 'Bearer Russellxz',
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
                extractor: (data) => data?.data?.url || data?.url
            }
        ];
    }

    async getAudio(videoUrl) {
        const videoId = this.extractVideoId(videoUrl);
        if (!videoId) {
            return this.formatResponse('error', 'Invalid YouTube URL');
        }

        try {
            for (const source of this.sources) {
                try {
                    console.log(`Trying ${source.name}...`);
                    const audioData = await this.fetchFromSource(source, videoId);
                    if (audioData) {
                        return this.formatResponse('success', 'Audio found', audioData);
                    }
                } catch (error) {
                    console.log(`${source.name} failed:`, error.message);
                    continue;
                }
            }
            
            return this.formatResponse('error', 'All sources failed');
            
        } catch (error) {
            return this.formatResponse('error', error.message);
        }
    }

    async fetchFromSource(source, videoId) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        try {
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
            
            if (audioUrl && this.isValidUrl(audioUrl)) {
                return {
                    url: audioUrl,
                    title: data.title || data.data?.title || `Audio ${videoId}`,
                    source: source.name,
                    videoId: videoId
                };
            }
        } finally {
            clearTimeout(timeoutId);
        }
        return null;
    }

    extractVideoId(url) {
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    formatResponse(status, message, data = null) {
        const response = {
            status: status,
            message: message,
            timestamp: new Date().toISOString(),
            domain: 'speed3xz.bot.nu',
            developer: 'Speed3xz'
        };

        if (data) {
            Object.assign(response, data);
        }

        return response;
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.Speed3xzYouTubeAPI = Speed3xzYouTubeAPI;
}
