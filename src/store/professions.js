import { createSlice } from "@reduxjs/toolkit";
import isOutDated from "../utils/isOutDated";
import ProfessionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceved, professionsRequestFiled } = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutDated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await ProfessionService.fetchAll();
            dispatch(professionsReceved(content));
        } catch (error) {
            dispatch(professionsRequestFiled(error.message));
        }
    }
};
export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;
export const getProfessionsById = (professionId) => state => {
    if (state.professions.entities) {
        for (const profession of state.professions.entities) {
            if (profession._id === professionId) {
                return profession;
            }
        }
    };
    return [];
};

export default professionsReducer;
