import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 pb-16 max-w-lg mx-auto w-full px-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
