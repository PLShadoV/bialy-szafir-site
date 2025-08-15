import React from 'react';

const Map: React.FC = () => {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-xl">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2304.1234567890123!2d16.0711!3d54.5394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd0b3e4f8b0000%3A0x0!2sSosnowa%2019%2C%2076-107%20Rusinowo!5e0!3m2!1spl!2spl!4v1234567890123!5m2!1spl!2spl"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa lokalizacji Biały Szafir - Sosnowa 19, 76-107 Rusinowo"
        className="rounded-xl"
      />
    </div>
  );
};

export default Map;