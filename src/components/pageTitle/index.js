import React from "react";

export const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="w-full grid gap-1">
      <p className="text-4xl font-bold">{title}</p>
      <p>{subtitle}</p>
    </div>
  );
};
