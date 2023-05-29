import { Avatar, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function WithLargeQuote() {
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
        fontSize={{ base: "xl", md: "2xl" }}
        textAlign={"center"}
        maxW={"3xl"}
      >
        Imela sem neverjetno izkušnjo z aplikacijo Jezikolov, ki mi je izjemno
        pomagala pri učenju angleščine. Kljub temu, da sem iz Grčije in mi je
        angleščina predstavljala izziv, sem bil presenečen, kako učinkovito sem
        napredoval v samo nekaj tednih uporabe aplikacije.
      </Text>
      <Box textAlign={"center"}>
        <Avatar
          src={
            "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
          }
          alt={"Nikos Papadopulos"}
          mb={2}
        />

        <Text fontWeight={600}>Nikos Papadopulos</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")}>
          Uporabnik aplikacije iz Grčije
        </Text>
      </Box>
    </Stack>
  );
}
