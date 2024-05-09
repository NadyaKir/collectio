import { Provider } from "react-redux";
import store from "./store/store";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Container from "./components/Layout/Container";
import { shouldShowContainer } from "./utils/routeHelpers";

const App = () => {
  const isAuth = true;
  const location = useLocation();

  return (
    <Provider store={store}>
      {isAuth && <Navbar />}
      {shouldShowContainer(location.pathname) && (
        <Container>
          <Outlet />
        </Container>
      )}
      {!shouldShowContainer(location.pathname) && <Outlet />}{" "}
      {/* Рендерим Outlet без контейнера для страниц, где он не нужен */}
    </Provider>
  );
};

export default App;
