import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'

import { Button, ButtonGroup } from '@chakra-ui/react'

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import { Center } from '@chakra-ui/react'

export default function RoomBox(props) {
    const { room_type, room_count, booked_rooms } = props;
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);

    const cancelBooking = ({ room_type, room_number, start_time, end_time }) => {
        start_time = new Date(start_time).toDateString();
        end_time = new Date(end_time).toDateString();


        fetch('http://localhost:3000/cancel', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                roomType: room_type,
                roomNumber: room_number,
                startTime: start_time,
                endTime: end_time
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setModal3(true);
            })
            .catch(err => console.log(err));
    }

    return (
        <Box
            display='flex'
            justifyContent={'center'}
        >
            {Array(room_count).fill(0).map((_, index) => {
                const isBooked = booked_rooms.length > 0;
                let { email, start_time, end_time } = isBooked ? booked_rooms[index] : {};
                return (
                    <Box
                        cursor='pointer'
                    >
                        <Popover
                            placement='bottom'
                            closeOnBlur={true}
                        >
                            <PopoverTrigger>
                                <Box
                                    backgroundColor={isBooked ? 'red.100' : 'green.100'}
                                    padding='15px'
                                    borderRadius='5px'
                                    margin='10px'
                                >
                                    {room_type} - {index}
                                </Box>
                            </PopoverTrigger>
                            <PopoverContent color='black' bg='white' >
                                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                                    Booking Details
                                </PopoverHeader>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>
                                    {isBooked ? (
                                        <Box>
                                            Email: {email} <br />
                                            Start Time: {start_time} <br />
                                            End Time: {end_time} <br />
                                        </Box>
                                    ) : (
                                        <Box>
                                            This room is not booked.
                                        </Box>
                                    )}


                                </PopoverBody>
                                <PopoverFooter
                                    border='0'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    pb={4}
                                >
                                    <ButtonGroup size='sm'>
                                        {isBooked ? (
                                            <Box display='flex' justifyContent='space-between'>
                                                <Button colorScheme='yellow'
                                                    variant='outline'
                                                    mr='10px'
                                                    onClick={() => {
                                                        setModal1(true);
                                                        setModal2(false);
                                                    }}
                                                >
                                                    Edit Booking
                                                </Button>
                                                <Button colorScheme='red'
                                                    variant='outline'
                                                    onClick={() => {
                                                        setModal1(false);
                                                        setModal2(true);
                                                    }}
                                                >
                                                    Cancel Booking
                                                </Button>
                                                <Modal isOpen={modal1}
                                                    onClose={() => {
                                                        setModal1(false);
                                                        setModal2(false);
                                                    }}
                                                    isCentered
                                                >

                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>Edit Booking</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>

                                                        </ModalBody>

                                                        <ModalFooter>
                                                            <Button colorScheme="green" variant='solid'>
                                                                Confirm
                                                            </Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                                <Modal isOpen={modal2}
                                                    onClose={() => {
                                                        setModal1(false);
                                                        setModal2(false);
                                                    }}
                                                    isCentered
                                                >
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>Cancel Booking</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            Are you sure you want to cancel this booking?
                                                        </ModalBody>

                                                        <ModalFooter>
                                                            <Button colorScheme="red" variant='solid' mr='10px'
                                                                room_type={room_type}
                                                                index={index}
                                                                start_time={start_time}
                                                                end_time={end_time}
                                                                onClick={() => { cancelBooking({ room_type, room_number: index, start_time, end_time }) }}
                                                            >
                                                                Yes
                                                            </Button>

                                                            <Button colorScheme="gray" variant='solid'
                                                                onClick={() => {
                                                                    setModal1(false);
                                                                    setModal2(false);
                                                                }}
                                                            >
                                                                No
                                                            </Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>

                                            </Box>
                                        ) : (
                                            <Box>
                                                <Button colorScheme='green'
                                                    as={Link}
                                                    variant='outline'
                                                    to='/new'
                                                    textDecoration='none'
                                                >
                                                    Book Room
                                                </Button>
                                            </Box>
                                        )}

                                    </ButtonGroup>
                                </PopoverFooter>
                            </PopoverContent>
                        </Popover>
                    </Box>
                )
            })}
        </Box>
    )
}