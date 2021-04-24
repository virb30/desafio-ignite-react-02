import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Button } from './Button';

interface GenreResponseProps {
  id: number;
  title: string;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
}

interface SideBarProps {
  selectedGenreId: number;
  onClick: (id: number) => void
}

export function SideBar({selectedGenreId, onClick}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (<nav className="sidebar">
  <span>Watch<p>Me</p></span>

  <div className="buttons-container">
    {genres.map(genre => (
      <Button
        key={String(genre.id)}
        title={genre.title}
        iconName={genre.name}
        onClick={() => onClick(genre.id)}
        selected={selectedGenreId === genre.id}
      />
    ))}
  </div>

</nav>)
}