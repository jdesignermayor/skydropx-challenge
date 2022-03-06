import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import citiesList from "../../data/cities";

export const PostalCodeField = ({ name, label, formProps }) => {
  return (
    <>
      <Autocomplete
        disablePortal
        style={{ width: "100%" }}
        id="combo-box-demo"
        name={name}
        options={citiesList}
        onChange={(e, value) => {
          formProps.setFieldValue(
            name,
            value !== null ? value : formProps.initialValues.origenData
          );
        }}
        required
        renderInput={(params) => (
          <TextField {...params} label={label} name={name} required />
        )}
      />
    </>
  );
};
