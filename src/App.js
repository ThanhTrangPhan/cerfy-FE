import { QueryClient, QueryClientProvider } from "react-query";
import './index.css';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch, BrowserRouter } from 'react-router-dom';
import { ThemeGlobalContext } from 'lib/ThemeGlobalContext';
import { HomePage } from "./pages/HomePage";
import { Detail } from "pages/Detail";

const queryClient = new QueryClient({});
export const history = createBrowserHistory();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <ThemeGlobalContext>
          <BrowserRouter>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/detail/:id" exact component={Detail} />
                <Route path="*">
                  <NoMatchPage />
                </Route>
              </Switch>
          </BrowserRouter>
        </ThemeGlobalContext>
      </Router>
    </QueryClientProvider>
  )
}

export const NoMatchPage = () => {
  return (
      <div>
          <h3>404 - Page Not Found</h3>
      </div >
  );
};

