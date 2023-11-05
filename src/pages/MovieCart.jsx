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
import { MdDelete } from "react-icons/md";
import {
  a_new_hope,
  attack_of_the_clones,
  return_of_the_jedi,
  revenge_of_the_sith,
  the_empire_strikes_back,
  the_phantom_menace,
} from "../assets/images";
import { totalPrice } from "../utils";

const MOVIE_IMAGE = {
  1: <Image src={the_phantom_menace} alt="eps-1" width={150} />,
  2: <Image src={attack_of_the_clones} alt="eps-2" width={150} />,
  3: <Image src={revenge_of_the_sith} alt="eps-3" width={150} />,
  4: <Image src={a_new_hope} alt="eps-4" width={150} />,
  5: <Image src={the_empire_strikes_back} alt="eps-5" width={150} />,
  6: <Image src={return_of_the_jedi} alt="eps-6" width={150} />,
};

function MovieCart() {
  const getMovies = localStorage.movieCart
    ? JSON.parse(localStorage.movieCart)
    : {};

  return (
    <>
      {Object.keys(getMovies).map((data, i) => (
        <Card
          key={i}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          my={4}
          align="center"
        >
          <Center>{MOVIE_IMAGE[getMovies[Number(data)].episode_id]}</Center>
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
                {`Rp. ${getMovies[Number(data)].price?.toLocaleString() || 0}`}
              </Text>
              <IconButton
                variant="ghost"
                aria-label="side-menu"
                size="lg"
                bg="#b84509"
                color="#ffffff"
                _hover={{ opacity: 0.8 }}
                ml={4}
                icon={<MdDelete />}
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
          {`Total Price: Rp. ${totalPrice(
            Object.values(getMovies)
          ).toLocaleString()}`}
        </Text>
      </Flex>
    </>
  );
}

export default MovieCart;
