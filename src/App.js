import React, {useState, useEffect} from "react";
import "./app.css";
import View from "./components/layout/View";
import Heading from "./components/layout/Heading";
import useMarkets from "./hooks/useMarkets";
import Table from "./components/layout/Table";
import useTickets from "./hooks/useTickets";
import ActionCTA from "./components/action/ActionCTA";
import useData from "./hooks/useData";
import {renderInputField, updateCellValue, sendToAPI} from './libs/helpers'

const App = () => {
  const markets = useMarkets();
  const tickets = useTickets();
  const initialData = useData();

  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    if (initialData.isLoaded) {
      setFinalData(initialData.data);
    }
  }, [initialData]);

  const onChange = (cell, value) => {
    updateCellValue(cell, value, finalData, setFinalData)
  };

  const columnData =
    [{
      key: "tick",
      label: "TICKET",
    }].concat(markets.data.map((market) => ({
      key: market.market_id,
      label: market.title,
    })));

  const tableData = tickets.data.map((ticket) => {
    const ticketItem = finalData.filter((item) => item.ticket_id === ticket.ticket_id);
    return renderInputField(ticket, markets, ticketItem, onChange)
  });

  return (
    <View>
      <Heading level={1} title={"Pricing Matrix"}/>
      {(initialData.isLoaded && markets.isLoaded && tickets.isLoaded) ? (
        <>
          <Table
            columns={columnData}
            data={tableData}
          />
          <ActionCTA change={() => sendToAPI(finalData)}>
            Save
          </ActionCTA>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </View>
  );
};

export default App;
