import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'

export default function Timestamp() {    
    return (
        <Box
            display='flex'
            justifyContent={'space-between'}
            alignItems={'center'}

        >
            Day
            <NumberInput maxW={20} defaultValue={1} min={1} max={31} id="checkInHr">
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            Month
            <NumberInput maxW={20} defaultValue={1} min={1} max={12} id="checkInHr">
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            Year
            <NumberInput maxW={40} defaultValue={2023} min={2023} max={2023} id="checkInHr">
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </Box>
    )
}