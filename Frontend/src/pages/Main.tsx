import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import Filter from '../components/main/Filter';
import TrainList from '../components/main/TrainList';
import { Train } from '../hooks/useTrains';
import Booking from '../components/main/Booking';

interface Props {
  onLogout: () => void;
  userId: number | null;
}

const Main = ({ onLogout, userId }: Props) => {
  if (userId == null) return <></>;

  const [currentSource, setCurrentSource] = useState<string>('');
  const [currentDestination, setCurrentDestination] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<number | null>(null);

  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  return (
    <Box>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        p={4}
        bg='teal.500'
        color='white'
      >
        <Heading>IRCTC</Heading>
        <Button
          leftIcon={<FaSignOutAlt />}
          colorScheme='teal'
          variant='outline'
          onClick={onLogout}
        >
          Logout
        </Button>
      </Flex>
      {selectedTrain == null ? (
        <Box id='Train'>
          <Filter
            currentSource={currentSource}
            setCurrentSource={setCurrentSource}
            currentDestination={currentDestination}
            setCurrentDestination={setCurrentDestination}
            setCurrentDay={setCurrentDay}
          />
          <TrainList
            source={currentSource}
            destination={currentDestination}
            day={currentDay}
            setTrainId={setSelectedTrain}
            deps={[selectedTrain]}
          />
        </Box>
      ) : (
        <Box id='Book'>
          <Booking
            userId={userId}
            train={selectedTrain}
            setSelectedTrain={setSelectedTrain}
          />
        </Box>
      )}
    </Box>
  );
};

export default Main;
