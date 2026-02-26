const VideoTitle = (props) => {
  const { overview, title } = props;

  return (
    <div className="max-sm:px-6 w-full aspect-video absolute text-white pt-[20%] px-24 bg-linear-to-r from-black">
      <h1 className="max-sm:text-xl max-sm:mt-8 text-6xl font-bold">{title}</h1>
      <p className="max-sm:hidden py-6 text-lg  w-1/4">{overview}</p>
      <div className="max-sm:mt-2 flex gap-4 mt-4">
        <button
          className="max-sm:text-xs flex items-center gap-2 bg-white text-black font-semibold px-6 py-2 rounded hover:bg-opacity-80 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer"
          role="button"
          aria-describedby="play"
          tabIndex={1}
        >
          ▶️ Play
        </button>
        <button
          className="max-sm:hidden flex items-center gap-2 bg-gray-700 bg-opacity-70 text-white font-semibold px-6 py-2 rounded hover:bg-opacity-90 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer"
          role="button"
          aria-describedby="more-info"
          tabIndex={2}
        >
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
