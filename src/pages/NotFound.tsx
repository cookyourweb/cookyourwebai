import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Ups algo no ha ido bien
          </h1>
          <p className="text-xl text-zinc-300 mb-4">Página no encontrada</p>
          <a href="/" className="text-purple-400 hover:text-purple-300 underline">
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
