import { Box } from '@mui/system';
import React from 'react'
import { useLocation } from 'react-router-dom';
import "../App.css"

const ShowRegistration = () => {

    const location = useLocation();

    return (
        <>
            <div className="container">
                <Box className='badge bg-success my-4'>
                    <h1 className='fs-3'>Your Students Details</h1>
                </Box>
                <h2>
                    <span className='leftSide'>
                        First Name:
                    </span>
                    <span className='rightSide'>
                        {location.state.firstName}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Father Name:
                    </span>
                    <span className='rightSide'>
                        {location.state.fatherName}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Course:
                    </span>
                    <span className='rightSide'>
                        {location.state.course}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Student Contact:
                    </span>
                    <span className='rightSide'>
                        {location.state.stuContact}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Student CNIC:
                    </span>
                    <span className='rightSide'>
                        {location.state.stuCnic}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Email:
                    </span>
                    <span className='rightSide'>
                        {location.state.email}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Password:
                    </span>
                    <span className='rightSide'>
                        {location.state.password}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Date of Birth:
                    </span>
                    <span className='rightSide'>
                        {location.state.dob}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Address:
                    </span>
                    <span className='rightSide'>
                        {location.state.address}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                    Course:
                    </span>
                    <span className='rightSide'>
                        {location.state.course}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                    Qualification:
                    </span>
                    <span className='rightSide'>
                        {location.state.qualification}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                    City:
                    </span>
                    <span className='rightSide'>
                        {location.state.city}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                    Institute:
                    </span>
                    <span className='rightSide'>
                        {location.state.institute}
                    </span>
                </h2>
                
            </div>
         
        </>
    )
}

export default ShowRegistration;