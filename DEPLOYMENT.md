# April Studio - Deployment Guide

## Prerequisites

### Install Git
1. Download from: https://git-scm.com/download/win
2. Run installer with default options
3. Restart terminal/VS Code after installation

---

## Step 1: Initialize Git Repository

Open terminal in the project folder and run:

```powershell
cd C:\Users\USER\.gemini\antigravity\scratch\april-studio

git init
git add .
git commit -m "Initial commit: April Studio landing page"
```

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `april-studio`
3. Keep **Public** (required for free Vercel hosting)
4. Do NOT add README (we already have one)
5. Click **Create repository**

---

## Step 3: Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/april-studio.git
git branch -M main
git push -u origin main
```

---

## Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your `april-studio` repository
5. Vercel auto-detects Vite configuration
6. Click **Deploy**

Your site will be live at: `https://april-studio.vercel.app`

---

## Updating the Site

After making changes, push updates:

```powershell
git add .
git commit -m "Update: description of changes"
git push
```

Vercel automatically redeploys on every push!

---

## Project Location

```
C:\Users\USER\.gemini\antigravity\scratch\april-studio\
```

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
