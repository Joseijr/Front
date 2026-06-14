import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import FiltersSection from "./components/FiltersSection";
import Card from "./components/Card";
import Footer from "./components/Footer";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página principal */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black text-white ">
              <Header />

              <div className="max-w-7xl mx-10 ">
                <FiltersSection
                  filters={[
                    "Todos",
                    "Electrónicos",
                    "Llaves",
                    "Ropa",
                    "Documentos",
                    "Otros",
                  ]}
                />

                <div className="flex gap-1 mt-1 ">
                  
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  <Card
                    imageName="https://picsum.photos/400/300"
                    name="iPhone 15"
                    status="Perdido"
                    location="Biblioteca"
                    date="Hace 2 horas"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  <Card
                    imageName="https://picsum.photos/400/300"
                    name="iPhone 15"
                    status="Perdido"
                    location="Biblioteca"
                    date="Hace 2 horas"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  <Card
                    imageName="https://picsum.photos/400/300"
                    name="iPhone 15"
                    status="Perdido"
                    location="Biblioteca"
                    date="Hace 2 horas"
                    />
                    </div>
                </div>

              </div>
              <Footer />
            </div>
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Register */}
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;