import { toast } from "react-toastify";

function Logout() {
  toast.info("You are logged out.", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  localStorage.removeItem("token")
  window.location.href = "/login";
}

export default Logout;
