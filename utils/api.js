import axios from "axios";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;

class ServerSideAPI {
  login = async (u, p) => {
    let result;
    let suffix = `/kitchen/client/${u}/login`;
    let compUrl = baseUrl + suffix;
    // console.log(compUrl);
    await axios
      .post(compUrl, { userId: p })
      .then((res) => {
        res.status === 200 ? (result = res.data) : (result = null);
        return result;
      })
      .catch((err) => {
        console.log(err);
        // TODO: Toast a message of the error!
        result = null;
        return null;
      });
    return result;
  };

  askForNewOrders = async (session, last, printer = "") => {
    if (session?.token === undefined || session?.clientId === undefined) {
      return [];
    }
    const authHeader = "Bearer " + session.token;
    let clientId = session.clientId;
    let result;
    let suffix = `/kitchen/order/${clientId}/newOrders`;
    let compUrl = baseUrl + suffix;
    // let reqBody = { orders: exists, printer: printer };
    let reqBody = { order:last, printer: printer };
    await axios
      .post(compUrl, reqBody, { headers: { Authorization: authHeader } })
      .then((res) => {
        result = res.data;
        return;
      })
      .catch((err) => {
        console.log(err);
        result = [];
      });
    return result;
  };

  updateOrderStatus = async (orderId, session) => {
    const authHeader = "Bearer " + session.token;
    let u = session.clientId;
    let result;
    let suffix = `/kitchen/order/${u}/update/${orderId}`;
    let compUrl = baseUrl + suffix;
    // console.log(authHeader);
    await axios
      .get(compUrl, { headers: { Authorization: authHeader } })
      .then((res) => {
        if (res.status === 200) {
          result = true;
        // TODO: Toast a message of success!
        } else {
          result = false;
          
        }
        return result;
      })
      .catch((err) => {
        console.log(err);
        result = false;
        // TODO: Toast a message of the error!
        return result;
      });
    return result;
  };

  checkExists = async (session, orders) => {
    const authHeader = "Bearer " + session.token;
    let u = session.clientId;
    let result;
    let suffix = `/kitchen/order/${u}/validateExists`;
    let compUrl = baseUrl + suffix;
    await axios
      .post(
        compUrl,
        { orders: orders },
        { headers: { Authorization: authHeader } }
      )
      .then((res) => {
        if (res.status === 200) {
          result = res.data;
        } else {
          result = null;
        }
      })
      .catch((err) => {
        console.log(err);
        result = null;
      });
    return result;
  };

  getOrders = async (session, printer, offset = 0, limit = 20) => {
    const authHeader = "Bearer " + session.token;
    let u = session.clientId;
    let result;
    let suffix =
      printer === ""
        ? `/kitchen/order/${u}/getOrders/?offset=${offset}&limit=${limit}`
        : `/kitchen/order/${u}/getOrders/${printer}/?offset=${offset}&limit=${limit}`;
    let compUrl = baseUrl + suffix;
    // console.log(compUrl);
    await axios
      .get(compUrl, { headers: { Authorization: authHeader } })
      .then((res) => {
        // console.log(res.data);
        if (!res) {
          // console.log("BAD");
          result =[];
          return result;
        } else {
          // console.log("good");
          result = res.data;
          return result;
        }
      })
      .catch((err) => {
        // console.log("BAD2");
        console.log(err);
        // TODO: Toast a message of the error!
        result = [];
      });
    return result;
  };
  getPrinters = async (session) => {
    const { clientId, token } = session;
    let suffix = `/kitchen/client/${clientId}/getPrinters`;
    let compUrl = baseUrl + suffix;
    let printers;
    try {
      await axios
        .get(compUrl, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log("GetPrinters: ", res.data);
          if (res?.status === 200) {
            printers = res.data;
            return printers;
          } else {
            console.log("GetPrinteres failed:", res.status);
            return null;
          }
        });
    } catch (e) {
      console.log(e);
      return null;
    }
    return printers;
  };
}
module.exports = new ServerSideAPI();
