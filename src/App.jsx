import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import ShowList from "./components/shows/ShowList";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>Home Page</h1>
                </div>
              }
            />
          </Routes>
          <ShowList />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
