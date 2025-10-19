#!/bin/bash

PROJECT_DIR="-hamgamplastic"

# تغییرات لوکال رو پوش می‌کنیم
git add .
git commit -m "deploy update"
git push origin main

# روی سرور میریم
ssh root@185.213.164.74 << EOF
  set -e
  cd /root/$PROJECT_DIR
  echo ">>> Pulling latest code..."
  git pull origin main

  echo ">>> Installing backend dependencies..."
  cd Back-end
  npm install

  echo ">>> Restarting server with PM2..."
  pm2 restart all || pm2 start server.js --name hamgam-api
EOF