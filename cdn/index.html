<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Files</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }

        .logo {
            font-size: 2.5em;
            color: #ff4444;
            margin-bottom: 30px;
            font-weight: bold;
        }

        .upload-area {
            border: 3px dashed #ff4444;
            border-radius: 15px;
            padding: 40px 20px;
            margin: 20px 0;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #fffafa;
        }

        .upload-area:hover {
            background: #fff0f0;
            border-color: #ff0000;
        }

        .upload-area.highlight {
            background: #ffeaea;
            border-color: #ff0000;
        }

        .file-input {
            display: none;
        }

        .upload-icon {
            font-size: 3em;
            color: #ff4444;
            margin-bottom: 15px;
        }

        .upload-text {
            color: #666;
            font-size: 1.1em;
        }

        .file-name {
            margin-top: 10px;
            color: #ff4444;
            font-weight: bold;
            word-break: break-all;
        }

        .upload-btn {
            background: linear-gradient(135deg, #ff4444, #ff6666);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 50px;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
            box-shadow: 0 5px 15px rgba(255, 68, 68, 0.3);
        }

        .upload-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 68, 68, 0.4);
        }

        .upload-btn:disabled {
            background: #cccccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .result {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            display: none;
        }

        .result.show {
            display: block;
            animation: fadeIn 0.5s ease;
        }

        .file-link {
            color: #ff4444;
            text-decoration: none;
            word-break: break-all;
            display: block;
            margin: 15px 0;
            font-weight: bold;
        }

        .copy-btn {
            background: #ff4444;
            color: white;
            border: none;
            padding: 10px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.3s ease;
        }

        .copy-btn:hover {
            background: #ff0000;
            transform: translateY(-1px);
        }

        .loading {
            display: none;
            margin: 20px 0;
        }

        .loading.show {
            display: block;
        }

        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #ff4444;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .status {
            margin-top: 10px;
            font-size: 0.9em;
        }

        .status.success { color: #28a745; }
        .status.error { color: #ff4444; }

        .security-warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 10px;
            padding: 15px;
            margin-top: 20px;
            font-size: 0.9em;
            color: #856404;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">⬆️ UPLOAD</div>
        
        <div class="upload-area" id="uploadArea">
            <div class="upload-icon">📁</div>
            <div class="upload-text">Haz clic o arrastra tu archivo aquí</div>
            <div class="file-name" id="fileName"></div>
            <input type="file" class="file-input" id="fileInput">
        </div>

        <div class="loading" id="loading">
            <div class="spinner"></div>
            <div class="status">Subiendo archivo...</div>
        </div>

        <button class="upload-btn" id="uploadBtn" disabled>Subir Archivo</button>

        <div class="result" id="result">
            <strong>✅ Archivo subido exitosamente!</strong>
            <a href="#" class="file-link" id="fileLink" target="_blank"></a>
            <button class="copy-btn" id="copyBtn">Copiar Enlace</button>
            <div class="status" id="status"></div>
        </div>

        <div class="security-warning">
            ⚠️ <strong>ADVERTENCIA:</strong> Este token debe ser regenerado inmediatamente después de probar.
        </div>
    </div>

    <script>
        // Configuración - TOKEN TEMPORAL (REGENERAR INMEDIATAMENTE)
        const GITHUB_TOKEN = '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';
        const REPO_OWNER = 'speed3xz';
        const REPO_NAME = 'speed3xz.github.io';
        const FOLDER_PATH = 'img';
        const YOUR_DOMAIN = 'https://speed3xz.bot.nu';

        // Elementos del DOM
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const fileName = document.getElementById('fileName');
        const uploadBtn = document.getElementById('uploadBtn');
        const loading = document.getElementById('loading');
        const result = document.getElementById('result');
        const fileLink = document.getElementById('fileLink');
        const copyBtn = document.getElementById('copyBtn');
        const status = document.getElementById('status');

        // Eventos para el área de upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('highlight');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('highlight');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('highlight');
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFileSelect();
            }
        });

        fileInput.addEventListener('change', handleFileSelect);

        function handleFileSelect() {
            const file = fileInput.files[0];
            if (file) {
                fileName.textContent = file.name;
                uploadBtn.disabled = false;
            } else {
                fileName.textContent = '';
                uploadBtn.disabled = true;
            }
        }

        // Subir archivo a GitHub
        uploadBtn.addEventListener('click', async () => {
            const file = fileInput.files[0];
            if (!file) return;

            // Validar tamaño (máximo 25MB para GitHub)
            if (file.size > 25 * 1024 * 1024) {
                showStatus('Error: El archivo no puede ser mayor a 25MB', 'error');
                return;
            }

            loading.classList.add('show');
            uploadBtn.disabled = true;

            try {
                // Convertir archivo a base64
                const base64Content = await fileToBase64(file);
                
                // Usar el nombre original del archivo (limpio de caracteres especiales)
                const cleanFileName = cleanFileName(file.name);
                
                // Subir a GitHub
                const githubUrl = await uploadToGitHub(cleanFileName, base64Content, file.type);
                
                // Crear URL con tu dominio personalizado
                const publicUrl = `${YOUR_DOMAIN}/${FOLDER_PATH}/${cleanFileName}`;
                
                // Mostrar resultado
                fileLink.href = publicUrl;
                fileLink.textContent = publicUrl;
                result.classList.add('show');
                showStatus('Archivo subido correctamente!', 'success');
                
            } catch (error) {
                console.error('Error:', error);
                showStatus('Error al subir el archivo: ' + error.message, 'error');
            } finally {
                loading.classList.remove('show');
                uploadBtn.disabled = false;
            }
        });

        // Función para limpiar el nombre del archivo
        function cleanFileName(originalName) {
            // Remover caracteres especiales y reemplazar espacios
            return originalName
                .toLowerCase()
                .replace(/[^a-z0-9.\-]/g, '_')
                .replace(/\s+/g, '_')
                .replace(/_+/g, '_')
                .replace(/^_+|_+$/g, '');
        }

        // Función para convertir archivo a base64
        function fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    // Remover el prefijo data:image/jpeg;base64,
                    const base64 = reader.result.split(',')[1];
                    resolve(base64);
                };
                reader.onerror = error => reject(error);
            });
        }

        // Función para subir a GitHub
        async function uploadToGitHub(fileName, base64Content, fileType) {
            const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FOLDER_PATH}/${fileName}`;
            
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Upload ${fileName}`,
                    content: base64Content,
                    branch: 'main'
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al subir a GitHub');
            }

            const data = await response.json();
            return data.content.download_url;
        }

        // Copiar enlace al portapapeles
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(fileLink.href);
                showStatus('Enlace copiado al portapapeles!', 'success');
            } catch (err) {
                showStatus('Error al copiar el enlace', 'error');
            }
        });

        function showStatus(message, type) {
            status.textContent = message;
            status.className = 'status ' + type;
        }
    </script>
</body>
</html>
