import {
  Box,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ProductType } from "../../types";
import { TiStarFullOutline } from "react-icons/ti";
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import ReviewList from "./ReviewList";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  width: "75%",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#e9ecef",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#ffb100",
  },
}));

export default function ProductDetails({
  description,
  product,
}: {
  description: string;
  product: ProductType;
}) {
  const productAtrribute = product.attributes;

  // @filtering out non-null product data
  let keyEl: keyof ProductType["attributes"];

  const productFeatures = (function () {
    const dataToRemove = [
      "categories",
      "sub-categories",
      "price",
      "storage",
      "variants",
      "name",
      "id",
      "inStock",
      "hasDiscount",
      "discountPercent",
      "type",
      "slug",
      "createdAt",
      "updatedAt",
      "publishedAt",
      "description",
    ];

    let nonNullData: any[] = [];

    for (keyEl in productAtrribute) {
      if (productAtrribute[keyEl] !== null) {
        nonNullData.push({ [keyEl]: productAtrribute[keyEl] });
      }
    }

    return nonNullData.filter(
      (data) => !dataToRemove.some((el) => Object.keys(data).includes(el))
    );
  })();

  return (
    <Box sx={{ py: 8 }}>
      <Box>
        <Typography variant="body2" fontSize={18} fontWeight={500}>
          Product Descriptions
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{
            borderColor: "text.secondary",
            maxWidth: 180,
            borderWidth: 1,
            my: 2,
          }}
        />
        <Typography variant="body2" fontSize={14} color="#777">
          {description}
        </Typography>
      </Box>
      <Box pt={8}>
        <Typography variant="h2" fontSize={18} fontWeight={500}>
          Product Features
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{
            borderColor: "text.secondary",
            maxWidth: 180,
            borderWidth: 1,
            my: 2,
          }}
        />
        <TableContainer sx={{ mt: 2, border: "1px solid #eaeaea" }}>
          <Table sx={{ minWidth: 480 }}>
            <TableBody
              sx={{
                "& tr:nth-of-type(odd)": { bgcolor: "#f2f2f2" },
                "& td": { borderColor: "#eaeaea" },
              }}
            >
              {productFeatures.map((feature, indx) => (
                <TableRow key={indx}>
                  <TableCell scope="row">{Object.keys(feature)}</TableCell>
                  <TableCell
                    scope="row"
                    sx={{ width: "50%", color: "#777 !important" }}
                  >
                    {Object.values(feature)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Grid container pt={8} spacing={8}>
        <Grid item sm={12} md={4}>
          <Box sx={{ position: "sticky", top: 0 }}>
            <Typography variant="h2" fontSize={18} fontWeight={500}>
              Customer Ratings
            </Typography>
            <Divider
              variant="fullWidth"
              sx={{
                borderColor: "text.secondary",
                maxWidth: 180,
                borderWidth: 1,
                my: 2,
              }}
            />
            <Stack direction="row" alignItems="center" spacing={1} pb={1.5}>
              <Box lineHeight={0}>
                <IoIosStar size={18} color="#ffb100" />
                <IoIosStar size={18} color="#ffb100" />
                <IoIosStar size={18} color="#ffb100" />
                <IoIosStar size={18} color="#ffb100" />
                <IoIosStar size={18} color="#ffb100" />
              </Box>
              <Box>
                <Typography variant="body2" fontSize={13} fontWeight={500}>
                  4.7 out of 5
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body2" fontSize={13} color="#777">
              197 customers ratings{" "}
            </Typography>
            <Box pt={2}>
              <Stack direction="row" alignItems="center" spacing={1.5} py={1.1}>
                <Typography
                  component="span"
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  5 Star
                </Typography>
                <BorderLinearProgress variant="determinate" value={89} />
                <Typography variant="body2" fontSize={14} color="#777">
                  89%
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1.5} py={1.1}>
                <Typography
                  component="span"
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  4 Star
                </Typography>
                <BorderLinearProgress variant="determinate" value={69} />
                <Typography variant="body2" fontSize={14} color="#777">
                  69%
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1.5} py={1.1}>
                <Typography
                  component="span"
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  3 Star
                </Typography>
                <BorderLinearProgress variant="determinate" value={29} />
                <Typography variant="body2" fontSize={14} color="#777">
                  29%
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1.5} py={1.1}>
                <Typography
                  component="span"
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  2 Star
                </Typography>
                <BorderLinearProgress variant="determinate" value={11} />
                <Typography variant="body2" fontSize={14} color="#777">
                  11%
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1.5} py={1.1}>
                <Typography
                  component="span"
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  1 Star
                </Typography>
                <BorderLinearProgress variant="determinate" value={9} />
                <Typography variant="body2" fontSize={14} color="#777">
                  9%
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={8}>
          <Box>
            <Typography variant="h2" fontSize={18} fontWeight={500}>
              {productAtrribute.name} reviews
            </Typography>
            <Divider
              variant="fullWidth"
              sx={{
                borderColor: "text.secondary",
                maxWidth: 180,
                borderWidth: 1,
                my: 2,
              }}
            />
            <ReviewList />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
