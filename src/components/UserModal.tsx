import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../models/User';
import { addUser, updateUser } from '../store/userSlice';
import { Modal, TextField, Button, Grid, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const UserModal: React.FC<{ title: string; text: string; open: boolean; onClose: () => void; user?: User }> = ({ title, text, open, onClose, user }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [website, setWebsite] = useState(user ? user.website : '');
  const dispatch = useDispatch();
  
  const clear = () => {
    setName('');
    setEmail('');
    setPhone('');
    setWebsite('');
  };

  const handleSubmit = () => {
    const newUser = user
    ? { ...user, name, email, phone, website }
    : { id: Date.now(), name, email, phone, website } as User;
    user ? dispatch(updateUser(newUser)) : dispatch(addUser(newUser));
    clear();
    onClose();
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setWebsite(user.website);
    }
  }, [user]);
  
  return (
    <Modal open={open} onClose={onClose}>
      <div className='wrap-modal'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <div className='wrap-modal-icon'>
              <AssignmentIcon  sx={{  fontSize: 40, color: 'rgb(46,68,255)' }}/>
            </div>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ color: '#333', fontWeight: 'bold', textAlign: 'center', paddingTop: '20px' }}
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ color: '#333', fontSize: 14, opacity: .5, textAlign: 'center', paddingTop: '  0px'  }}
            >
              {text}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth  label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth  label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth  label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth  label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={8}></Grid>
          <Grid item xs={12} md={4}>
            <Button  variant="contained" className='btn-modal' startIcon={<CheckCircleOutlineIcon  />} onClick={handleSubmit}>
              {user ? 'Update User' : 'Add User'}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
    );
  };
  
  export default UserModal;