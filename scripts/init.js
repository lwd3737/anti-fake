async function init() {
  await downloadYtDlpBinary();
  await setupFfmpeg();
}

async function downloadYtDlpBinary() {
  const YTDlpWrap = require('yt-dlp-wrap').default;
  const fs = require('fs');
  const path = require('path');

  const binDir = path.join(process.cwd(), 'bin');
  const binaryPath = path.join(binDir, 'yt-dlp');

  // Create bin directory if it doesn't exist
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  if (!fs.existsSync(binaryPath)) {
    console.log('yt-dlp binary not found, downloading...');

    const platform = process.platform;

    try {
      if (platform === 'linux') {
        // Use specific version for better stability
        const url =
          'https://github.com/yt-dlp/yt-dlp/releases/download/2024.12.13/yt-dlp_linux';
        await YTDlpWrap.downloadFile(url, binaryPath);
      } else if (platform === 'darwin') {
        // macOS universal binary
        const url =
          'https://github.com/yt-dlp/yt-dlp/releases/download/2024.12.13/yt-dlp_macos';
        await YTDlpWrap.downloadFile(url, binaryPath);
      } else if (platform === 'win32') {
        const url =
          'https://github.com/yt-dlp/yt-dlp/releases/download/2024.12.13/yt-dlp.exe';
        await YTDlpWrap.downloadFile(url, binaryPath);
      } else {
        await YTDlpWrap.downloadFromGithub(binaryPath);
      }

      fs.chmodSync(binaryPath, '755');
      console.log('yt-dlp binary download completed and made executable');
    } catch (downloadError) {
      console.error('Failed to download yt-dlp binary:', downloadError);
      // Final fallback to wrapper default
      try {
        await YTDlpWrap.downloadFromGithub(binaryPath);
        fs.chmodSync(binaryPath, '755');
      } catch (e) {
        throw e;
      }
    }
  }

  try {
    const ytDlp = new YTDlpWrap(binaryPath);
    const version = await ytDlp.getVersion();

    console.log(
      'yt-dlp binary is working, version, path:',
      version,
      binaryPath,
    );
  } catch (error) {
    console.error('yt-dlp binary verification failed:', error);
    throw error;
  }
}

async function setupFfmpeg() {
  const fs = require('fs');
  const path = require('path');

  // Prefer system ffmpeg if available (installed in Docker runner stage)
  try {
    const { execSync } = require('child_process');
    execSync('command -v ffmpeg', { stdio: 'ignore' });
    console.log('System ffmpeg detected via PATH; skipping ffmpeg-static copy');
    return;
  } catch {}

  // If system ffmpeg not present during build, try ffmpeg-static; if missing, skip without failing
  let ffmpegBinaryPath = null;
  try {
    ffmpegBinaryPath = require('ffmpeg-static');
  } catch (e) {
    console.log(
      'ffmpeg-static not available; skipping ffmpeg setup for build stage',
    );
  }

  const binDir = path.join(process.cwd(), 'bin');
  const ffmpegPath = path.join(binDir, 'ffmpeg');

  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  if (ffmpegBinaryPath && !fs.existsSync(ffmpegPath)) {
    try {
      console.log('Setting up ffmpeg from ffmpeg-static...');
      fs.copyFileSync(ffmpegBinaryPath, ffmpegPath);
      fs.chmodSync(ffmpegPath, '755');
    } catch (e) {
      console.log(
        'Failed to set up ffmpeg from ffmpeg-static; proceeding without it',
      );
    }
  }

  console.log('ffmpeg setup step completed');
}

init();
