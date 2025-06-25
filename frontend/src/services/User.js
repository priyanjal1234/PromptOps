import api from "./api.js";

class UserService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api/users";
  }

  async createAccount(register) {
    try {
      return await this.api.post(`${this.baseUrl}/register`, register, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async loginAccount(login) {
    try {
      return await this.api.post(`${this.baseUrl}/login`, login, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async logoutAccount() {
    try {
      return await this.api.get(`${this.baseUrl}/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

let userService = new UserService();

export default userService;
