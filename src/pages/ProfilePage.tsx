import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export function ProfilePage() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: '#0b8fac' }}>Mi Perfil</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Correo electrónico</label>
            <p className="text-gray-800">{user?.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500">Nombre</label>
            <p className="text-gray-800">{user?.displayName || 'No especificado'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500">Cuenta verificada</label>
            <p className="text-gray-800">{user?.emailVerified ? 'Sí' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* Sección Premium */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">MediCalma Premium</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        
        <p className="text-white opacity-90 mb-4">
          Accede a todos los módulos y ejercicios sin restricciones y obtén muchas más funcionalidades.
        </p>
        
        <button 
          className="w-full py-3 rounded-lg bg-white text-indigo-600 font-medium hover:bg-opacity-90 transition"
          onClick={() => navigate('/premium')}
        >
          Ver planes Premium
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#0b8fac' }}>Configuración</h2>
        
        <div className="space-y-4">
          <button 
            className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => alert('Función en desarrollo')}
          >
            <span className="font-medium">Editar perfil</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button 
            className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => alert('Función en desarrollo')}
          >
            <span className="font-medium">Notificaciones</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button 
            className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => alert('Función en desarrollo')}
          >
            <span className="font-medium">Privacidad</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition flex justify-center items-center"
      >
        {isLoggingOut ? (
          <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
        ) : null}
        Cerrar sesión
      </button>
    </div>
  );
} 