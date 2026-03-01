import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  // const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  /* if (!movies) return;
  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie; */

  const id = 976573;
  const original_title = "Elemental";
  const overview =
    "In a city host to a variety of elements, a hot-tempered, fiery Ember meets the emotional, heart-on-his-sleeve Wade. As they navigate precarious situations, their stark differences bring them closer.";

  return (
    <div className="max-sm:pt-[30%] pt-[0%] bg-black">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
