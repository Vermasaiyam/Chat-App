import { Avatar, Box, Flex, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    
    const bg2 = useColorModeValue('#38B2AC', '#2A2F32')
    const bg3 = useColorModeValue('#E8E8E8', 'gray');
    const color = useColorModeValue('black', 'white')

    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg={bg3}
            color={color}
            _hover={{
                // background: "#38B2AC",
                background: bg2,
                color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            // color="black"
            px={3}
            py={2}
            my={2}
            borderRadius="lg"
        >
            <Flex>

                <Avatar
                    mr={2}
                    size="sm"
                    cursor="pointer"
                    name={user.name}
                    src={user.pic}
                />
                <Box>
                    <Text>{user.name}</Text>
                    <Text fontSize="xs">
                        <b>Email : </b>
                        {user.email}
                    </Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default UserListItem
