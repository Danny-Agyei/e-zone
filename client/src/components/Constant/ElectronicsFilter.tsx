import { Box } from "@mui/material";
import React from "react";
import SideBarItem from "../List/SideBarItem";

const processors = [
  "2.6 Ghz Apple_ci5",
  "Intel Pentium Silver N5000",
  "2.5 Ghz",
  "9th Generation Intel Core I5-9300h",
  "Apple",
  "4.1 Ghz Core_i5_family",
  "Intel Celeron",
  "1.5 Ghz Core_i7_family",
  "4.4 Ghz Amd_ryzen_7_5800h",
  "2.9 Ghz Core_i5",
  "4.2 Ghz Core_i5",
  "3.3 Ghz Ryzen_5",
  "Intel Core I7",
  "Intel Core I7 - 8th Generation",
  "4.5 Ghz Core_i5",
  "3.8 Ghz Ryzen_7",
  "2.9 Ghz Apple_ci5",
  "3 Ghz Ryzen_5_4600h",
  "4.2 Ghz Intel_core_i5_1135g7",
];

const graphicDetails = [
  "Firepro 2450",
  "Nvidia Ge Force Rtx 3060",
  "Dedicated Nvidia Geforce Rtx 2050 4gb Graphic",
  "Nvidia Geforce Rtx 2050",
  "Nvidia Geforce Rtx 4060",
  "Nvidia Geforce Rtx 3050",
  "Intel Iris Xe Graphics",
  "Nvidia Geforce Rtx 3060 Graphics",
  "Intel UHD Graphics",
  "AMD Radeon Graphics",
  "Integrated graphics",
  "Intel UHD Graphics 770",
  "Intel Integrated Graphics",
  "Intel Iris Xe",
  "Intel Integrated Gaphics",
];

const displaySize = [
  "15.6 Inches",
  "15.6 Inches",
  "11.6 Inches",
  "14 Inches",
  "17.3 Inches",
  "16.1 Inches",
  "23.8 Inches",
];

const memorySize = [
  "4 Gb",
  "Ddr 4",
  "Ddr4 Sdram",
  "8 Gb 8 Gb Ddr4",
  "8 Gb So-dimm",
  "8 Gb Ddr4",
  "8 Gb Sdram",
  "16 Gb",
  "16 Gb Ddr5",
  "16 Gb 16 Gb Ddr4",
  "16 Gb Ddr4",
  "256 Gb 8 Gb Ddr4",
  "32 Gb Ddr4",
  "32 Gb Ddr5",
  "32 Gb",
  "2400 Mhz",
];

const performance = [
  "2.2 Ghz",
  "1.1 Ghz",
  "4.1 Ghz",
  "2.9 Ghz",
  "1.0",
  "2400 Mhz",
  "17 Pages Per Minute",
  "2.4 Ghz",
  "2666 Mhz",
  "2.6 Ghz",
];

const hardDriveSize = [
  "64 Gb",
  "128 Gb",
  "256 Gb",
  "500 Gb",
  "512 Gb",
  "1 Tb",
  "2 Tb",
  "4 Tb",
  "64 Gb Ssd",
  "256 Gb Ssd",
  "128 Gb Ssd",
  "512 Gb Ssd",
  "1 Tb Ssd",
  "2 Tb Ssd",
  "Ssd",
];

const operatingSystem = [
  "Android",
  "Android 9.0",
  "Android 10 Os",
  "Android 10",
  "Android 11.0",
  "Android 12",
  "Chrome Os",
  "Linux",
  "Mac Os",
  "Apple Ios",
  "Ipados",
  "Amazfit Os",
  "Windows",
  "Windows 8",
  "Windows 10",
  "Windows 10 Pro",
  "Windows 11",
  "Windows 11 Home",
  "Windows 11 Pro",
];

export default function ElectronicFilter() {
  return (
    <>
      <Box pt={4}>
        <SideBarItem
          hasSearchBar={true}
          title="Processor "
          listData={processors}
          palceholderText="Search by processor"
        />
      </Box>
      <Box pt={4}>
        <SideBarItem
          hasSearchBar={true}
          title="Graphic Card"
          listData={graphicDetails}
          palceholderText="Search by graphic card"
        />
      </Box>
      <Box pt={4}>
        <SideBarItem
          hasSearchBar={true}
          title="Operating System"
          listData={operatingSystem}
          palceholderText="Search by operating system"
        />
      </Box>
      <Box pt={4}>
        <SideBarItem
          hasSearchBar={true}
          title="Ram"
          listData={memorySize}
          palceholderText="Search by memory size"
        />
      </Box>
      <Box pt={4}>
        <SideBarItem
          hasSearchBar={true}
          title="Hard Drive"
          listData={hardDriveSize}
          palceholderText="Search by hard drive size"
        />
      </Box>
      <Box pt={4}>
        <SideBarItem
          hasSearchBar={true}
          title="Display Size"
          listData={displaySize}
          palceholderText="Search by screen size"
        />
      </Box>
      <Box pt={4}>
        <SideBarItem
          hasSearchBar={true}
          title="Speed"
          listData={performance}
          palceholderText="Search by performance"
        />
      </Box>
    </>
  );
}
