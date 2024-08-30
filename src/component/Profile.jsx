import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Profile</Typography>
        {user && (
          <>
            <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="body1"><strong>Birth-Date:</strong> {user.birthdate}</Typography>
            <Typography variant="body1"><strong>Mobile:</strong> {user.mobile}</Typography>
            <Typography variant="body1"><strong>Gender:</strong> {user.gender}</Typography>
            <Typography variant="body1"><strong>Father Name:</strong> {user.fatherName}</Typography>
            <Typography variant="body1"><strong>Mother Name:</strong> {user.motherName}</Typography>
            <Typography variant="body1"><strong>Spouse Name:</strong> {user.sName}</Typography>
            <Typography variant="body1"><strong>Children Name:</strong> {user.cName}</Typography>
            {user.additionalChildren && (
              <Typography variant="body1"><strong>child 1 :</strong> {user.additionalChildren}</Typography>
            )}
            <Typography variant="body1"><strong>Address:</strong> {user.address}</Typography>
            <Typography variant="body1"><strong>City:</strong> {user.city}</Typography>
            <Typography variant="body1"><strong>pin:</strong> {user.pin}</Typography>
            <Typography variant="body1"><strong>Country:</strong> {user.country}</Typography>
            <Typography variant="body1"><strong>Aadhar Number:</strong> {user.aadhar}</Typography>
            <Typography variant="body1"><strong>Occupation:</strong> {user.job}</Typography>
            <Typography variant="body1"><strong>Salary:</strong> {user.salary}</Typography>
            <Typography variant="body1"><strong>Education:</strong> {user.education}</Typography>
            {user.additionalEducation && (
              <Typography variant="body1"><strong>Additional Education:</strong> {user.additionalEducation}</Typography>
            )}
            {user.imageUrl && (
              <Box sx={{ mt: 2 }}>
                <img src={user.imageUrl} alt="User" width="100%" />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
