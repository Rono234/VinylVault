
import AlbumCard from "./AlbumCard";

function AlbumGrid({ albums, onAddToCart }) {
  if (albums.length === 0) {
    return <p>No albums found in this genre.</p>;
  }

  return (
    <section className="album-grid">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
}

export default AlbumGrid;
