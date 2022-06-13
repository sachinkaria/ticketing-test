import InputInteger from "../components/input/InputInteger";
import React from "react";

const renderInputField = (ticket, markets, existingTypes, updateValue) => {
  return {
    tick: ticket.title,
    ...markets.data.reduce((all, current) => {
      const inputVal = existingTypes.filter(
        (item) => item.market_id === current.market_id
      );

      return {
        ...all,
        [current.market_id]: (
          <>
            <InputInteger
              field={`${current.market_id}-${ticket.ticket_id}`}
              value={inputVal && inputVal.length > 0 ? inputVal[0].value : null}
              change={updateValue}
            />
          </>
        ),
      };
    }, {}),
  };
};

const updateCellValue = (cell, value, finalData, setData) => {
  const market_id = cell.split("-")[0];
  const ticket_id = cell.split("-")[1];

  const foundRecord =
    finalData.filter(
      (entry) =>
        entry.ticket_id === ticket_id && entry.market_id === market_id
    ).length > 0;

  if (!foundRecord) {
    setData([...finalData, {ticket_id: ticket_id, market_id: market_id, value: value}]);
  } else if (value === 0 || value === null) {
    const data = finalData.filter((entry) => !(entry.ticket_id === ticket_id && entry.market_id === market_id));
    setData(data);
  } else {
    let finalArray = [...finalData];
    finalArray.find((entry) => entry.ticket_id === ticket_id && entry.market_id === market_id).value = value;
    setData(finalArray);
  }
};

const sendToAPI = (value) => {
  console.log('Sending to API... ', value)
};

export {renderInputField, updateCellValue, sendToAPI}
