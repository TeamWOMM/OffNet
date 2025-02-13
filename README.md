# OffNet

## 📌 Overview
OffNet is a platform designed to enable students to access educational content **without a constant internet connection**. It allows users to **download learning materials**, **generate AI-powered quizzes**, and **collaborate via LAN**, ensuring uninterrupted learning in low-connectivity areas.

## 🎯 Features
- **Offline Learning**: Download educational materials for offline use.
- **AI-Powered Quiz Generation**: Generate quizzes from PDFs and text files without requiring an internet connection.
- **LAN-Based Collaboration**: Connect and share content locally with peers using Wi-Fi without the internet.
- **Gamification & Progress Tracking**: Engage students with offline progress tracking and achievements.
- **Lightweight Architecture**: Optimized for low-end devices and unstable internet environments.

## 🚀 Inspiration
Many students in rural areas struggle with **unreliable internet access**, which hampers their learning experience. OffNet was created to bridge this gap by allowing **seamless access to educational resources offline**, powered by AI-generated quizzes and local networking.

## 🛠️ Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: SQLite (lightweight for offline access)
- **AI Model**: OLLaMA-based on-device quiz generation
- **Deployment**: Docker for easy setup

## 📥 Installation Guide
### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [Docker](https://www.docker.com/)
- Git

### Steps to Set Up Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/offnet.git
   cd offnet
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Backend Server**
   ```sh
   npm run server
   ```

4. **Start the Frontend**
   ```sh
   npm run dev
   ```

5. **Access the App**
   Open `http://localhost:3000` in your browser.

### Using Docker (Recommended)
For an easy setup, you can use Docker:
```sh
docker-compose up --build
```
This will spin up the **frontend**, **backend**, and **database** in a single command.

## 💡 How It Works
- **Download Learning Materials**: Users can download PDFs and text-based study materials to access offline.
- **AI-Based Quiz Generation**: The system parses educational documents and generates quizzes **without internet access**.
- **Offline Collaboration**: Students can share content and quizzes locally over Wi-Fi.

## 📊 SWOT Analysis
| Strengths  | Weaknesses  |
|------------|-------------|
| Enables education without the internet | Initial setup requires internet |
| AI-powered content creation | Limited AI processing on low-end devices |
| Works on low-power devices | Needs initial content downloads |
| LAN-based sharing | Limited to local networks |

| Opportunities | Threats |
|-------------|-------------|
| Expansion to remote schools | Competition from online e-learning platforms |
| Government and NGO partnerships | Hardware limitations in certain regions |

## 🎯 Future Roadmap
- ✅ Prototype with AI quiz generation
- ⏳ Improve UI/UX for better offline experience
- ⏳ Optimize AI for lightweight quiz generation
- ⏳ Expand to mobile devices
- ⏳ Partner with NGOs & educational institutions

## 📜 License
This project is licensed under the MIT License.
