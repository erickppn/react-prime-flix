import { RoutesApp } from "./routes";
import { ToastContainer } from "react-toastify";

import { Header } from "./components/Header";

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={ 3000 }/>

      <Header />
      <RoutesApp />
    </div>
  )
}