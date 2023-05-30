import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Textarea,
  TabPanel,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Add() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmit = () => {
    // Obdelava podatkov in shranjevanje
    // Lahko dostopate do podatkov: nativeLanguage, learningLanguage, selectedDate
    // Preverjanje veljavnosti, pošiljanje na strežnik itd.
  };

  return (
    <TabPanel>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <FormControl id="nativeLanguage" isRequired>
            <FormLabel>Jezik 1</FormLabel>
            <Input
              placeholder="Vnesi jezik, ki ga govoriš"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="learningLanguage" isRequired>
            <FormLabel>Jezik 2</FormLabel>
            <Input
              placeholder="Vnesi jezik, ki se ga želiš naučiti"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="availabilityDate" isRequired>
            <FormLabel>Datum</FormLabel>
            <Input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </FormControl>
          <FormControl id="availabilityTime" isRequired>
            <FormLabel>Čas</FormLabel>
            <Input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Opis</FormLabel>
            <Textarea
              placeholder="Vnesi opis"
              _placeholder={{ color: "gray.500" }}
              resize="vertical"
            />
          </FormControl>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSubmit}
          >
            Dodaj
          </Button>
        </Stack>
      </Flex>
    </TabPanel>
  );
}
