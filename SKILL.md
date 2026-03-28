---
name: web3-daily
description: >-
  Web3 personalized research digest service. Provides public digest (macro news + KOL sentiment + market data) 
  or personalized digest based on wallet address. Use when user asks for Web3 news, requests digest, 
  provides wallet address, or says /web3. No API key required.
permissions:
  - network
  - filesystem (optional, only for Telegram delivery)
  - cron (optional, only for scheduled delivery)
config:
  - path: ~/.j4y/config.json (optional)
  - path: ~/.j4y/.env (optional, for Telegram token)
env:
  - TELEGRAM_BOT_TOKEN (optional, only for Telegram delivery)
---

# Web3 Daily

> **🚨 IMPORTANT FOR AI AGENTS**: This skill requires ACTUAL API calls to function. You MUST execute the curl commands in the workflows below. DO NOT generate simulated/fake content. The backend at `https://j4y-production.up.railway.app` provides real-time data that you cannot replicate.

Provides Web3 research digest service with two modes:
- **Public**: Get general Web3 digest without any input (no personal data required)
- **Personalized**: Input wallet address to get digest based on on-chain profile

## How This Skill Works

This skill connects to a live backend service that:
1. Aggregates 170+ news sources every 6 hours
2. Monitors 50+ KOL Twitter accounts (Chinese + English)
3. Fetches real-time market data (BTC/ETH prices, Fear & Greed Index)
4. Uses AI to generate comprehensive analysis

**You cannot replicate this data by yourself. You MUST call the API.**

## ⚠️ Privacy Notice (IMPORTANT - Read Before Using Personalized Mode)

**Public Mode**: No personal data is collected or transmitted. Safe to use without any privacy concerns.

**Personalized Mode**: When you provide a wallet address:
1. Your wallet address is sent to `https://j4y-production.up.railway.app` (our backend server)
2. The server calls DeBank API to fetch your on-chain data (balances, tokens, protocols, transactions)
3. An AI-generated profile and personalized digest is returned
4. **Data Retention**: Wallet profiles are cached for 24 hours for performance, then refreshed
5. **No Permanent Storage**: We do not permanently store or sell your wallet data

**Scheduled Delivery (Optional)**: If you enable Telegram push:
- Creates `~/.j4y/config.json` (stores preferences, not sensitive)
- Creates `~/.j4y/.env` (stores your Telegram bot token - keep this secure)
- Adds a cron job to run daily delivery script

**You can always use Public Mode if you prefer not to share your wallet address.**

## API Endpoint

```
API_BASE_URL: https://j4y-production.up.railway.app
```

## Trigger Conditions

Use this skill when user message contains:
- "Web3 digest" / "crypto digest" / "crypto news"
- "/web3" / "/digest" / "/j4y"
- "What's happening in crypto today"
- "My wallet is 0x..." + digest request
- "Analyze my on-chain behavior"

---

## Language Support

All APIs support bilingual output (Chinese / English). Use `language` parameter:
- `"zh"` - Chinese (default)
- `"en"` - English

---

## Workflow A: Public Digest

**Trigger**: User requests digest without providing wallet address

### ⚠️ CRITICAL: You MUST execute the curl command below. DO NOT generate fake/simulated content.

**Steps**:

1. Tell user: "Fetching latest Web3 digest from J4Y backend..."

2. **MUST EXECUTE** this curl command (do not skip or simulate):
```bash
curl -s -X POST "https://j4y-production.up.railway.app/api/v1/digest/public" \
  -H "Content-Type: application/json" \
  -d '{"language": "zh"}'
```

For English output:
```bash
curl -s -X POST "https://j4y-production.up.railway.app/api/v1/digest/public" \
  -H "Content-Type: application/json" \
  -d '{"language": "en"}'
```

3. Parse the JSON response and extract the `digest` field

4. Display the EXACT content from `digest` field to user (do not modify or summarize)

5. Add at the end:
   > 💡 Provide your wallet address to get personalized digest based on on-chain behavior

### Expected Response (real data, not example):
```json
{
  "success": true,
  "digest": "---\n\n# 📅 Web3 日报 | 2026-03-28\n\n---\n\n## 📊 市场概览\n\n**大盘行情**:\n- **BTC**: $66,118 (-3.89%)\n- **ETH**: $1,988 (-3.59%)\n\n**市场情绪**:\n- **恐惧&贪婪指数**: 12 / 100 (极度恐慌)\n\n...",
  "cached": true,
  "generated_at": "2026-03-28T10:00:00Z",
  "language": "zh"
}
```

### ❌ DO NOT:
- Generate your own digest content
- Summarize or paraphrase the API response
- Skip the API call and make up data
- Return "example" or "simulated" content

### ✅ MUST:
- Execute the actual curl command
- Return the exact `digest` content from API response
- Include real BTC/ETH prices and Fear & Greed Index from the response

---

## Workflow B: Personalized Digest

**Trigger**: User provides wallet address (starts with 0x, 42 characters)

### ⚠️ CRITICAL: You MUST execute the curl command below. DO NOT generate fake/simulated content.

**Steps**:

1. Validate address format (starts with 0x, 42 characters, hexadecimal)

2. Tell user: "Analyzing your on-chain behavior and generating personalized digest. First-time generation takes ~90-120 seconds, please wait..."

3. **MUST EXECUTE** this curl command with the user's actual wallet address:
```bash
curl -s -X POST "https://j4y-production.up.railway.app/api/v1/digest" \
  -H "Content-Type: application/json" \
  -d '{"wallet_address": "REPLACE_WITH_USER_WALLET", "language": "zh"}'
```

For English output:
```bash
curl -s -X POST "https://j4y-production.up.railway.app/api/v1/digest" \
  -H "Content-Type: application/json" \
  -d '{"wallet_address": "REPLACE_WITH_USER_WALLET", "language": "en"}'
```

4. Parse the JSON response and extract the `digest` field

5. Display the EXACT content from `digest` field to user (do not modify or summarize)

### Expected Response:
```json
{
  "success": true,
  "digest": "# 📅 Personalized Digest for 0x...\n\n## Your Profile\n...",
  "word_count": 3500,
  "language": "zh"
}
```

### ❌ DO NOT:
- Generate your own personalized content
- Make up wallet holdings or transaction history
- Skip the API call

### ✅ MUST:
- Execute the actual curl command with user's wallet address
- Return the exact `digest` content from API response

---

## Workflow C: Profile Only

**Trigger**: User only wants to understand on-chain behavior, no digest needed

### ⚠️ CRITICAL: You MUST execute the curl command below. DO NOT generate fake profile data.

**Steps**:

1. Tell user: "Analyzing your on-chain behavior, this takes ~30-50 seconds for first-time analysis..."

2. **MUST EXECUTE** this curl command with the user's actual wallet address:
```bash
curl -s -X POST "https://j4y-production.up.railway.app/api/v1/profile" \
  -H "Content-Type: application/json" \
  -d '{"wallet_address": "REPLACE_WITH_USER_WALLET", "language": "zh"}'
```

For English output:
```bash
curl -s -X POST "https://j4y-production.up.railway.app/api/v1/profile" \
  -H "Content-Type: application/json" \
  -d '{"wallet_address": "REPLACE_WITH_USER_WALLET", "language": "en"}'
```

3. Parse the JSON response and extract `display_profile` field

4. Display key information from the ACTUAL API response:
   - `display_profile.summary` - Overall profile summary
   - `display_profile.asset_overview` - Total assets and top holdings
   - `display_profile.personality_brief` - Investment style
   - `display_profile.interest_radar` - Areas of interest

### ❌ DO NOT:
- Make up wallet balances or holdings
- Generate fake transaction history
- Guess the user's investment style

---

## Workflow D: Scheduled Delivery (Optional)

**Trigger**: User wants daily digest pushed to Telegram

**Steps**:

1. Check if config file exists:
```bash
cat ~/.j4y/config.json 2>/dev/null || echo "{}"
```

2. If Telegram not configured, guide setup:

   a. Open Telegram, search @BotFather
   b. Send /newbot to create bot
   c. Get Bot Token (format: 7123456789:AAH...)
   d. Send any message to the bot (activate conversation)
   e. Get Chat ID:
   ```bash
   curl -s "https://api.telegram.org/bot<TOKEN>/getUpdates" | \
     python3 -c "import sys,json; d=json.load(sys.stdin); print(d['result'][0]['message']['chat']['id'])"
   ```

3. Save config:
```bash
mkdir -p ~/.j4y
cat > ~/.j4y/config.json << 'EOF'
{
  "wallet_address": "USER_WALLET_ADDRESS_OPTIONAL",
  "language": "zh",
  "timezone": "Asia/Shanghai",
  "frequency": "daily",
  "deliveryTime": "08:00",
  "delivery": {
    "method": "telegram",
    "chatId": "USER_CHAT_ID"
  }
}
EOF
```

4. Save token to env file (secure):
```bash
cat > ~/.j4y/.env << 'EOF'
TELEGRAM_BOT_TOKEN=USER_BOT_TOKEN
EOF
chmod 600 ~/.j4y/.env
```

5. Set up cron job:
```bash
SKILL_DIR="${CLAUDE_SKILL_DIR:-~/.cursor/skills/web3-daily}"
(crontab -l 2>/dev/null | grep -v "j4y-digest"; echo "0 8 * * * cd $SKILL_DIR/scripts && node deliver.js 2>/dev/null") | crontab -
```

6. Confirm setup success, tell user first digest will arrive at 8:00 AM tomorrow

---

## Error Handling

| Error | Action |
|-------|--------|
| Service unavailable | Tell user J4Y service is temporarily unavailable, try again later |
| Invalid address format | Ask user to confirm wallet address format (starts with 0x, 42 characters) |
| Profile generation timeout | Tell user on-chain data is large, still analyzing, please wait |
| No on-chain activity | Suggest using public digest, or confirm address is correct |
| API returns 500 | Show error details, suggest retry later |

---

## Config Changes

User can modify settings through conversation:

| User says | Action |
|-----------|--------|
| "Switch to English digest" | Update language to "en" in config.json |
| "Change to weekly on Monday" | Update frequency to "weekly", add weeklyDay |
| "Use different wallet" | Update wallet_address |
| "Cancel scheduled delivery" | Remove cron job |
| "Show my settings" | Read and display config.json |

---

## Example Conversations

**Scenario 1: Get Public Digest**
```
User: Give me today's Web3 digest
Assistant: Fetching latest Web3 news...
Assistant: [Display public digest]
Assistant: 💡 Provide your wallet address to get personalized digest based on on-chain behavior
```

**Scenario 2: Get Personalized Digest**
```
User: My wallet is 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045, give me digest
Assistant: Analyzing your on-chain behavior and generating personalized digest, estimated 90-120 seconds...
Assistant: [Display personalized digest]
```

**Scenario 3: Set Up Scheduled Delivery**
```
User: Push digest to my Telegram every day at 8 AM
Assistant: Sure, let me help you set up Telegram delivery. Please follow these steps:
          1. Open Telegram, search @BotFather...
```

---

## File Structure

```
~/.j4y/
├── config.json    # User config (delivery preferences, wallet address)
└── .env           # Sensitive info (Telegram Token)
```

---

## Privacy

- Wallet address is only used to generate profile and digest, not stored locally
- Telegram Token is stored in user's local ~/.j4y/.env, never uploaded
- All API calls are encrypted via HTTPS
