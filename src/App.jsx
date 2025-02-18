import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import ShowList from "./components/shows/ShowList";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
