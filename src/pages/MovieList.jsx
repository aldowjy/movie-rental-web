import { useEffect, useState } from "react";
import {
  Button,
  Center,
  IconButton,
  Input,
  Stack,
  Wrap,
} from "@chakra-ui/react";
import { MdDelete, MdSearch } from "react-icons/md";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import useMovieFetch from "../hooks/useMovieFetch";
import useLocalStorageState from "use-local-storage-state";
import Spinner from "../components/Spinner";
import useGetSearchParams from "../hooks/useGetSearchParams";
import { stringifyUrlQuery } from "../utils";

const MovieList = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const { fetchData, fetchMovies, loader } = useMovieFetch();
  const [movieCart, setMovieCart] = useLocalStorageState("movieCart", {
    episode_id: 1,
    title: "",
    price: 0,
  });
  const { search = "" } = useGetSearchParams();
  const query = { search };

  const handleSearchClick = () => {
    const paramsQuery = { ...query, search: searchKeyword };

    for (const key in paramsQuery) {
      if (!paramsQuery[key]) delete paramsQuery[key];
    }

    navigate({
      search: stringifyUrlQuery(paramsQuery),
    });
  };

  const handleToDetailClick = (data) => {
    navigate(`/detail/${data.title}`);
  };

  const handleAddCartClick = (movie) => {
    setMovieCart((prevMovieCart) => ({
      ...prevMovieCart,
      [movie.episode_id]: {
        episode_id: movie.episode_id,
        title: movie.title,
        price: movie.price,
      },
    }));
  };

  const handleDeleteClick = () => {
    setSearchKeyword("");

    const paramsQuery = {
      ...query,
      search: "",
    };

    for (const key in paramsQuery) {
      if (!paramsQuery[key]) delete paramsQuery[key];
    }

    navigate({
      search: stringifyUrlQuery(paramsQuery),
    });
  };

  const isInCart = (episodeId) =>
    Object.keys(movieCart || {}).includes(episodeId.toString());

  useEffect(() => {
    fetchMovies({ params: { search } });
  }, [fetchMovies, search]);

  return (
    <>
      <Center>
        <Stack spacing={8} direction="row">
          <Input
            placeholder="Input Movie Name..."
            size="lg"
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
            defaultValue={search}
            bg="white"
          />
          <IconButton
            bg="#b84509"
            size="lg"
            color="#ffffff"
            _hover={{ opacity: 0.8 }}
            icon={<MdDelete />}
            isDisabled={!searchKeyword}
            onClick={handleDeleteClick}
          />
          <Button
            leftIcon={<MdSearch />}
            bg="#b84509"
            color="#ffffff"
            _hover={{ opacity: 0.8 }}
            size="lg"
            isDisabled={!searchKeyword}
            onClick={handleSearchClick}
          >
            Find
          </Button>
        </Stack>
      </Center>
      {loader ? (
        <Spinner />
      ) : (
        <Wrap mt={8} spacing={8} align="center" justify="center">
          {fetchData?.map((data, i) => (
            <MovieCard
              key={i}
              data={data}
              onClickToDetail={() => handleToDetailClick(data)}
              onClickAddCart={(data) => handleAddCartClick(data)}
              isCartButtonDisabled={isInCart(data.episode_id)}
            />
          ))}
        </Wrap>
      )}
    </>
  );
};

export default MovieList;
