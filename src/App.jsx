import "./App.css";
import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/detail/:movieName" element={<MovieDetail />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
