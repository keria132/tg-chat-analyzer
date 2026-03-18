# TG Chat Analyzer

A Next.js web app that turns a Telegram chat export into visual analytics and AI-powered relationship insights,
all processed client-side with no backend storage.

---

## Features

### MVP (current)

| Feature                                         | Status |
| ----------------------------------------------- | ------ |
| Upload Telegram JSON export                     | ✅     |
| Monthly message activity chart (per user)       | ✅     |
| Per-user message breakdown by category          | ✅     |
| AI personality & relationship analysis (Gemini) | ✅     |
| Direct chat & group chat support                | ✅     |
| Dark / light theme                              | ✅     |

### Message categories tracked

Text · Voice · Video messages · Photos · Videos · Stickers · GIFs · Music · Other files

### AI analysis scores (per user)

Romance · Friendliness · Anger · Vulnerability · Reciprocation · Expressiveness · Power dynamics

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Installation

```bash
git clone https://github.com/keria132/tg-chat-analyzer.git
cd tg-chat-analyzer
npm install
```

### Environment setup

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 How to export your Telegram chat

1. Open Telegram Desktop
2. Go to the chat you want to analyze
3. Click the **⋮ menu** → **Export chat history**
4. Select **JSON** format
5. Uncheck media files to avoid exporting the actual files, message metadata is still included
6. Choose your date range and click **Export**
7. Upload the resulting `result.json` to the app

---

## Project Structure

```
tg-chat-analyzer/
├── app/
│   ├── actions/
│   │   └── chatAnalysis.ts        # Server action - calls Gemini API
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── AnalyticsSection.tsx        # Top-level analytics layout
│   ├── Charts/
│   │   ├── MessageActivityChart.tsx   # Area chart - activity over time
│   │   ├── UserActivityChart.tsx      # Bar chart - per-user category totals
│   │   ├── ChartCardWrapper.tsx       # Shared card shell for charts
│   │   └── chartConfigs.ts            # Recharts config + metric keys
│   ├── ChatAnalysis/
│   │   ├── ChatAnalysis.tsx           # Fetch orchestration + loading/error states
│   │   ├── ChatAnalysisPanel.tsx      # Renders AI results UI
│   │   ├── ChatAnalysisSkeleton.tsx   # Loading skeleton
│   │   ├── chatAnalysis.constants.ts  # MESSAGES_CAPACITY, score labels
│   │   └── chatAnalysis.types.ts      # TextMessage, ChatType enum
│   ├── ChatUpload/
│   │   ├── ChatUpload.tsx             # File input + JSON parsing
│   │   └── messages.ts                # Toast message strings
│   └── ui/                            # shadcn/ui primitives
│
├── constants/
│   └── palletes.ts                 # Color palette + tendency badge styles
│
├── lib/
│   ├── helpers/
│   │   ├── buildChartData.ts       # Transforms raw messages → chart data
│   │   ├── sortUsersMessages.ts    # Categorizes messages per user
│   │   └── index.ts
│   ├── schemas/
│   │   └── chatAnalysis.schemas.ts # Zod schema for Gemini response
│   └── utils.ts
│
└── types/
    ├── telegram.types.ts           # TelegramMessage, MessageCategory, etc.
    └── chart.types.ts              # Chart-specific data shapes
```

---

## Tech Stack

| Layer             | Technology              |
| ----------------- | ----------------------- |
| Framework         | Next.js 16 (App Router) |
| Language          | TypeScript              |
| Styling           | Tailwind CSS v4         |
| Components        | shadcn/ui + Radix UI    |
| Charts            | shadcn/ui + Recharts    |
| AI                | Google Gemini 2.5 Flash |
| Schema validation | Zod v4                  |

---

## MVP Roadmap

### Phase 1 - Tools and core Analytics

- [x] JSON upload & parsing
- [x] Monthly activity area chart (stacked per user)
- [x] Per-user message category bar chart (text, voice, video, photos, stickers, GIFs…)
- [x] AI relationship analysis with per-user scores & insights
- [ ] Husky + lint-staged (pre-commit hooks)
- [ ] Unit tests for helper functions
- [ ] SWR for AI fetching

### Phase 2 - Enriched Metrics

- [ ] Most active hours heatmap (per user)
- [ ] Response time analysis
- [ ] Message length distribution
- [ ] Most used words / emoji cloud per user
- [ ] Most common topics and most relevant topics

### Phase 3 - UX & Polish

- [ ] Shareable analysis link / PDF export
- [ ] Date range filter for all charts
- [ ] Pagination / lazy loading for large chats
- [ ] Better upload progress indicator
- [ ] Mobile layout improvements

### Phase 4 - Channel & Business Analytics

- [ ] Telegram Bot API integration
- [ ] Server-side ingestion pipeline for large-scale data
- [ ] Growth metrics - member joins/leaves over time, 'trigger' events
- [ ] Content performance & top contributor tracking
- [ ] Peak activity windows
- [ ] Topic clustering (requires embeddings)
