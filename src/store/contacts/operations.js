import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../auth/operations';

export const fetchContactsThunk = createAsyncThunk(
  'fetchContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await userApi.get('/contacts');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'addContact',
  async (contact, thunkAPI) => {
    try {
      const data = await userApi.post('/contacts', contact);
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Contact is exist');
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'deleteContact',
  async (id, thunkAPI) => {
    try {
      await userApi.delete(`/contacts/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);