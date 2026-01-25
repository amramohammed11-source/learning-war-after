# Learning War-After Platform

## نبذة سريعة
منصة تعليمية تفاعلية لعرض المواد التعليمية (PDF) محليًا وتشغيل فيديوهات شرح، مع تنظيم حسب المرحلة وواجهة سهلة الاستخدام تعمل عبر المتصفح.

---

## Problem → Solution

### Problem (المشكلة)
يعاني الطلبة من صعوبة الوصول للمحتوى التعليمي في ظروف الطوارئ وضعف الإنترنت، مع تشتت المصادر وعدم وجود واجهة موحدة بسيطة.

### Solution (الحل)
تم تطوير منصة تعليمية بديلة تجمع الملفات التعليمية (PDF) والفيديوهات وتوفر:
- تنظيم حسب المرحلة (ابتدائي/إعدادي/ثانوي)
- بحث وفلترة
- عرض PDF داخل نافذة منبثقة
- وضع ليلي محفوظ تلقائيًا

---

## Target Users (المستخدم المستهدف)
- طلبة المدارس (ابتدائي – إعدادي – ثانوي)
- المعلمون
- أولياء الأمور

---

## Main Features (أهم الميزات)
- Portfolio/Products مع فلترة وبحث باستخدام jQuery
- PDF Modal باستخدام Bootstrap + JavaScript
- Dark Mode محفوظ عبر LocalStorage
- FAQ Accordion مع Animation (Slide)
- واجهة Bootstrap متجاوبة
- فيديو ضمن الصفحة + أزرار تشغيل/إيقاف

---

## Technologies Used (التقنيات المستخدمة)
- HTML5
- CSS3
- JavaScript
- jQuery
- Bootstrap 5 (RTL)
- Font Awesome
- LocalStorage

---

## Project Structure (هيكل المشروع)
- `index.html`
- `css/style.css`
- `js/main.js`
- `lessons/` ملفات PDF
- `assets/` وسائط (مثل intro.mp4 + images)

---

## How To Run (طريقة التشغيل)

### تشغيل محلي عبر VS Code
1. افتح المشروع في VS Code
2. ثبّت إضافة Live Server
3. اضغط زر Go Live أسفل VS Code
4. سيفتح الموقع على رابط مثل:
   `http://127.0.0.1:5500/`

ملاحظة: تشغيل PDF والفيديو يعمل بشكل أفضل عبر Go Live وليس عبر file://

### تشغيل عبر GitHub Pages
رابط الموقع:
https://amramohammed11-source.github.io/learning-war-after/

---

## Developer
**محمد أحمد أبو عمرة**  
مشروع جامعة الأقصى
