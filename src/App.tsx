import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { routes } from "./routes";

/**
 * The same tree vite-react-ssg mounts in the browser (HelmetProvider +
 * RouterProvider over `routes`), for tests that render the whole site.
 * Production mounts it from main.tsx.
 */
const App = () => (
  <HelmetProvider>
    <RouterProvider router={createBrowserRouter(routes)} />
  </HelmetProvider>
);

export default App;
