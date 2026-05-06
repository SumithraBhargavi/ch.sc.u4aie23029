require("dotenv").config();
const axios = require("axios");

let token = null;

async function getToken() {
  if (token) return token;

  const res = await axios.post(
    "http://20.207.122.201/evaluation-service/auth",
    {
      email: "sumithrabhargavimamidi@gmail.com",
      name: "M.Sumithra Bhargavi",
      rollNo: "CH.SC.U4AIE23029",
      accessCode: "PTBMmQ",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }
  );

  token = res.data.access_token;
  return token;
}

async function Log(stack, level, pkg, message) {
  try {
    const token = await getToken();

    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error("Log error:", err.message);
  }
}

module.exports = { Log, getToken };