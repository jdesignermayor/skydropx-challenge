import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./features/shipment";

export default configureStore({
    reducer: {
        ui: shipmentReducer
    }
})