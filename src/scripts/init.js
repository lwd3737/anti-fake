const ytdl = require('ytdl-core');

async function init() {
  await downloadYtDlpBinary();
  await setupFfmpeg();
}

async function downloadYtDlpBinary() {
  const YTDlpWrap = require('yt-dlp-wrap').default;
  const fs = require('fs');
  const path = require('path');
  const os = require('os');

  const binDir = path.join(process.cwd(), 'bin');
  const binaryPath = path.join(binDir, 'yt-dlp');

  // Create bin directory if it doesn't exist
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  if (!fs.existsSync(binaryPath)) {
    console.log('yt-dlp binary not found, downloading...');

    const isVercel = !!process.env.VERCEL;
    const platform = process.platform;

    try {
      if (isVercel || platform === 'linux') {
        // Prefer standalone Linux binary on Vercel to avoid Python dependency
        const url =
          'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux';
        await YTDlpWrap.downloadFile(url, binaryPath);
      } else if (platform === 'darwin') {
        // macOS universal binary
        const url =
          'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos';
        await YTDlpWrap.downloadFile(url, binaryPath);
      } else if (platform === 'win32') {
        const url =
          'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe';
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
        console.log('YTDlp download path: ', binaryPath);
      } catch (e) {
        throw e;
      }
    }
  }

  try {
    const ytDlp = new YTDlpWrap(binaryPath);
    const version = await ytDlp.getVersion();

    console.log('yt-dlp binary is working, version:', version);
  } catch (error) {
    console.error('yt-dlp binary verification failed:', error);
    throw error;
  }
}

async function setupFfmpeg() {
  const fs = require('fs');
  const path = require('path');
  const ffmpeg = require('ffmpeg-static');

  if (!ffmpeg) {
    throw new Error('ffmpeg-static package is not installed properly');
  }

  const binDir = path.join(process.cwd(), 'bin');
  const ffmpegPath = path.join(binDir, 'ffmpeg');

  // Create bin directory if it doesn't exist
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  // Copy ffmpeg binary to our bin directory
  if (!fs.existsSync(ffmpegPath)) {
    console.log('Setting up ffmpeg...');

    fs.copyFileSync(ffmpeg, ffmpegPath);
    fs.chmodSync(ffmpegPath, '755');

    console.log('ffmpeg setup completed: ', ffmpegPath);
  }

  console.log('ffmpeg is ready at:', ffmpegPath);
}

init();
