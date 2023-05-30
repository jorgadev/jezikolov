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
  Grid,
} from "@chakra-ui/react";
import { StoreContext } from "@context/StoreContext";

const Teacher = () => {
  const { user } = useContext(StoreContext);
  const [offers, setOffers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        `http://localhost/get_user_offers.php?user_id=${user.id}`
      );
      setOffers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeOffer = async (offerId) => {
    try {
      await axios.post(`http://localhost/remove_offer.php?id=${offerId}`);
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
        {offers && offers.length > 0 ? (
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
            {offers.map((offer) => (
              <Box
                key={offer.id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                boxShadow="sm"
              >
                <Box bg={"blue.300"} h={48} mb={4} />
                <VStack position="relative" spacing={2} align="start">
                  <CloseButton
                    position="absolute"
                    right={0}
                    top={0}
                    onClick={() => removeOffer(offer.id)}
                  />
                  <Heading as="h3" size="md">
                    {offer.native_language} → {offer.learning_language}
                  </Heading>
                  <Text color="gray.500">Opis ({offer.username}):</Text>
                  <Text>{offer.description}</Text>

                  <Text color="gray.500">Datum in čas:</Text>

                  <Text>
                    {`${offer.availability_date}, ${offer.availability_time}`}
                  </Text>
                </VStack>
              </Box>
            ))}
          </Grid>
        ) : (
          <Text>Ni dodanih ponudb.</Text>
        )}
      </Box>
    </TabPanel>
  );
};

export default Teacher;
