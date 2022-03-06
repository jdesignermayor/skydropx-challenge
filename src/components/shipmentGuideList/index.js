import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShipment } from "../../state/features/shipment";
import { nextStep } from "../../state/features/shipment";

import Button from "@mui/material/Button";
import truckIcon from "../../assets/truck.png";
import { PageTitle } from "../pageTitle/index";
import { Guide } from "../guide/index";

export const ShipmentGuideList = () => {
  const { guideData } = useSelector(getShipment);

  const dispatch = useDispatch();

  const goCreateShipment = () => {
    dispatch(nextStep(0));
  };

  return (
    <div className="flex flex-col gap-5 items-start px-4 pt-5 w-full">
      <PageTitle
        title="Listado de guías"
        subtitle="Descarga y observa el estado del envio"
      />
      {guideData?.length ? (
        <div className="grid w-full divide-y divide-solid gap-2">
          <Button variant="contained" className="w-full" onClick={() => goCreateShipment()} elevation={0}>
            Crear nueva guía
          </Button>
          {guideData?.map((props, index) => {
            return <Guide key={index} {...props} />;
          })}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <img src={truckIcon} alt="no hay guías" width="200"></img>
          <p className="font-bold">No hay guías</p>
          <p className="text-base">Debes crear una guía previamente</p>
        </div>
      )}
    </div>
  );
};
