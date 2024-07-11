import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ThirdwebProvider, embeddedWallet } from "@thirdweb-dev/react";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThirdwebProvider
        clientId={process.env.REACT_APP_THIRD_WEB_CLIENT_ID}
        secretKey={process.env.REACT_APP_THIRD_WEB_CLIENT_SECRET}
        supportedWallets={[
          embeddedWallet({
            auth: {
              options: ["email", "google", "facebook", "apple"],
            },
            recommended: true,
          }),
        ]}
      >
        <App />
      </ThirdwebProvider>
    </Provider>
  </React.StrictMode>
);
