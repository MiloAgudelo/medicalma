import { useParams, useNavigate } from 'react-router-dom';

const exercisesData = {
  'breathing-exercise': {
    title: 'Respiración Guiada',
    description: 'La respiración consciente es una técnica de meditación que ayuda a reducir el estrés, mejorar la concentración y promover la relajación.',
    steps: [
      'Siéntate en una posición cómoda con la espalda recta.',
      'Cierra los ojos y relaja todo tu cuerpo.',
      'Inhala lentamente por la nariz contando hasta 4.',
      'Mantén la respiración contando hasta 2.',
      'Exhala lentamente por la boca contando hasta 6.',
      'Repite el ciclo durante 5 minutos.'
    ],
    benefits: [
      'Reduce el estrés y la ansiedad',
      'Mejora la concentración y la claridad mental',
      'Ayuda a regular la presión arterial',
      'Promueve mejores patrones de sueño'
    ]
  },
  'body-scan': {
    title: 'Escaneo Corporal',
    description: 'El escaneo corporal es una práctica de atención plena que implica prestar atención a cada parte del cuerpo secuencialmente, notando sensaciones sin juzgarlas.',
    steps: [
      'Acuéstate en una posición cómoda, preferiblemente boca arriba.',
      'Cierra los ojos y concéntrate en tu respiración por unos momentos.',
      'Dirige tu atención a los dedos de los pies, notando cualquier sensación.',
      'Mueve lentamente tu atención hacia arriba por todo el cuerpo.',
      'Presta atención a cada parte: pies, piernas, pelvis, abdomen, pecho, espalda, manos, brazos, hombros, cuello, cara, cabeza.',
      'Al terminar, toma consciencia de todo tu cuerpo como una unidad completa.'
    ],
    benefits: [
      'Ayuda a identificar tensiones físicas y liberar estrés',
      'Desarrolla una mayor conciencia del cuerpo y sus sensaciones',
      'Promueve la relajación profunda',
      'Mejora la conexión mente-cuerpo'
    ]
  }
};

export function ExerciseDetailPage() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();
  
  if (!exerciseId || !exercisesData[exerciseId as keyof typeof exercisesData]) {
    return <div className="p-4 text-center">Ejercicio no encontrado</div>;
  }
  
  const exercise = exercisesData[exerciseId as keyof typeof exercisesData];
  
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
      
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{exercise.title}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <p className="text-gray-700 mb-4">{exercise.description}</p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Pasos a seguir</h2>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          {exercise.steps.map((step, index) => (
            <li key={index} className="text-gray-700">{step}</li>
          ))}
        </ol>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Beneficios</h2>
        <ul className="list-disc list-inside space-y-2">
          {exercise.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700">{benefit}</li>
          ))}
        </ul>
      </div>
      
      <button 
        className="w-full bg-splash text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
      >
        Empezar ejercicio
      </button>
    </div>
  );
} 