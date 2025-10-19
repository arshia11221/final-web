FROM node:18

# پوشه کاری داخل کانتینر
WORKDIR /usr/src/app

<<<<<<< HEAD
# کپی کردن package.json 
COPY package*.json ./
RUN npm install

# کپی کل پروژه (شامل public و server.js)
=======
# کپی کردن package.json و نصب پکیج‌ها
COPY Back-end/package*.json ./Back-end/
RUN cd Back-end && npm install

# کپی کل پروژه (فرانت + بک‌اند)
>>>>>>> d2d7746b8d7f2b7e63018aff38b31dc18fe3969a
COPY . .

# پورت اپلیکیشن
EXPOSE 3000

# اجرای سرور
<<<<<<< HEAD
CMD ["node", "server.js"]
=======
CMD ["node", "Back-end/server.js"]
>>>>>>> d2d7746b8d7f2b7e63018aff38b31dc18fe3969a
