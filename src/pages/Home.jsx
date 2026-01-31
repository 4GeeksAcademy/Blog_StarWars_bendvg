import { useEffect } from "react";
import { useAppContext } from "../AppContext";
import { Card } from "../components/card";

const fetchWithTimeout = (url, ms = 8000) =>
  Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    )
  ]);

export const Home = () => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const loadAll = async () => {
      try {
        
        if (
          state.people.length > 0 &&
          state.planets.length > 0 &&
          state.starships.length > 0
        ) {
          return;
        }

        const [peopleRes, planetsRes, starshipsRes] = await Promise.all([
          fetchWithTimeout("https://www.swapi.tech/api/people"),
          fetchWithTimeout("https://www.swapi.tech/api/planets"),
          fetchWithTimeout("https://www.swapi.tech/api/starships")
        ]);

        const [people, planets, starships] = await Promise.all([
          peopleRes.json(),
          planetsRes.json(),
          starshipsRes.json()
        ]);

        dispatch({ type: "SET_PEOPLE", payload: people.results });
        dispatch({ type: "SET_PLANETS", payload: planets.results });
        dispatch({ type: "SET_STARSHIPS", payload: starships.results });
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    loadAll();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-warning">Characters</h2>
      <div className="cards-container">
        {state.people.map((item) => (
          <Card
            key={item.uid}
            id={item.uid}
            name={item.name}
            type="people"
            imageUrl={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/characters/${item.uid}.jpg`}
            onFavorite={() =>
              dispatch({
                type: "ADD_FAVORITE",
                payload: { id: item.uid, name: item.name, type: "people" }
              })
            }
          />
        ))}
      </div>

      <h2 className="text-warning mt-4">Planets</h2>
      <div className="cards-container">
        {state.planets.map((item) => (
          <Card
            key={item.uid}
            id={item.uid}
            name={item.name}
            type="planets"
            imageUrl={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/planets/${item.uid}.jpg`}
            onFavorite={() =>
              dispatch({
                type: "ADD_FAVORITE",
                payload: { id: item.uid, name: item.name, type: "planets" }
              })
            }
          />
        ))}
      </div>

      <h2 className="text-warning mt-4">Starships</h2>
      <div className="cards-container">
        {state.starships.map((item) => (
          <Card
            key={item.uid}
            id={item.uid}
            name={item.name}
            type="starships"
            imageUrl={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/starships/${item.uid}.jpg`}
            onFavorite={() =>
              dispatch({
                type: "ADD_FAVORITE",
                payload: { id: item.uid, name: item.name, type: "starships" }
              })
            }
          />
        ))}
      </div>
    </div>
  );
};
