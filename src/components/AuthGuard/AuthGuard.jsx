function AuthGuard() {
  const loginRequired = localStorage.getItem("token") ? false : true;
  console.log("loginRequired",loginRequired)
  if (loginRequired) {
    window.location.href = "/login";
  }
  return ''
}

export default AuthGuard;
