import React, { useState } from "react";
import { shipmentService } from "../../services/shipment.service";
import { onSuccess, onError } from "../../state/features/shipment";

import { useDispatch } from "react-redux";

export const RateChip = ({
  id,
  attributes,
  better,
}) => {
  const { provider, days, total_pricing, currency_local } = attributes;
  const { postCreateLabel } = shipmentService();
  const dispatch = useDispatch();

  const createLabel = (id) => {
    postCreateLabel(id)
      .then((res) => {
        if (res?.data) {
          const {
            attributes: { status, error_message },
          } = res?.data;
          if (status === "ERROR") {
            const [val] = error_message;
            const { message: MessageError } = val;

            alert(MessageError);
          } else {
            dispatch(onSuccess(res.data));
            alert("Guia creada correctamente.");
          }
        } else {
          if (res?.code !== "label_exists" || "insufficient_funds") {
            alert("ha ocurrido un error:", res?.message);
          } else {
            alert("ha ocurrido un error, por favor intenta nuevamente.");
          }
        }
      })
      .catch((_) => {
        alert("ha ocurrido un error, por favor intenta nuevamente.");
      });
  };

  return (
    <div
      className={`w-full p-4 rounded-md hover:opacity-60 cursor-pointer hover:ring-2 ${better ? "bg-yellow-200" : "bg-gray-200"
        }`}
      onClick={() => createLabel(id)}
    >
      <p className="font-bold">{provider}</p>
      <p>Tiempo de entrega: {days} Días </p>
      <p>
        Precio total: $ {total_pricing} {currency_local}
      </p>
      {better && <p className="font-bold">Mejor opcion en tiempo y precio</p>}
    </div>
  );
};
