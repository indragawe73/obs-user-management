import React from 'react';
import { User } from '../models/User';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const UserDetails: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image={`https://picsum.photos/seed/${user.id}/200/200`}
        title="picsum photos"
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
      
        <Typography variant="body2" color="text.secondary">{user.email}</Typography>
        <Typography variant="body2" color="text.secondary">{user.phone}</Typography>
        <Typography variant="body2" color="text.secondary">{user.website}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetails;