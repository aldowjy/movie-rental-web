import {
  Box,
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
import { getImageURL } from "../utils";

const MovieCard = ({
  data = {},
  onClickToDetail = () => null,
  onClickAddCart = () => null,
  isCartButtonDisabled = false,
}) => {
  return (
    <Card maxW="xs" className="movie-card" onClick={onClickToDetail}>
      <CardBody>
        <Center>
          <Image
            src={getImageURL(data?.title)}
            alt={data?.episode_id}
            width={150}
          />
        </Center>
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
            onClickAddCart(data);
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
