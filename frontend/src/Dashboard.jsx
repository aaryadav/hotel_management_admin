import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Link } from 'react-router-dom';

import { Box, Text } from '@chakra-ui/react';

import { Radio, RadioGroup } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import RoomBox from './RoomBox.jsx';

export default function Dashboard() {
    const [rooms, setRooms] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetch('http://localhost:3000/')
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setRooms(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {

                }
            })
    }, []);

    rooms.forEach(room => {
        room.booked_rooms.forEach(booking => { 
            booking.start_time = booking.start_time.toString();
            booking.end_time = booking.end_time.toString();
        });
    });

    const [type, setType] = useState('all');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent={'space-between'}
                h='250px'
            >
                <Text fontSize='xl'>
                    Filter by:
                </Text>
                <Box>
                    <Text fontSize='xl'>
                        Room Type
                    </Text>
                    <RadioGroup onChange={setType} value={type}>
                        <Stack direction='row'>
                            <Radio value='all'>All</Radio>
                            <Radio value='A'>A - Suite</Radio>
                            <Radio value='B'>B - Deluxe</Radio>
                            <Radio value='C'>C - Standard</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
                <Box>
                    <Text fontSize='xl'>
                        Start Time
                    </Text>
                    <Box>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeInput />
                    </Box>
                    <Text fontSize='xl'>
                        End Time
                    </Text>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showTimeInput />
                </Box>
            </Box>
            <Box mt={8}>
                {
                    rooms.map(room => {
                        const { room_type, room_count, booked_rooms } = room;
                        {/* view only rooms of type {type} */ }
                        const isBooked = booked_rooms.some(booking => {
                            return (
                                (startDate >= booking.start_time && startDate <= booking.end_time) ||
                                (endDate >= booking.start_time && endDate <= booking.end_time)
                            )
                        });
                        if (type !== 'all' && room_type == type && !isBooked) {                            
                            return (
                                <>
                                    <RoomBox room_type={room_type} room_count={room_count} booked_rooms={booked_rooms} />
                                </>
                            )
                        } else if (type === 'all') {
                            return (
                                <>
                                    <RoomBox room_type={room_type} room_count={room_count} booked_rooms={booked_rooms} />
                                </>
                            )
                        }
                    })
                }
            </Box>
        </>
    )
}
