import { Box, Center } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton } from "@chakra-ui/react"
import { Portal } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Stack } from "@chakra-ui/react"

import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <main>
      <Box
        as="header"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={8}
        borderBottom="1px"
        borderBottomColor="gray.200"
      >
        <Box>
          <Heading size="md">
            <Link to="/">Hotel Admin Dashboard</Link>
          </Heading>
        </Box>
        <Box>
          <Popover>
            <PopoverTrigger>
              <Button variant="unstyled">
                <Avatar name='Aaryaman Yadav' src='https://avatars.githubusercontent.com/u/75294588?v=4' />
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent w={"220px"}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Stack>
                    <a href="">Admin Profile</a>
                    <a href="">Settings</a>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </Box>
      </Box>
      <Center>
        <Box
          as="section"
          py={"60px"}
          px={8}
        >
          <Center>
            <Box
              as="nav"
              display="flex"
              justifyContent="space-between"
              w="450px"
              marginBottom={"50px"}
            >
              <Link to="/dash">Dashboard</Link>
              <Link to="/new">New Booking</Link>
            </Box>
          </Center>
          <Box as="section"
          >
            <Outlet />
          </Box>
        </Box>
      </Center>

    </main >
  )
}

export default App
