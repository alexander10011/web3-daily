#!/usr/bin/env node
/**
 * J4Y Web3 Research - Digest Delivery Script
 * 
 * Delivers digest to Telegram
 * 
 * Usage:
 *   node deliver.js                    # Read digest from stdin
 *   node deliver.js --file digest.txt  # Read digest from file
 *   node deliver.js --test             # Test mode, send test message
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Config file paths
const CONFIG_PATH = path.join(process.env.HOME, '.j4y', 'config.json');
const ENV_PATH = path.join(process.env.HOME, '.j4y', '.env');

// API endpoint
const J4Y_API_BASE = process.env.J4Y_API_BASE_URL || 'https://j4y-production.up.railway.app';

/**
 * Load config
 */
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    }
  } catch (e) {
    console.error('❌ Failed to load config:', e.message);
  }
  return {};
}

/**
 * Load environment variables
 */
function loadEnv() {
  try {
    if (fs.existsSync(ENV_PATH)) {
      const content = fs.readFileSync(ENV_PATH, 'utf-8');
      content.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      });
    }
  } catch (e) {
    console.error('❌ Failed to load env:', e.message);
  }
}

/**
 * Fetch digest content
 */
async function fetchDigest(walletAddress = null) {
  const endpoint = walletAddress 
    ? `${J4Y_API_BASE}/api/v1/digest`
    : `${J4Y_API_BASE}/api/v1/digest/public`;
  
  const body = walletAddress 
    ? { wallet_address: walletAddress }
    : { language: 'zh' };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    return data.digest;
  } catch (e) {
    console.error('❌ Failed to fetch digest:', e.message);
    return null;
  }
}

/**
 * Send to Telegram
 */
async function sendToTelegram(text, botToken, chatId) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  // Telegram message length limit 4096, need to split
  const MAX_LENGTH = 4000;
  const chunks = [];
  
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= MAX_LENGTH) {
      chunks.push(remaining);
      break;
    }
    
    // Split at newline
    let splitIndex = remaining.lastIndexOf('\n', MAX_LENGTH);
    if (splitIndex === -1) splitIndex = MAX_LENGTH;
    
    chunks.push(remaining.substring(0, splitIndex));
    remaining = remaining.substring(splitIndex + 1);
  }

  for (let i = 0; i < chunks.length; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: chunks[i],
          parse_mode: 'Markdown',
          disable_web_page_preview: true
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.description || `HTTP ${response.status}`);
      }

      // Avoid Telegram rate limit
      if (i < chunks.length - 1) {
        await new Promise(r => setTimeout(r, 500));
      }
    } catch (e) {
      console.error(`❌ Telegram send failed (chunk ${i + 1}/${chunks.length}):`, e.message);
      return false;
    }
  }

  return true;
}

/**
 * Read from stdin
 */
async function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', () => {
      let chunk;
      while ((chunk = process.stdin.read()) !== null) {
        data += chunk;
      }
    });
    process.stdin.on('end', () => resolve(data));
    
    // If stdin is TTY (interactive terminal), don't wait for input
    if (process.stdin.isTTY) {
      resolve('');
    }
  });
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  
  // Load config
  loadEnv();
  const config = loadConfig();
  
  // Get Telegram config
  const botToken = process.env.TELEGRAM_BOT_TOKEN || config.delivery?.botToken;
  const chatId = config.delivery?.chatId;
  
  if (!botToken || !chatId) {
    console.error('❌ Telegram not configured, please run Skill to set up');
    console.error('   Required: TELEGRAM_BOT_TOKEN and chatId');
    process.exit(1);
  }

  let digest = '';

  // Test mode
  if (args.includes('--test')) {
    digest = '🧪 **J4Y Test Message**\n\nThis is a test message to verify Telegram delivery is working.\n\nIf you see this, configuration is successful!';
  }
  // Read from file
  else if (args.includes('--file')) {
    const fileIndex = args.indexOf('--file') + 1;
    const filePath = args[fileIndex];
    if (!filePath || !fs.existsSync(filePath)) {
      console.error('❌ File not found:', filePath);
      process.exit(1);
    }
    digest = fs.readFileSync(filePath, 'utf-8');
  }
  // Read from stdin
  else {
    const stdinContent = await readStdin();
    if (stdinContent.trim()) {
      digest = stdinContent;
    } else {
      // If no stdin input, auto fetch digest
      console.log('📡 Fetching digest...');
      const walletAddress = config.wallet_address || null;
      digest = await fetchDigest(walletAddress);
      
      if (!digest) {
        console.error('❌ Failed to fetch digest');
        process.exit(1);
      }
    }
  }

  // Send to Telegram
  console.log('📤 Sending to Telegram...');
  const success = await sendToTelegram(digest, botToken, chatId);
  
  if (success) {
    console.log('✅ Digest delivered successfully!');
  } else {
    console.error('❌ Digest delivery failed');
    process.exit(1);
  }
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
