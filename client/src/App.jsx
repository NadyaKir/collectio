import { Provider } from "react-redux";
import store from "./store/store";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const isAuth = true;
  return (
    <Provider store={store}>
      {isAuth && <Navbar />}
      <Outlet />
    </Provider>
  );
};

export default App;
