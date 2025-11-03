#!/bin/bash

# --- تنظیمات ---
REMOTE_USER="arshia"
REMOTE_HOST="85.208.253.231"
REMOTE_PORT="3031"
PROJECT_FOLDER="final-web"  # اسم پوشه روی سرور
PM2_APP_NAME="final-web"    # اسمی که به pm2 دادید
GIT_BRANCH="main"
# --- پایان تنظیمات ---

# 1. گرفتن پیام کامیت از ورودی اسکریپت
COMMIT_MESSAGE="$1"

# چک کردن اینکه آیا پیام کامیت داده شده است
if [ -z "$COMMIT_MESSAGE" ]; then
  echo "❌ خطا: لطفاً یک پیام برای کامیت وارد کنید."
  echo "مثال: ./deploy.sh \"آپدیت هدر سایت\""
  exit 1
fi

echo "🚀 ۱. شروع دیپلوی..."

# 2. اجرای دستورات گیت روی مک (Local)
echo "   > مرحله ۱: پوش کردن تغییرات به گیت‌هاب..."
git add .
git commit -m "$COMMIT_MESSAGE"
git push origin $GIT_BRANCH

# چک کردن موفقیت push
if [ $? -ne 0 ]; then
  echo "❌ خطا در هنگام push کردن به گیت‌هاب. عملیات متوقف شد."
  exit 1
fi

echo "   ✅ پوش به گیت‌هاب موفق بود."

# 3. اجرای دستورات روی سرور (VPS)
echo "   > مرحله ۲: اتصال به سرور و آپدیت کردن..."

# دستورات داخل << EOF تا EOF روی سرور اجرا می‌شوند
ssh -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST << EOF

  echo "   > (روی سرور): وارد پوشه $PROJECT_FOLDER می‌شوم..."
  cd $PROJECT_FOLDER

  echo "   > (روی سرور): پول کردن تغییرات از گیت‌هاب..."
  git pull origin $GIT_BRANCH

  echo "   > (روی سرور): نصب/آپدیت پکیج‌های npm..."
  npm install --omit=dev

  echo "   > (روی سرور): ری‌استارت کردن اپلیکیشن با pm2..."
  pm2 restart $PM2_APP_NAME

  echo "   > (روی سرور): خروج..."
EOF

echo "✅ ۴. دیپلوی با موفقیت انجام شد!"