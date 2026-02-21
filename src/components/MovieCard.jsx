import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({posterPath, title}) => {

  if(!posterPath) return;
  
  return (
    <div className="w-36 md:w-48 pr-6">
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
      <span className="hidden">{title}</span>
    </div>
  );
};

export default MovieCard;

