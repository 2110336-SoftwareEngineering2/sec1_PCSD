import React, { useMemo, useEffect, useState } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import "./BanTable.css";
import IconButton from "@material-ui/core/IconButton";

import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";

export const BanTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/User")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => MOCK_DATA, []);
  // const data = dataFromBack;
  const tableInstance = useTable({
    columns,
    data,
  });
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleBan = async (data) => {
    console.log(data);
    await axios.post("http://localhost:4000/Admin/ban", data).then((res) => {
      console.log(res);
    });
    // await sleep(250);
    axios
      .get("http://localhost:4000/User")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("err", err));
  };

  const deleteUser = async (data) => {
    // console.log(data._id);
    // await axios
    //   .delete("http://localhost:4000/user/account/:id", data)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log("err", err));
  };

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
          const status = row.values.banStatus;
          const deleteButton = false;
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                if (cell.column.Header === "Ban/Delete" && status === true) {
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
                        onClick={() => handleBan(row.original)}
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
                      <IconButton aria-label="delete">
                        <CancelIcon />
                      </IconButton>
                      {/* <hr className="ban_line" /> */}
                    </td>
                  );
                } else if (
                  cell.column.Header === "Ban/Delete" &&
                  status === false
                ) {
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
                        onClick={() => handleBan(row.original)}
                      >
                        Ban
                      </Button>
                      <IconButton aria-label="delete">
                        <CancelIcon onClick={() => deleteUser(row.original)} />
                      </IconButton>
                      {/* <hr className="ban_line" /> */}
                    </td>
                  );
                } else {
                  if (cell.value === true) {
                    return (
                      <td>
                        <h4>Banned</h4>
                        {/* <hr className="normal_line" /> */}
                      </td>
                    );
                  } else if (cell.value === false) {
                    return (
                      <td>
                        <h4>Normal</h4>
                        {/* <hr className="normal_line" /> */}
                      </td>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render("Cell")}
                        {/* <hr className="normal_line" /> */}
                      </td>
                    );
                  }
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
