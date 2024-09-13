import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from './pages/LandingPage.tsx';
import { useState } from "react";
import { User } from './pages/componentes/interface.tsx';
import React from "react";
import  {ProtedRoute}  from "./pages/componentes/ProtectedRoute.tsx";
import Dasboard from "./pages/Dasboard.tsx";
import Admin from './pages/Admin';
function App() {
  // Estado para manejar la autenticación del usuario
  // El estado 'user' puede ser un objeto User o null
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      // ROLES Y PERMISOS PARA EL USUARIO generalmente es visto en el back
      permissions: ['seeDatas'],
      roles: ['admin']
    });
  };
 // Función para simular el cierre de sesión del usuario
  const logout = () => setUser(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />

        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
   {/* Ruta pública */}
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          
          {/* Rutas protegidas */}
          <Route element={<ProtedRoute isALLowed={!!user} user={null} />}>
            <Route path="/landing" element={<Landing />} />
            <Route path="/dashboard" element={<Dasboard />} />
            </Route>
            
            
            {/* Rutas protegidas adicionales */}
            {/* !!user boolen true or false */}
            <Route element={<ProtedRoute isALLowed={!!user && user.permissions.includes('seeDatas')} user={null} 
            // si el user no esta permitodo lo dirigira al home
            redirectTo="/"/>}>
              <Route path="/about" element={<h1>About</h1>} />
              <Route path="/data" element={<h1>Datos</h1>} />
            </Route>
            <Route path="/admin" element={
                <ProtedRoute isALLowed={!!user && user.roles.includes('admin')} user={null}>
                  <Admin/>
                </ProtedRoute>
            }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Navigation() {
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
        <li>
          <Link to="/data">Datos</Link>
        </li>
        <li>
          <Link to="Admin">Admin</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;