import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import DatePicker from "react-datepicker";

import { Box, Center } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import Timestamp from "./Timestamp";

export default function Book() {
    const [email, setEmail] = useState("");
    const [roomNumber, setRoomNumber] = useState();
    const [type, setType] = useState("A");
    const [price, setPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const { isOpen, onOpen, onClose } = useDisclosure()

    const generateInvoice = () => {
        let p = 0;
        let hrs = (endDate - startDate) / 1000 / 60 / 60;

        if (type === "A") {
            p = 100;
            setPrice(p);
        } else if (type === "B") {
            p = 80;
            setPrice(p);
        } else if (type === "C") {
            p = 50;
            setPrice(p);
        }

        let totalCost = hrs * p;
        totalCost = totalCost.toFixed(2);
        setTotal(totalCost);
    }

    const bookRoom = () => {
        const response = fetch('http://localhost:3000/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                roomNumber: roomNumber,
                type: type,
                price: price,
                startDate: startDate,
                endDate: endDate
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Box
            as="section"
            display="flex"
            flexDirection={"row"}
            justifyContent="space-between"
            h="500px"
            px={8}
        >
            <Box
                as="section"
                display="flex"
                flexDirection={"column"}
                justifyContent="space-between"
                h="500px"
                w="450px"
            >
                <Box>
                    Email
                    <Input placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box>
                    Room Type
                    <RadioGroup onChange={setType} value={type}>
                        <Stack direction='row'>
                            <Radio value='A'>A - Suite</Radio>
                            <Radio value='B'>B - Deluxe</Radio>
                            <Radio value='C'>C - Standard</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
                <Box>
                    Room Number
                    <Input placeholder="Room Number"
                        onChange={(e) => setRoomNumber(e.target.value)}
                    />
                </Box>
                <Box>
                    Check In Date:
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeInput />
                </Box>
                <Box>
                    Check Out Date:
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showTimeInput />
                </Box>

                <Button
                    onClick={() => {
                        generateInvoice();
                        onOpen();
                    }}
                >
                    Generate Invoice
                </Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Invoice</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Box>
                                Email: {email}
                            </Box>
                            <Box>
                                Room Number: {roomNumber}
                            </Box>
                            <Box>
                                Type: {type}
                            </Box>
                            <Box>
                                Check In Time: {startDate.toDateString()}
                            </Box>
                            <Box>
                                Check Out Time: {endDate.toDateString()}
                            </Box>
                            <Box>
                                Price: {total}
                            </Box>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green'
                            onClick={() => {
                                bookRoom();
                            }}
                        >
                            Confirm Booking
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    );
}