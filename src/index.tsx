import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { client } from "./apollo";
import App from "./App";

ReactDOM.render(
  <RecoilRoot>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
