import axios from "axios";

class ServerSideAPI {
  baseUrl = process.env.NEXT_PUBLIC_API_URL;
  login = async (u, p) => {
    let result;
    let suffix = `/client/${u}/login`;
    let compUrl = this.baseUrl + suffix;
    console.log(compUrl);
    await axios
      .post(compUrl, { userId: p })
      .then((res) => {
        res.status === 200 ? (result = res.data) : null;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  getOrders = async (session)=>{
    const authHeader = "Bearer " + session.token
    const data = {}

  }
}
module.exports = new ServerSideAPI