import { Link } from "react-router-dom";

export const Card = ({ id, name, type, imageUrl, onFavorite }) => {
  const fallback = "https://pbs.twimg.com/media/CqAE488UAAAeoX7.jpg";

  return (
    <div className="card custom-card">
      <img
        src={imageUrl}
        onError={(e) => (e.target.src = fallback)}
        className="card-img-top"
        alt={name}
      />

      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <div className="d-flex justify-content-between">
          <Link to={`/single/${type}/${id}`} className="btn btn-dark">
            Learn more
          </Link>

          <button className="btn btn-warning" onClick={onFavorite}>
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};
