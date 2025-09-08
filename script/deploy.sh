#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Starting GitHub Pages deployment..."

CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" = "gh-pages" ]; then
    echo "❌ Please run this script from your source branch (not gh-pages)"
    exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "💾 Stashing uncommitted changes..."
    git stash push -m "Auto-stash before gh-pages deploy"
    STASHED=true
else
    STASHED=false
fi

echo "🔀 Switching to gh-pages branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
    echo "🔄 Resetting gh-pages to match $CURRENT_BRANCH..."
    git reset --hard $CURRENT_BRANCH
else
    echo "📝 Creating new gh-pages branch..."
    git checkout -b gh-pages
fi

# Install dependencies and build
echo "📦 Installing npm dependencies..."
npm install
echo "🏗️  Building site..."
ELEVENTY_PATH_PREFIX=lookbook-website npm run build

# Clear root directory and copy build files
echo "🧹 Clearing root directory..."
find . -maxdepth 1 -type f ! -name ".gitignore" ! -name "README.md" -delete 2>/dev/null || true
find . -maxdepth 1 -type d ! -name "." ! -name ".git" ! -name "node_modules" ! -name "build" -exec rm -rf {} + 2>/dev/null || true

echo "📁 Copying built files to root..."
cp -r build/* .
rm -rf build

echo "📝 Adding and committing changes..."
git add .
git commit -m "Deploy to GitHub Pages $(date)"

echo "⬆️  Force pushing to gh-pages branch..."
git push -f origin gh-pages

echo "🔙 Returning to $CURRENT_BRANCH branch..."
git checkout $CURRENT_BRANCH

if [ "$STASHED" = true ]; then
    echo "🔄 Restoring stashed changes..."
    git stash pop
fi

echo "✅ Deployment complete! Your site should be available at GitHub Pages."
