import api from "./api.js";

class CloudService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api/aws";
  }

  async connectAccount(connectionData) {
    try {
      return await this.api.post(
        `${this.baseUrl}/get-assumed-creds`,
        connectionData,
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async promptDone(prompt) {
    try {
      return await this.api.post(
        `${this.baseUrl}/prompt`,
        { prompt },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }
}

let cloudService = new CloudService();

export default cloudService;
