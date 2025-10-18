# GPUWISE - AI-Driven GPU Market Intelligence Platform

> **Built in 48 hours for #LovableHackathon | By Chandni**

Making the $2 trillion GPU infrastructure market accessible through gamification, AI analysis, and real-time integrations.

![GPUWISE Banner](docs/images/banner.png)

## 🎯 What is GPUWISE?

GPUWISE democratizes GPU procurement intelligence through an innovative platform that combines:
- **Interactive Learning** - Game-based simulator for hands-on experience
- **AI-Powered Analysis** - Gemini AI provides market insights with confidence scores
- **Real-Time Integrations** - Discord, Slack, Zapier, Gmail, Google Sheets
- **Strategic Planning** - Scenario modeling for what-if analysis
- **Free Education** - Comprehensive learning hub for all skill levels

## ✨ Key Features

### 🎮 1. GPU Market Simulator
12-week procurement game where you make real buying decisions. Learn market dynamics through experience, not spreadsheets.

### 🤖 2. AI Market Analyst
Ask questions, get intelligent analysis powered by Google Gemini with transparency and confidence scoring.

### 📊 3. Scenario Studio
Model what-if scenarios: H200 release, market crashes, supply shortages. Plan your strategy.

### 💬 4. Discord Integration
Real-time GPU market alerts in your Discord channels. AI-generated, always unique.

### 💼 5. Slack Integration
Send market intelligence to team workspaces with interactive message blocks.

### ⚡ 6. Zapier Integration
Connect to 5,000+ apps. Tested with Gmail for automated email alerts.

### 📑 7. Google Sheets Export
Export pricing data, scenarios, and analytics to formatted multi-sheet workbooks.

### 📚 8. Learn Hub
Free educational content: GPU basics, market dynamics, procurement strategies.

## 🏗️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- shadcn/ui components

**Backend:**
- Supabase (PostgreSQL + Edge Functions)
- Serverless architecture
- Real-time subscriptions

**AI/ML:**
- Google Gemini AI API
- Custom prompt engineering
- Confidence scoring system

**Integrations:**
- Discord Webhooks API
- Slack Webhooks API
- Zapier Webhooks
- Google Sheets (SheetJS)

**Libraries:**
- Recharts (data visualization)
- Lucide React (icons)
- React Router (navigation)
- Papaparse (CSV handling)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier)
- Google AI Studio API key (free)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/gpuwise.git
cd gpuwise

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run development server
npm run dev
```

### Environment Variables
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 📖 Documentation

Detailed documentation for each feature:

- [Setup Guide](docs/01-setup.md) - Complete installation and configuration
- [GPU Simulator](docs/02-simulator.md) - Building the game engine
- [AI Chat Integration](docs/03-ai-chat.md) - Gemini AI implementation
- [Discord Integration](docs/04-discord-integration.md) - Real-time alerts
- [Slack Integration](docs/05-slack-integration.md) - Team notifications
- [Zapier Integration](docs/06-zapier-integration.md) - Workflow automation
- [Sheets Export](docs/07-sheets-export.md) - Data export functionality
- [Scenario Studio](docs/08-scenarios.md) - What-if modeling
- [Architecture](docs/architecture.md) - Technical architecture overview

## 🎨 Design Philosophy

**Accessibility Over Exclusivity**
Every design choice prioritizes making complex markets approachable without dumbing them down.

**Education Over Gatekeeping**
Free, comprehensive learning resources. Knowledge shouldn't be hoarded.

**Transparency Over Black Boxes**
AI shows its confidence scores. Users understand why recommendations are made.

**Empowerment Over Intimidation**
Tools that invite people in, not keep them out.

## 🏆 Built for #LovableHackathon

**Timeline:** 48 hours (October 6-8, 2025)
**Original Goal:** 2-3 features
**Actually Shipped:** 8 fully functional features

This project demonstrates:
- Rapid prototyping and execution
- Real AI integration (not mockups)
- Production-ready code quality
- Women-led product design principles

## 👩‍💻 About the Creator

**Chandni** - Led Google Cloud teams supporting GPU infrastructure for AI startups across North America. Over a decade of experience in AI infrastructure, combined with a passion for making complex technology accessible.

[LinkedIn](your-linkedin) | [Twitter](your-twitter) | [Portfolio](your-portfolio)

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered development platform
- Powered by [Supabase](https://supabase.com) - Open source Firebase alternative
- AI by [Google Gemini](https://ai.google.dev) - Generative AI model
- UI components from [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📧 Contact

Questions? Reach out at [your-email@example.com]

---

**⭐ If this project helped you, please star the repo!**

Built with 💜 by Chandni | #LovableHackathon 2025
