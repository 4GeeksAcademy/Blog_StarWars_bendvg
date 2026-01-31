import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../AppContext";

const fetchWithTimeout = (url, ms = 8000) =>
  Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    )
  ]);

export const Single = () => {
  const { type, id } = useParams();
  const { dispatch } = useAppContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const loadItem = async () => {
    try {
      const res = await fetchWithTimeout(
        `https://www.swapi.tech/api/${type}/${id}`
      );
      const json = await res.json();
      setData(json.result);
    } catch (err) {
      console.error("Error cargando item:", err);
      setError(true);
    }
  };

  useEffect(() => {
    loadItem();
  }, [type, id]);

  if (error) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Error loading data</h2>
        <Link to="/" className="btn btn-warning mt-3">
          Back home
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-warning">Loading...</h2>
      </div>
    );
  }

  const { properties } = data;

  const imageUrl = {
    people: `https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/characters/${id}.jpg`,
    planets: `https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/planets/${id}.jpg`,
    starships: `https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/starships/${id}.jpg`
  }[type];

  const fallback = "https://pbs.twimg.com/media/CqAE488UAAAeoX7.jpg";

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={imageUrl}
            onError={(e) => (e.target.src = fallback)}
            alt={properties.name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h1 className="text-warning">{properties.name}</h1>
          <p className="mt-3">{data.description || "No description available."}</p>

          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch({
                  type: "ADD_FAVORITE",
                  payload: { id, name: properties.name, type }
                })
              }
            >
              ❤️ Add to favorites
            </button>

            <Link to="/" className="btn btn-dark">
              Back home
            </Link>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      <div className="row text-center">
        {Object.entries(properties).map(([key, value]) => (
          <div key={key} className="col-md-3 mb-3">
            <h6 className="text-warning text-uppercase">{key}</h6>

            {key === "films" && Array.isArray(value) ? (
              <p>
                {value.map((url) => {
                  const filmId = url.split("/").pop();
                  return <span key={filmId}>Episode {filmId} </span>;
                })}
              </p>
            ) : (
              <p>{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
