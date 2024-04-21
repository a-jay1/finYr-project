// pages/movies.js
import { useEffect, useState } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <p>{movie.title}</p>
            <p>{movie.director}</p>
            <p>{movie.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
