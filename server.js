const express = require('express');
const mongoose = require('mongoose'); // <-- 1. เรียกใช้ mongoose
const app = express();
const PORT = 5000;

// --- 2. ใส่ "กุญแจ" MongoDB Atlas ของคุณที่นี่ ---
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
const MONGO_URI = "mongodb+srv://TeeraNAN:Key095223@cluster0.lg1qxab.mongodb.net/?appName=Cluster0";
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑

// --- 3. คำสั่งเชื่อมต่อฐานข้อมูล ---
mongoose.connect(MONGO_URI)
  .then(() => console.log("เชื่อมต่อ MongoDB สำเร็จ!"))
  .catch((err) => console.error("เกิดข้อผิดพลาดในการเชื่อมต่อ:", err));


// --- Middleware ---
app.use(express.json()); // Middleware สำหรับ parse JSON

// --- Serve Static Files ---
// ให้ Express เสิร์ฟไฟล์จากโฟลเดอร์ปัจจุบัน (เช่น index.html, app.js)
app.use(express.static(__dirname));

// --- API Routes ---
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);

// --- สั่งให้เซิร์ฟเวอร์เริ่มทำงาน ---
app.listen(PORT, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:${PORT}`);
});
