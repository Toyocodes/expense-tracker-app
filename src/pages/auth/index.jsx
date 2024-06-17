import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import "./styles.css";
import toast from "react-hot-toast";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
    toast.success("Logged in successfully!");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="flex flex-col items-center">
        <img
          src="./hero.png"
          alt="hero image"
          className="w-full max-w-xs md:max-w-lg"
        />
        <div className="text-center mb-8">
          <p className="text-xl md:text-2xl 2xl:text-3xl mb-3 text-white">
            Want to track your finance? 😊
          </p>
          <div className="flex justify-center">
            <button
              className="flex items-center gap-x-2 bg-white font-semibold text-blue-500 py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-300"
              onClick={signInWithGoogle}
            >
              <FcGoogle size={25} />
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
