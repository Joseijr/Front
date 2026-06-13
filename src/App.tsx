import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import FiltersSection from "./components/FiltersSection";
import Card from "./components/Card";

import Login from "./Pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página principal */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black text-white">
              <Header />

              <main className="max-w-7xl mx-10 ">
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

                <div className="flex gap-1 mt-1">
                  
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
              </main>
            </div>
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;