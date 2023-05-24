import Link from "next/link";
import Header from "./components/Header";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Image,
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";

interface BoxType {
  imageSrc: string;
  imageAlt: string;
  title: string;
  channel: string;
}

export default function Dashboard() {
  const boxes: BoxType[] = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      imageAlt: "Green double couch with wooden legs",
      title: "Title",
      channel: "Channel Name",
    },
  ];

  return (
    <>
      <Header />
      <Box
        maxW="auto"
        maxH="auto"
        px="4"
        pt="20"
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
      >
        <Box p="6">
          <Card maxW="xs">
            <CardBody>
              <Link href="/transcription">
                <Image
                  src="https://images.unsplash.com/photo-1623057000049-e220f79c7051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=704&q=80"
                  alt="Add Sign"
                  borderRadius="lg"
                  height="200px"
                  width="300px"
                  objectFit="cover"
                />
              </Link>
              <Stack mt="2" spacing="">
                <Heading size="md">Create a new transcription</Heading>
              </Stack>
            </CardBody>
            <Divider />
          </Card>
        </Box>
        <Box p="6">
          <Card maxW="xs">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
                height="200px"
                width="300px"
                objectFit="cover"
              />
              <Stack mt="2" spacing="">
                <Heading size="md">Title | Channel Name</Heading>
              </Stack>
            </CardBody>
            <Divider />
          </Card>
        </Box>
        {boxes.map((box, index) => (
          <Box p="6" key={index}>
            <Card maxW="xs">
              <CardBody>
                <Image
                  src={box.imageSrc}
                  alt={box.imageAlt}
                  borderRadius="lg"
                  height="200px"
                  width="300px"
                  objectFit="cover"
                />
                <Stack mt="2" spacing="">
                  <Heading size="md">{box.title} | {box.channel}</Heading>
                </Stack>
              </CardBody>
              <Divider />
            </Card>
          </Box>
        ))}
      </Box>
    </>
  );
}
