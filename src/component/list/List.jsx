import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

const List = ({ rows, timestamp, currency, search, onSelectRow }) => {
  const isSearchEmpty = search === "";

  const filteredRows = isSearchEmpty
    ? rows
    : rows.filter((row) =>
        row["&id"].toLowerCase().includes(search.toLowerCase())
      );

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {currency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {filteredRows.map((row, index) => (
          <ListRow key={index} onClick={() => onSelectRow(row,timestamp,index)}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{timestamp[index].timestamps.orderSubmitted}</ListRowCell>
            <ListRowCell>
              {row.bestExecutionData.orderVolume[currency]}
            </ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
