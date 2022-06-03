import { ToastContainer } from "react-toastify";
import { RoutesApp } from "./routes";

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={ 3000 }/>
      <RoutesApp />
    </div>
  )
}