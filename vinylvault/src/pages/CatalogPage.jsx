
import { useState } from "react";
import GenreFilterBar from "../components/GenreFilterBar";
import AlbumGrid from "../components/AlbumGrid";

function CatalogPage({ albums, onAddToCart }) {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
    "All",
    "Jazz",
    "Electronic",
    "Rock",
    "Classical"
  ];

  const filteredAlbums =
    selectedGenre === "All"
      ? albums
      : albums.filter(
          (album) => album.genre === selectedGenre
        );

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <h1>Discover Your Next Favorite Record</h1>
        <p>Explore our collection of vinyl records.</p>
      </section>

      <GenreFilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      <AlbumGrid
        albums={filteredAlbums}
        onAddToCart={onAddToCart}
      />
    </main>
  );
}

export default CatalogPage;
