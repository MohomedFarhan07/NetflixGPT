export const LOGO_URL =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-01/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const PHOTO_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQisiBnuj1tC8o0gWoM77Uu8WP8e_2a9aaeYQ&s";

export const BG_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANGUAGES = [
  {
    identifier: "en",
    name: "English",
  },
  {
    identifier: "arabic",
    name: "Arabic",
  },
  {
    identifier: "hindi",
    name: "Hindi",
  },
];

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const SEARCH_API =
  "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
