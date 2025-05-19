import { Link } from 'react-router-dom';

const modules = [
  {
    id: 'stress-management',
    title: 'Manejo del Estrés',
    description: 'Aprende técnicas para manejar el estrés cotidiano y mejorar tu bienestar general.',
    lessons: 4,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'mindfulness-intro',
    title: 'Introducción al Mindfulness',
    description: 'Descubre los fundamentos de la atención plena y cómo puede transformar tu vida diaria.',
    lessons: 5,
    image: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'better-sleep',
    title: 'Mejora tu Sueño',
    description: 'Explora prácticas y rutinas para conseguir un descanso más reparador.',
    lessons: 3,
    image: 'https://images.unsplash.com/photo-1455642305367-68834a9d4282?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
  }
];

export function ModulesPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Módulos Educativos</h1>
      <div className="space-y-6">
        {modules.map((module) => (
          <Link
            key={module.id}
            to={`/modules/${module.id}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-36 bg-gray-200 overflow-hidden">
              <img 
                src={module.image} 
                alt={module.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{module.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {module.lessons} lecciones
                </span>
                <span className="text-splash text-sm font-medium">Explorar</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 