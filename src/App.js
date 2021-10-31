import { ToastContainer } from 'react-toastify'; //put here to be available to everything
import MainRouter from './MainRouter';

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <MainRouter />
    </>
  )
}

export default App;
