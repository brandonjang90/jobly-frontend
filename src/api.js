import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  // static token;
  
  static token = localStorage.getItem("token");

  static setToken(newToken) {
    JoblyApi.token = newToken;
    localStorage.setItem("token", newToken);
  }
  

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  static async login(username, password) {
    let res = await this.request("auth/token", { username, password }, "post");
    JoblyApi.setToken(res.token);
    return res.token;
  }

  static async signup(userData) {
    let res = await this.request("auth/register", userData, "post");
    JoblyApi.setToken(res.token);
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async applyToJob(username, jobId) {
    const endpoint = `users/${username}/jobs/${jobId}`;
    await this.request(endpoint, {}, "post");
  }
  
}


export { BASE_URL };
export default JoblyApi;