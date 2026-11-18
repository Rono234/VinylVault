
import { Link, useParams } from "react-router-dom";

function AlbumDetailPage({ albums, onAddToCart }) {
  const { albumId } = useParams();

  const album = albums.find(
    (item) => item.id === albumId
  );

  if (!album) {
    return (
      <main className="album-detail-page">
        <h1>Album Not Found</h1>
        <Link to="/">Back to Catalog</Link>
      </main>
    );
  }

  return (
    <main className="album-detail-page">
      <Link to="/" className="back-link">
        Back to Catalog
      </Link>

      <div className="album-detail-layout">
        <img
          className="detail-cover"
          src={album.image}
          alt={album.title}
        />

        <section className="album-details">
          <span>{album.genre}</span>

          <h1>{album.title}</h1>
          <h2>{album.artist}</h2>

          <p className="detail-price">
            ${album.price.toFixed(2)}
          </p>

          <p>{album.description}</p>

          <h3>Record Information</h3>

          <p>Album ID: {album.id}</p>
          <p>Stock: {album.stock}</p>

          <button
            type="button"
            onClick={() => onAddToCart(album)}
            disabled={album.stock <= 0}
          >
            {album.stock > 0
              ? "Add to Cart"
              : "Sold Out"}
          </button>
        </section>
      </div>
    </main>
  );
}

export default AlbumDetailPage;
