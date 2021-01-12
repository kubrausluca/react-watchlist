import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { faBackward} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalContext } from "../context/GlobalState";


function MovieDetails(props) {
  const [movie, setMovie] = useState([]);
  const { movieID } = useParams();
  const [query, setQuery] = useState();
  console.log(movie);

  const {
    addMovieToWatchlist,
    addMovieToWatched,
    watchlist,
    watched,
  } = useContext(GlobalContext);

  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);

  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const watchedDisabled = storedMovieWatched ? true : false;

  useEffect(() => {
    const detailsURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=0ecede2e93db3d208afce55b40229dbf&language=en-US`;
    fetch(detailsURL)
      .then(response => response.json())
      .then(data => setMovie(data));

  }, [query]);

  return (
    <>
      <div className="col-sm-4 offset-sm-4">
        <nav aria-label="breadcrumb" className="mb-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/add">Add Page</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {movie.title}
            </li>
          </ol>
        </nav>
        <div>
          <div className="card mb-5">
            <img
              height="350"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">{movie.overview}</p>
              <p className="card-text">Movie Rate : {movie.vote_average}</p>

              <div className="controls">
                <button
                  className="btn"
                  disabled={watchlistDisabled}
                  onClick={() => addMovieToWatchlist(movie)}
                >
                  Add to Watchlist
                </button>
              </div>

            </div>
          </div>
          <div />

          

        </div>

        {/* <Link className='btn-float'>
            <FontAwesomeIcon 
                // style={{width: "100%" , textAlign: "center", color: '#fff', fontSize: '1.25rem', lineHeight: '55px', justifyContent: "center"}}
                icon={faBackward} 
            />
        </Link> */}
      </div>
    </>
  );
}

export default MovieDetails;
