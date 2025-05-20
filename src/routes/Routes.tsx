import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

// Layouts
import { MainLayout } from '../components/layout/MainLayout';

// Páginas públicas
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

// Páginas protegidas
import { HomePage } from '../pages/HomePage';
import { ExercisesPage } from '../pages/ExercisesPage';
import { ExerciseDetailPage } from '../pages/ExerciseDetailPage';
import { ModulesPage } from '../pages/ModulesPage';
import { ModuleDetailPage } from '../pages/ModuleDetailPage';
import { JournalPage } from '../pages/JournalPage';
import { PremiumPage } from '../pages/PremiumPage';
import { ProfilePage } from '../pages/ProfilePage';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuthContext();
  
  if (loading) {
    return <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: '#0b8fac' }}><div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div></div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Rutas protegidas */}
      <Route 
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/exercises/:exerciseId" element={<ExerciseDetailPage />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Ruta para cualquier otra dirección */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
} 