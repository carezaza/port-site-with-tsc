import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import HomePage from "./Container/HomePage";
import PortfolioPage from "./Container/PortfolioPage";
import { useMeQuery } from "./generated/graphql";
import store from "./redux/store";
import Spinner from "./portal/Spinner";
import { OffSetContextProvider } from "./Context/storeOffset";
import LogoutButton from "./Components/LogoutButton";
import AlertMessage from "./Components/AlertMessage";

const App = (): React.ReactElement => {
  const { data, loading } = useMeQuery();

  React.useEffect(() => {
    if (data) {
      store.dispatch({ type: "SetUser", payload: data.me });
    }
  }, [data]);

  return (
    <OffSetContextProvider>
      <AlertMessage />
      <LogoutButton />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/portfolio/:id" component={PortfolioPage} />
        </Switch>
      </BrowserRouter>
      <Spinner isLoading={loading} />
    </OffSetContextProvider>
  );
};

export default App;