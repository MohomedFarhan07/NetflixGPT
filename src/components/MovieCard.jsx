import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  if (!posterPath) return null;

  return (
    <div className="w-36 md:w-48 pr-6">
      <div className="aspect-2/3">
        <img
          alt={title}
          src={IMG_CDN_URL + posterPath}
          loading="lazy"
          className="w-full h-full object-cover"
          width="300"
        />
      </div>
    </div>
  );
};

export default MovieCard;

