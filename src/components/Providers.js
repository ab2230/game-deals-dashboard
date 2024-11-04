// src/app/Providers.js
"use client"; // Required to use client-side hooks like Provider

import { Provider } from "react-redux";
import { store } from "./reduxToolkit/store";

const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
