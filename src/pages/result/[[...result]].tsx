import { Box, Flex, Progress } from "@chakra-ui/react";
import Header from "../components/Header";
import { GetStaticProps, GetStaticPropsContext } from "next";

interface ResultProps {
  data: any;
}

export default function Result({ data }: ResultProps) {
  const videoId = data?.response?.videoId;

  return (
    <>
      <Header />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        {data?.response && (
          <>
            <Box mb="20px" textAlign="center">
              <p>
                The duration of the video is{" "}
                {Math.floor(Number(data.response.lengthSeconds) / 60)} minutes.
                The transcription will take{" "}
                {Math.floor(Number(data.response.lengthSeconds) * 0.0025) < 1
                  ? "less than a minute."
                  : Math.floor(Number(data.response.lengthSeconds) * 0.0025) ===
                    1
                  ? "about a minute."
                  : "about " +
                    Math.floor(Number(data.response.lengthSeconds) * 0.0025) +
                    " minutes."}
              </p>
              <Progress size='xs' isIndeterminate />
            </Box>
            
          </>
        )}

        <Box textAlign="center">
          {videoId && (
            <iframe
              title="YouTube Video"
              width="600px"
              height="500px"
              src={`https://www.youtube.com/embed/${videoId}`}
            ></iframe>
          )}
        </Box>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps<ResultProps> = async ({
  params,
}: GetStaticPropsContext) => {
  if (!params) {
    return {
      props: {
        data: null,
      },
    };
  }
  const { result } = params;
  const response = await fetch("https://apps.beam.cloud/nhmjr", {
    method: "POST",
    headers: {
      "Accept-Encoding": "gzip, deflate",
      Authorization: process.env.INFO_API_KEY ?? " ",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: result,
    }),
  });

  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};

export async function getStaticPaths() {
  const paths = [{ params: { result: [] } }];

  return {
    paths,
    fallback: true,
  };
}
