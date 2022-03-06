import React from "react";

import Link from "@mui/material/Link";
import DownloadIcon from "@mui/icons-material/Download";

export const Guide = (data) => {
  const {
    id,
    attributes: {
      tracking_number,
      created_at,
      tracking_url_provider,
      label_url,
    },
  } = data;

  return (
    <div className="w-full grid gap-2 p-3 bg-gray-100 rounded-md">
      <p>
        #tracking: <span className="font-bold">{tracking_number}</span>
      </p>
      <p>Fecha de creacion: {created_at} </p>
      <div className="grid md:flex gap-2">
        <Link
          target="_blank"
          rel="noopener"
          variant="contained"
          className="border p-2 rounded-md border-black"
          href={label_url}
        >
          <DownloadIcon />
          Descargar guia en PDF
        </Link>
        <Link
          target="_blank"
          rel="noopener"
          variant="outlined"
          className="border p-2 rounded-md"
          underline="none"
          href={tracking_url_provider}
        >
          Ver guia mediante el proveedor
        </Link>
      </div>
    </div>
  );
};
