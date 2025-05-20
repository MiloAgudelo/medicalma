import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';

const exercises = [
  {
    id: 'breathing-exercise',
    title: 'Respiración Guiada',
    description: 'Ejercicio de respiración para reducir el estrés y mejorar la concentración.',
    duration: '5-10 minutos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-splash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a5 5 0 010-7.07m-1.414 1.414a3 3 0 010 4.243M6 18h.01M6 12h.01M12 18h.01M12 12h.01M12 6h.01M18 18h.01M18 12h.01M18 6h.01" />
      </svg>
    )
  },
  {
    id: 'body-scan',
    title: 'Escaneo Corporal',
    description: 'Técnica de relajación que implica prestar atención a las diferentes partes del cuerpo.',
    duration: '10-15 minutos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-splash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }
];

export function ExercisesPage() {
  const { user } = useAuthContext();
  const [exerciseStats, setExerciseStats] = useState<{[key: string]: number}>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadExerciseStats = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const stats: {[key: string]: number} = {};
        
        for (const exercise of exercises) {
          const historyDocRef = doc(firestore, `users/${user.uid}/exerciseHistory/${exercise.id}`);
          const historyDoc = await getDoc(historyDocRef);
          
          if (historyDoc.exists() && historyDoc.data().sessions) {
            stats[exercise.id] = historyDoc.data().sessions.length;
          } else {
            stats[exercise.id] = 0;
          }
        }
        
        setExerciseStats(stats);
      } catch (error) {
        console.error('Error al cargar estadísticas de ejercicios:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadExerciseStats();
  }, [user]);

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-splash mb-6">Ejercicios de Meditación</h1>
      <p className="text-gray-600 mb-6">Selecciona uno de nuestros ejercicios de meditación guiada para reducir el estrés y mejorar tu bienestar.</p>
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <Link 
            key={exercise.id}
            to={`/exercises/${exercise.id}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-4 flex items-start">
              <div className="flex-shrink-0 bg-secondary-100 rounded-lg p-3 mr-4">
                {exercise.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-splash">{exercise.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{exercise.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {exercise.duration}
                  </div>
                  {!isLoading && user && exerciseStats[exercise.id] > 0 && (
                    <div className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">
                      Completado {exerciseStats[exercise.id]} {exerciseStats[exercise.id] === 1 ? 'vez' : 'veces'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 