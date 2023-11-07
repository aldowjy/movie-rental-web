import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import useMovieFetch from "../hooks/useMovieFetch";
import Spinner from "../components/Spinner";
import { getImageURL } from "../utils";

const MovieDetail = () => {
  const navigate = useNavigate();
  const { movieName } = useParams();
  const { fetchData, fetchMovieDetail, loader } = useMovieFetch();
  const getMovies = localStorage.movieCart
    ? JSON.parse(localStorage.movieCart)
    : {};

  const isInCart = (episodeId) =>
    Object.keys(getMovies || {}).includes(episodeId?.toString());

  const handleBackClick = () => navigate(-1);

  const handleCartClick = (movie) => {
    let updateData = {
      ...getMovies,
      [movie.episode_id]: {
        episode_id: movie.episode_id,
        title: movie.title,
        price: movie.price,
      },
    };
    updateData = JSON.stringify(updateData);
    localStorage.setItem("movieCart", updateData);
    location.reload();
  };

  useEffect(() => {
    fetchMovieDetail(movieName);
  }, [fetchMovieDetail, movieName]);

  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <>
          <Button
            leftIcon={<MdArrowBack />}
            bg="#b84509"
            color="#ffffff"
            _hover={{ opacity: 0.8 }}
            onClick={handleBackClick}
            mb={8}
          >
            Back
          </Button>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Box p={4}>
              <Image
                src={getImageURL(fetchData?.title)}
                alt={fetchData?.episode_id}
                objectFit="contain"
                maxW={{ base: "100%", sm: "200px" }}
              />
            </Box>
            <Stack>
              <CardBody textAlign="left">
                <Heading size="md">{fetchData?.title}</Heading>

                <Text py="2">{fetchData?.opening_crawl}</Text>

                <TableContainer mt={8}>
                  <Table variant="striped" size="sm">
                    <Tbody>
                      <Tr>
                        <Td>Director</Td>
                        <Td>{fetchData?.director}</Td>
                      </Tr>
                      <Tr>
                        <Td>Episode</Td>
                        <Td>{fetchData?.episode_id}</Td>
                      </Tr>
                      <Tr>
                        <Td>Producer</Td>
                        <Td>{fetchData?.producer}</Td>
                      </Tr>
                      <Tr>
                        <Td>Release Date</Td>
                        <Td>{fetchData?.release_date}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>

              <CardFooter alignItems="center">
                <Text
                  align="left"
                  color="#b84509"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  {`$ ${fetchData?.price?.toLocaleString() || 0}`}
                </Text>
                <Spacer />
                <Button
                  leftIcon={<MdShoppingCart />}
                  bg="#b84509"
                  color="#ffffff"
                  _hover={{ opacity: 0.8 }}
                  isDisabled={isInCart(fetchData?.episode_id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCartClick(fetchData);
                  }}
                >
                  Add to cart
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </>
      )}
    </>
  );
};

export default MovieDetail;
