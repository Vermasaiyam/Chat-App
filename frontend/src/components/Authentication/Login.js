import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useColorMode, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ChatState } from '../../Context/ChatProvider'
import { css } from '@emotion/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const Login = () => {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const { setUser } = ChatState();

  const { colorMode, toggleColorMode } = useColorMode();


  const bg = useColorModeValue('white', '#111B21')
  const bg1 = useColorModeValue('white', '#212121')
  const bg2 = useColorModeValue('white', '#2A2F32')
  const bg3 = useColorModeValue('#38B2AC', 'gray')
  const color = useColorModeValue('black', 'white')


  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };


  return (
    <VStack spacing='5px' bg={'white'} color={'black'}>

      <FormControl idisplay="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          variant="outline"
          color={'black'}
          bg={'white'}
          type={'email'}
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
      </FormControl>

      <FormControl idisplay="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? "text" : 'password'} value={password} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewOffIcon/> : <ViewIcon/> }
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button colorScheme='blue' width="100%" style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>
        Login
      </Button>

      {/* <Button variant="solid" colorScheme='red' width="100%" onClick={() => {
        setEmail('guest@example.com');
        setPassword('123456');
      }}>
        Get Guest User Credentials
      </Button> */}

    </VStack>
  )

}

export default Login
