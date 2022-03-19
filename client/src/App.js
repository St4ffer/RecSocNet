import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import {AppRoutes} from './router/AppRoutes'
import {CustomNav, RegisterNewUser} from "./components/index.components"


function App() {



    return (
      <BrowserRouter>
              <Auth0ProviderWithNavigate>
                  <RegisterNewUser/>
                  <CustomNav/>
                  <AppRoutes/>
              </Auth0ProviderWithNavigate>
      </BrowserRouter>
  );
}

export default App;
