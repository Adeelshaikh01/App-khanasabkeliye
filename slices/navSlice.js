import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentLocation: null,
  nearestLocation: null,
  category: "Monthly Ration",
  uID:null,
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setCurrentLocation: (state,action) =>{
        state.currentLocation = action.payload;
    },
    setNearestLocation: (state,action) =>{
        state.nearestLocation = action.payload;
    },
    setCategory: (state,action) =>{
        state.category= action.payload
    },
    setUid: (state,action) =>{
      state.uID= action.payload
  }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentLocation, setNearestLocation, setCategory,setUid } = navSlice.actions

export const selectCurrentLocation = (state) => state.nav.currentLocation
export const selectNearestLocation = (state) => state.nav.nearestLocation
export const selectCategory = (state) => state.nav.category
export const selectUID = (state) => state.nav.uID

export default navSlice.reducer