async function init() {
  await downloadYtDlpBinary();
}

async function downloadYtDlpBinary() {
  const YTDlpWrap = require('yt-dlp-wrap').default;
  const fs = require('fs');
  const path = require('path');

  const binaryPath = path.join(process.cwd(), 'yt-dlp');

  if (!fs.existsSync(binaryPath)) {
    console.log('yt-dlp binary not found, downloading...');

    try {
      await YTDlpWrap.downloadFromGithub();
      fs.chmodSync(binaryPath, '755');
      console.log('yt-dlp binary download completed and made executable');
    } catch (downloadError) {
      console.error('Failed to download yt-dlp binary:', downloadError);
      throw downloadError;
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

init();
