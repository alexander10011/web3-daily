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
