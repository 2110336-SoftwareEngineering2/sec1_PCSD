import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import "./BanTable.css";
import { Button } from "@material-ui/core";
import axios from "axios";

export const BanTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const data2 = axios
    .get("http://localhost:4000/User")
    .then((res) => console.log("res", res.data));

  console.log("data2", data2);

  const tableInstance = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* <hr /> */}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          const status = row.values.status;
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                if (cell.value === undefined && status == "Banned") {
                  return (
                    <td>
                      <Button
                        variant="contained"
                        style={{
                          padding: "0px",
                          fontSize: "11px",
                          color: "white",
                          backgroundColor: "#43BD48",
                          marginRight: "8px",
                          marginBottom: "3px",
                        }}
                      >
                        Unban
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          padding: "0px",
                          fontSize: "11px",
                          width: "5px",
                          marginBottom: "3px",
                        }}
                        disabled
                      >
                        Ban
                      </Button>
                      <hr className="ban_line" />
                    </td>
                  );
                } else if (cell.value === undefined && status == "Normal") {
                  return (
                    <td>
                      <Button
                        variant="contained"
                        style={{
                          padding: "0px",
                          fontSize: "11px",
                          marginRight: "8px",
                          marginBottom: "3px",
                        }}
                        disabled
                      >
                        Unban
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          padding: "0px",
                          fontSize: "11px",
                          backgroundColor: "#C53030",
                          width: "5px",
                          marginBottom: "3px",
                        }}
                      >
                        Ban
                      </Button>
                      <hr className="ban_line" />
                    </td>
                  );
                } else {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                      <hr className="normal_line" />
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
