import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';

export function ProfilePage() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isResettingProgress, setIsResettingProgress] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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

  const handleResetProgress = async () => {
    try {
      setIsResettingProgress(true);
      
      // Limpiar progreso en localStorage
      localStorage.removeItem('moduleProgress');
      
      // Limpiar progreso en Firebase si el usuario está autenticado
      if (user) {
        const progressDocRef = doc(firestore, `users/${user.uid}/progress/modules`);
        await setDoc(progressDocRef, {}, { merge: false });
      }
      
      // Cerrar el modal de confirmación
      setShowResetConfirm(false);
      
      // Notificar al usuario que el progreso se ha reseteado
      alert('Progreso reseteado exitosamente.');
    } catch (error) {
      console.error('Error al resetear el progreso:', error);
      alert('Error al resetear el progreso. Por favor, intenta nuevamente.');
    } finally {
      setIsResettingProgress(false);
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

      {/* Sección de Información de la App */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col items-center text-center">
          <img 
            src="/favicon.png" 
            alt="MediCalma Logo" 
            className="h-16 w-auto mb-3" 
          />
          <h2 className="text-lg font-semibold text-splash mb-2">MediCalma</h2>
          <p className="text-gray-600 text-sm">
            La aplicación que te ayuda a mantener tu bienestar mental
            a través de ejercicios de respiración y mindfulness.
          </p>
          <p className="text-gray-500 text-xs mt-3">
            Versión 1.0.0
          </p>
        </div>
      </div>

      {/* Botón para resetear progreso */}
      <button 
        onClick={() => setShowResetConfirm(true)}
        className="w-full py-3 mb-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition flex justify-center items-center"
      >
        {isResettingProgress ? (
          <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
        ) : null}
        Resetear progreso de módulos
      </button>

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

      {/* Modal de confirmación de reseteo */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">¿Resetear progreso?</h3>
            <p className="text-gray-600 mb-6">
              Esta acción eliminará todo tu progreso en los módulos educativos. Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleResetProgress}
                disabled={isResettingProgress}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
              >
                {isResettingProgress ? (
                  <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                ) : null}
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 