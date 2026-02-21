import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies.trailer);
  useMovieTrailer(movieId);

  if (!trailerVideo) return;

  return (
    <div className="w-full">
      <iframe
        className="w-full aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          "hXzcyx9V0xw?si=QSm16gpSvxNz18cq" /* trailerVideo?.key  */ +
          "&autoplay=1&mute=1&loop=1&playlist=hXzcyx9V0xw"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
