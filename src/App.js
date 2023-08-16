import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";

import AuthPage from "./pages/authpage";
import { Todo } from "./pages/todo";
import AuthContext from "./state/AuthState";
import Layout from "./components/layout";

// import logo from './logo.svg';
// import './App.css';
export const API_URL = `https://www.pre-onboarding-selection-task.shop`;

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AuthPage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/todo">
          {authCtx.isLoggedIn && <Todo />}
          {!authCtx.isLoggedIn && <Redirect to="auth" />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
