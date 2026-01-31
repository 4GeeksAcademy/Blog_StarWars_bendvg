import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";

export const Navbar = () => {
  const { state, dispatch } = useAppContext();

  return (
    <nav className="navbar custom-navbar px-3">
      <Link to="/" className="navbar-brand">
        <img
          src="https://framerusercontent.com/images/HVzApGKkH6YM1vUO9zOo5lJBC4.jpeg?width=930&height=523"
          alt="Star Wars Logo"
          className="navbar-logo"
        />
      </Link>

      <div className="dropdown">
        <button
          className="btn btn-warning dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites ({state.favorites.length})
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          {state.favorites.length === 0 && (
            <li className="dropdown-item text-muted">No favorites yet</li>
          )}

          {state.favorites.map((item) => (
            <li
              key={`${item.type}-${item.id}`}
              className="dropdown-item d-flex justify-content-between align-items-center"
            >
              <Link
                to={`/single/${item.type}/${item.id}`}
                className="text-decoration-none"
              >
                {item.name}
              </Link>

              <button
                className="btn btn-sm btn-dark ms-2"
                onClick={(e) =>{
                  e.stopPropagation();
                  dispatch({ type: "REMOVE_FAVORITE", payload: item.id })
                }}
              >
                <i className="fa-solid fa-trash" style={{ color: "#FFD43B" }}></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
