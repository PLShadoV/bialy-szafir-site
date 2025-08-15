import React from 'react';
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=16.068%2C54.537%2C16.074%2C54.542&layer=mapnik&marker=54.5394%2C16.0711"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        title="Mapa lokalizacji Biały Szafir"
        className="rounded-lg"
      />
    </div>
  );
};

export default Map;