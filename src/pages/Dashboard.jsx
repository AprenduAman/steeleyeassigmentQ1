import {useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const totalOrders = mockData.results.length;

  const handleRowSelect = (row, timestamp, index) => {
    setSelectedOrderDetails({
      "Buy/Sell Indicator": row.executionDetails.buySellIndicator,
      "Order Status": row.executionDetails.orderStatus,
      "Order Type": row.executionDetails.orderType,
    });

    setSelectedOrderTimeStamps({
      "Order Received": timestamp[index].timestamps.orderSubmitted,
      "Order Status Updated": timestamp[index].timestamps.orderStatusUpdated,
      "Order Submitted": timestamp[index].timestamps.orderSubmitted,
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${totalOrders} orders`}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={[
              "GBP",
              "USD",
              "JPY",
              "EUR",
              "INR",
              "DKK",
              "KRW",
              "MXN",
              "CAD",
              "CHF",
              "PHP",
              "PLN",
              "ILS",
              "IDR",
            ]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List
          rows={mockData.results}
          timestamp={timestamps.results}
          currency={currency}
          search={searchText}
          onSelectRow={handleRowSelect}
        />
      </div>
    </div>
  );
};

export default Dashboard;
