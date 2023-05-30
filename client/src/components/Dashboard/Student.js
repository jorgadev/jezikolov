import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useToast,
  TabPanel,
  Grid,
} from "@chakra-ui/react";
import { StoreContext } from "@context/StoreContext";

const Student = () => {
  const { user } = useContext(StoreContext);
  const [offers, setOffers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        `http://localhost/get_available_offers.php?user_id=${user.id}`
      );
      setOffers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const reserveOffer = async (offerId) => {
    try {
      const response = await axios.post("http://localhost/reserve_offer.php", {
        id: offerId,
        user_id: user.id,
      });
      fetchOffers();
      toast({
        title: response.data,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cancelReservation = async (offerId) => {
    try {
      await axios.post("http://localhost/cancel_reservation.php", {
        id: offerId,
      });
      fetchOffers();
      toast({
        title: "Rezervacija odpovedana",
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
            {offers.map((offer) => {
              const isReserved = offer.is_reserved != 0;
              const isReservedByUser = offer.is_reserved == user.id;

              return (
                <Box
                  key={offer.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  boxShadow="sm"
                >
                  <Box
                    bg={isReserved ? "red.300" : "green.300"}
                    h={48}
                    mb={4}
                  />

                  <VStack position="relative" spacing={2} align="start">
                    <Heading as="h3" size="md">
                      {offer.native_language} → {offer.learning_language}
                    </Heading>
                    {offer.description ? (
                      <React.Fragment>
                        <Text color="gray.500">Opis ({offer.username}):</Text>
                        <Text>{offer.description}</Text>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    <Text color="gray.500">Datum in čas:</Text>
                    <Text>
                      {`${offer.availability_date}, ${offer.availability_time}`}
                    </Text>
                    {!isReserved ? (
                      <Button
                        colorScheme="blue"
                        onClick={() => reserveOffer(offer.id)}
                      >
                        Rezerviraj
                      </Button>
                    ) : isReservedByUser ? (
                      <Button
                        colorScheme="red"
                        onClick={() => cancelReservation(offer.id)}
                      >
                        Otkazi rezervacijo
                      </Button>
                    ) : (
                      ""
                    )}
                  </VStack>
                </Box>
              );
            })}
          </Grid>
        ) : (
          <Text>Ni dodanih ponudb.</Text>
        )}
      </Box>
    </TabPanel>
  );
};

export default Student;
