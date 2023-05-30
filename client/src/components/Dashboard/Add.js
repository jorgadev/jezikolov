import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Textarea,
  useToast,
  Select,
} from "@chakra-ui/react";
import { StoreContext } from "@context/StoreContext";
import axios from "axios";
import { useContext, useState } from "react";

const languageOptions = [
  "Slovenščina",
  "Srbščina",
  "Nemščina",
  "Angleščina",
  "Španščina",
  "Italijanščina",
];

export default function Add() {
  const { user } = useContext(StoreContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    nativeLanguage: "",
    learningLanguage: "",
    availabilityDate: "",
    availabilityTime: "",
    description: "",
  });
  const toast = useToast();

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const clearForm = () => {
    setSelectedDate("");
    setSelectedTime("");
    setFormData({
      nativeLanguage: "",
      learningLanguage: "",
      availabilityDate: "",
      availabilityTime: "",
      description: "",
    });
  };

  const handleSubmit = () => {
    if (
      !formData.nativeLanguage ||
      !formData.learningLanguage ||
      !selectedDate ||
      !selectedTime
    ) {
      toast({
        title: "Manjkajoči podatki",
        description: "Prosimo, izpolnite vsa polja.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const data = {
      nativeLanguage: formData.nativeLanguage,
      learningLanguage: formData.learningLanguage,
      availabilityDate: selectedDate,
      availabilityTime: selectedTime,
      description: formData.description,
      userId: user.id,
    };

    axios
      .post("http://localhost/language_exchange.php", data)
      .then((response) => {
        toast({
          title: "Uspešno shranjeni podatki",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        clearForm();
      })
      .catch((error) => {
        toast({
          title: "Napaka pri shranjevanju podatkov",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
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
          <Select
            placeholder="Izberi jezik, ki ga govoriš..."
            value={formData.nativeLanguage}
            onChange={handleChange}
          >
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="learningLanguage" isRequired>
          <FormLabel>Jezik 2</FormLabel>
          <Select
            placeholder="Izberi jezik, ki se ga želiš naučiti..."
            value={formData.learningLanguage}
            onChange={handleChange}
          >
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="availabilityDate" isRequired>
          <FormLabel>Datum</FormLabel>
          <Input type="date" value={selectedDate} onChange={handleDateChange} />
        </FormControl>
        <FormControl id="availabilityTime" isRequired>
          <FormLabel>Čas</FormLabel>
          <Input type="time" value={selectedTime} onChange={handleTimeChange} />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Opis</FormLabel>
          <Textarea
            placeholder="Vnesi opis"
            _placeholder={{ color: "gray.500" }}
            resize="vertical"
            value={formData.description}
            onChange={handleChange}
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
  );
}
