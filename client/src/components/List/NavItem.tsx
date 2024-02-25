import { Box, Grid, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

export default function NavItem({
  title,
  hasSubList,
  linkTo,
  pl,
  toggleMenu,
  children,
}: {
  title: string;
  hasSubList?: boolean;
  linkTo: string;
  pl?: string | number;
  toggleMenu?: boolean;
  children?: ReactNode;
}) {
  const [showMenu, setShowMenu] = useState(toggleMenu || false);

  return (
    <>
      <Box sx={{ pl: pl || 0 }}>
        {!hasSubList ? (
          <Link to={linkTo}>
            <Typography
              color="#fff"
              fontSize={14}
              sx={{
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity .95s ease-in-out;",
                "&:hover": {
                  opacity: 0.6,
                },
              }}
            >
              {title}
            </Typography>
          </Link>
        ) : (
          <Box
            onMouseOver={() => setShowMenu(true)}
            onMouseOut={() => setShowMenu(false)}
          >
            <Box
              component="div"
              data-item-title={title + " " + "v"}
              display="flex"
              alignItems="center"
              color="text.primary"
              sx={{
                transition: "opacity .25s ease-in-out;",
                "&:hover": {
                  // opacity: 0.6,
                  "&:before": {
                    content: "attr(data-item-title)",
                    position: "absolute",
                    cursor: "pointer",
                    height: 60,
                    width: "max-content",
                    top: 0,
                    opacity: 0,
                    zIndex: 9999,
                  },
                  "& .title-text": { opacity: 0.6 },
                },
              }}
            >
              <Box
                sx={{
                  position: "fixed",
                  top: showMenu ? 150 : 180,
                  left: 0,
                  zIndex: 999,
                  background: "#f5f5f7",
                  boxShadow: "0 0 8px #eaeaea",
                  minWidth: "100%",
                  px: 5,
                  py: 4,
                  borderBottom: 1,
                  borderColor: "#eaeaea",
                  visibility: showMenu ? "visible" : "hidden",
                  opacity: showMenu ? 1 : 0,
                  transition: "all .25s ease-in-out",
                }}
              >
                <Box maxWidth={1200} m="0 auto">
                  <Grid container spacing={3}>
                    {children}
                  </Grid>
                </Box>
              </Box>
              <Box
                className="title-text"
                component="p"
                color="#fff"
                sx={{
                  textTransform: "uppercase",
                  fontSize: 14,
                  transition: "opacity .95s ease-in-out;",
                  "&:hover": {
                    opacity: "0.6 !important",
                  },
                }}
              >
                {title}
              </Box>
              <Box
                component="span"
                pt={0.2}
                pl={0.6}
                color="text.primary"
                lineHeight={0}
              >
                <MdOutlineKeyboardArrowDown
                  size={20}
                  color="#fff"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
