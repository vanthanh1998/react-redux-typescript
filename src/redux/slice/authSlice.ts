import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callFetchAccount } from "../../config/api";

// First, create the thunk
export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async () => {
    const response = await callFetchAccount();
    return response.data;
  }
);

interface IState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshToken: boolean;
  errorRefreshToken: string;
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
  };
  activeMenu: string;
}

const initialState: IState = {
  isAuthenticated: false,
  isLoading: true,
  isRefreshToken: false,
  errorRefreshToken: "",
  user: {
    _id: "",
    email: "",
    name: "",
    role: "",
  },

  activeMenu: "home",
};

export const authSlice = createSlice({
  name: "account",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user._id = action?.payload?._id;
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.role = action?.payload?.role;
    },
    setLogoutAction: (state, action) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = {
        _id: "",
        email: "",
        name: "",
        role: "",
      };
    },
    setRefreshTokenAction: (state, action) => {
      state.isRefreshToken = action.payload?.status ?? false;
      state.errorRefreshToken = action.payload?.message ?? "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAccount.pending, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = true;
      }
    });

    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user._id = action?.payload?.user?._id;
        state.user.email = action.payload.user?.email;
        state.user.name = action.payload.user?.name;
        state.user.role = action.payload.user?.role;
      }
    });

    builder.addCase(fetchAccount.rejected, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = false;
      }
    });
  },
});

export const {
  setActiveMenu,
  setUserLoginInfo,
  setLogoutAction,
  setRefreshTokenAction,
} = authSlice.actions;

export default authSlice.reducer;
