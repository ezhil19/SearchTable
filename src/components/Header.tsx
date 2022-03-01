import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import db from "../data/db.json";
import { useState } from "react";
import { services } from "../data/services";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const TableRowStyle = styled(TableRow)`
  background-color: #313552;
`;

const BoxChangeStyle = styled(Box)`
  margin: 10px 10px;
  padding: 10px 20px;
  display: flex-wrap;
`;
const TableCellStyle = styled(TableCell)`
  color: #fff;
  font-family: "Varela Round", sans-serif;
  font-weight: 300;
`;

interface singleObj {
  service_label: string;
  service_type_id: number;
}
interface sampleObj {
  id: number;
  show_name: string;
  shot_name: string;
  service_type_id: number;
  date: string;
}
export default function Header() {
  const AllData = db;
  console.log("AllData", AllData);
  const [searchTerms, setSearchTerms] = useState("");
  const [value, setValue] = useState(null);
  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date("2020-01-19")
  // );

  // const handleDateChange = (date: any) => {
  //   setSelectedDate(date);
  // };

  const sample: sampleObj[] =
    value === null
      ? AllData
      : AllData.filter((item: any) => {
          const demo: any = value;
          return item.service_type_id === demo.service_type_id;
        });
  console.log("sample", sample);
  console.log("value", value);

  function compLabel(eachData: singleObj): string {
    let a: singleObj[] = services.filter(
      (item) => item.service_type_id === eachData.service_type_id
    );
    return a[0]["service_label"];
  }

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar
              style={{ display: "flex", justifyContent: "center", gap: 20 }}
            >
              {/* <JobRoleType /> */}
              <div style={{ width: 200 }}>
                <Autocomplete
                  onChange={(event, value: any) => {
                    setValue(value);
                  }}
                  id="free-solo-demo"
                  freeSolo
                  options={services}
                  getOptionLabel={(option) => option.service_label}
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => (
                    <TextField
                      {...params}
                      label="Job Role Type"
                      margin="normal"
                    />
                  )}
                />
              </div>

              <input
                style={{
                  width: "10rem",
                  height: "30px",
                  marginTop: "1em",
                  borderRadius: "5px",
                  borderColor: "#fff",
                }}
                type="text"
                placeholder="Search..."
                onChange={(event) => {
                  setSearchTerms(event.target.value.toLowerCase());
                }}
              />
              {/* <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    format="mm-dd-yyy"
                    margin="normal"
                    id="date-picker"
                    label="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                  />
                </MuiPickersUtilsProvider>
              </div> */}
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div>
        <BoxChangeStyle>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label=" dense table">
              <TableHead>
                <TableRowStyle>
                  <TableCellStyle>ID</TableCellStyle>
                  <TableCellStyle>Show Name</TableCellStyle>
                  <TableCellStyle>Shot Name</TableCellStyle>
                  <TableCellStyle>Service Label</TableCellStyle>
                  <TableCellStyle>Date</TableCellStyle>
                </TableRowStyle>
              </TableHead>
              <TableBody>
                {sample
                  .filter((eachData: sampleObj) => {
                    if (!searchTerms) {
                      return true;
                    } else {
                      return Object.values(eachData).some((res) => {
                        return res
                          .toString()
                          .toLowerCase()
                          .includes(searchTerms);
                      });
                    }

                    // console.log("each data", eachData);
                    // if (searchTerms === "") {
                    //   return eachData;
                    // } else if (
                    //   eachData.show_name
                    //     .toLowerCase()
                    //     .includes(searchTerms.toLowerCase())
                    // ) {
                    //   return eachData;
                    // } else if (
                    //   eachData.shot_name
                    //     .toLowerCase()
                    //     .includes(searchTerms.toLowerCase())
                    // ) {
                    //   return eachData;
                    // } else if (
                    //   eachData.date
                    //     .toLowerCase()
                    //     .includes(searchTerms.toLowerCase())
                    // ) {
                    //   return eachData;
                    // }
                  })
                  .map((eachData: any) => (
                    <TableRow key={eachData.id}>
                      <TableCell>{eachData.id}</TableCell>
                      <TableCell>{eachData.show_name}</TableCell>
                      <TableCell>{eachData.shot_name}</TableCell>
                      <TableCell>{compLabel(eachData)}</TableCell>
                      <TableCell>{eachData.date}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </BoxChangeStyle>
      </div>
    </>
  );
}

//
