'use client'; // Necessario per usare Link o useRouter

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Importa Link

// Interfaccia per le props del video
interface Video {
  id: string;
  title: string;
  // Aggiungeremo altri campi se necessario
}

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;

  return (
    <Link
      href={`/watch/${video.id}`}
      className="group block flex-shrink-0 w-60 md:w-72 aspect-video bg-gray-800 rounded-md overflow-hidden cursor-pointer relative transition-opacity duration-200 ease-in-out hover:opacity-90"
    >
      <Image
        src={thumbnailUrl}
        alt={`Thumbnail per ${video.title}`}
        fill
        sizes="(max-width: 768px) 240px, 288px"
        style={{ objectFit: 'cover' }}
        className="transition-opacity duration-300"
        unoptimized
      />
      {/* Potremmo aggiungere un overlay con il titolo on hover qui */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-center p-2 text-sm font-semibold">{video.title}</p>
      </div> */}
    </Link>
  );
} 