import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) return ;

  return (
    <div className="p-4 m-4 bg-black/90 text-white ">
      <div>
        {movieNames.map((movieName, i) => (
          <MovieList key={i} title={movieName} movies={movieResults[i]} />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
