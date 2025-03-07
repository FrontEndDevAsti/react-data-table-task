import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-secondary">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/users" replace />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
