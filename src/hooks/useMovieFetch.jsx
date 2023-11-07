import { useCallback, useState } from "react";
import axios from "axios";

function useMovieFetch() {
  const [fetchData, setFetchData] = useState(null);
  const [loader, setLoader] = useState(false);

  const fetchMovies = useCallback(async ({ params }) => {
    setLoader(true);

    try {
      const { data } = await axios.get("https://swapi.dev/api/films", {
        params,
      });

      const movieData = await data.results?.map((object) => {
        return { ...object, price: 10 };
      });

      setFetchData(movieData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  }, []);

  const fetchMovieDetail = useCallback(async (movieName) => {
    setLoader(true);

    try {
      const { data } = await axios.get(
        `https://swapi.dev/api/films?search=${movieName}`
      );

      const movieData = await data.results?.map((object) => {
        return { ...object, price: 10 };
      });

      setFetchData(movieData[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  }, []);

  return {
    fetchMovies,
    fetchMovieDetail,
    fetchData,
    loader,
  };
}

export default useMovieFetch;
