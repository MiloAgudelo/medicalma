export function PremiumPage() {
  const benefits = [
    {
      title: 'Acceso a Sesiones Grupales',
      description: 'Participa en sesiones de meditación y mindfulness dirigidas por expertos en tiempo real.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-splash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Foros Privados',
      description: 'Conéctate con una comunidad de personas con intereses similares en un espacio seguro y de apoyo.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-splash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    {
      title: 'Contenido Exclusivo',
      description: 'Accede a ejercicios avanzados, módulos especializados y material de formación premium.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-splash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      title: 'Asesoramiento Personalizado',
      description: 'Recibe orientación individualizada de nuestros expertos en bienestar y mindfulness.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-splash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Sin Publicidad',
      description: 'Disfruta de una experiencia completamente libre de anuncios y distracciones.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-splash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      )
    }
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Plan Premium</h1>
        <p className="text-gray-600">Desbloquea todo el potencial de MediCalma</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-8 text-white">
          <h2 className="text-2xl font-bold mb-2">MediCalma Premium</h2>
          <p className="text-white/80">Acceso ilimitado a todas las funciones</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">$9.99</span>
            <span className="text-white/80 ml-1">/mes</span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Beneficios del Plan Premium</h3>
          
          <div className="space-y-5">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 bg-secondary-100 rounded-lg p-2 mr-4">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">{benefit.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-8 w-full bg-splash text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
            Próximamente
          </button>
          
          <p className="mt-2 text-center text-xs text-gray-500">
            ¡El plan premium estará disponible muy pronto!
          </p>
        </div>
      </div>
    </div>
  );
} 