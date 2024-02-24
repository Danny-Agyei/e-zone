import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { BiSearch } from "react-icons/bi";

export default function SideBarItem({
  listData,
  title,
  placeholderText,
  expand,
}: {
  listData: { id: number; title: string; check: boolean }[];
  placeholderText?: string;
  expand?: boolean;
  title: string;
}) {
  // @ Search
  const [searchData, setSearchData] = React.useState(listData);

  const onSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const searchMatched = listData.filter((data) =>
      data.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchData(searchMatched);
  };

  // @ Check handler
  const onCheckHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedData = searchData.map((data) => {
      if (id === data.id) {
        return { ...data, check: true };
      }
      return data;
    });
    setSearchData(updatedData);
  };
  return (
    <Box>
      <Accordion
        sx={{ p: 0, boxShadow: "none", bgcolor: "transparent" }}
        defaultExpanded={expand}
      >
        <AccordionSummary
          sx={{
            p: 0,
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: "rotate(90deg)",
            },
            bgcolor: "transparent",
          }}
          expandIcon={<MdOutlineKeyboardArrowRight size={20} color="#a6a6a6" />}
        >
          <Typography variant="body2" fontWeight={600}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Box
            sx={{
              maxWidth: 550,
              display: "flex",
              alignItems: "center",
              height: 35,
              p: 1,
              mt: 2,
              mb: 2,
              border: "1px solid #f2ecec",
              borderRadius: 1,
            }}
          >
            <IconButton
              sx={{
                cursor: "default",
                bgcolor: "text.secondary",
                borderRadius: 1.5,
                p: 0.5,
                "&:hover": {
                  // opacity: 0.85,
                  bgcolor: "text.secondary",
                },
              }}
            >
              <BiSearch color="#fff" size={20} />
            </IconButton>
            <InputBase
              onChange={onSearchHandler}
              fullWidth
              placeholder={placeholderText}
              sx={{
                p: 1,
                fontSize: 14,
                color: "#666",
                height: "100%",
              }}
            />
          </Box>
          <Box
            sx={{
              maxHeight: 300,
              mt: 1,
              overflow: "auto",
              "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                bgcolor: "#eee",
                width: 6,
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 0.5,
                bgcolor: "text.secondary",
              },
              "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                {
                  bgcolor: "text.secondary",
                },
              "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                backgroundColor: "#2b2b2b",
              },
            }}
          >
            <FormGroup>
              {searchData.map((data, indx) => (
                <FormControlLabel
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#666",
                    },
                    "& .MuiCheckbox-root": {
                      color: "#eaeaea",
                      "&:hover": { color: "text.secondary" },
                    },
                    "& .MuiCheckbox-root.Mui-checked": {
                      color: "text.secondary",
                      "&:hover": { color: "text.secondary" },
                    },
                  }}
                  key={indx}
                  title={data.title}
                  control={
                    <Checkbox
                      onChange={(e) => onCheckHandler(e, data.id)}
                      checked={data.check}
                      value={data.title}
                    />
                  }
                  label={data.title}
                />
              ))}
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
