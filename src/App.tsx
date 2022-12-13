import React from "react";
import PageTitle from "./components/PageTitle";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import { Toaster } from "react-hot-toast";
import { store } from "./app/store";
import { Provider } from "react-redux";
import style from "./styles/modules/app.module.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PageTitle title="Do. Your. Tasks." />
        <div className={style.appWrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster toastOptions={{ style: { fontSize: "2rem" } }} />
    </Provider>
  );
}
export default App;
