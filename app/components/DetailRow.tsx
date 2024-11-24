import React from "react";

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="details-label text-left">{label}</p>
    <p className="details-value text-left">{value}</p>
  </div>
);

export default DetailRow;
