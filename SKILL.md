---
name: web3-daily
version: 2.2.0
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

- 📊 **Market Overview** — BTC/ETH prices, 24h change, Fear & Greed Index with interpretation
- 📰 **Macro Analysis** — 3 key themes from 170+ sources (impact level, core event, short/medium-term analysis)
- 💰 **Capital Flow Tracking** — Major inflows & outflows with tables
- 📡 **KOL Sentiment** — CN/EN comparison table, biggest divergence, high consensus
- ⚠️ **Risk Alerts** — Star-rated risks with specific action recommendations
- 💡 **Opportunity Signals** — Confidence-rated opportunities with time windows
- 💬 **One-Sentence Summary** — Core market thesis in a single line
- 🌐 **Bilingual** — Available in English or Chinese

**No personal data required. No API keys needed.**

## Digest Structure

```
# 📅 Web3 日报 | YYYY-MM-DD
## 📊 市场概览        ← BTC/ETH price + Fear & Greed + market interpretation
## 📰 宏观市场分析    ← 3 themes: impact level / core event / analysis / sources
## 💰 资金流向追踪    ← Markdown tables: major inflows + outflows
## 📡 全球 KOL 舆情   ← Sentiment index + CN/EN comparison table + divergence + consensus
## ⚠️ 风险警示        ← Star-rated risks + 应对建议 per risk
## 💡 机会信号        ← Confidence-rated opportunities
## 💬 一句话总结      ← One bold sentence summarizing the market
```

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
- "简版日报" / "compact digest" (for compact version)

---

## Workflow A: Full Digest (Default)

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

---

## Workflow B: Compact Digest (Same structured output, alias endpoint)

**Trigger**: User asks for "简版" / "compact" / "推送版日报" / "quick digest"

**Steps**: Same as Workflow A but use `/digest/compact` endpoint. Output is identical to `/digest/public`.

```bash
curl -s -X POST "https://j4y-production.up.railway.app/api/v1/digest/compact" \
  -H "Content-Type: application/json" \
  -d '{"language": "zh"}'
```

---

### Expected Response Structure:
```json
{
  "success": true,
  "digest": "# 📅 Web3 日报 | 2026-03-31\n\n---\n\n## 📊 市场概览\n\n**大盘行情**:\n- **BTC**: $67,100 (+0.55%)\n- **ETH**: $2,031 (+1.16%)\n\n**市场情绪**:\n- **恐惧&贪婪指数**: 11 / 100 (极度恐慌)\n\n💡 **市场解读**: ...\n\n---\n\n## 📰 宏观市场分析\n\n...\n\n## 💰 资金流向追踪\n\n### 主要流入\n| 方向 | 金额 | 解读 |\n|------|------|------|\n...\n\n## 📡 全球 KOL 舆情\n\n### 综合情绪指数: 4.6 / 10 (偏悲观)\n...\n\n## ⚠️ 风险警示\n\n### 🚨 地缘政治风险（风险等级：★★★★★）\n...\n**应对建议**: 降低杠杆、保持现金仓位\n\n## 💡 机会信号\n\n### BTC 防御型定投（可信度：★★★★☆）\n...\n\n## 💬 一句话总结\n\n**宏观不稳、情绪极端，但BTC防御属性与ETH结构性升级正在形成中期机会窗口。**\n\n---\n\n**数据统计**\n...",
  "cached": true,
  "generated_at": "2026-03-31T10:00:00Z",
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

**Full Digest:**
```
User: What's happening in crypto today?
Assistant: Fetching latest Web3 digest...
Assistant: [Display full digest with detailed analysis]
```

**Compact Digest:**
```
User: 给我简版日报
Assistant: 正在获取精简版 Web3 日报...
Assistant: [Display compact digest with key insights]
```

---

## Data Sources

- **News**: The Block, CoinDesk, Decrypt, Cointelegraph, and 160+ more
- **KOLs**: 50+ Chinese + English crypto Twitter accounts
- **Market**: CoinGecko, CoinMarketCap (prices), Alternative.me (Fear & Greed Index)

Updated every 6 hours.
