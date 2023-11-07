import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import MovieDetail from "../pages/MovieDetail";
import axios from "axios";

vi.spyOn(axios, "get");

const fetchMovieDetail = async (movieName) => {
  const { data } = await axios.get(
    `https://swapi.dev/api/films?search=${movieName}`
  );
  return data?.results[0];
};

describe("Movie Detail", () => {
  test("renders movie detail", () => {
    render(
      <BrowserRouter>
        <MovieDetail />
      </BrowserRouter>
    );
  });

  test("Fetch Movie List", async () => {
    const movieName = "The Empire Strikes Back";
    const movieResp = {
      title: movieName,
    };
    const movieData = await fetchMovieDetail(movieName);

    expect(axios.get).toHaveBeenCalledWith(
      `https://swapi.dev/api/films?search=${movieName}`
    );
    expect(movieData).toMatchObject(movieResp);
  });
});
