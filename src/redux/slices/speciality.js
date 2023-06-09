import { createSlice } from "@reduxjs/toolkit";

const specialtieslice = createSlice({
    name: 'speciality',
    initialState: {
        specialties: null,
        specialityData: null,
        categoryData: null
    },
    reducers: {
        setSpecialties(state, action) {
            state.specialties = action.payload;
        },
        addspeciality(state, action) {
            if (state.specialties === null) {
                state.specialties = [];
            }
            state.specialties.push(action.payload);
        },
        updatespeciality(state, action) {
            const index = state.specialties.findIndex(speciality => speciality._id === action.payload._id);
            state.specialties[index] = action.payload;
        },
        changespecialityState(state, action) {
            const updatedspeciality = action.payload;
            const existingspecialityIndex = state.specialties.findIndex(
                (speciality) => speciality._id === updatedspeciality._id
            );
            if (existingspecialityIndex !== -1) {
                state.specialties[existingspecialityIndex] = updatedspeciality;
            }
        },
        deletespeciality(state, action) {
            const deletedspecialityId = action.payload || action;
            return {
                ...state,
                specialties: state.specialties.filter(speciality => speciality._id !== deletedspecialityId)
            };
        },
        setspecialityData(state, action) {
            state.specialityData = action.payload;
        },
        setCategoryData(state, action) {
            state.categoryData = action.payload;
        }
    }
});

export default specialtieslice;