import { Provider } from "react-redux";
import {store} from "./redux";

import "./App.css";

import Users from "./Users";

function App() {
  return (
    <Provider store={store}>
      <Users />
    </Provider>
  );
}

export default App;
