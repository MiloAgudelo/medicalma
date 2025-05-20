import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase/config';

// Importamos los datos de ejercicios y módulos
const exercises = [
  {
    id: 'breathing-exercise',
    title: 'Respiración Guiada',
    description: 'Ejercicio de respiración para reducir el estrés y mejorar la concentración.',
    duration: '5 minutos'
  },
  {
    id: 'body-scan',
    title: 'Escaneo Corporal',
    description: 'Técnica de relajación que implica prestar atención a las diferentes partes del cuerpo.',
    duration: '10 minutos'
  }
];

const modules = [
  {
    id: 'stress-management',
    title: 'Manejo del Estrés',
    description: 'Aprende técnicas para manejar el estrés cotidiano y mejorar tu bienestar general.',
    lessons: 4
  },
  {
    id: 'mindfulness-intro',
    title: 'Introducción al Mindfulness',
    description: 'Descubre los fundamentos de la atención plena y cómo puede transformar tu vida diaria.',
    lessons: 5
  },
  {
    id: 'better-sleep',
    title: 'Mejora tu Sueño',
    description: 'Explora prácticas y rutinas para conseguir un descanso más reparador.',
    lessons: 3
  }
];

export function HomePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [moduleProgress, setModuleProgress] = useState<{[key: string]: boolean[]}>({});
  const [recommendedExercise, setRecommendedExercise] = useState(exercises[0]);
  const [dailyModule, setDailyModule] = useState(modules[0]);
  const [dailyTip, setDailyTip] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Consejos diarios
  const tips = [
    "Toma 5 minutos cada día para sentarte en silencio y observar tu respiración.",
    "Mantén un vaso de agua en tu escritorio y bebe conscientemente a lo largo del día.",
    "Antes de dormir, anota tres cosas por las que te sientes agradecido hoy.",
    "Cuando notes tensión, haz una pausa y respira profundamente tres veces.",
    "Realiza una caminata consciente durante tu descanso, prestando atención a cada paso."
  ];
  
  // Cargar el progreso y configurar elementos aleatorios
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Cargar progreso desde Firebase si el usuario está autenticado
        if (user) {
          const progressDocRef = doc(collection(firestore, 'users'), user.uid, 'progress', 'modules');
          const progressDoc = await getDoc(progressDocRef);
          
          if (progressDoc.exists()) {
            setModuleProgress(progressDoc.data() as {[key: string]: boolean[]});
          } else {
            // Cargar desde localStorage como respaldo
            const savedProgress = localStorage.getItem('moduleProgress');
            if (savedProgress) {
              setModuleProgress(JSON.parse(savedProgress));
            }
          }
        } else {
          // Cargar desde localStorage si no hay usuario
          const savedProgress = localStorage.getItem('moduleProgress');
          if (savedProgress) {
            setModuleProgress(JSON.parse(savedProgress));
          }
        }
        
        // Seleccionar un ejercicio recomendado aleatorio
        const randomExerciseIndex = Math.floor(Math.random() * exercises.length);
        setRecommendedExercise(exercises[randomExerciseIndex]);
        
        // Seleccionar un módulo del día
        const randomModuleIndex = Math.floor(Math.random() * modules.length);
        setDailyModule(modules[randomModuleIndex]);
        
        // Seleccionar un consejo del día aleatorio
        const randomTipIndex = Math.floor(Math.random() * tips.length);
        setDailyTip(tips[randomTipIndex]);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);
  
  // Calcular el progreso total
  const calculateOverallProgress = () => {
    let completedLessons = 0;
    let totalLessons = 0;
    
    for (const moduleId in moduleProgress) {
      completedLessons += moduleProgress[moduleId].filter(Boolean).length;
      totalLessons += moduleProgress[moduleId].length;
    }
    
    if (totalLessons === 0) return 0;
    return Math.round((completedLessons / totalLessons) * 100);
  };
  
  const progressPercentage = calculateOverallProgress();
  
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-splash">
        Bienvenido a MediCalma
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-splash">
          Hola, {user?.displayName || 'Usuario'}
        </h2>
        <p className="text-gray-600 mb-4">
          MediCalma te ayuda a mejorar tu bienestar mental con ejercicios de respiración y meditación.
        </p>
        
        <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Tu progreso</h3>
          {isLoading ? (
            <div className="flex justify-center py-2">
              <div className="w-6 h-6 border-t-2 border-splash border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-splash h-2.5 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-800 mt-2">
                Has completado el {progressPercentage}% de los módulos educativos
              </p>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="font-medium mb-2 text-splash">Ejercicio recomendado</h3>
          <p className="text-gray-600 text-sm mb-3">{recommendedExercise.title}</p>
          <button 
            className="w-full py-2 rounded bg-splash text-white font-medium hover:bg-opacity-90"
            onClick={() => navigate(`/exercises/${recommendedExercise.id}`)}
          >
            Comenzar
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="font-medium mb-2 text-splash">Módulo del día</h3>
          <p className="text-gray-600 text-sm mb-3">{dailyModule.title}</p>
          <button 
            className="w-full py-2 rounded bg-splash text-white font-medium hover:bg-opacity-90"
            onClick={() => navigate(`/modules/${dailyModule.id}`)}
          >
            Ver módulo
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="font-medium mb-2 text-splash">Consejo del día</h3>
          <p className="text-gray-600">
            "{dailyTip}"
          </p>
        </div>
        
        <div className="pt-4 flex space-x-3">
          <Link 
            to="/exercises"
            className="flex-1 text-center py-3 bg-white rounded-lg shadow border border-gray-200"
          >
            Todos los ejercicios
          </Link>
          <Link 
            to="/modules"
            className="flex-1 text-center py-3 bg-white rounded-lg shadow border border-gray-200"
          >
            Todos los módulos
          </Link>
        </div>
      </div>
    </div>
  );
} 