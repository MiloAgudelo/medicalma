import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { firestore } from '../firebase/config';

// Define types for exercise data
type Exercise = {
  title: string;
  description: string;
  instructions: string;
  steps: string[];
  stepDuration: number;
  benefits: string[];
}

type ExerciseData = {
  [key: string]: Exercise;
}

type ExerciseSession = {
  date: string;
  timestamp: Timestamp;
}

const exercisesData: ExerciseData = {
  'breathing-exercise': {
    title: 'Respiración Guiada',
    description: 'La respiración consciente es una técnica de meditación que ayuda a reducir el estrés, mejorar la concentración y promover la relajación. Esta práctica activa la respuesta de relajación del sistema nervioso parasimpático.',
    instructions: 'Encuentra un lugar tranquilo y sigue los pasos a continuación. No fuerces tu respiración, mantén un ritmo natural pero consciente. Si te sientes mareado en algún momento, regresa a tu respiración normal.',
    steps: [
      'Siéntate en una posición cómoda con la espalda recta y los hombros relajados.',
      'Cierra los ojos suavemente y relaja todo tu cuerpo, especialmente la mandíbula y el cuello.',
      'Inhala lentamente por la nariz contando hasta 4, sintiendo cómo el aire llena tus pulmones.',
      'Mantén la respiración contando hasta 2, creando un breve momento de quietud.',
      'Exhala lentamente por la boca contando hasta 6, liberando toda la tensión.',
      'Siente cómo tu cuerpo se relaja más con cada exhalación.',
      'Repite el ciclo, manteniendo tu atención en la sensación del aire entrando y saliendo.'
    ],
    stepDuration: 10, // segundos por paso
    benefits: [
      'Reduce el estrés y la ansiedad, activando el sistema nervioso parasimpático',
      'Mejora la concentración y la claridad mental',
      'Ayuda a regular la presión arterial y la frecuencia cardíaca',
      'Promueve mejores patrones de sueño y calidad de descanso',
      'Fortalece el sistema inmunológico al reducir el estrés crónico'
    ]
  },
  'body-scan': {
    title: 'Escaneo Corporal',
    description: 'El escaneo corporal es una práctica de atención plena que implica prestar atención a cada parte del cuerpo secuencialmente, notando sensaciones sin juzgarlas. Esta técnica ayuda a reconectar con el cuerpo y liberar tensiones acumuladas.',
    instructions: 'Busca un espacio cómodo donde puedas recostarte sin interrupciones durante al menos 10 minutos. Si te quedas dormido durante la práctica, es una señal de que tu cuerpo necesita descanso.',
    steps: [
      'Acuéstate en una posición cómoda, preferiblemente boca arriba con los brazos a los lados.',
      'Cierra los ojos y toma tres respiraciones profundas, sintiendo cómo tu cuerpo se hunde en la superficie.',
      'Dirige tu atención a los dedos de los pies, notando cualquier sensación: temperatura, presión, hormigueo.',
      'Mueve lentamente tu atención hacia los pies, tobillos y pantorrillas, observando cada sensación sin intentar cambiarla.',
      'Continúa subiendo por las rodillas, muslos y caderas, notando cualquier tensión y permitiendo que se disuelva con cada respiración.',
      'Explora el abdomen, el pecho y la espalda, observando el movimiento natural de la respiración en estas áreas.',
      'Siente tus manos, brazos, hombros y cuello, liberando cualquier tensión acumulada.',
      'Finalmente, relaja tu rostro: mandíbula, mejillas, ojos, frente y cuero cabelludo.',
      'Al terminar, toma consciencia de todo tu cuerpo como una unidad completa, sintiendo una sensación de integración y calma.'
    ],
    stepDuration: 15, // segundos por paso
    benefits: [
      'Ayuda a identificar y liberar tensiones físicas acumuladas',
      'Desarrolla una mayor conciencia del cuerpo y sus señales',
      'Promueve la relajación profunda y reduce el estrés',
      'Mejora la conexión mente-cuerpo',
      'Puede aliviar dolores crónicos al cambiar la relación con las sensaciones físicas'
    ]
  }
};

function ExercisePlayer({ exercise, onFinish, onComplete }: { 
  exercise: Exercise, 
  onFinish: () => void, 
  onComplete: () => void 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercise.stepDuration);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    let timer: number | null = null;
    
    if (isPlaying && !isPaused && !isCompleted) {
      timer = window.setInterval(() => {
        setTimeLeft((prev: number) => {
          if (prev <= 1) {
            // Pasar al siguiente paso o terminar
            if (currentStep < exercise.steps.length - 1) {
              setCurrentStep((prev: number) => prev + 1);
              setProgress(((currentStep + 1) / exercise.steps.length) * 100);
              return exercise.stepDuration; // Reiniciar tiempo para el siguiente paso
            } else {
              // Ejercicio completado
              setIsCompleted(true);
              setIsPlaying(false);
              onComplete();
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, isPaused, currentStep, exercise.steps.length, exercise.stepDuration, isCompleted, onComplete]);
  
  const startExercise = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setProgress((currentStep / exercise.steps.length) * 100);
  };
  
  const pauseExercise = () => {
    setIsPaused(true);
  };
  
  const resumeExercise = () => {
    setIsPaused(false);
  };
  
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev: number) => prev - 1);
      setTimeLeft(exercise.stepDuration);
      setProgress(((currentStep - 1) / exercise.steps.length) * 100);
    }
  };
  
  const nextStep = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep((prev: number) => prev + 1);
      setTimeLeft(exercise.stepDuration);
      setProgress(((currentStep + 1) / exercise.steps.length) * 100);
    } else {
      // Ejercicio completado
      setIsCompleted(true);
      setIsPlaying(false);
      onComplete();
    }
  };
  
  if (isCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4 text-splash">¡Ejercicio Completado!</h2>
        <p className="mb-6 text-gray-600">Excelente trabajo. Has completado el ejercicio de {exercise.title}. ¿Cómo te sientes ahora?</p>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={onFinish}
            className="bg-splash text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Volver a los ejercicios
          </button>
          <button
            onClick={() => {
              setIsCompleted(false);
              setCurrentStep(0);
              setTimeLeft(exercise.stepDuration);
              setProgress(0);
            }}
            className="border border-splash text-splash py-3 px-6 rounded-lg font-medium hover:bg-splash hover:bg-opacity-10 transition-colors"
          >
            Repetir ejercicio
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!isPlaying ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-splash">{exercise.title}</h2>
          <p className="mb-6">{exercise.instructions}</p>
          <button
            onClick={startExercise}
            className="bg-splash text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Comenzar
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-splash h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>Paso {currentStep + 1} de {exercise.steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="text-5xl font-bold mb-2 text-splash">{timeLeft}</div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-splash rounded-full transition-all duration-1000"
                style={{ width: `${(timeLeft / exercise.stepDuration) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-secondary-100 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-medium mb-3 text-splash">Paso {currentStep + 1}:</h3>
            <p className="text-lg">{exercise.steps[currentStep]}</p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={previousStep}
              disabled={currentStep === 0}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep === 0 ? 'bg-gray-200 text-gray-400' : 'bg-secondary-100 text-splash'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {isPaused ? (
              <button
                onClick={resumeExercise}
                className="w-12 h-12 bg-splash text-white rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={pauseExercise}
                className="w-12 h-12 bg-splash text-white rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}
            
            <button
              onClick={nextStep}
              className="w-12 h-12 bg-secondary-100 text-splash rounded-full flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <button
            onClick={onFinish}
            className="text-splash underline"
          >
            Terminar ejercicio
          </button>
        </div>
      )}
    </div>
  );
}

export function ExerciseDetailPage() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isExercising, setIsExercising] = useState(false);
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadExerciseHistory = async () => {
      if (!user || !exerciseId) return;
      
      try {
        setIsLoading(true);
        const historyDocRef = doc(firestore, `users/${user.uid}/exerciseHistory/${exerciseId}`);
        const historyDoc = await getDoc(historyDocRef);
        
        if (historyDoc.exists()) {
          setExerciseHistory(historyDoc.data().sessions || []);
        }
      } catch (error) {
        console.error('Error al cargar historial de ejercicios:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadExerciseHistory();
  }, [user, exerciseId]);
  
  if (!exerciseId || !exercisesData[exerciseId as keyof typeof exercisesData]) {
    return <div className="p-4 text-center">Ejercicio no encontrado</div>;
  }
  
  const exercise = exercisesData[exerciseId as keyof typeof exercisesData];
  
  const handleStartExercise = () => {
    setIsExercising(true);
  };
  
  const handleFinishExercise = () => {
    setIsExercising(false);
  };
  
  const handleCompleteExercise = async () => {
    if (!user || !exerciseId) return;
    
    try {
      // Actualizar el historial local
      const newSession = {
        date: new Date().toISOString(),
        timestamp: Timestamp.now()
      };
      
      const updatedHistory = [...exerciseHistory, newSession];
      setExerciseHistory(updatedHistory);
      
      // Guardar en Firebase
      const historyDocRef = doc(firestore, `users/${user.uid}/exerciseHistory/${exerciseId}`);
      await setDoc(historyDocRef, {
        exerciseId,
        sessions: updatedHistory
      }, { merge: true });
      
    } catch (error) {
      console.error('Error al guardar historial de ejercicio:', error);
    }
  };
  
  if (isExercising) {
    return (
      <div className="py-6">
        <button 
          onClick={() => setIsExercising(false)}
          className="mb-4 flex items-center text-splash"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Cancelar
        </button>
        
        <ExercisePlayer 
          exercise={exercise}
          onFinish={handleFinishExercise}
          onComplete={handleCompleteExercise}
        />
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-splash"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Volver
      </button>
      
      <h1 className="text-2xl font-bold text-splash mb-4">{exercise.title}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <p className="text-gray-700 mb-6">{exercise.description}</p>
        
        {!isLoading && user && exerciseHistory.length > 0 && (
          <div className="mb-6 bg-secondary-100 rounded-lg p-4">
            <h3 className="font-medium text-splash mb-2">Tu progreso</h3>
            <p className="text-sm text-gray-600">Has completado este ejercicio {exerciseHistory.length} {exerciseHistory.length === 1 ? 'vez' : 'veces'}</p>
            <p className="text-sm text-gray-600">Última sesión: {new Date(exerciseHistory[exerciseHistory.length - 1].date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        )}
        
        <h2 className="text-xl font-semibold text-splash mb-3">Pasos a seguir</h2>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          {exercise.steps.map((step, index) => (
            <li key={index} className="text-gray-700">{step}</li>
          ))}
        </ol>
        
        <h2 className="text-xl font-semibold text-splash mb-3">Beneficios</h2>
        <ul className="list-disc list-inside space-y-2">
          {exercise.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700">{benefit}</li>
          ))}
        </ul>
      </div>
      
      <button 
        className="w-full bg-splash text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        onClick={handleStartExercise}
      >
        Empezar ejercicio
      </button>
    </div>
  );
} 