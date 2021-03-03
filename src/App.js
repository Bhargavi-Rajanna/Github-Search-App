import { Provider } from "react-redux";

import Landing from "./pages/Landing";

import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./reducers/index";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Landing />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
