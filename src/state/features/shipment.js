import { createSlice } from '@reduxjs/toolkit';

export const shipmentSlice = createSlice({
    name: "UI-SHIPMENT",
    initialState: {
        shipment: {
            step: 0,
            loadingProgress: false,
            rates: null,
            isError: false,
            isSuccess: false,
            formData: null,
            guideData: [],
        },
        errors: {
            step: null,
            code: null,
            message: null,
        }
    },
    reducers: {
        nextStep: (state, action) => {
            state.shipment.step = action.payload;
        },
        updateRates: (state, action) => {
            state.shipment.rates = action.payload;
            state.shipment.step = 1;
        },
        onSuccess: (state, action) => {
            state.shipment.guideData = [...state.shipment.guideData, action.payload];
            state.shipment.rates = null;
            state.shipment.isSuccess = true;
            state.shipment.step = 2;
        },
        onError: (state, action) => {
            state.shipment.isError = true;
            state.errors = action.payload;
        },
        loadingProgress: (state, action) => {
            state.shipment.loadingProgress = action.payload;
        },
        update: (state, action) => {
            state.chipment = action.payload
        },
        clear: (state) => {
            state.chipment = null;
        }
    }
});

export const { update, clear, nextStep, updateRates, onSuccess, onError } = shipmentSlice.actions;
export const getShipment = (state) => state.ui.shipment;

export default shipmentSlice.reducer;