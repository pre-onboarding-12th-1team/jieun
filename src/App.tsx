import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login"
import Todo from './pages/Todo'

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Login type="signin"/>
  },
  {
    path: "/signup",
    element: <Login type="signup"/>
  },
  {
    path: "/todo",
    element: <Todo />
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
