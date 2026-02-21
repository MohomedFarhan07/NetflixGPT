import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useEffect, useRef, useState } from "react";
import ai from "../utils/genai";
import { addGptMovieResults } from "../utils/gptSlice";
import useSearchMovieTMDB from "../hooks/useSearchMovieTMDB";
import { SEARCH_API } from "../utils/constants";
import { cachedResults } from "../utils/searchSlice";

const GPTSearchBar = () => {
  const language = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cache = useSelector((store) => store.search);

  const handleGPTSearch = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: gptQuery,
    });
    const gptMovies = response?.text.split(",");

    const promiseArray = gptMovies.map((movie) => useSearchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults }),
    );

    setShowSuggestions(false);
  };

  async function fetchSearchResults() {
    const data = await fetch(SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(
      cachedResults({
        searchQuery: searchQuery,
        results: json[1],
      }),
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cache && cache[searchQuery]) setSuggestions(cache[searchQuery]);
      else fetchSearchResults();
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="pt-[45%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          className="max-sm:text-sm p-4 m-4 bg-white col-span-9"
          placeholder={lang[language].gptSearchPlaceholder}
          onFocus={() => setShowSuggestions(true)}
        />
        {suggestions.length > 0 && showSuggestions && (
          <div className="absolute bg-black text-white mt-20 py-2 px-5 w-180 shadow-lg rounded-lg">
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  key={suggestion}
                  className="py-2 hover:bg-gray-100 hover:text-black"
                >
                  🔍 {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="max-sm:text-sm py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGPTSearch}
           role="button" aria-describedby="submit" aria-pressed="true"
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
