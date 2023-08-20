import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

class ServerSideAPI {
  
  login = async (u, p) => {
    let result;
    let suffix = `/kitchen/client/${u}/login`;
    let compUrl = baseUrl + suffix;
    console.log(compUrl);
    await axios
      .post(compUrl, { userId: p })
      .then((res) => {
        res.status === 200 ? (result = res.data) : null;
      })
      .catch((err) => {
        console.log(err);
        return null
      });
    return result;
  };

  getOrders = async (session)=>{
    const authHeader = "Bearer " + session.token
    let u = session.clientId
    let result;
    let suffix = `/kitchen/order/${u}/getOrders`;
    let compUrl = baseUrl + suffix;
    console.log(compUrl);
    await axios.get(compUrl,{headers:{Authorization:authHeader}})
    .then((res)=>{
      console.log(res);
      if(!res){
        result = res
        return result
      }else{
        result = res.data
        return result
      }
    }).catch((err)=>{
      console.log(err)
      return []
    })
    return result;
  }
  getPrinters = async (session)=>{
    const {clientId, token} = session
    let suffix = `/kitchen/client/${clientId}/getPrinters`;
    let compUrl = baseUrl + suffix;
    let printers 
    try{
      await axios.get(compUrl,{headers:{Authorization:`Bearer ${token}`}})
      .then((res)=>{
        if (res?.status===200){
          printers= res.data
          return printers
        }else{
          console.log("GetPrinteres failed:",res.status)
          return null
        }
      })
    }catch(e){
      console.log(err)
      return null
    }
  } 
}
module.exports = new ServerSideAPI