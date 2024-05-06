import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>Hello, World!</h1>
      </div>
    </Provider>
  );
};

export default App;
