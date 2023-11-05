import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

function Header() {
  const navigate = useNavigate();

  return (
    <Box bg="#191212" px={8} mb={8}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link to="/">
          <Heading size="lg" color="#b84509">
            Star Wars Rental Movie
          </Heading>
        </Link>
        <Button
          leftIcon={<MdShoppingCart />}
          bg="#b84509"
          color="#ffffff"
          _hover={{ opacity: 0.8 }}
          onClick={() => navigate("/cart")}
        >
          Cart
        </Button>
      </Flex>
    </Box>
  );
}

export default Header;
