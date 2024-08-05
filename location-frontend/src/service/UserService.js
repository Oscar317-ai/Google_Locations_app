import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:8080/user";

  static async getUsers() {
    const response = await axios.get(`${UserService.BASE_URL}/get-all-users`);
    console.log(response);
    return response.data;
  }

  static async createUser(user) {
    const response = await axios.post(`${UserService.BASE_URL}`, user);
    return response.data;
  }

  static async updateUser(id, user) {
    const response = await axios.put(`${UserService.BASE_URL}/${id}`, user);
    return response.data;
  }

  static async deleteUser(id) {
    await axios.delete(`${UserService.BASE_URL}/${id}`);
  }
}

export default UserService;
