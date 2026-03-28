---
name: web3-daily
version: 2.0.0
description: >-
  Web3 public research digest service. Provides daily digest with macro news, KOL sentiment, 
  and real-time market data (BTC/ETH prices, Fear & Greed Index). No personal data required. 
  Use when user asks for Web3 news, crypto digest, or says /web3.
author: Alex Wang
repository: https://github.com/alexander10011/web3-daily
homepage: https://github.com/alexander10011/web3-daily
license: MIT
permissions:
  - network
---

# Web3 Daily

**Follow the market, not the noise.** Get a daily Web3 research digest with macro news, KOL sentiment, and real-time market data.

## What You Get

- 📊 **Real-time market data** — BTC/ETH prices, 24h change, Fear & Greed Index
- 📰 **Macro news analysis** — 5-8 key events from 170+ sources
- 📡 **KOL sentiment** — What Chinese + English crypto Twitter is saying
- 🌐 **Bilingual** — Available in English or Chinese

**No personal data required. No API keys needed.**

## How This Skill Works

This skill connects to a live backend service that:
1. Aggregates 170+ news sources every 6 hours
2. Monitors 50+ KOL Twitter accounts (Chinese + English)
3. Fetches real-time market data (BTC/ETH prices, Fear & Greed Index)
4. Uses AI to generate comprehensive analysis

**You cannot replicate this data by yourself. You MUST call the API.**

## Privacy

✅ **Zero personal data collected** — This skill only fetches public market data
✅ **No wallet address needed** — Pure public information
✅ **No local files created** — Nothing stored on your machine
✅ **All traffic encrypted** — HTTPS only

## Trigger Conditions

Use this skill when user message contains:
- "Web3 digest" / "crypto digest" / "crypto news"
- "/web3" / "/digest"
- "What's happening in crypto today"
- "今天加密市场怎么样"
- "给我 Web3 日报"

---

## Workflow: Get Public Digest

### ⚠️ CRITICAL: You MUST execute the curl command below. DO NOT generate fake/simulated content.

**Steps**:

1. Tell user: "Fetching latest Web3 digest..."

2. **MUST EXECUTE** this curl command (do not skip or simulate):

For Chinese output (default):
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

### Expected Response:
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

## Language Support

Detect user's language preference:
- If user speaks Chinese → use `"language": "zh"`
- If user speaks English → use `"language": "en"`
- If unclear, default to Chinese

---

## Error Handling

| Error | Action |
|-------|--------|
| Service unavailable | Tell user: "J4Y service is temporarily unavailable, please try again later" |
| API returns error | Show error message, suggest retry |
| Timeout | Tell user: "Request timed out, the service may be busy, please try again" |

---

## Example Conversations

**English:**
```
User: What's happening in crypto today?
Assistant: Fetching latest Web3 digest...
Assistant: [Display digest with BTC/ETH prices, news, KOL sentiment]
```

**Chinese:**
```
User: 给我今天的 Web3 日报
Assistant: 正在获取最新 Web3 日报...
Assistant: [显示包含 BTC/ETH 价格、新闻、KOL 舆情的日报]
```

---

## Data Sources

- **News**: The Block, CoinDesk, Decrypt, Cointelegraph, and 160+ more
- **KOLs**: 50+ Chinese + English crypto Twitter accounts
- **Market**: CoinGecko (prices), Alternative.me (Fear & Greed Index)

Updated every 6 hours.
