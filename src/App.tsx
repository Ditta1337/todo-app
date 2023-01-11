import React from "react";
import PageTitle from "./components/PageTitle";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import TopBar from "./components/TopBar";
import Login from "./components/LogIn";
import Button from "./components/Button";
import { Toaster } from "react-hot-toast";
import { store } from "./app/store";
import { Provider } from "react-redux";
import style from "./styles/modules/app.module.css";

function App() {
  return (
    <Provider store={store}>
      <TopBar />
      <Login />
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
