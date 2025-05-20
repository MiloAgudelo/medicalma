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
    description: 'Este módulo te introducirá a los principios básicos del mindfulness. Aprenderás qué es la atención plena, sus beneficios científicamente probados para la reducción del estrés y la ansiedad, y cómo integrarla en tu rutina. Cubriremos técnicas de meditación guiada, ejercicios de respiración consciente y estrategias para aplicar mindfulness en actividades cotidianas, ayudándote a cultivar una mayor calma y claridad mental.',
    lessons: 5,
    image: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'better-sleep',
    title: 'Mejora tu Sueño',
    description: 'Si luchas por dormir bien, este módulo es para ti. Exploraremos la ciencia detrás del sueño y los factores comunes que lo perturban. Aprenderás a establecer una rutina de sueño saludable, optimizar tu entorno para el descanso, y descubrirás técnicas de relajación y mindfulness específicas para antes de dormir. El objetivo es ayudarte a conciliar el sueño más rápido, dormir profundamente y despertar sintiéndote revitalizado.',
    lessons: 3,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // ¡Imagen actualizada aquí!
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