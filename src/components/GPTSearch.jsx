import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";
import { BG_IMAGE } from "../utils/constants";

const GPTSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img className="max-sm:h-screen max-sm:object-cover" src={BG_IMAGE} alt="" />
      </div>
      <div className="">
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
    </>
  );
};

export default GPTSearch;
