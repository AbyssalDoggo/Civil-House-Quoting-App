import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(phoneNumber, password) {
    return axios
      .post(API_URL + "signin", {
        phoneNumber,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(phoneNumber, username, email, password) {
    return axios.post(API_URL + "signup", {
      phoneNumber,
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const authService = new AuthService();
export default authService;
