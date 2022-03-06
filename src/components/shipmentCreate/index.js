import React, { useState, useEffect } from "react";

import { updateRates } from "../../state/features/shipment";
import { useDispatch } from "react-redux";

import { Formik } from "formik";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { PostalCodeField } from "../postalCodeField/index";
import { shipmentService } from "../../services/shipment.service";
import { PageTitle } from "../pageTitle";

export const ShipmentCreate = () => {
  const { postCreateShipment, INITIAL_VALUES } = shipmentService();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const getNewRateList = (ratesList) => {
    const listOFPrices = ratesList.map((obj) => {
      return {
        id: obj.id,
        value: obj.attributes.amount_local,
        days: obj.attributes.days,
      };
    });

    const listOfBetterOption = listOFPrices
      .sort((a, b) => {
        return Number.parseInt(a.value) - Number.parseInt(b.value);
      })
      .sort((a, b) => {
        return Number.parseInt(a.days) - Number.parseInt(b.days);
      });

    const betterOption = listOfBetterOption[0];
    return betterOption;
  };

  const handleClose = () => {
    setIsError(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isError}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Error al cotizar, por favor los datos.
        </Alert>
      </Snackbar>

      <Formik
        enableReinitialize={false}
        initialValues={INITIAL_VALUES}
        onSubmit={(values, actions) => {
          setIsLoading(true);
          postCreateShipment(values)
            .then(({ id, included }) => {
              const rates = included
                .filter((rates) => rates.type === "rates")
                .map((rate) => {
                  return {
                    ...rate,
                    better: false,
                  };
                });

              const betterOption = getNewRateList(rates);

              const newRates = rates?.map((rate) => {
                if (rate?.id === betterOption.id) {
                  return { ...rate, better: true };
                } else {
                  return { ...rate, better: false };
                }
              });

              dispatch(updateRates(newRates));
            })
            .catch((err) => {
              setIsError(true);
            })
            .finally(() => setIsLoading(false));
        }}
      >
        {(props) => (
          <form
            onSubmit={props.handleSubmit}
            className="flex flex-col gap-5 items-start px-4 pt-5"
          >
            <PageTitle
              title="Crear guía"
              subtitle="Selecciona la ciudad origen y destino"
            />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <PostalCodeField
                label="Ciudad origen"
                name="origenData"
                formProps={props}
              />
              <PostalCodeField
                label="Ciudad destino"
                name="destinyData"
                formProps={props}
              />
            </div>

            <p>Selecciona las medidas</p>
            <div className="grid grid-cols-2 gap-2 w-full">
              <Tooltip title="Medidas en centimetros del largo de caja" arrow>
                <TextField
                  name="length"
                  label="Largo (CM)"
                  className="w-full"
                  type="number"
                  onChange={props.handleChange}
                  required
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </Tooltip>
              <Tooltip title="Medidas en centimetros del ancho de caja" arrow>
                <TextField
                  name="width"
                  label="Ancho (CM)"
                  className="w-full"
                  type="number"
                  onChange={props.handleChange}
                  required
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </Tooltip>
              <Tooltip title="Medidas en centimetros del alto de caja" arrow>
                <TextField
                  name="height"
                  label="Alto (CM)"
                  className="w-full"
                  type="number"
                  onChange={props.handleChange}
                  required
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </Tooltip>
              <Tooltip title="Medidas en kilogramos del peso de la caja" arrow>
                <TextField
                  name="weight"
                  label="Peso (KG)"
                  className="w-full"
                  type="number"
                  onChange={props.handleChange}
                  required
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Numero total de paquetes a enviar" arrow>
                <TextField
                  name="totalOfPackages"
                  label="Cantidad de paquetes"
                  className="w-full"
                  type="number"
                  onChange={props.handleChange}
                  required
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </Tooltip>
            </div>

            <Button
              disableElevation={true}
              type="submit"
              variant="contained"
              disabled={isLoading}
              className="w-full"
              elevation={0}
            >
              {isLoading ? "Cotizando servicio..." : "Cotizar servicio"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
