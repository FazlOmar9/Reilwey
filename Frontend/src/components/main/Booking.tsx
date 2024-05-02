import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useTicket from '../../hooks/useTicket';
import { Train } from '../../hooks/useTrains';
import MessageModal from '../login/MessageModal';

interface Props {
  userId: number;
  train: Train;
  setSelectedTrain: (train: Train | null) => void;
}

const tierPrices = {
  '2A': 2000,
  '3A': 1500,
  SL: 1000,
};

type Tier = '2A' | '3A' | 'SL';

const Booking = ({ userId, train, setSelectedTrain }: Props) => {
  const [selectedTier, setSelectedTier] = useState<Tier>('2A');
  const [totalPrice, setTotalPrice] = useState(tierPrices[selectedTier]);
  const [book, setBook] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const modalMessage = 'Ticket booked successfully!';

  const ticketResponse = useTicket(userId, train.id, selectedTier, book);

  const openModal = async () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedTrain(null);
    }, 2000);
  };

  useEffect(() => {
    if (ticketResponse == 1) {
      openModal();
      setIsSuccess(true);
    }
  }, [ticketResponse]);

  const handleTierChange = (tier: Tier) => {
    setSelectedTier(tier);
    setTotalPrice(tierPrices[tier]);
  };

  const calculateTotalPrice = () => {
    const gst = totalPrice * 0.05;
    const platformFee = 40;
    return totalPrice + gst + platformFee;
  };

  return (
    <>
      <Stack>
        <Box flex='1' mr={8}>
          <Heading ml={2} mb={4}>
            Booking
          </Heading>
          <Heading size='md' ml={2} mb={2}>
            Selected Train
          </Heading>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Train ID</Th>
                <Th>Source</Th>
                <Th>Destination</Th>
                <Th>Arrival Time</Th>
                <Th>Departure Time</Th>
                <Th>Availability</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{train.id}</Td>
                <Td>{train.source}</Td>
                <Td>{train.destination}</Td>
                <Td>{train.arrival_time}</Td>
                <Td>{train.departure_time}</Td>
                <Td>{train.availability}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Heading size='md' ml={2} mt={6} mb={2}>
            Select Tier
          </Heading>
          <Stack direction='row' ml={2} mb={4}>
            <Badge
              fontSize='15px'
              p={2}
              cursor='pointer'
              colorScheme={selectedTier === '2A' ? 'green' : 'gray'}
              onClick={() => handleTierChange('2A')}
              _hover={{ bg: selectedTier === '2A' ? 'green.500' : 'gray.500' }}
            >
              2A
            </Badge>
            <Badge
              fontSize='15px'
              p={2}
              cursor='pointer'
              colorScheme={selectedTier === '3A' ? 'green' : 'gray'}
              onClick={() => handleTierChange('3A')}
              _hover={{ bg: selectedTier === '3A' ? 'green.500' : 'gray.500' }}
            >
              3A
            </Badge>
            <Badge
              fontSize='15px'
              p={2}
              cursor='pointer'
              colorScheme={selectedTier === 'SL' ? 'green' : 'gray'}
              onClick={() => handleTierChange('SL')}
              _hover={{ bg: selectedTier === 'SL' ? 'green.500' : 'gray.500' }}
            >
              SL
            </Badge>
          </Stack>
        </Box>
        <Box flex='1'>
          <Heading size='md' ml={2} mb={2}>
            Bill
          </Heading>
          <Table variant='simple'>
            <Tbody>
              <Tr>
                <Th>Base Fee</Th>
                <Td borderLeft='1px solid gray'>{totalPrice} INR</Td>
              </Tr>
              <Tr>
                <Th>GST</Th>
                <Td borderLeft='1px solid gray'>{totalPrice * 0.05} INR</Td>
              </Tr>
              <Tr>
                <Th>Platform Fee</Th>
                <Td borderLeft='1px solid gray'>40 INR</Td>
              </Tr>
              <Tr>
                <Th>Total Price</Th>
                <Td>{calculateTotalPrice()} INR</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Flex justify='flex-end'>
          <Button colorScheme='blue' onClick={() => setSelectedTrain(null)}>
            Cancel
          </Button>
          <Button colorScheme='green' ml={2} onClick={() => setBook(true)}>
            Confirm Booking
          </Button>
        </Flex>
      </Stack>
      <MessageModal isSuccess={isSuccess} isOpen={isModalOpen}>
        {modalMessage}
      </MessageModal>
    </>
  );
};

export default Booking;
