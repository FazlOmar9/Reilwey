import { Badge, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import useTrains, { Train } from '../../hooks/useTrains';

interface Props {
  source: string;
  destination: string;
  day: number | null;
  setTrainId: (trainId: Train) => void;
  deps: [any]
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TrainList = ({ source, destination, day, setTrainId }: Props) => {
  let { trains } = useTrains(source, destination);

  if (day)
    trains = trains.filter(train => train.day.includes(day));

  return (
    <Table variant='simple' p={4}>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Days</Th>
          <Th>Arrival Time</Th>
          <Th>Departure Time</Th>
          <Th>Source</Th>
          <Th>Destination</Th>
          <Th>Availability</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {trains.map((train) => (
          <Tr key={train.id}>
            <Td>{train.id}</Td>
            <Td>
              {train.day.map((day: number) => (
                <Badge key={day} colorScheme="blue" m={1}>
                  {daysOfWeek[day]}
                </Badge>
              ))}
            </Td>
            <Td>{train.arrival_time}</Td>
            <Td>{train.departure_time}</Td>
            <Td>{train.source}</Td>
            <Td>{train.destination}</Td>
            <Td>{train.availability}</Td>
            <Td>
              <Button colorScheme='blue' onClick={() => setTrainId(train)}>Book Now</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TrainList;