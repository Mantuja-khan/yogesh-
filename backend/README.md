# SS Production House — Backend API

Modern, lightweight, and secure Node.js + Express backend service for **SS Production House**. Handles client inquiries from the Contact page and every contact form situated above the page footer across the website.

---

## 📁 Directory Structure

```text
backend/
├── .env                  # Active environment variables (SMTP, Port, Origins)
├── .env.example          # Environment variable template
├── package.json          # Node dependencies & run scripts
├── README.md             # Backend setup & documentation
├── data/
│   ├── contacts.json     # Persisted client inquiries database
│   └── subscribers.json  # Persisted newsletter subscribers
└── src/
    ├── server.js         # Express app entry point & middleware setup
    ├── config/
    │   └── index.js      # Configuration and environment parser
    ├── controllers/
    │   ├── contactController.js     # Form validation, saving, and email dispatch
    │   └── newsletterController.js  # Newsletter subscription handler
    ├── middleware/
    │   ├── errorHandler.js          # Central error & 404 handler
    │   └── rateLimiter.js           # Anti-spam protection
    ├── routes/
    │   ├── contactRoutes.js         # /api/contact endpoints
    │   ├── newsletterRoutes.js      # /api/newsletter endpoints
    │   └── healthRoutes.js          # /api/health endpoint
    └── services/
        ├── emailService.js          # Nodemailer templates (Admin alert + Auto-reply)
        └── storageService.js        # File-based JSON storage operations
```

---

## 🚀 Quick Start

### 1. Install Dependencies
Open a terminal in the `backend` folder:
```bash
cd backend
npm install
```

### 2. Run in Development Mode (with Auto-Reload)
```bash
npm run dev
```

### 3. Run in Production Mode
```bash
npm start
```

The server will start at: **`http://localhost:5000`**

---

## 📧 Email Setup (Optional but Recommended)

By default, the backend runs in **Safe Storage Mode**: all client inquiries are securely captured, validated, and stored in `backend/data/contacts.json`, and printed to the terminal with all contact details.

To send real emails to **`acc.ssproductionhouse@gmail.com`** and auto-reply to clients:

1. Open `backend/.env`.
2. Generate a **Google App Password**:
   - Go to [Google Account Security](https://myaccount.google.com/security).
   - Ensure **2-Step Verification** is turned ON.
   - Search for **App passwords** (or go to `Security` > `2-Step Verification` > `App passwords`).
   - Create a new App Password named **`SS Production Website`**.
   - Google will provide a 16-character passcode (e.g. `abcd efgh ijkl mnop`).
3. Set the credentials in `backend/.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=acc.ssproductionhouse@gmail.com
   SMTP_PASS=abcdefghijklmnop
   NOTIFICATION_EMAIL=acc.ssproductionhouse@gmail.com
   ```
4. Restart the server (`npm run dev`). Any new form submission will automatically send an email to the studio and an auto-confirmation to the client.

---

## 🔌 API Endpoints

### 1. Submit Contact Form
- **Endpoint:** `POST /api/contact`
- **Rate Limit:** 15 requests / 15 minutes per IP
- **Request Body (JSON):**
  ```json
  {
    "name": "Rajesh Sharma",
    "email": "rajesh@example.com",
    "phone": "+91 98765 43210",
    "message": "Looking for custom luxury packaging design for organic skincare brand.",
    "source": "Contact Page"
  }
  ```
- **Success Response (`201 Created`):**
  ```json
  {
    "success": true,
    "message": "Thank you! Your message has been received. Our team will contact you shortly.",
    "inquiryId": "inq_1730626000000_a1b2c3",
    "data": {
      "id": "inq_1730626000000_a1b2c3",
      "name": "Rajesh Sharma",
      "email": "rajesh@example.com",
      "createdAt": "2026-11-03T09:45:00.000Z"
    }
  }
  ```

### 2. View All Inquiries
- **Endpoint:** `GET /api/contact`
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "count": 5,
    "data": [ ... ]
  }
  ```

### 3. Subscribe Newsletter
- **Endpoint:** `POST /api/newsletter`
- **Request Body (JSON):**
  ```json
  {
    "email": "designer@agency.com"
  }
  ```

### 4. Health Check
- **Endpoint:** `GET /api/health`
- **Response (`200 OK`):**
  ```json
  {
    "status": "ok",
    "service": "SS Production House Backend API",
    "uptime": 128.45,
    "timestamp": "2026-11-03T09:45:00.000Z"
  }
  ```

---

## 🛡️ Built-in Security Features
- **CORS Protection:** Configured to accept requests from your frontend (`localhost:8080`, `localhost:5173`, etc.).
- **Rate Limiting:** Prevents form spamming and DDoS attempts using `express-rate-limit`.
- **Input Sanitization & Validation:** Validates emails, escapes malicious characters, and verifies phone format using `validator`.
- **Non-blocking Email Dispatch:** Email sending is done asynchronously in the background so the user receives immediate feedback without UI lag.

