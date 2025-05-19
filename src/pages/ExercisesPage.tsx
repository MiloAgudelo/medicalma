import { Link } from 'react-router-dom';

const exercises = [
  {
    id: 'breathing-exercise',
    title: 'Respiración Guiada',
    description: 'Ejercicio de respiración para reducir el estrés y mejorar la concentración.',
    duration: '5 minutos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-splash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    )
  },
  {
    id: 'body-scan',
    title: 'Escaneo Corporal',
    description: 'Técnica de relajación que implica prestar atención a las diferentes partes del cuerpo.',
    duration: '10 minutos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-splash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export function ExercisesPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ejercicios</h1>
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
              <div>
                <h3 className="text-lg font-medium text-gray-900">{exercise.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{exercise.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {exercise.duration}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 