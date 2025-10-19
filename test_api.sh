#!/bin/bash

BASE_URL="http://185.213.164.74:3000"

echo "🔹 تست سلامت سرور"
curl -s $BASE_URL/api/health
echo -e "\n----------------------"

echo "🔹 ثبت نام کاربر (ممکنه تکراری باشه)"
curl -s -X POST $BASE_URL/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "hossein",
    "email": "hossein@example.com",
    "password": "123456"
  }'
echo -e "\n----------------------"

echo "🔹 ورود کاربر"
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "hossein",
    "password": "123456"
  }')

echo $LOGIN_RESPONSE
TOKEN=$(echo $LOGIN_RESPONSE | grep -oP '"token":"\K[^"]+')
echo -e "\nتوکن استخراج شد: $TOKEN"
echo -e "----------------------"

echo "🔹 ساخت سفارش جدید"
curl -s -X POST $BASE_URL/api/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "productId": "123",
    "quantity": 2,
    "price": 150000
  }'
echo -e "\n----------------------"

echo "🔹 لیست سفارش‌های من"
curl -s -X GET $BASE_URL/api/my-orders \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n----------------------"
