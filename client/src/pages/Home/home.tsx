import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { SwiperSlide } from "swiper/react";
import { Box, Grid, Typography } from "@mui/material";
import {
  Banner,
  CategoryCard,
  CustomSlider,
  NewArrivalCard,
  ProductCard,
  HomeSkeleton,
} from "../../components";
import { BannerType, ProductType } from "../../types";

export const Home = () => {
  const loaderData = useLoaderData() as any;

  // @ Hero Banners
  const heroBanners = (bannerData: BannerType[]) => {
    const filteredHeroBanner = bannerData.length
      ? bannerData.filter(
          (banner) => banner.attributes.type.toLowerCase() === "hero"
        )
      : [];

    return filteredHeroBanner;
  };

  // @ Hero Banners
  const newArrivalBanners = (bannerData: BannerType[]) => {
    const filteredArrivalBanners = bannerData.length
      ? bannerData.filter(
          (banner) => banner.attributes.type.toLowerCase() === "new-arrival"
        )
      : [];

    return filteredArrivalBanners;
  };

  // @ Trending Products

  const trendingProducts = (products: ProductType[]): ProductType[] | [] => {
    const filteredTrendingProducts = products.length
      ? products.filter((product) => {
          const {
            attributes: {
              categories: { data: categoriesData },
            },
          } = product;

          const isTrending = categoriesData.some(
            (category) => category.attributes.title.toLowerCase() === "trending"
          );

          if (isTrending) {
            return product;
          }
        })
      : [];
    return filteredTrendingProducts;
  };

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <Await
        resolve={loaderData!.data}
        errorElement={<h1>Error loading store data...</h1>}
      >
        {(resolveData: { banners: BannerType[]; products: ProductType[] }) => {
          return (
            <Box>
              <Box px={10} pt={4}>
                <Banner bannerData={heroBanners(resolveData.banners)} />
                <Typography
                  variant="h2"
                  pt={8}
                  pb={4}
                  fontSize={22}
                  fontWeight={600}
                >
                  Our Top Categories
                </Typography>
              </Box>
              <Box id="category-slide" px={10} pb={8} position="relative">
                <CustomSlider left={65} right={65} top={55}>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=headphones"
                      title="Headphones"
                      imgUrl="http://localhost:1337/uploads/headphone_e3c4f19d3a.jpeg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=desktops"
                      title="Desktops"
                      imgUrl="http://localhost:1337/uploads/desktop_c530827d2f.jpg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=cell-phones"
                      title="Mobile Phones"
                      imgUrl="http://localhost:1337/uploads/tablet_e1dcecbee1.jpeg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=smart-watches"
                      title="Smart Watches"
                      imgUrl="http://localhost:1337/uploads/Ear_Buds_7c8da9065c.jpeg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=ear-buds"
                      title="Ear Buds"
                      imgUrl="http://localhost:1337/uploads/Ear_Buds_7c8da9065c.jpeg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=laptops"
                      title="Laptops"
                      imgUrl="http://localhost:1337/uploads/laptop_c961516cb5.jpeg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=men-fashion"
                      title="Men Fashion"
                      imgUrl="http://localhost:1337/uploads/Ear_Buds_7c8da9065c.jpeg"
                    />
                  </SwiperSlide>
                </CustomSlider>
              </Box>
              <Box px={10}>
                <Typography variant="h2" pb={4} fontSize={22} fontWeight={600}>
                  Trending Products
                </Typography>
                <Grid container columnSpacing={8}>
                  {trendingProducts(resolveData.products).map(
                    (product, indx) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={indx}>
                        <ProductCard product={product} />
                      </Grid>
                    )
                  )}
                </Grid>
                {newArrivalBanners(resolveData.banners).length > 0 && (
                  <Box>
                    <Typography
                      variant="h2"
                      pt={8}
                      pb={2}
                      fontSize={22}
                      fontWeight={600}
                    >
                      New Arrival
                    </Typography>
                    <Grid container spacing={4}>
                      {newArrivalBanners(resolveData.banners).map(
                        (banner: BannerType, indx: number) => (
                          <Grid item xs={12} md={4} key={indx}>
                            <NewArrivalCard bannerData={banner} />
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Box>
                )}
              </Box>
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Home;
