import './App.css'
import { BrowserRouter, Route, Outlet, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"


//importing the components
import Header from "./pages/Header";
import Dashboard from "./pages/Dashboard";

import EditResume from "./pages/[resumeid]/EditResume";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Dashboard/>} />
            <Route path=":resumeid/EditResume" element={<EditResume />} />{/* Corrected Dynamic Route */}
            <Route path="*" element={<Error/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

function Layout(){
  return(
    <>
      <Header/>
      <Outlet/>
      <Toaster/>
    </>
  )
}

export default App
