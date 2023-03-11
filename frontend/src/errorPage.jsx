import { useRouteError } from "react-router-dom";
import {
    Box,
    Heading,
    Text,
    Center
} from "@chakra-ui/react";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Box
            as="section"
            py={50}
            px={20}
        >
            <Heading>Oops!</Heading>
            <Text>Sorry, an unexpected error has occurred.</Text>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </Box>
    );
}