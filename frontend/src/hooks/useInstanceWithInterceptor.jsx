import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import expressAPI from "../services/expressAPI";
import { useNavigate } from "react-router-dom";

function useInstanceWithInterceptor() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  expressAPI.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log("there is an error");
      if (err.response) {
        if (
          err.response.status === 401 &&
          err.response.data.message ===
            "Unauthorized: access token has expired."
        ) {
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.status === 200) {
                setUser("");
                localStorage.removeItem("user");
                navigate("/login");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }

      return Promise.reject(err);
    }
  );
  return expressAPI;
}

export default useInstanceWithInterceptor;
