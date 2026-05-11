<!--
  GitHub profile · Kushagra Golash
  Source of truth: profile/data.yaml
  Build:           profile/build.ts
  Pipeline:        .github/workflows/build-profile.yml (nightly @ 03:00 UTC)
  Generated:       2026-05-11T15:54:54.227Z
-->

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0D1117,50:5EC8FF,100:0D1117&height=100&section=header&text=&fontColor=ffffff&animation=fadeIn" width="100%" alt="" />

# Kushagra Golash

<sub>↳ <code>howdoiusekeyboard</code> · the operative who can't find the any key</sub>

<br />

[![graphlit · live](https://img.shields.io/website?url=https%3A%2F%2Fgraphlit.kushagragolash.tech&label=graphlit&style=for-the-badge&up_color=5EC8FF&up_message=live&down_color=ffb000&down_message=offline&logo=neo4j&logoColor=white&labelColor=0D1117)](https://graphlit.kushagragolash.tech)
[![addressparser · live](https://img.shields.io/website?url=https%3A%2F%2Faddressparser.kushagragolash.tech&label=addressparser&style=for-the-badge&up_color=5EC8FF&up_message=live&down_color=ffb000&down_message=offline&logo=fastapi&logoColor=white&labelColor=0D1117)](https://addressparser.kushagragolash.tech)

</div>

---

## ▶ CURRENT OPERATION

> Shipping cross-platform haptics for the mobile web · researching graph traversal for academic citation networks · maintaining MCP servers that enforce writing quality.

> Want to know what I'm shipping next?
>
> - [ ] `Ducati` → WebRTC realtime audio pipeline (hands-free voice-advisor mode)
> - [ ] `graphlit-expansion` → real-time inference layer + GraphQL endpoint
> - [ ] `TrueVoice-MCP` v2 → expanded slop taxonomy + tone fingerprinting
> - [ ] `indian-address-parser` → Hindi-only fine-tune + Devanagari edge cases
> - [ ] `@haptics/core` v2 → Web Audio API fallback for older iOS

---

## PROJECTS

### · AI / MCP

<table>
<tr>
<td width="50%" valign="top">

<a href="https://github.com/howdoiusekeyboard/TrueVoice-MCP">
  <img src="https://github-readme-stats-fast.vercel.app/api/pin/?username=howdoiusekeyboard&repo=TrueVoice-MCP&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=5EC8FF&icon_color=5EC8FF&description_lines_count=2" />
</a>

**MCP server that detects AI slop and enforces human-style writing rules.**

Dual transport (stdio + HTTP), one-click install across Claude Desktop, Cursor, VS Code, Claude Code. Scoring across utility, style, and structure dimensions.

`TypeScript` · `MCP SDK` · `Zod` · `Vercel`

</td>
<td width="50%" valign="top">

<a href="https://github.com/howdoiusekeyboard/Ducati">
  <img src="https://github-readme-stats-fast.vercel.app/api/pin/?username=howdoiusekeyboard&repo=Ducati&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=5EC8FF&icon_color=5EC8FF&description_lines_count=2" />
</a>

**AI purchase advisor grounded in your real financial profile.**

Gemini Flash Lite vision scoring on Next.js 16 with Firebase 12 persistence. Hands-free voice-advisor mode in flight — WebRTC pipeline for real-time audio with OpenAI Realtime currently being wired.

`Next.js 16` · `Gemini Flash Lite` · `Firebase 12` · `OpenAI Realtime` · `WebRTC` · `TypeScript`

</td>
</tr>
</table>

### · Graph / Backend

<table>
<tr>
<td width="55%" valign="middle">

<a href="https://graphlit.kushagragolash.tech">
  <img src="./metrics/screenshot-graphlit.png" alt="graphlit-expansion live screenshot" width="100%" />
</a>

</td>
<td width="45%" valign="top">

<a href="https://github.com/howdoiusekeyboard/graphlit-expansion">
  <img src="https://github-readme-stats-fast.vercel.app/api/pin/?username=howdoiusekeyboard&repo=graphlit-expansion&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=5EC8FF&icon_color=5EC8FF&description_lines_count=2" />
</a>

**Academic citation graph expansion + hybrid recommender over OpenAlex and Neo4j.**

Idempotent BFS through 1,000-paper expansions in 20-40 min · Louvain communities + PageRank + 4-component hybrid recommender (citation overlap × topic affinity × author collaboration × velocity, 30/25/25/20 weighted) · 50 parallel fetches, 80 req/s · 895 papers indexed across 8 communities · time-decayed personalised feeds with cold-start fallback.

`Python 3.14` · `Neo4j 6.1` · `FastAPI` · `Pydantic` · `Louvain` · `PageRank`

[**↗ Live Demo**](https://graphlit.kushagragolash.tech)

</td>
</tr>
</table>

### · Hardware / Web

<div align="center">
  <a href="https://github.com/howdoiusekeyboard/haptics">
    <img src="https://github-readme-stats-fast.vercel.app/api/pin/?username=howdoiusekeyboard&repo=haptics&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=5EC8FF&icon_color=5EC8FF&description_lines_count=2&card_width=600" />
  </a>
</div>

**Cross-platform haptic feedback library that finally makes iOS Safari vibrate.**

Unifies mobile-web vibration across iOS (the checkbox-switch workaround for Safari 17.4+) and Android navigator.vibrate() · framework-agnostic core plus typed bindings for React, Vue 3, Svelte 5 · 7 built-in presets (selection, impact, success, warning, error) · respects prefers-reduced-motion · capture-phase listeners preserve native gestures · desktop silent no-op.

`TypeScript` · `React` · `Vue 3` · `Svelte 5` · `iOS Safari 17.4+`

[**npm: @haptics/core v1.0.0**](https://www.npmjs.com/package/@haptics/core)

### · ML / NLP

<div align="center">
  <a href="https://github.com/howdoiusekeyboard/indian-address-parser">
    <img src="https://github-readme-stats-fast.vercel.app/api/pin/?username=howdoiusekeyboard&repo=indian-address-parser&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=5EC8FF&icon_color=5EC8FF&description_lines_count=2&card_width=600" />
  </a>
</div>

**Fine-tuned IndicBERTv2-SS + CRF that decomposes messy Indian addresses into 15 structured entities.**

94.3% F1 on test set (most entities >95%) · ~25 ms avg inference, <30 ms p99 · Hindi (Devanagari) + English support · gazetteer-refined transliteration · packaged as a pip-installable library with FastAPI service and Gradio demo on Google Cloud Run.

`PyTorch` · `IndicBERTv2-SS` · `CRF layer` · `FastAPI` · `Cloud Run`

[**↗ Live Demo**](https://addressparser.kushagragolash.tech)


---

## LOADOUT

<table>
<tr>
<td valign="top" width="25%">

**Languages**

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white)
![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

</td>
<td valign="top" width="25%">

**AI & ML**

![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Transformers](https://img.shields.io/badge/Transformers-FFD43B?style=for-the-badge&logo=huggingface&logoColor=black)
![BERT](https://img.shields.io/badge/BERT-FFD43B?style=for-the-badge&logo=huggingface&logoColor=black)
![ONNX](https://img.shields.io/badge/ONNX-005CED?style=for-the-badge&logo=onnx&logoColor=white)
![scikit--learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)
![LangFlow](https://img.shields.io/badge/LangFlow-000000?style=for-the-badge&logo=chainlink&logoColor=white)
![MCP](https://img.shields.io/badge/MCP-000000?style=for-the-badge&logo=anthropic&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)
![Whisper](https://img.shields.io/badge/Whisper-412991?style=for-the-badge&logo=openai&logoColor=white)

</td>
<td valign="top" width="25%">

**Web & APIs**

![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![WebRTC](https://img.shields.io/badge/WebRTC-051615?style=for-the-badge&logo=webrtc&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

</td>
<td valign="top" width="25%">

**Infra & Data**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GCP](https://img.shields.io/badge/GCP-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Neo4j](https://img.shields.io/badge/Neo4j-4581C3?style=for-the-badge&logo=neo4j&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)

</td>
</tr>
</table>

---

## TELEMETRY 



<div align="center">

<img src="https://github-readme-stats-fast.vercel.app/api?username=howdoiusekeyboard&show_icons=true&include_all_commits=true&count_private=true&theme=tokyonight&rank_icon=percentile&hide_border=true&bg_color=0D1117&title_color=5EC8FF&icon_color=5EC8FF&text_color=c9d1d9" height="180" alt="GitHub Stats" />
<img src="https://github-readme-stats-fast.vercel.app/api/top-langs?username=howdoiusekeyboard&layout=donut-vertical&langs_count=8&hide=html,css,jupyter%20notebook&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=5EC8FF&text_color=c9d1d9" height="180" alt="Top Languages" />

<img src="https://streak-stats.demolab.com?user=howdoiusekeyboard&theme=tokyonight&hide_border=true&background=0D1117&ring=5EC8FF&fire=5EC8FF&currStreakLabel=5EC8FF&dates=c9d1d9&sideLabels=5EC8FF" height="180" alt="GitHub Streak" />





</div>

---

<div align="center">

<sub>Ship things that don't exist yet. Then ship the source.</sub>

<sub>
  built from <code>profile/build.ts</code> ·
  pinged demos ·
  regenerated nightly · last build <code>2026-05-11T15:54:54.227Z</code>
</sub>

</div>
