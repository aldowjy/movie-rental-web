import {
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { MdArrowBack, MdDelete } from "react-icons/md";
import { getImageURL, totalPrice } from "../utils";
import { useNavigate } from "react-router-dom";

const MovieCart = () => {
  const navigate = useNavigate();

  const getMovies = localStorage.movieCart
    ? JSON.parse(localStorage.movieCart)
    : {};

  const handlerDeleteClick = (episode_id) => {
    let updateData = { ...getMovies };
    delete updateData[episode_id.toString()];
    updateData = JSON.stringify(updateData);
    localStorage.setItem("movieCart", updateData);
    location.reload();
  };

  const handleBackClick = () => navigate(-1);

  return (
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

      {Object.keys(getMovies).map((data, i) => (
        <Card
          key={i}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          my={4}
          align="center"
        >
          <Center>
            <Image
              src={getImageURL(getMovies[Number(data)].title)}
              alt={getMovies[Number(data)].episode_id}
              width={150}
            />
          </Center>
          <CardBody textAlign="left">
            <Flex align="center">
              <Heading size="md">{getMovies[Number(data)].title}</Heading>
              <Spacer />
              <Text
                align="left"
                color="#b84509"
                fontSize="xl"
                fontWeight="bold"
              >
                {`$ ${getMovies[Number(data)].price?.toLocaleString() || 0}`}
              </Text>
              <IconButton
                variant="ghost"
                aria-label="delete-cart"
                size="lg"
                bg="#b84509"
                color="#ffffff"
                _hover={{ opacity: 0.8 }}
                ml={4}
                icon={<MdDelete />}
                onClick={() =>
                  handlerDeleteClick(getMovies[Number(data)].episode_id)
                }
              />
            </Flex>
          </CardBody>
        </Card>
      ))}

      <Flex mt={8} align="center">
        <Button
          leftIcon={<MdDelete />}
          bg="#b84509"
          color="#ffffff"
          _hover={{ opacity: 0.8 }}
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
        >
          Emtyping The Cart
        </Button>
        <Spacer />
        <Text align="left" color="#b84509" fontSize="xl" fontWeight="bold">
          {`Total Price: $ ${totalPrice(
            Object.values(getMovies)
          ).toLocaleString()}`}
        </Text>
      </Flex>
    </>
  );
};

export default MovieCart;
