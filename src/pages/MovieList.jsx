import { useEffect, useState } from "react";
import {
  Button,
  Center,
  Input,
  Stack,
  Wrap,
  Box,
  SkeletonCircle,
  SkeletonText,
  HStack,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useDebounce } from "use-debounce";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import useMovieFetch from "../hooks/useMovieFetch";

const MovieList = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchDebounceValue] = useDebounce(searchKeyword, 2000);
  const { fetchData, fetchMovies, loader } = useMovieFetch();

  const handleSearchClick = () => {
    navigate({
      pathname: "/",
      search: `?search=${searchDebounceValue}`,
    });
  };

  const handleDetailClick = (data) => {
    navigate(`/detail/${data.title}`, { state: data.title });
  };

  useEffect(() => {
    fetchMovies({
      params: { search: searchDebounceValue },
    });
  }, [fetchMovies, searchDebounceValue]);

  return (
    <>
      <Center>
        <Stack spacing={8} direction="row">
          <Input
            placeholder="Input Movie Name..."
            size="lg"
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
            bg="white"
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
        <HStack>
          <Box padding="6" boxShadow="lg" bg="white" mt={8} width={200}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" mt={8} width={200}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        </HStack>
      ) : (
        <Wrap mt={8} spacing={8} align="center" justify="center">
          {fetchData?.map((data, i) => {
            return (
              <MovieCard
                key={i}
                data={data}
                onClickDetail={() => handleDetailClick(data)}
                onClickCart={(data) => console.log(data)}
              />
            );
          })}
        </Wrap>
      )}
    </>
  );
};

export default MovieList;
