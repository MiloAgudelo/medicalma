import { useAuthContext } from '../context/AuthContext';

export function HomePage() {
  const { user } = useAuthContext();
  
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: '#0b8fac' }}>
        Bienvenido a MediCalma
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3" style={{ color: '#0b8fac' }}>
          Hola, {user?.displayName || 'Usuario'}
        </h2>
        <p className="text-gray-600 mb-4">
          MediCalma te ayuda a mejorar tu bienestar mental con ejercicios de respiración y meditación.
        </p>
        
        <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Tu progreso</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '25%', backgroundColor: '#0b8fac' }}></div>
          </div>
          <p className="text-sm text-blue-800 mt-2">Has completado 1 de 4 módulos</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="font-medium mb-2">Ejercicio recomendado</h3>
          <p className="text-gray-600 text-sm mb-3">Respiración 4-7-8</p>
          <button 
            className="w-full py-2 rounded bg-green-500 text-white font-medium"
            style={{ backgroundColor: '#0b8fac' }}
            onClick={() => {}}
          >
            Comenzar
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="font-medium mb-2">Módulo del día</h3>
          <p className="text-gray-600 text-sm mb-3">Manejo del estrés</p>
          <button 
            className="w-full py-2 rounded bg-green-500 text-white font-medium"
            style={{ backgroundColor: '#0b8fac' }}
            onClick={() => {}}
          >
            Ver módulo
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="font-medium mb-2">Consejo del día</h3>
          <p className="text-gray-600">
            "Toma 5 minutos cada día para sentarte en silencio y observar tu respiración."
          </p>
        </div>
      </div>
    </div>
  );
} 