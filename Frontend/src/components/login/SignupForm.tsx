import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useSignup from '../../hooks/useSignup';
import { useEffect, useState } from 'react';
import MessageModal from './MessageModal';

export type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const modalMessage = 'Signup successful!';

  const [name, setName] = useState('' as string);
  const [email, setEmail] = useState('' as string);
  const [password, setPassword] = useState('' as string);

  const openModal = async () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  const response = useSignup({ name, email, password }, [
    name,
    email,
    password,
  ]);

  useEffect(() => {
    if (response) {
      setIsSuccess(true);
      openModal();
      reset();
    }
  }, [response]);

  const onSubmit = (data: FormData) => {
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);
  };

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)}>
      <FormControl id='name'>
        <FormLabel>Name</FormLabel>
        <Input
          {...register('name', { required: 'Name is required' })}
          type='text'
          border='1px'
          borderColor='gray.600'
          _hover={{ borderColor: 'gray.600' }}
        />
        {errors.name && (
          <Text ml='5px' color='red'>
            {errors.name.message}
          </Text>
        )}
      </FormControl>
      <FormControl id='email' mt={4}>
        <FormLabel>Email</FormLabel>
        <Input
          {...register('email', { required: 'Email is required' })}
          type='email'
          border='1px'
          borderColor='gray.600'
          _hover={{ borderColor: 'gray.600' }}
        />
        {errors.email && (
          <Text ml='5px' color='red'>
            {errors.email.message}
          </Text>
        )}
      </FormControl>
      <FormControl id='password' mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          {...register('password', { required: 'Password is required' })}
          type='password'
          border='1px'
          borderColor='gray.600'
          _hover={{ borderColor: 'gray.600' }}
        />
        {errors.password && (
          <Text ml='5px' color='red'>
            {errors.password.message}
          </Text>
        )}
      </FormControl>
      <Button colorScheme='blue' mt={4} type='submit'>
        Signup
      </Button>
      <MessageModal isSuccess={isSuccess} isOpen={isModalOpen}>
        {modalMessage}
      </MessageModal>
    </Box>
  );
};

export default SignupForm;
