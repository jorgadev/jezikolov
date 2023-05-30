import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function Testimonials() {
  return (
    <Stack
      bg={useColorModeValue("gray.50", "gray.800")}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={"center"}
      direction={"column"}
    >
      <Text
        fontSize={{ base: "m", md: "xl" }}
        textAlign={"center"}
        maxW={"3xl"}
      >
        Imel sem neverjetno izkušnjo z aplikacijo Jezikolov, ki mi je izjemno
        pomagala pri učenju angleščine. Kljub temu, da sem iz Grčije in mi je
        angleščina predstavljala izziv, sem bil presenečen, kako učinkovito sem
        napredoval v samo nekaj tednih uporabe aplikacije.
      </Text>
      <Box textAlign={"center"}>
        <Text fontWeight={600}>Nikos Papadopulos</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")}>
          Uporabnik aplikacije iz Grčije
        </Text>
      </Box>
    </Stack>
  );
}
