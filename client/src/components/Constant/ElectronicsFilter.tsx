import { Box } from "@mui/material";
import React from "react";
import SideBarItem from "../List/SideBarItem";
import filterData from "../../filterData.json";

export default function ElectronicFilter() {
  const {
    processors,
    displaySize,
    memorySize,
    hardDriveSize,
    graphicDetails,
    operatingSystem,
    performance,
  } = filterData;

  return (
    <>
      <Box sx={{ p: 1.5, boxShadow: "0 0 5px #e5e5e5", mt: 2 }}>
        <SideBarItem
          title="Processor "
          listData={processors}
          placeholderText="Search by processor"
        />
      </Box>
      <Box sx={{ p: 1.5, boxShadow: "0 0 5px #e5e5e5", mt: 2 }}>
        <SideBarItem
          title="Graphic Card"
          listData={graphicDetails}
          placeholderText="Search by graphic card"
        />
      </Box>
      <Box sx={{ p: 1.5, boxShadow: "0 0 5px #e5e5e5", mt: 2 }}>
        <SideBarItem
          title="Operating System"
          listData={operatingSystem}
          placeholderText="Search by operating system"
        />
      </Box>
      <Box sx={{ p: 1.5, boxShadow: "0 0 5px #e5e5e5", mt: 2 }}>
        <SideBarItem
          title="Ram"
          listData={memorySize}
          placeholderText="Search by memory size"
        />
      </Box>
      <Box sx={{ p: 1.5, boxShadow: "0 0 5px #e5e5e5", mt: 2 }}>
        <SideBarItem
          title="Hard Drive"
          listData={hardDriveSize}
          placeholderText="Search by hard drive size"
        />
      </Box>
      <Box sx={{ p: 1.5, boxShadow: "0 0 5px #e5e5e5", mt: 2 }}>
        <SideBarItem
          title="Display Size"
          listData={displaySize}
          placeholderText="Search by screen size"
        />
      </Box>
      <Box sx={{ p: 1.5, boxShadow: "0 0 5px #e5e5e5", mt: 2 }}>
        <SideBarItem
          title="Speed"
          listData={performance}
          placeholderText="Search by performance"
        />
      </Box>
    </>
  );
}
