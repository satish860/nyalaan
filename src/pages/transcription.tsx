import Header from "./components/Header";
import React, { useState } from "react";
import { Box, Input, Button, Flex } from "@chakra-ui/react";
import axios from "axios";

export default function Transcription() {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTime, setVideoTime] = useState("");
  const [transcript, setTranscript] = useState([
    {
      speaker: 0,
      transcript: "",
      startTime: 0,
      endTime: 0,
    },
  ]);

  const handleUrlChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUrl(event.target.value);
  };

  const handleButtonClick = async () => {
    const response = await axios.post("api/info", {
      url: url,
    });
    console.log("Calling 2");
    const transcriptResponse = await axios.post("api/transcript", {
      url: url,
    });
    const videoId = response.data.info.response.videoId;
    setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
    setVideoTime(response.data.info.response.lengthSeconds);
    console.log(transcriptResponse.data.text.response);
    setTranscript(transcriptResponse.data.text.response);
  };

  return (
    <>
      <Header />
      <Box
        display="grid"
        gridTemplateColumns="1fr"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
        maxH="auto"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb="20px"
        >
          <Input
            type="text"
            placeholder="Enter video URL"
            value={url}
            onChange={handleUrlChange}
            marginRight="2"
            width="400px"
            color="black"
            border="1px solid black"
          />
          <Button
            onClick={handleButtonClick}
            colorScheme="transparent"
            color="black"
            border="1px solid black"
            mt="10px"
          >
            Transcribe
          </Button>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="10px"
          >
            {videoTime && (
              <p>
                The duration of the video is{" "}
                {Math.floor(Number(videoTime) / 60)} minutes. The transcription
                will take{" "}
                {Math.floor(Number(videoTime) * 0.0025) < 1
                  ? "less than a minute."
                  : Math.floor(Number(videoTime) * 0.0025) === 1
                  ? "about a minute."
                  : "about " +
                    Math.floor(Number(videoTime) * 0.0025) +
                    " minutes."}
              </p>
            )}
          </Box>
        </Box>
        {videoUrl && (
          <Box display="grid" gridTemplateColumns="1fr 1fr">
            <Box pl="30px" position="relative" id="Youtube Player">
              <iframe
                title="YouTube Video"
                width="700px"
                height="500px"
                src={videoUrl}
                style={{ position: "absolute" }}
              ></iframe>
            </Box>
            <Box
              p="20px"
              borderLeft="1px solid gray"
              width="800px"
              height="500px"
              overflowY="auto"
            >
              <ul>
                {transcript.map((item, index) => (
                  <li key={index}>
                    Speaker {item.speaker}: {item.transcript}({item.startTime}-
                    {item.endTime})
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
