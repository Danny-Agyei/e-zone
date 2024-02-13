import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { ProductType } from "../../types";

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
        <Typography variant="h2" fontSize={22} fontWeight={600} pb={1}>
          Product Descriptions
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{
            borderColor: "text.secondary",
            maxWidth: 230,
            borderWidth: 1,
          }}
        />
        <Typography variant="body2" fontSize={16} pt={2}>
          {description}
        </Typography>
      </Box>
      <Box pt={6}>
        <Typography variant="h2" fontSize={22} fontWeight={600} pb={1}>
          Product Features
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{
            borderColor: "text.secondary",
            maxWidth: 190,
            borderWidth: 1,
          }}
        />
        <TableContainer sx={{ mt: 2, border: "1px solid #eee" }}>
          <Table sx={{ minWidth: 480 }}>
            <TableBody
              sx={{
                "& tr:nth-of-type(odd)": { bgcolor: "#f2f2f2" },
                "& td": { borderColor: "#eee" },
              }}
            >
              {productFeatures.map((feature, indx) => (
                <TableRow key={indx}>
                  <TableCell scope="row">{Object.keys(feature)}</TableCell>
                  <TableCell scope="row" sx={{ width: "50%" }}>
                    {Object.values(feature)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
