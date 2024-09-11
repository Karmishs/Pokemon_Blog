import React from 'react';
import 'react-alice-carousel/lib/alice-carousel.css'; // Import CSS mặc định của AliceCarousel
import './Carousel.css'; // Import file CSS tùy chỉnh
import { pokemonData } from '../../../helpers/PokemonTypes';

const PokemonCarousel: React.FC = () => {
  const handleDragStart = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {pokemonData.map((type, i) => (
          <div key={i} className="carousel-item">
            <div className="icon-background" style={{ backgroundColor: type.color }}>
              <img
                loading="lazy"
                draggable={false}
                width={30}
                src={`/icons/${type.type}.svg`}
                alt={type.type}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-track">
      {pokemonData.map((type, i) => (
          <div key={i + pokemonData.length} className="carousel-item">
            <div className="icon-background" style={{ backgroundColor: type.color }}>
              <img
                loading="lazy"
                draggable={false}
                width={30}
                src={`/icons/${type.type}.svg`}
                alt={type.type}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCarousel;
