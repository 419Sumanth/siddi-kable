import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Serve static assets from the Vite build output
app.use(express.static(distPath));

// Also serve the public directory for static assets (images, videos)
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback: return index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n======================================================`);
  console.log(`  Siddhi Kabel Corporation Pvt Ltd - Server Active!`);
  console.log(`  URL: ${url}`);
  console.log(`======================================================\n`);

  // Automatically open browser on Windows
  const startCmd = process.platform === 'win32' ? `start ${url}` : process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
  exec(startCmd, (err) => {
    if (err) {
      // Browser launch failed or deferred
    }
  });
});
