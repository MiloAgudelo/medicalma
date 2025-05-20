import { SignupForm } from '../components/auth/SignupForm';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function SignupPage() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/home', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading || (!loading && user)) {
    return <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: '#0b8fac' }}><div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div></div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Fondo con gradiente y patrón */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-secondary-100 opacity-80 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQxLTguMDU5LTE4LTE4LTE4UzAgOC4wNTkgMCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOHpNNTQgMThjMC05Ljk0MS04LjA1OS0xOC0xOC0xOFMxOCA4LjA1OSAxOCAxOHM4LjA1OSAxOCAxOCAxOCA1NC04LjA1OSA1NC0xOHoiIGZpbGw9IiMwYjhmYWMiIGZpbGwtb3BhY2l0eT0iLjA0Ii8+PC9nPjwvc3ZnPg==')] opacity-30 z-0 bg-fixed"></div>

      {/* Contenido principal */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="text-center mb-8">
          <img 
            className="mx-auto h-24 w-auto" 
            src="/favicon.png" 
            alt="MediCalma Logo"
          />
          <h1 className="mt-4 text-4xl font-extrabold text-splash tracking-tight">
            MediCalma
          </h1>
        </div>
        
        <div className="bg-white py-8 px-8 shadow-2xl rounded-2xl sm:px-10 border border-gray-100 relative overflow-hidden">
          {/* Decoración superior */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-splash"></div>
          
          <SignupForm />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} MediCalma. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
} 