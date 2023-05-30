import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  Input,
} from "@chakra-ui/react";
import { StoreContext } from "@context/StoreContext";

function Ratings() {
  const { user } = useContext(StoreContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRatings = () => {
    axios
      .get("http://localhost/average_ratings.php")
      .then((response) => {
        setRatings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Pridobitev podatkov o uporabnikih
    axios
      .get(`http://localhost/users.php?user_id=${user.id}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchRatings();
  }, []);

  useEffect(() => {
    // Filtriranje uporabnikov glede na iskalni pojem
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleVote = (userId, ratedUserId, rating) => {
    // Pošiljanje ocene na strežnik
    axios
      .post("http://localhost/rate.php", {
        user_id: userId,
        rated_user_id: ratedUserId,
        rating: rating,
      })
      .then((response) => {
        // Posodobitev trenutnih ratingov
        fetchRatings();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <Input
        placeholder="Iskanje uporabnika"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      <VStack spacing={4} alignItems="flex-start">
        {filteredUsers.map((ratedUser) => (
          <Flex
            width={"100%"}
            key={ratedUser.id}
            alignItems="center"
            justifyContent="space-between"
            p={4}
            border="1px solid #ccc"
            borderRadius="md"
            mb={4}
          >
            <Box>
              <Text>Uporabnik: {ratedUser.username}</Text>
              <Text>
                Ocena: {ratings[ratedUser.id] ? ratings[ratedUser.id] : "N/A"}
              </Text>
            </Box>
            <Flex>
              <Button
                onClick={() => handleVote(user.id, ratedUser.id, 1)}
                colorScheme="teal"
                size="sm"
                ml={2}
                borderRadius="full"
                bg={ratings[ratedUser.id] >= 1 ? "green.300" : "red.300"}
                _hover={{
                  bg: ratings[ratedUser.id] >= 1 ? "green.400" : "red.400",
                }}
              >
                1
              </Button>
              <Button
                onClick={() => handleVote(user.id, ratedUser.id, 2)}
                colorScheme="teal"
                size="sm"
                ml={2}
                borderRadius="full"
                bg={ratings[ratedUser.id] >= 2 ? "green.300" : "red.300"}
                _hover={{
                  bg: ratings[ratedUser.id] >= 2 ? "green.400" : "red.400",
                }}
              >
                2
              </Button>
              <Button
                onClick={() => handleVote(user.id, ratedUser.id, 3)}
                colorScheme="teal"
                size="sm"
                ml={2}
                borderRadius="full"
                bg={ratings[ratedUser.id] >= 3 ? "green.300" : "red.300"}
                _hover={{
                  bg: ratings[ratedUser.id] >= 3 ? "green.400" : "red.400",
                }}
              >
                3
              </Button>
              <Button
                onClick={() => handleVote(user.id, ratedUser.id, 4)}
                colorScheme="teal"
                size="sm"
                ml={2}
                borderRadius="full"
                bg={ratings[ratedUser.id] >= 4 ? "green.300" : "red.300"}
                _hover={{
                  bg: ratings[ratedUser.id] >= 4 ? "green.400" : "red.400",
                }}
              >
                4
              </Button>
              <Button
                onClick={() => handleVote(user.id, ratedUser.id, 5)}
                colorScheme="teal"
                size="sm"
                ml={2}
                borderRadius="full"
                bg={ratings[ratedUser.id] >= 5 ? "green.300" : "red.300"}
                _hover={{
                  bg: ratings[ratedUser.id] >= 5 ? "green.400" : "red.400",
                }}
              >
                5
              </Button>
            </Flex>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}

export default Ratings;
