import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RateChip } from "../rateChip/index";
import { getShipment } from "../../state/features/shipment";
import { PageTitle } from "../pageTitle";

export const ShipmentRateList = () => {
  const { rates } = useSelector(getShipment);

  return (
    <div className="flex flex-col gap-5 items-start px-4 pt-5">
      <PageTitle
        title="Cotizar servicio"
        subtitle="Selecciona el proveedor de preferencia"
      />

      <div className="grid md:grid-cols-2 gap-4 w-full">
        {rates?.length &&
          rates.map((props) => {
            return <RateChip key={props.id} {...props} />;
          })}
      </div>
    </div>
  );
};
