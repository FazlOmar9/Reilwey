import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaChevronDown, FaRegClock } from 'react-icons/fa';
import useFilters from '../../hooks/useFilters';

interface Props {
  currentSource: string;
  currentDestination: string;
  setCurrentDay: (day: number) => void;
  setCurrentSource: (source: string) => void;
  setCurrentDestination: (destination: string) => void;
}

const Filter = ({
  currentSource,
  setCurrentSource,
  currentDestination,
  setCurrentDestination,
  setCurrentDay,
}: Props) => {
  const sources = useFilters('source');
  const destinations = useFilters('destination');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setCurrentDay(date.getDay());
  };

  return (
    <Flex p={4}>
      <HStack>
        <InputGroup w='200px' mr={4}>
          <InputLeftElement pointerEvents='none' children={<FaRegClock />} />
          <Input type='date' placeholder='Date' onChange={handleDateChange} />
        </InputGroup>
        <Box pr='15px'>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />} minW='150px'>
              {currentSource || 'Source'}
            </MenuButton>
            <MenuList>
              {sources?.data.map((source, index) => (
                <MenuItem key={index} onClick={() => setCurrentSource(source)}>
                  {source}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
        <Menu>
          <MenuButton as={Button} rightIcon={<FaChevronDown />} minW='150px'>
            {currentDestination || 'Destination'}
          </MenuButton>
          <MenuList>
            {destinations?.data.map((destination, index) => (
              <MenuItem
                key={index}
                onClick={() => setCurrentDestination(destination)}
              >
                {destination}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Filter;
