import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export function SplashScreen() {
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          navigate('/exercises');
        } else {
          navigate('/login');
        }
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [loading, user, navigate]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: '#0b8fac' }}>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">MediCalma</h1>
        <div className="mt-8">
          <div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
} 