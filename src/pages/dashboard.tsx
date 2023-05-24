import Link from "next/link";
import Header from "./components/Header";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Image,
  Divider,
  Box,
} from "@chakra-ui/react";
import { getAuth } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
import { Dashboard, DashboardRecord, getXataClient } from "../xata";

interface BoxType {
  Thumbnail: string;
  title: string;
  channel: string;
  video_id: string;
}
const xata = getXataClient();

export default function Dashboard({
  initialBoxes,
}: {
  initialBoxes: BoxType[];
}) {
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
        {initialBoxes.map((box, index) => (
          <Box p="6" key={index}>
            <Card maxW="xs">
              <CardBody>
                <Image
                  src={box.Thumbnail}
                  borderRadius="lg"
                  height="200px"
                  width="300px"
                  objectFit="cover"
                />
                <Stack mt="2" spacing="">
                  <Heading size="md">
                    {box.title} | {box.channel}
                  </Heading>
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

export interface MyServerSideProps {
  initialBoxes: BoxType[];
}

export const getServerSideProps: GetServerSideProps<
  MyServerSideProps
> = async ({ req }) => {
  const { userId } = getAuth(req);

  const records = await xata.db.Dashboard.filter(
    "user_id",
    String(userId)
  ).getMany();
  const data = records.toArray();

  const initialBoxes = data.map((item:  DashboardRecord) => ({
    title: item.title || "",
    channel: item.channel_name || "",
    Thumbnail: item.Thumbnail || "",
    video_id: item.video_id || "",
  }));

  return {
    props: {
      initialBoxes,
    },
  };
};
