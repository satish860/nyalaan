import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Hero() {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "green.400",
                zIndex: -1,
              }}
            ></Text>
            <br />
            <Text as={"span"} color={"green.400"}></Text>
          </Heading>
          <Text color={"gray.500"}></Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                  colorScheme={"green"}
                  bg={"green.400"}
                  _hover={{ bg: "green.500" }}
                >
                  Get Started
                </Button>
              </Link>
            </SignedIn>

            <SignedOut>
              <Link href="/sign-in">
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                  colorScheme={"green"}
                  bg={"green.400"}
                  _hover={{ bg: "green.500" }}
                >
                  Get Started
                </Button>
              </Link>
            </SignedOut>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export const Blob = (props: IconProps) => {
  return (
   <>
   </>
  );
};
