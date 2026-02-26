import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import { checkSignIn, checkSignUp } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE, PHOTO_URL } from "../utils/constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);

  const handleButtonClick = () => {
    if (isSignIn) {
      const message = checkSignIn(email.current.value, password.current.value);
      setErrMessage(message);
      if (message) return;
    } else {
      const message = checkSignUp(
        email.current.value,
        password.current.value,
        username.current.value,
      );
      setErrMessage(message);
      if (message) return;
    }

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: username.current.value,
            photoURL: PHOTO_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + ": " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + ": " + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <Header />
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <img
          src={BG_IMAGE}
          alt="Background"
          className="w-full h-full object-cover max-sm:h-screen"
          width={1920}
          height={1080}
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-sm:w-full absolute w-3/12 p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white"
      >
        <h1 className="font-bold text-3xl mb-2.5">
          {!isSignIn ? "Sign up" : "Sign in"}
        </h1>
        {!isSignIn && (
          <input
            ref={username}
            className="p-4 my-4 w-full bg-gray-700/80"
            type="text"
            placeholder="Full Name"
            tabIndex={1}
          />
        )}
        <input
          ref={email}
          className=" p-4 my-4 w-full bg-gray-700/80"
          type="email"
          placeholder="Email Address"
          tabIndex={2}
        />
        <input
          ref={password}
          className=" p-4 my-4 w-full bg-gray-700/80"
          type="password"
          placeholder="Password"
        />
        <p className="text-red-500 font-bold">{errMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 text-white w-full rounded-sm hover:bg-red-800 transition cursor-pointer"
          onClick={handleButtonClick}
        >
          {!isSignIn ? "Sign Up" : "Sign In"}
        </button>
        <p
          className="py-4 hover:underline cursor-pointer"
          onClick={toggleSignInForm}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            // Triggers action on Enter (13) or Space (32) keys
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault(); // Prevents page scrolling on Space
              toggleSignInForm();
            }

            if (e.key === "Tab") {
              e.preventDefault();

              const firstElement = document.querySelector(`[tabindex="${isSignIn ? 2 : 1}"]`);

              if (firstElement) {
                firstElement.focus();
              }
            }
          }}
        >
          {!isSignIn
            ? "Already have an account? Sign In now"
            : "New to netflix? Sign Up now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
