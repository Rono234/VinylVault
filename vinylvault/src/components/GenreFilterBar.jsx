
function GenreFilterBar({
  genres,
  selectedGenre,
  onGenreChange
}) {
  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          className={
            selectedGenre === genre ? "active" : ""
          }
          onClick={() => onGenreChange(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilterBar;
