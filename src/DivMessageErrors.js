import React from "react";

const DivMessageErrors = ({ errors }) => {
  return (
    <div
      className={
        (errors.name || errors.age) &&
        "alert alert-danger mt-2"
      }
    >
      {errors.name && (
        <span>Nome deve ser informado; </span>
      )}
      {errors.age && (
        <span>Idade deve ser informada; </span>
      )}
      {errors.type && (
        <span>Tipo de atendimento deve ser selecionado; </span>
      )}
    </div>
  );
};

export default DivMessageErrors;
