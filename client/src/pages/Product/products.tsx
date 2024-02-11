// import { Box, FormControlLabel, Grid, Stack, Typography } from "@mui/material";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import { Suspense, lazy, useLayoutEffect, useRef, useState } from "react";

// import { Await, useLoaderData } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";

// import SwiperClass from "swiper/types/swiper-class";
// import SwiperCore, {
//   // FreeMode,
//   Navigation,
//   Thumbs,
//   Controller,
//   Lazy,
// } from "swiper";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";

// import { ProductType } from "../../types";
// import ProductSkeleton from "../../components/Constant/ProductSkeleton";
// import { TiStarFullOutline } from "react-icons/ti";

// export default function Product() {
//   const loadedData = useLoaderData() as {
//     data: Promise<{
//       data: Promise<any>;
//     }>;
//   };

//   type variantsType = ProductType["attributes"]["variants"];
//   type storageType = ProductType["attributes"]["storage"];

//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
//   const [firstSwiper, setFirstSwiper] = useState<SwiperClass>();
//   const [secondSwiper, setSecondSwiper] = useState<SwiperClass>();
//   const swiper1Ref = useRef<any>(null);
//   const swiper2Ref = useRef();

//   useLayoutEffect(() => {
//     if (swiper1Ref.current !== null) {
//       swiper1Ref.current.controller.control = swiper2Ref.current;
//     }
//   }, []);

//   //@ Product images modify
//   const productImages = (variants: variantsType) => {
//     const modifyVariants = variants.map((variant, indx) => ({
//       id: indx + 1,
//       ...variant,
//     }));

//     return modifyVariants;
//   };

//   // @ select product by variation
//   const [currentColorVariant, setCurrentColorVariant] = useState<
//     variantsType[0] | null
//   >(null);

//   const [storageCapacity, setStorageCapacity] = useState<storageType[0]>();

//   // @Set default color
//   const onSelectedColorVariant = (
//     variants: variantsType,
//     selectedColor: string
//   ) => {
//     const variant = variants.find(
//       (variant) =>
//         variant.colorName.toLowerCase() === selectedColor.toLowerCase()
//     );

//     setCurrentColorVariant(variant!);
//   };

//   return (
//     <Suspense fallback={<ProductSkeleton />}>
//       <Await
//         resolve={loadedData!.data}
//         errorElement={<h1>Error loading Product data...</h1>}
//       >
//         {(resolveData) => {
//           const { product }: { product: ProductType } = resolveData;
//           const {
//             attributes: {
//               name,
//               description,
//               price,
//               features,
//               categories,
//               inStock,
//               variants,
//               storage,
//             },
//           } = product;

//           // @Get available product Color
//           const availableColorVariants = variants.map((variant) =>
//             variant.colorCode.toLowerCase()
//           );

//           // onSelectedColorVariant(variants, availableColorVariants[0]);
//           // console.log("CURRENT =>", currentColorVariant);

//           // @Selected color
//           const selectedVariant =
//             currentColorVariant !== undefined && currentColorVariant !== null
//               ? currentColorVariant
//               : variants![0];

//           // @Selected storage capacity
//           // const selectedStorageCapacity =
//           //   storageCapacity !== undefined && storageCapacity !== null
//           //     ? storageCapacity
//           //     : storage[0];

//           return (
//             <Box px={10} py={8}>
//               <Grid container columnSpacing={5}>
//                 <Grid item sm={12} md={6} sx={{ position: "sticky", top: 0 }}>
//                   <Box
//                     sx={{
//                       position: "sticky",
//                       top: 0,
//                     }}
//                   >
//                     <Stack direction="row">
//                       <Box sx={{ height: "100%", pr: 5 }}>
//                         <Swiper
//                           loop={false}
//                           spaceBetween={10}
//                           slidesPerView={4}
//                           watchSlidesProgress
//                           touchRatio={0.2}
//                           direction="vertical"
//                           slideToClickedSlide={true}
//                           // modules={[Navigation, Thumbs, Controller, lazy]}
//                           onSwiper={setThumbsSwiper}
//                           // controller={{ control: firstSwiper }}
//                           style={{ width: "max-content" }}
//                         >
//                           {selectedVariant!.images.map((image, indx) => (
//                             <SwiperSlide key={indx}>
//                               <Box
//                                 component="img"
//                                 src={image}
//                                 loading="lazy"
//                                 data-src={image}
//                                 sx={{
//                                   width: "100%",
//                                   maxWidth: 70,
//                                   height: "auto",
//                                   borderRadius: 1,
//                                   border: "1px solid #e1e1e1",
//                                   px: 0.2,
//                                   py: 0.8,
//                                   mb: 0.2,
//                                 }}
//                                 alt={`${name}-${selectedVariant!.colorName}`}
//                               />
//                               <Box className="swiper-lazy-preloader"></Box>
//                             </SwiperSlide>
//                           ))}
//                         </Swiper>
//                       </Box>
//                       <Box
//                         sx={{
//                           position: "relative",
//                           minHeight: 328,
//                           maxHeight: "max-content",
//                           width: "100%",
//                         }}
//                       >
//                         <Swiper
//                           onSwiper={(swiper) => {
//                             if (swiper1Ref.current !== null) {
//                               swiper1Ref.current = swiper;
//                             }
//                           }}
//                           // controller={{ control: secondSwiper }}
//                           spaceBetween={1}
//                           slidesPerView={1}
//                           centeredSlides={true}
//                           draggable={false}
//                           thumbs={{
//                             swiper:
//                               thumbsSwiper && !thumbsSwiper.destroyed
//                                 ? thumbsSwiper
//                                 : null,
//                           }}
//                           modules={[
//                             // FreeMode,
//                             Navigation,
//                             Thumbs,
//                             Controller,
//                             lazy,
//                           ]}
//                           style={{ width: "100%", height: "100%" }}
//                         >
//                           {selectedVariant!.images.map((image, indx) => (
//                             <SwiperSlide key={indx}>
//                               <Box
//                                 component="img"
//                                 src={image}
//                                 loading="lazy"
//                                 data-src={image}
//                                 sx={{
//                                   width: "100%",
//                                   m: "0 auto",
//                                   maxWidth: 445,
//                                   objectFit: "contain",
//                                 }}
//                                 alt={`${name}-${selectedVariant!.colorName}`}
//                               />
//                               <Box className="swiper-lazy-preloader"></Box>
//                             </SwiperSlide>
//                           ))}
//                         </Swiper>
//                       </Box>
//                     </Stack>
//                   </Box>
//                 </Grid>
//                 <Grid item sm={12} md={6}>
//                   <Box>
//                     <Typography variant="h2" fontSize={26} fontWeight={600}>
//                       HP Newest 14" Ultral Light Laptop for Business. Intel
//                       Quad-Core N4120, 4GB RAM, 192GB Storage
//                     </Typography>
//                   </Box>
//                   <Box py={1.2}>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       <Box lineHeight={0}>
//                         <TiStarFullOutline size={20} color="#FF8C00" />
//                         <TiStarFullOutline size={20} color="#FF8C00" />
//                         <TiStarFullOutline size={20} color="#FF8C00" />
//                         <TiStarFullOutline size={20} color="#FF8C00" />
//                         <TiStarFullOutline size={20} color="#FF8C00" />
//                       </Box>
//                       <Typography variant="body2">(25 reviews)</Typography>
//                     </Stack>
//                   </Box>
//                   <Typography variant="h3" fontSize={22} fontWeight={600}>
//                     ${price}
//                   </Typography>
//                   <Box pt={2.5}>
//                     <Typography
//                       variant="body2"
//                       fontSize={16}
//                       fontWeight={500}
//                       pb={1.2}
//                     >
//                       Colour :{" "}
//                       <Typography
//                         variant="body2"
//                         component="span"
//                         fontSize={16}
//                         fontWeight={600}
//                       >
//                         {selectedVariant.colorName}
//                       </Typography>
//                     </Typography>
//                     <Stack direction="row" spacing={1.2} alignItems="center">
//                       {variants.map((variant: variantsType[0], indx) => (
//                         <Box
//                           key={indx}
//                           sx={{
//                             position: "relative",
//                           }}
//                         >
//                           <Radio
//                             checked={
//                               selectedVariant.colorName === variant.colorName
//                             }
//                             onChange={() =>
//                               onSelectedColorVariant(
//                                 variants,
//                                 variant.colorName
//                               )
//                             }
//                             value={variant.colorName}
//                             title={variant.colorName}
//                             name="radio-buttons"
//                             sx={{
//                               position: "absolute",
//                               top: 0,
//                               left: 0,
//                               width: 41,
//                               height: 41,
//                               borderRadius: "75%",
//                               border: "1px solid #e1e1e1",
//                               p: 0.4,
//                               "& span": {
//                                 display: "none",
//                               },
//                               "&.Mui-checked": {
//                                 borderColor: "text.secondary",
//                               },
//                             }}
//                           />

//                           <Box
//                             sx={{
//                               width: 32,
//                               height: 32,
//                               borderRadius: 9999,
//                               p: 0.5,
//                             }}
//                           >
//                             <Box
//                               bgcolor={variant.colorCode}
//                               sx={{
//                                 width: 32,
//                                 height: 32,
//                                 borderRadius: 9999,
//                               }}
//                             ></Box>
//                           </Box>
//                         </Box>
//                       ))}
//                     </Stack>
//                   </Box>
//                   <Box pt={2.5}>
//                     <Typography
//                       variant="body2"
//                       fontSize={16}
//                       fontWeight={500}
//                       pb={1.2}
//                     >
//                       Capacity
//                     </Typography>
//                     <Stack direction="row" spacing={1.2} alignItems="center">
//                       {storage.map((storage, indx) => (
//                         <Box
//                           key={indx}
//                           sx={{
//                             position: "relative",
//                           }}
//                         >
//                           <Radio
//                             // checked={}
//                             // onChange={handleChange}
//                             value={storage.capacity}
//                             title={storage.capacity}
//                             name="radio-buttons"
//                             sx={{
//                               position: "absolute",
//                               top: 0,
//                               left: 0,
//                               width: "100%",
//                               height: "100%",
//                               borderRadius: "8px",
//                               border: "1px solid #ccc",
//                               "& span": {
//                                 display: "none",
//                               },
//                             }}
//                           />

//                           <Box
//                             sx={{
//                               p: "12px 16px",
//                             }}
//                           >
//                             {storage.capacity}
//                           </Box>
//                         </Box>
//                       ))}
//                     </Stack>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>
//           );
//         }}
//       </Await>
//     </Suspense>
//   );
// }

export default function () {
  return <>Hello</>;
}
