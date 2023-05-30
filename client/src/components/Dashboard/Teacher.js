import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  CloseButton,
  useToast,
  TabPanel,
} from "@chakra-ui/react";
import { StoreContext } from "@context/StoreContext";

const Teacher = () => {
  const { user } = useContext(StoreContext);
  const [offers, setOffers] = useState([]);
  const toast = useToast();

  console.log(offers);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.post(
        `http://localhost/get_offers.php?user_id=${user.id}`
      );
      setOffers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeOffer = async (offerId) => {
    try {
      await axios.delete(`http://localhost/remove_offer.php?id=${offerId}`);
      fetchOffers();
      toast({
        title: "Ponudba odstranjena",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TabPanel>
      <Box>
        <Heading as="h2" size="lg" mb={4}>
          Moje ponudbe
        </Heading>
        {offers.length > 0 ? (
          <VStack spacing={4} align="start">
            {offers.map((offer) => (
              <Box
                position="relative"
                key={offer.id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                w="100%"
                boxShadow="sm"
              >
                <CloseButton
                  position="absolute"
                  right={2}
                  top={2}
                  onClick={() => removeOffer(offer.id)}
                />
                <Heading as="h3" size="md" mb={2}>
                  {offer.native_language} → {offer.learning_language}
                </Heading>
                <Text>Uporabnik: {offer.username}</Text>
                <Text>{offer.description}</Text>
              </Box>
            ))}
          </VStack>
        ) : (
          <Text>Ni dodanih ponudb.</Text>
        )}
      </Box>
    </TabPanel>
  );
};

export default Teacher;
