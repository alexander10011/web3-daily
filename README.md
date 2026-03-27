# J4Y Web3 Research Skill

An open-source AI Agent Skill that provides Web3 research digest service.

一个开源的 AI Agent Skill，为你提供 Web3 投研日报服务。

---

**Two Modes | 两种模式**:
- 🌐 **Public | 公共版**: Get general Web3 digest without any input (macro news + KOL sentiment + market data)
- 🎯 **Personalized | 个性化版**: Input wallet address to get digest based on on-chain behavior

## Quick Start | 快速开始

### Installation | 安装

```bash
# Cursor
git clone https://github.com/alexander10011/j4y-skill.git ~/.cursor/skills/j4y-web3-research

# Claude Code
git clone https://github.com/alexander10011/j4y-skill.git ~/.claude/skills/j4y-web3-research
```

### Usage | 使用

After installation, just tell your AI assistant:

安装后，直接对 AI 助手说：

```
Give me today's Web3 digest
# or
给我今天的 Web3 日报
```

Or provide wallet address for personalized digest:

或者提供钱包地址获取个性化日报：

```
My wallet is 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045, give me digest
# or
我的钱包是 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045，给我日报
```

**That's it!** No API key configuration required.

**就这么简单！** 无需配置任何 API Key。

## Features | 功能特性

### Public Digest Includes | 公共版日报包含

- 📊 **Market Overview | 市场概览**: BTC/ETH prices, Fear & Greed Index
- 📰 **Macro News | 宏观新闻**: 5-8 core crypto events
- 📡 **KOL Sentiment | KOL 舆情**: Hot takes from Chinese + English crypto Twitter

### Personalized Digest Adds | 个性化版额外包含

- 👤 **Investment Profile | 投资画像**: Analyze your investment style based on on-chain behavior
- 🎯 **Tailored Recommendations | 专属推荐**: News related to your holdings
- 💡 **Custom Advice | 定制建议**: Suggestions for your portfolio

## Examples | 示例

### User Profile Example | 用户画像示例

<details>
<summary>Click to expand | 点击展开</summary>

**Wallet | 钱包**: `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`

```json
{
  "summary": "Based on on-chain data analysis, your total assets are approximately $210,100, mainly distributed on Plasma (~90%) and Ethereum (~7%). You currently hold USDT (~$190K) with high concentration, small ETH allocation, and maintain ~$8.9K in Pendle V2 locked and staked positions. Your asset structure shows extreme defensiveness: the vast majority of funds remain in stablecoin form, indicating you're not rushing to chase market movements, but waiting for clear macro turning points or higher certainty yield windows.",
  
  "archetype_tags": [
    "Extremely conservative on-chain cash holder",
    "Pendle fixed-income strategy expert", 
    "Early liquidity waiter in new ecosystems"
  ],
  
  "asset_overview": {
    "total_value": 210100.32,
    "top_holdings": [
      {"symbol": "USDT", "value": 190143.64, "percentage": 90.5},
      {"symbol": "ETH", "value": 7456.61, "percentage": 3.6},
      {"symbol": "PENDLE", "value": 8947.32, "percentage": 4.3}
    ]
  },
  
  "interest_radar": "You should focus on: (1) Pendle V2 new maturity markets, yield curve changes and potential competitors (Spectra, Element); (2) Stablecoin systemic risks, especially USDT custody and liquidity safety on new chains (Plasma); (3) More defensive on-chain fixed income or RWA products like Ondo, Maple, Backed; (4) Plasma ecosystem infrastructure progress.",
  
  "estimated_timezone": {
    "region": "East Asia",
    "timezone": "UTC+8",
    "confidence": "high"
  }
}
```

**中文版**:

```json
{
  "summary": "基于链上数据分析，你目前的总资产约为 $210,100，主要分布在 Plasma（约 90%）和 Ethereum（约 7%）。你当前高度集中持有 USDT（约 $190K），少量配置 ETH，并在 Pendle V2 中保有约 $8.9K 的锁仓与质押仓位。你的资产结构呈现出极端防御性：绝大部分资金停留在稳定币形态，说明你并不急于博取行情，而是在等待明确的宏观拐点或更高确定性的收益窗口。",
  
  "archetype_tags": [
    "极端稳健的链上现金持有者",
    "精通 Pendle 的固定收益策略玩家",
    "新生态早期流动性等待者"
  ],
  
  "interest_radar": "你应该关注：(1) Pendle V2 的新到期市场、收益曲线变化及潜在竞品（如 Spectra、Element）；(2) 稳定币体系的系统性风险，尤其是 USDT 在新链（Plasma）上的托管与流动性安全；(3) 更偏防御型的链上固收或类 RWA 产品，如 Ondo、Maple、Backed；(4) Plasma 生态的基础设施进展。"
}
```

</details>

### Public Digest Example | 公共日报示例

<details>
<summary>Click to expand | 点击展开</summary>

```markdown
# 📅 J4Y Web3 Digest | 2026-03-27

## 📊 Market Overview

**Market Prices**:
- **BTC**: $66,662 (-3.75%)
- **ETH**: $1,990 (-3.72%)

**Market Sentiment**:
- **Fear & Greed Index**: 13 / 100 (Extreme Fear)

💡 **Market Interpretation**: Deleveraging still in progress, institutional funds 
have shifted to ETH and RWA, sentiment in cautious gaming phase under extreme fear.

---

## 📰 Macro News

### 🔥 Theme 1: ETH Supply Continues to Contract
Exchange ETH balance hits 10-year low, staking and on-chain transfers at all-time high. 
Short-term volatility amplified by early whale selling, but mid-term pricing logic 
shifting to "scarcity + yield asset".

### 🔥 Theme 2: Crypto Assets Enter Housing Finance System
Coinbase partners with Better.com to launch Fannie Mae-backed crypto mortgage loans. 
BTC/USDC becomes first crypto asset accepted as down payment in US mainstream housing finance.

### 🔥 Theme 3: RWA and On-chain Financial Infrastructure Landing
BlackRock BUIDL, tokenized US stocks, energy asset tokenization advancing simultaneously. 
RWA moving from pilot to scalable application, DeFi valuation anchors changing.

---

## 📡 Global KOL Sentiment

**Overall Sentiment Index: 4.3/10 – Bearish but approaching turning point**

**Global Sentiment Distribution**:
- 🟢 Bullish: 32% (CN 28% | EN 37%)
- 🔴 Bearish: 41% (CN 46% | EN 35%)
- ⚪ Neutral: 27% (CN 26% | EN 28%)

**Key Findings**:
- Chinese circle showing emotional selling
- English circle focusing on ETF, whale, and options data
- Both agree: deleveraging not fully complete

---

## 🎯 Want Personalized Recommendations?

Provide your wallet address to get personalized digest based on on-chain behavior.
```

</details>

### Personalized Digest Example | 个性化日报示例

<details>
<summary>Click to expand | 点击展开</summary>

```markdown
# 📅 J4Y Personalized Digest | 2026-03-27

## 👤 Your Investment Profile | 你的投资概况

**Total Assets | 总资产**: $210,100

**Asset Distribution | 资产分布**:
- Plasma: $189,000 (90%)
- Ethereum: $14,700 (7%)
- BNB Chain: $6,400 (3%)

**Core Holdings | 核心持仓**: $USDT, $ETH, Pendle, $BNB

**Investor Profile | 投资者画像**: Extremely conservative on-chain cash holder, DeFi fixed-income player

---

## 📊 Market Overview | 市场概览

**BTC**: $66,266 (-4.72%) | **ETH**: $1,984 (-4.55%)

**Fear & Greed Index**: 13 / 100 (Extreme Fear | 极度恐慌)

---

## 🎯 Your Personalized Intel | 你的专属情报

### USDT
USDT launches KPMG Big Four audit, significantly reducing stablecoin credit risk. 
With 90% of your assets in USDT, this is a systemic positive for you.

USDT启动KPMG四大审计，显著降低稳定币信用风险。你90%资产为USDT，该事件对你是系统性利好。

### ETH
ETH breaks below $2k, but exchange inventory at all-time low, whales accumulating at lows. 
Your position is small, better suited as primary offensive asset when risk appetite returns.

ETH跌破2k，但交易所存量创新低，鲸鱼低位承接。你仓位较小，当前更适合作为未来风险开启时的首选进攻资产。

### Pendle
Pendle strengthens its fixed-income infrastructure positioning. Under tight macro conditions, 
maintaining short-duration PT with maturity management strategy is optimal.

Pendle强化其固定收益基础设施定位。宏观偏紧下，维持短久期PT、到期管理策略更优。

---

## 💡 Today's Suggestions | 今日建议

1. Maintain USDT as core position, focus on KPMG audit asset structure details
2. Don't add ETH yet, record key price zones as backup for future risk-on
3. Continue short-duration PT strategy for Pendle, exit at maturity

---

## ⚠️ Risk Alerts | 风险提示

1. 🚨 [HIGH] Macro liquidity tightening + geopolitics may trigger new deleveraging
2. 🚨 [HIGH] New chain Plasma may see stablecoin liquidity discount in extreme conditions
3. ⚠️ [MED] Continued ETF outflows suppress BTC/ETH mid-term performance
```

</details>

## Scheduled Delivery (Optional) | 定时推送（可选）

Want daily digest automatically? Set up Telegram delivery:

想要每天自动收到日报？设置 Telegram 推送：

```
Push digest to my Telegram every day at 8 AM
# or
每天早上 8 点推送日报到我的 Telegram
```

The AI assistant will guide you through setup.

AI 助手会引导你完成设置。

### Manual Setup | 手动设置

1. Install dependencies | 安装依赖:
```bash
cd ~/.cursor/skills/j4y-web3-research/scripts
npm install
```

2. Create config file | 创建配置文件 `~/.j4y/config.json`:
```json
{
  "wallet_address": "YOUR_WALLET_ADDRESS_OPTIONAL",
  "language": "zh",
  "delivery": {
    "method": "telegram",
    "chatId": "YOUR_TELEGRAM_CHAT_ID"
  }
}
```

3. Create env file | 创建环境变量文件 `~/.j4y/.env`:
```
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN
```

4. Test delivery | 测试推送:
```bash
node deliver.js --test
```

5. Set up cron job (daily 8:00 AM) | 设置定时任务:
```bash
(crontab -l 2>/dev/null; echo "0 8 * * * cd ~/.cursor/skills/j4y-web3-research/scripts && node deliver.js") | crontab -
```

## Customize Digest Style | 自定义日报风格

Edit files in `prompts/` directory to customize digest style:

编辑 `prompts/` 目录下的文件可以自定义日报风格：

- `digest-intro.md` - Overall style and structure
- `summarize-news.md` - News summary style
- `summarize-kol.md` - KOL sentiment summary style

Or just tell your AI assistant:

或者直接告诉 AI 助手：

```
Make the digest more concise
# or
让日报更简洁一些
```

## Privacy | 隐私说明

- ✅ All API keys are managed server-side, you don't need to configure any
- ✅ Wallet address is only used to generate profile, not stored locally
- ✅ Telegram Token is stored in your local `~/.j4y/.env`, never uploaded
- ✅ All communication is encrypted via HTTPS

## Architecture | 技术架构

```
┌─────────────────────────────────────┐
│         Your AI Agent               │
│   (Cursor / Claude Code / etc.)     │
└─────────────────┬───────────────────┘
                  │ Read SKILL.md
                  │ Call API
                  ▼
┌─────────────────────────────────────┐
│         J4Y Backend API             │
│  https://j4y-production.up.railway.app
│                                     │
│   /api/v1/digest/public  Public     │
│   /api/v1/digest         Personal   │
│   /api/v1/profile        Profile    │
└─────────────────────────────────────┘
```

## FAQ | 常见问题

### Q: Do I need to configure API keys? | 需要配置 API Key 吗？
**A**: No! All API keys (DeBank, OpenAI, Twitter, etc.) are managed server-side.

不需要！所有 API Key 都由服务端管理。

### Q: How often is public digest updated? | 公共日报多久更新一次？
**A**: Every 6 hours, synced with content crawling cycle.

每 6 小时更新一次，与内容抓取周期同步。

### Q: How long does personalized digest take? | 个性化日报需要多长时间？
**A**: First-time profile generation ~30-50s, digest generation ~90-120s. Profile is cached for 24 hours.

首次生成画像约 30-50 秒，生成日报约 90-120 秒。画像有 24 小时缓存。

### Q: Which wallets are supported? | 支持哪些钱包？
**A**: All EVM-compatible chain wallet addresses (starting with 0x).

支持所有 EVM 兼容链的钱包地址（0x 开头）。

### Q: How to cancel scheduled delivery? | 如何取消定时推送？
**A**: Tell AI assistant "Cancel scheduled delivery", or manually remove cron job:

告诉 AI 助手 "取消定时推送"，或手动删除 cron 任务：

```bash
crontab -l | grep -v "j4y" | crontab -
```

## Contributing | 贡献

Issues and Pull Requests are welcome!

欢迎提交 Issue 和 Pull Request！

## License | 许可证

MIT License
