import { useState } from 'react';
import BrewLab from './components/BrewLab';
import RecipeBook from './components/RecipeBook';
import DarkCookbook from './components/DarkCookbook';
import { useGameState } from './hooks/useGameState';

export default function App() {
  const [page, setPage] = useState('brew');
  const game = useGameState();

  const renderPage = () => {
    switch (page) {
      case 'brew':
        return <BrewLab game={game} onNavigate={setPage} />;
      case 'recipes':
        return <RecipeBook game={game} onNavigate={setPage} />;
      case 'dark':
        return <DarkCookbook game={game} onNavigate={setPage} />;
      default:
        return <BrewLab game={game} onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}
