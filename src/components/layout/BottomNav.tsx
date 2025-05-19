import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { 
    name: 'Ejercicios',
    path: '/exercises',
    icon: (active: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 ${active ? 'text-blue-500' : 'text-gray-500'}`}
        style={active ? { color: '#0b8fac' } : {}}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
        />
      </svg>
    ) 
  },
  { 
    name: 'Módulos',
    path: '/modules',
    icon: (active: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 ${active ? 'text-blue-500' : 'text-gray-500'}`}
        style={active ? { color: '#0b8fac' } : {}}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
        />
      </svg>
    ) 
  },
  { 
    name: 'Diario',
    path: '/journal',
    icon: (active: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 ${active ? 'text-blue-500' : 'text-gray-500'}`}
        style={active ? { color: '#0b8fac' } : {}}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
        />
      </svg>
    ) 
  },
  { 
    name: 'Premium',
    path: '/premium',
    icon: (active: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 ${active ? 'text-blue-500' : 'text-gray-500'}`}
        style={active ? { color: '#0b8fac' } : {}}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
        />
      </svg>
    ) 
  }
];

export function BottomNav() {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-20">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              {item.icon(isActive)}
              <span 
                className={`text-xs mt-1 ${isActive ? 'font-medium' : 'text-gray-500'}`}
                style={isActive ? { color: '#0b8fac' } : {}}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 