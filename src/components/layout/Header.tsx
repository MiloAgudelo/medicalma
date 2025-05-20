import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="py-4 border-b border-gray-100">
      <div className="flex justify-center items-center max-w-lg mx-auto px-4">
        <Link to="/home" className="flex items-center">
          <img 
            src="/favicon.png" 
            alt="MediCalma Logo" 
            className="h-10 w-auto mr-2 sm:h-12" 
          />
          <span className="text-xl font-bold text-splash sm:text-2xl">MediCalma</span>
        </Link>
      </div>
    </header>
  );
} 