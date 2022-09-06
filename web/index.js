var axios = require("axios").default;

var options = {
  method: "POST",
  url: "https://ignite-lab-01-freire.us.auth0.com/oauth/token",
  headers: { "content-type": "application/json" },
  data: {
    client_id: "9fbpXt0pbI5LmZAxVsZG8n3fxrgwfHG8",
    client_secret:
      "MMlbH5EOiS5WZB3aFq6mL-JdfP8lIxFcC6_d-bKqCN4Wv5SZu7rDKYFiyvxKC8GT",
    audience: "https://ignite-lab-01-freire.us.auth0.com/api/v2/",
    grant_type: "client_credentials",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
