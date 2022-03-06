import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getShipment } from "../../state/features/shipment";
import { nextStep } from "../../state/features/shipment";

import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

import { ShipmentCreate } from "../shipmentCreate/index";
import { ShipmentRateList } from "../shipmentRateList/index";
import { ShipmentGuideList } from "../shipmentGuideList/index";

const STEPS_LIST = [
  "Cotizar envio",
  "Eleccion del servicio",
  "Listado de guías",
];

export const Shipment = () => {
  const { step, rates } = useSelector(getShipment);
  const [isDisabledService, setIsDisabledService] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!rates) {
      setIsDisabledService(true);
    } else {
      setIsDisabledService(false);
    }
  }, [rates]);

  const handleNext = (param) => {
    if (isDisabledService && param === 1) {
    } else {
      dispatch(nextStep(param));
    }
  };

  const displayForm = (param) => {
    switch (param) {
      case 0:
        return <ShipmentCreate />;

      case 1:
        return <ShipmentRateList />;

      case 2:
        return <ShipmentGuideList />;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={step}>
          {STEPS_LIST?.map((label, index) => {
            return (
              <Step key={index} className="cursor-pointer">
                <StepLabel onClick={() => handleNext(index)}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {displayForm(step)}
    </div>
  );
};
