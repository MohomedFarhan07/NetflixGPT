import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  return (
    <div className="bg-black">
      <div className="pl-1 -mt-3 md:-mt-80 md:pl-12 relative z-20">
        {nowPlayingMovies && (
          <MovieList title={"Now Playing"} movies={nowPlayingMovies} />
        )}
        {topRatedMovies && (
          <MovieList title={"Top Trending"} movies={topRatedMovies} />
        )}
        {popularMovies && (
          <MovieList title={"Popular"} movies={popularMovies} />
        )}
        {upcomingMovies && (
          <MovieList
            title={"Upcoming"}
            movies={upcomingMovies}
          />
        )}
      </div>
    </div>
  );
};

export default SecondaryContainer;
