import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUsers } from '../store/userSlice';
import { User } from '../models/User';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  CircularProgress,
  Typography,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

const UserList: React.FC<{
  onEditUSer: (user: User) => void,
  onSelectUser: (user: User) => void }
  > = ({ onSelectUser, onEditUSer }) => {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const url = 'https://jsonplaceholder.typicode.com/users';
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        if (response.status !== 200 && response.status !== 204) {
          throw new Error(`Unexpected status code: ${response.status}`);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        dispatch(setUsers(response.data));
      } catch (error: any) {
        // setError(error.message || 'Error fetching data');
        if(error.message) {
        } else {
          alert('Error fetching data')
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
    fetchUsers();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className='wrap-loading'>
          <CircularProgress />
          <Typography>Loading . . .</Typography>
        </div>
      ) : (
      <List>
        {users.map((user) => (
          <ListItem
          key={user.id}
          secondaryAction={
            <IconButton aria-label="delete" onClick={() => onEditUSer(user)}>
              <EditNoteIcon/>
            </IconButton>
          }
          onClick={() => onSelectUser(user)} 
          button={true}>
            <Avatar src={`https://picsum.photos/seed/${user.id}/200/200`} />
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
      )}
    </>
  );
};

export default UserList;