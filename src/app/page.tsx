import videoData from '@/data/videos.json'; // Importa i dati video
import VideoRow from '@/components/VideoRow'; // Importeremo il componente per le righe

// Definizione del tipo per un singolo video (opzionale ma buona pratica)
interface Video {
  id: string;
  title: string;
  description: string;
  collection: string;
}

// Funzione helper per raggruppare i video per collezione
function groupVideosByCollection(videos: Video[]) {
  return videos.reduce((acc, video) => {
    const collection = video.collection;
    if (!acc[collection]) {
      acc[collection] = [];
    }
    acc[collection].push(video);
    return acc;
  }, {} as Record<string, Video[]>);
}

export default function Home() {
  // Raggruppa i video
  const groupedVideos = groupVideosByCollection(videoData as Video[]);

  return (
    <div className="py-6 md:py-8 px-4 md:px-10 lg:px-16 space-y-6 md:space-y-8">
      {Object.entries(groupedVideos).map(([collectionTitle, videos]) => (
        <VideoRow key={collectionTitle} title={collectionTitle} videos={videos} />
      ))}
    </div>
  );
}
