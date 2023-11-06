import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import {
  a_new_hope,
  attack_of_the_clones,
  return_of_the_jedi,
  revenge_of_the_sith,
  the_empire_strikes_back,
  the_phantom_menace,
} from "../assets/images";

const MOVIE_IMAGE = {
  1: <Image src={the_phantom_menace} alt="eps-1" width={150} />,
  2: <Image src={attack_of_the_clones} alt="eps-2" width={150} />,
  3: <Image src={revenge_of_the_sith} alt="eps-3" width={150} />,
  4: <Image src={a_new_hope} alt="eps-4" width={150} />,
  5: <Image src={the_empire_strikes_back} alt="eps-5" width={150} />,
  6: <Image src={return_of_the_jedi} alt="eps-6" width={150} />,
};

const MovieCard = ({
  data = {},
  onClickDetail = () => null,
  onClickCart = () => null,
  isCartButtonDisabled = false,
}) => {
  return (
    <Card maxW="xs" className="movie-card" onClick={onClickDetail}>
      <CardBody>
        <Center>{MOVIE_IMAGE[data?.episode_id]}</Center>
        <Stack mt="6" spacing="3">
          <Heading size="md" align="left">
            {data?.title}
          </Heading>
          <Box as="h4" lineHeight="tight" noOfLines={4} align="left">
            <Text>{data?.opening_crawl}</Text>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter alignItems="center">
        <Text align="left" color="#b84509" fontSize="xl" fontWeight="bold">
          {`$ ${data?.price?.toLocaleString() || 0}`}
        </Text>
        <Spacer />
        <IconButton
          bg="#b84509"
          color="#ffffff"
          _hover={{ opacity: 0.8 }}
          icon={<MdShoppingCart />}
          isDisabled={isCartButtonDisabled}
          onClick={(e) => {
            e.stopPropagation();
            onClickCart(data);
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
