import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from './operations';

const initialState = {
  contacts: [],
  filter: '',
  loading: false,
  error: null,
};

export const slice = createSlice({
  name: 'phoneBook',
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
        state.contacts = payload;
        state.loading = false;
      })
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
        state.loading = false;
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(item => item.id !== payload);
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.pending,
          addContactThunk.pending,
          deleteContactThunk.pending
        ),
        (state, action) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.rejected,
          addContactThunk.rejected,
          deleteContactThunk.rejected
        ),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});
export const { setFilter } = slice.actions;
export const phoneBookReducer = slice.reducer;