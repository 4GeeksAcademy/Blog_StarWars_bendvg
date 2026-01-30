import { useEffect } from "react";
import { useAppContext } from "../AppContext";
import { Card } from "../components/card";

export const Home = () => {
  const { state, dispatch } = useAppContext();

  const loadPeople = async () => {
    const res = await fetch("https://www.swapi.tech/api/people");
    const data = await res.json();
    dispatch({ type: "SET_PEOPLE", payload: data.results });
  };

  const loadPlanets = async () => {
    const res = await fetch("https://www.swapi.tech/api/planets");
    const data = await res.json();
    dispatch({ type: "SET_PLANETS", payload: data.results });
  };

  const loadStarships = async () => {
    const res = await fetch("https://www.swapi.tech/api/starships");
    const data = await res.json();
    dispatch({ type: "SET_STARSHIPS", payload: data.results });
  };

  useEffect(() => {
    loadPeople();
    loadPlanets();
    loadStarships();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-warning">Characters</h2>
      <div className="d-flex overflow-auto">
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
      <div className="d-flex overflow-auto">
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
      <div className="d-flex overflow-auto">
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
