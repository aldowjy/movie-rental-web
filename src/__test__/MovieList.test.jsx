import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import MovieList from "../pages/MovieList";
import axios from "axios";

vi.spyOn(axios, "get");

const fetchMovies = async ({ params }) => {
  const { data } = await axios.get("https://swapi.dev/api/films", { params });
  return data?.results;
};

describe("Movie List", () => {
  test("renders movie list", () => {
    render(
      <BrowserRouter>
        <MovieList />
      </BrowserRouter>
    );
  });

  test.concurrent("Fetch Movie List", async () => {
    const movieMock = { title: "A New Hope" };
    const movies = await fetchMovies({ params: { search: "" } });

    expect(axios.get).toHaveBeenCalledWith("https://swapi.dev/api/films", {
      params: { search: "" },
    });
    expect(movies[0]).toMatchObject(movieMock);
  });

  test.concurrent("Search Movie", async () => {
    const movieName = "Return of the Jedi";
    const movies = await fetchMovies({ params: { search: "Jedi" } });
    expect(axios.get).toHaveBeenCalledWith("https://swapi.dev/api/films", {
      params: { search: "Jedi" },
    });
    expect(movies[0].title).toBe(movieName);
  });
});
