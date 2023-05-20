import Header from "./components/Header";
import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import axios from "axios";

export default function Transcription() {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTime, setVideoTime] = useState("");

  const handleUrlChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUrl(event.target.value);
  };

  const handleButtonClick = async () => {
    console.log(url);
    const response = await axios.post("api/info", {
      url: url,
    });
    console.log("Calling 2")
    const transcript = await axios.post("api/transcript", {
        url: url,
    });
    console.log(transcript.data.info.response);
    const videoId = response.data.info.response.videoId;
    setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
    setVideoTime(response.data.info.response.lengthSeconds);
  };

  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
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
        </Box>
        {videoTime && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="10px"
          >
            <p>
              The duration of the video is {Math.floor(Number(videoTime) / 60)}{" "}
              minutes. The transcription will take about {Math.floor(Number(videoTime)*0.0025)} minutes.
            </p>
          </Box>
        )}
        {videoUrl && (
          <Box
            width={{ base: "100%", sm: "640px" }}
            height={{ base: "auto", sm: "360px" }}
            mt="10px"
          >
            <iframe
              title="Youtube Video"
              width="100%"
              height="100%"
              src={videoUrl}
            ></iframe>
          </Box>
        )}
      </Box>
    </>
  );
}
