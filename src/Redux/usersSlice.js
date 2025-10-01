import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  return res.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    data: [],
    error: null,
    search: '',
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    addUser: {
      reducer(state, action) {
        state.data.unshift(action.payload);
      },
      prepare(user) {
        return { payload: { id: nanoid(), ...user } };
      }
    },
    updateUser(state, action) {
      const idx = state.data.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state.data[idx] = action.payload;
    },
    deleteUser(state, action) {
      state.data = state.data.filter(u => u.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      });
  }
});

export const { setSearch, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
