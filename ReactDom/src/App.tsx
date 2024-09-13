import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from './pages/LandingPage.tsx';
import { useState } from "react";
import { User } from './pages/componentes/interface.tsx';
import React from "react";
import  {ProtedRoute}  from "./pages/componentes/ProtectedRoute.tsx";
import Dasboard from "./pages/Dasboard.tsx";
function App() {
  //User | null es un tipo TypeScript que
  // indica que el estado puede ser de tipo User o null.
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    });
  };
    
  const logout = () => setUser(null);
    
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />

    { user ? (
      <button onClick={logout}>Logout</button>
    ) : (
      <button onClick={login}>Login</button>
    )}

      <Routes>
      <Route path="/" element={<h1>Home </h1>}/>


      <Route element={<ProtedRoute user={user}  />}>

      <Route path="/landing" element={<Landing />} />
      <Route path="/dashboard" element={<Dasboard />}/>
      
      </Route>

       <Route element={<ProtedRoute user={user}  />}>
        <Route path="/about" element={<h1>About</h1>}/>
       </Route>
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
        <li>

         <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}
export default App;