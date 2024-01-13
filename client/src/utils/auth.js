import * as jwtDecode from "jwt-decode";

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  login(token) {
    // Saves user token to localStorage
    localStorage.setItem("token", token);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("token");
    window.location.assign("/");
  }
}

export default new AuthService();
