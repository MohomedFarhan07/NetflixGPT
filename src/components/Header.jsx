import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGPTSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGPTSearch = () => {
    dispatch(toggleGPTSearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header className="absolute px-8 py-2 bg-linear-to-b from-black/60 to-transparent w-full z-10 flex justify-between flex-col md:flex-row ">
      <div className="w-44 mx-auto md:mx-0 aspect-4/1">
        <img
          src={LOGO_URL}
          alt="Logo"
          className="w-full h-full object-contain"
          width={176} 
          height={44} 
        />
      </div>
      {user && (
        <div className="flex justify-around md:p-0.5 ">
          {showGPTSearch && (
            <select
              className="h-8 px-3 mt-5  text-xs bg-gray-900 text-white border border-gray-700 rounded-md"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.identifier}
                  value={lang.identifier}
                  className="bg-gray-900 text-white"
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGPTSearch}
            className="
    flex items-center gap-2
    bg-linear-to-r from-slate-800 to-slate-900
    text-white font-medium text-sm
    py-1.5 px-5 mx-4 my-3.5 rounded-lg
    border border-slate-700
    shadow-md shadow-black/40 hover:from-slate-700 hover:to-slate-800
    hover:scale-105
    active:scale-95
    transition-all duration-200
  "
          >
            {showGPTSearch ? "🏠 Homepage" : "🔍 GPT Search"}
          </button>

          <button
            className="
    flex items-center gap-2
    bg-gray-900 text-gray-200 font-medium text-sm
    py-1.5 px-5 mx-4 my-3.5
    rounded-lg
    border border-gray-700
    shadow-md
    hover:bg-red-600 hover:text-white hover:border-red-600
    active:scale-95
    transition-all duration-200
  "
            onClick={handleSignOut}
          >
            🚪 <span>Sign Out</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
