import AuthGuard from '@/components/AuthGuard';
import videoData from '@/data/videos.json';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // Per gestire video non trovati

// Interfaccia Video aggiornata per includere description
interface Video {
  id: string;
  title: string;
  description: string;
  collection: string;
}

// Funzione per trovare il video per ID
function findVideoById(id: string): Video | undefined {
  return (videoData as Video[]).find(video => video.id === id);
}

export default function WatchPage({ params }: { params: { videoId: string } }) {
  const videoId = params.videoId;
  const video = findVideoById(videoId);

  // Se il video non viene trovato, mostra una pagina 404
  if (!video) {
    notFound();
  }

  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1`; // Aggiunto autoplay=1

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Link href="/" className="inline-block mb-4 text-blue-400 hover:text-blue-300">
        &larr; Torna alla Home
      </Link>
      <div className="aspect-video w-full mb-4">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={`YouTube video player: ${video.title}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{video.title}</h1>
      <p className="text-gray-300 text-sm mb-1">Raccolta: {video.collection}</p>
      <p className="text-gray-400 mt-3 whitespace-pre-wrap">{video.description}</p>
    </div>
  );
} 