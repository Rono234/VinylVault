
import { Link } from "react-router-dom";

function AlbumCard({ album, onAddToCart }) {
  return (
    <article className="album-card">
      <Link to={`/album/${album.id}`}>
        <img src={album.image} alt={album.title} />
      </Link>

      <div className="album-card-info">
        <span className="album-genre">
          {album.genre}
        </span>

        <h2>{album.title}</h2>
        <p>{album.artist}</p>
        <p className="album-price">
          ${album.price.toFixed(2)}
        </p>

        <button
          type="button"
          onClick={() => onAddToCart(album)}
          disabled={album.stock <= 0}
        >
          {album.stock > 0
            ? "Add to Cart"
            : "Sold Out"}
        </button>
      </div>
    </article>
  );
}

export default AlbumCard;
