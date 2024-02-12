import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorImage from '../assets/Error.jpg';
import { Box } from '@mui/material';

export default function ErrorPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Set a timeout to show the alert after 2 seconds
        const timeoutId = setTimeout(() => {
            alert("You seem lost. Let's get you home 🙃");
            
            // Redirect to the /home after selecting "OK" on alert
            navigate('/home');
        }, 2000);

        // Cleanup timeout on component unmount
        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <img src={ErrorImage} alt="Error" />
        </Box>
    );
}


