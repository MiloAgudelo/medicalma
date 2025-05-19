import { useParams, useNavigate } from 'react-router-dom';

const modulesData = {
  'stress-management': {
    title: 'Manejo del Estrés',
    description: 'Este módulo te enseñará estrategias efectivas para identificar y manejar el estrés en tu vida diaria. Aprenderás técnicas basadas en evidencia científica que te ayudarán a reducir la tensión y encontrar mayor equilibrio.',
    lessons: [
      {
        title: 'Entendiendo el estrés',
        description: 'Aprende sobre los mecanismos del estrés y cómo afecta a tu cuerpo y mente.'
      },
      {
        title: 'Identificando tus desencadenantes',
        description: 'Reconoce los patrones y situaciones que desencadenan tu estrés.'
      },
      {
        title: 'Técnicas de respiración para la calma',
        description: 'Domina ejercicios de respiración que activan la respuesta de relajación del cuerpo.'
      },
      {
        title: 'Incorporando el manejo del estrés en tu rutina',
        description: 'Estrategias para mantener prácticas anti-estrés en tu vida cotidiana.'
      }
    ]
  },
  'mindfulness-intro': {
    title: 'Introducción al Mindfulness',
    description: 'Este módulo te introducirá a los conceptos fundamentales de la atención plena o mindfulness. Descubrirás cómo esta práctica milenaria puede ayudarte a vivir con mayor consciencia y reducir el sufrimiento emocional.',
    lessons: [
      {
        title: '¿Qué es el mindfulness?',
        description: 'Comprende los principios básicos de la atención plena y su origen.'
      },
      {
        title: 'La práctica formal e informal',
        description: 'Conoce las distintas formas de incorporar mindfulness en tu vida.'
      },
      {
        title: 'Meditación de la respiración',
        description: 'Aprende esta práctica fundamental para desarrollar atención plena.'
      },
      {
        title: 'Mindfulness para emociones difíciles',
        description: 'Técnicas para trabajar con emociones desafiantes usando atención plena.'
      },
      {
        title: 'La compasión y la autocompasión',
        description: 'Desarrolla una actitud de amabilidad hacia ti mismo y los demás.'
      }
    ]
  },
  'better-sleep': {
    title: 'Mejora tu Sueño',
    description: 'Aprende a optimizar la calidad de tu descanso con este módulo enfocado en la higiene del sueño. Descubrirás prácticas y rutinas basadas en la ciencia del sueño para despertar con más energía y vitalidad.',
    lessons: [
      {
        title: 'La ciencia del sueño',
        description: 'Conoce cómo funciona el sueño y por qué es tan importante para tu salud.'
      },
      {
        title: 'Creando una rutina nocturna efectiva',
        description: 'Diseña rituales nocturnos que preparen a tu cuerpo y mente para descansar.'
      },
      {
        title: 'Meditaciones para el sueño profundo',
        description: 'Prácticas guiadas específicamente diseñadas para inducir un sueño reparador.'
      }
    ]
  }
};

export function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  
  if (!moduleId || !modulesData[moduleId as keyof typeof modulesData]) {
    return <div className="p-4 text-center">Módulo no encontrado</div>;
  }
  
  const module = modulesData[moduleId as keyof typeof modulesData];
  
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
      
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{module.title}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <p className="text-gray-700 mb-6">{module.description}</p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lecciones</h2>
        
        <div className="space-y-4">
          {module.lessons.map((lesson, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-secondary-100 text-splash font-semibold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{lesson.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{lesson.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="w-full bg-splash text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
      >
        Comenzar módulo
      </button>
    </div>
  );
} 