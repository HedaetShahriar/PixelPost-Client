# PixelPost - Community Forum Platform

![PixelPost Logo](./src/assets/logo.png)

A modern, feature-rich community forum platform built with React, Firebase, and Node.js. PixelPost enables users to create posts, engage in discussions, vote on content, and participate in a vibrant online community with premium membership features.

## 🌟 Live Demo

- **Frontend (Client)**: [https://pixelpost-b51b0.web.app/](https://pixelpost-b51b0.web.app/)

## 📦 Repository Links

- **Frontend Repository**: [https://github.com/HedaetShahriar/PixelPost-Client](https://github.com/HedaetShahriar/PixelPost-Client)
- **Backend Repository**: [https://github.com/HedaetShahriar/PixelPost-Server](https://github.com/HedaetShahriar/PixelPost-Server)

## 👨‍💼 Admin Credentials

For testing admin features, use the following credentials:

- **Email**: `admin@gmail.com`
- **Password**: `Admin1`

## ✨ Key Features

### 🔐 User Authentication & Authorization
- **Firebase Authentication** with email/password and Google Sign-in
- **Role-based access control** (User, Admin)
- **Protected routes** with private and admin-only sections
- **JWT token-based** secure API communication

### 🏠 Home Page & Content Discovery
- **Dynamic banner** with search functionality
- **Tag-based filtering** for content discovery
- **Announcements section** for important updates
- **Pagination** for efficient content loading
- **Real-time search** across posts and authors

### 📝 Post Management
- **Rich post creation** with title, description, images, and tags
- **Post voting system** (upvote/downvote) with user authentication
- **Image upload** via Cloudinary integration
- **Tag management** for categorization
- **Post sharing** capabilities (Facebook, Twitter, WhatsApp)

### 💬 Comments & Interaction
- **Threaded comment system** on posts
- **Comment reporting** functionality for moderation
- **Real-time comment updates** using React Query
- **Comment history** tracking in user dashboard

### 👑 Premium Membership
- **Stripe payment integration** for Gold membership
- **Bronze vs Gold tier** benefits
- **Unlimited posting** for Gold members
- **Gold badge** display and status indicators
- **Membership management** in user dashboard

### 📊 Admin Dashboard
- **User management** (promote/demote admins)
- **Analytics dashboard** with charts (users, posts, comments)
- **Tag management** (add/delete tags)
- **Reported comments moderation**
- **Announcement creation** and management
- **Site statistics** overview

### 🎨 Modern UI/UX
- **Responsive design** with Tailwind CSS and DaisyUI
- **Dark/Light theme** toggle functionality
- **Lucide React icons** for consistent iconography
- **Loading states** and smooth animations
- **Mobile-optimized** navigation and layouts

### 🔧 Technical Features
- **React 19** with modern hooks and patterns
- **React Query (TanStack Query)** for state management
- **React Router** for client-side routing
- **React Hook Form** for form validation
- **SweetAlert2** for notifications
- **Recharts** for data visualization
- **Vite** for fast development and building

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11 + DaisyUI 5.0.46
- **State Management**: TanStack React Query 5.83.0
- **Routing**: React Router 7.6.3
- **Forms**: React Hook Form 7.60.0
- **Authentication**: Firebase 11.10.0
- **Icons**: Lucide React 0.525.0
- **Charts**: Recharts 3.1.0
- **Payment**: Stripe 18.3.0
- **Notifications**: SweetAlert2 11.22.2
- **Image Upload**: Cloudinary
- **Sharing**: React Share 5.2.2

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Firebase Admin SDK
- **Payment Processing**: Stripe
- **Cloud Storage**: Cloudinary
- **API Documentation**: RESTful APIs

## 🏗️ Project Structure

```
src/
├── api/                    # API utility functions
├── assets/                 # Static assets (images, icons)
├── components/            # Reusable UI components
│   ├── Dashboard/         # Dashboard-specific components
│   │   ├── Admin/         # Admin components
│   │   ├── Shared/        # Shared dashboard components
│   │   └── Sidebar/       # Navigation components
│   ├── Home/             # Home page components
│   ├── Loader/           # Loading components
│   └── ui/               # Generic UI components
├── contexts/             # React Context providers
├── features/             # Feature-specific modules
│   ├── announcements/    # Announcement features
│   ├── auth/            # Authentication
│   ├── comments/        # Comment system
│   ├── membership/      # Premium membership
│   └── posts/           # Post management
├── hooks/               # Custom React hooks
├── layouts/             # Page layout components
├── pages/               # Application pages
│   └── Dashboard/       # Dashboard pages
├── Routes/              # Routing configuration
└── utils/               # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Stripe account (for payments)
- Cloudinary account (for image upload)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-HedaetShahriar.git
cd PixelPost-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id

VITE_API_URL=http://localhost:3000

VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_preset
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/your_cloud_name/image/upload

VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. **Start the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🎯 Core Functionalities

### User Features
- ✅ User registration and authentication
- ✅ Create, edit, and delete posts
- ✅ Vote on posts (upvote/downvote)
- ✅ Comment on posts and view comment history
- ✅ Search and filter posts by tags
- ✅ Upgrade to Gold membership via Stripe
- ✅ Profile management and post history
- ✅ Share posts on social media

### Admin Features
- ✅ Manage users (promote/demote admins)
- ✅ View site analytics and statistics
- ✅ Manage tags (add/delete)
- ✅ Moderate reported comments
- ✅ Create announcements
- ✅ Monitor site activity with charts

### Technical Features
- ✅ Responsive design for all devices
- ✅ Dark/Light theme support
- ✅ Real-time data with React Query
- ✅ Secure authentication with Firebase
- ✅ Payment processing with Stripe
- ✅ Image upload with Cloudinary
- ✅ SEO-friendly routing
- ✅ Error handling and loading states

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for users and admins
- **Protected Routes**: Authentication required for sensitive operations
- **Input Validation**: Comprehensive form validation
- **XSS Protection**: Sanitized user inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 📱 Responsive Design

PixelPost is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, intuitive interface with smooth animations
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Optimized loading with lazy loading and code splitting
- **User Experience**: Intuitive navigation and clear feedback
- **Visual Hierarchy**: Well-structured layouts with proper spacing

## 🔧 Development Tools

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Vite**: Fast development and building
- **React DevTools**: Component debugging
- **Firebase Console**: Authentication and analytics
- **Stripe Dashboard**: Payment monitoring

## 📈 Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Cloudinary automatic optimization
- **Caching**: React Query caching strategies
- **Bundle Optimization**: Vite's optimized bundling
- **Lazy Loading**: On-demand component loading

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Hedaet Shahriar**
- GitHub: [@HedaetShahriar](https://github.com/HedaetShahriar)
- Email: hedaet.shahriar@example.com

## 🙏 Acknowledgments

- Programming Hero Web Course 4 for the assignment guidelines
- Firebase for authentication services
- Stripe for payment processing
- Cloudinary for image management
- The React community for excellent libraries and tools

---

*Built with ❤️ using React, Firebase, and modern web technologies*