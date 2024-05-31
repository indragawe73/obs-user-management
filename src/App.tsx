import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import UserModal from "./components/UserModal";
import { Container, Button, Typography, Grid, Hidden, Box } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { User } from "./models/User";
import './App.css';
import myImage from './assets/img/loading.svg'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [beforeStart, setBeforeStart] = useState(true);
  
  const mdTitle = 'Update list data';
  const txTitle = 'Please input all the data before submit';

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };
  
  const handleShowUser = (user: User) => {
    setSelectedUser(user);
  };
  
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setBeforeStart(false);
    }, 2000);
  }, []);

  return (
    <div>
      { beforeStart ? 
        <div className="wrap-beforeStart">
          <img src={myImage} alt="description" />
        </div>
      :
        <>
          <div className="wrap-header">
            <svg className="wrap-logo" xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 36 32" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z" fill="#007FFF"></path>
            </svg>
            <Typography variant="h5" color={'#1976D2'} >
              User Management
            </Typography>
          </div>
          <Container sx={{ marginTop: '5px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
              </Grid>
              <Hidden smUp>
                <Grid item xs={12} sx={{ marginBottom: '10px' }}>
                  {selectedUser && <UserDetails user={selectedUser} />}
                </Grid> 
              </Hidden>
              <Grid item xs={12} md={7} >
                <div style={{ background: '#fff', borderRadius: '4px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', gap: 1 }}>
                    <Button variant="contained" color="primary" startIcon={<AddCircleIcon  />} onClick={handleAddUser}>
                      Add User
                    </Button>
                  </Box>
                  <UserList onSelectUser={handleShowUser} onEditUSer={handleEditUser} />
                </div>
              </Grid>
              <Hidden smDown>
                <Grid item md={4}>
                  {selectedUser && <UserDetails user={selectedUser} />}
                </Grid> 
              </Hidden>
              <Grid item xs={2} sm={1} md={2}></Grid>
              <Grid item xs={8} md={8}>
                <UserModal
                  title={mdTitle} 
                  text={txTitle}
                  open={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  user={selectedUser || undefined}
                  />
              </Grid>
              <Grid item xs={2} sm={1} md={2}></Grid>
            </Grid>
          </Container>
        </>
      }
    </div>
  );
};

export default App;