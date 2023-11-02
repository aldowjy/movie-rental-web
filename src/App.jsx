import "./App.css";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Center,
  Heading,
  Input,
  Stack,
  Text,
  Wrap,
  Container,
  Image,
  Divider,
  Box,
} from "@chakra-ui/react";
import { MdShoppingCart, MdSearch } from "react-icons/md";
import { MOVIE_DATA } from "./dummy";

function App() {
  return (
    <>
      <Container maxW="container.xl" color="#262626">
        <Center>
          <Stack spacing={8} direction="row">
            <Input
              placeholder="Please Input Movie Name..."
              size="lg"
              htmlSize={40}
              width="auto"
            />
            <Button leftIcon={<MdSearch />} colorScheme="teal" size="lg">
              Find
            </Button>
          </Stack>
        </Center>

        <Wrap mt={8} spacing={4}>
          {MOVIE_DATA.results.map((data, i) => {
            return (
              <Card key={i} maxW="xs">
                <CardBody>
                  <Image
                    src={data.movieImage}
                    alt={data.title}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md" align="left">
                      {data.title}
                    </Heading>
                    <Box as="h4" lineHeight="tight" noOfLines={4} align="left">
                      <Text>{data.opening_crawl}</Text>
                    </Box>
                    <Text align="left" color="blue.600" fontSize="xl">
                      {data.price?.toLocaleString()}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button leftIcon={<MdShoppingCart />} colorScheme="blue">
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </Wrap>
      </Container>
    </>
  );
}

export default App;
