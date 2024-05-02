import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useLogin from '../../hooks/useLogin';
import MessageModal from './MessageModal';

export type FormData = {
  email: string;
  password: string;
};

const LoginForm = ({ onLogin }: { onLogin: (id: number) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    'Logged in successfully!' as string
  );

  const [email, setEmail] = useState('' as string);
  const [password, setPassword] = useState('' as string);

  const openModal = async () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  const response = useLogin({ email, password }, onServerResponse, [
    email,
    password,
  ]);
  
  function onServerResponse() {
    if (response == -1) {
      setIsSuccess(false);
      setModalMessage('Login failed!');
      openModal();
    } else if (response) {
      setIsSuccess(true);
      openModal();
      onLogin(response);
    }
  }

  useEffect(() => {
    if (response){
      if (response > 0)
        onLogin(response)}
  }, [response])

  const onSubmit = (data: FormData) => {
    setEmail(data.email);
    setPassword(data.password);
  };

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)}>
      <FormControl id='emailLogin'>
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
      <FormControl id='passwordLogin' mt={4}>
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
        Login
      </Button>
      <MessageModal isSuccess={isSuccess} isOpen={isModalOpen}>
        {modalMessage}
      </MessageModal>
    </Box>
  );
};

export default LoginForm;
