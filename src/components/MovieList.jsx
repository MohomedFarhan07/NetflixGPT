import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import MovieCard from "./MovieCard";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addUpcomingMovies,
  addTopRatedMovies,
} from "../utils/moviesSlice";
import { useEffect, useRef, useState } from "react";

const MovieList = ({ title, movies }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState(null);
  const page = useRef({
    now_playing: 1,
    popular: 1,
    upcoming: 1,
    top_rated: 1,
  });

  function getType() {
    if (title == "Popular") setType("popular");
    else if (title == "Now Playing") setType("now_playing");
    else if (title == "Top Trending") setType("top_rated");
    else setType("upcoming");
  }

  useEffect(() => {
    getType();
  }, [type]);

  let isLoading = false;
  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    const threshold = 400;

    if (!isLoading && scrollLeft + clientWidth >= scrollWidth - threshold) {
      isLoading = true;

      inifiniteScroll().finally(() => {
        isLoading = false;
      });
    }
  };

  const inifiniteScroll = async () => {
    if (title == "Popular") page.current.popular++;
    else if (title == "Now Playing") page.current.now_playing++;
    else if (title == "Top Trending") page.current.top_rated++;
    else page.current.upcoming++;

    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        type +
        "?page=" +
        page?.current?.[type],
      API_OPTIONS,
    );
    const json = await data.json();

    if (title == "Popular") dispatch(addPopularMovies(json.results));
    else if (title == "Now Playing")
      dispatch(addNowPlayingMovies(json.results));
    else if (title == "Top Trending") dispatch(addTopRatedMovies(json.results));
    else dispatch(addUpcomingMovies(json.results));
  };

  if (!movies) return;
  
  return (
    <div className="max-sm:mt-0 max-sm:font-bold px-6 mt-5">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-auto dark-scrollbar" onScroll={(e) => handleScroll(e)}>
        <div className="flex">
          {movies?.map((movie, i) => (
            <MovieCard
              key={movie.id * Math.random()}
              posterPath={movie.poster_path}
              title={movie.original_title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
