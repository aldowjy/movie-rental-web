import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import {
  a_new_hope,
  attack_of_the_clones,
  return_of_the_jedi,
  revenge_of_the_sith,
  the_empire_strikes_back,
  the_phantom_menace,
} from "../assets/images";
import { MdShoppingCart } from "react-icons/md";
import useMovieFetch from "../hooks/useMovieFetch";

const MOVIE_IMAGE = {
  1: (
    <Image
      src={the_phantom_menace}
      alt="eps-1"
      objectFit="contain"
      maxW={{ base: "100%", sm: "200px" }}
    />
  ),
  2: (
    <Image
      src={attack_of_the_clones}
      alt="eps-2"
      objectFit="contain"
      maxW={{ base: "100%", sm: "200px" }}
    />
  ),
  3: (
    <Image
      src={revenge_of_the_sith}
      alt="eps-3"
      objectFit="contain"
      maxW={{ base: "100%", sm: "200px" }}
    />
  ),
  4: (
    <Image
      src={a_new_hope}
      alt="eps-4"
      objectFit="contain"
      maxW={{ base: "100%", sm: "200px" }}
    />
  ),
  5: (
    <Image
      src={the_empire_strikes_back}
      alt="eps-5"
      objectFit="contain"
      maxW={{ base: "100%", sm: "200px" }}
    />
  ),
  6: (
    <Image
      src={return_of_the_jedi}
      alt="eps-6"
      objectFit="contain"
      maxW={{ base: "100%", sm: "200px" }}
    />
  ),
};

const MovieDetail = () => {
  const { state: movieName } = useLocation();
  const { fetchData, fetchMovieDetail, loader } = useMovieFetch();

  useEffect(() => {
    fetchMovieDetail({
      params: { search: movieName },
    });
  }, [fetchMovieDetail, movieName]);

  return (
    <>
      {loader ? (
        <Box padding="6" boxShadow="lg" bg="white" mt={8}>
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      ) : (
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Box p={4}>{MOVIE_IMAGE[fetchData?.episode_id]}</Box>

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
                {`Rp. ${fetchData?.price?.toLocaleString() || 0}`}
              </Text>
              <Spacer />
              <Button
                leftIcon={<MdShoppingCart />}
                bg="#b84509"
                color="#ffffff"
                _hover={{ opacity: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // onClickCart(data);
                }}
              >
                Add to cart
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default MovieDetail;
