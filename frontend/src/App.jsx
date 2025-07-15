 
 import {Routes, Route} from "react-router";

function App() {

  return (
     <Routes>
      <Route path="/" element={<h1>THis is home page</h1>}></Route>
      <Route path="/login" element={<h1>THis is login page</h1>}></Route>
      <Route path="/register" element={<h1>THis is register page</h1>}></Route>
      </Routes>
  )
}

export default App
