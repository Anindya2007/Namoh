import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { PhilosophyPage } from './pages/PhilosophyPage';
import { JournalPage } from './pages/JournalPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <div className="flex flex-col min-h-screen bg-cream text-charcoal">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* 1. Landing Page (Image 1) */}
                <Route path="/" element={<LandingPage />} />

                {/* 2. Collections Page (Image 2) */}
                <Route path="/collections" element={<CollectionsPage />} />

                {/* 3. About Page 1 (Image 3) */}
                <Route path="/about" element={<AboutPage />} />

                {/* 4. About Page 2 - Philosophy */}
                <Route path="/about/philosophy" element={<PhilosophyPage />} />

                {/* 5. Journal Page (Image 4) */}
                <Route path="/journal" element={<JournalPage />} />

                {/* 6. Product Catalogue & Details (Image 6) */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />

                {/* Authentication Pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* 7. Profile Section (Image 5) */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile/enquiries"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile/wishlist"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile/settings"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

