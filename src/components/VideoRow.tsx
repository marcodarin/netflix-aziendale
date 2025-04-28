import React from 'react';
import VideoCard from './VideoCard'; // Importa il componente VideoCard

// Riutilizziamo la stessa interfaccia (o importiamola se messa in un file condiviso)
interface Video {
  id: string;
  title: string;
  description: string;
  collection: string;
}

interface VideoRowProps {
  title: string;
  videos: Video[];
}

// Questo sarà un Server Component per ora, non necessita di stato o effetti client
export default function VideoRow({ title, videos }: VideoRowProps) {
  return (
    <section className="">
      <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-gray-100">{title}</h2>
      <div className="flex space-x-3 md:space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent -mb-4"> {/* Aggiunto -mb-4 per compensare pb-4 e nascondere scrollbar sotto */}
        {videos.map((video) => (
          // Usa il componente VideoCard invece del div placeholder
          <VideoCard key={video.id} video={video} />
        ))}
        {/* Aggiungiamo un elemento vuoto alla fine per creare spazio visivo dopo l'ultima card nello scroll */}
        <div className="flex-shrink-0 w-4"></div>
      </div>
    </section>
  );
} 