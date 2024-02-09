import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { SwiperSlide } from "swiper/react";
import { Box, Grid, Typography } from "@mui/material";
import {
  Banner,
  CategoryCard,
  CategorySlider,
  NewArrivalCard,
  ProductCard,
  HomeSkeleton,
} from "../../components";
import { BannerType, ProductType } from "../../types";

export const Home = () => {
  const loaderData = useLoaderData() as any;

  // @ Hero Banners
  const heroBanners = (bannerData: BannerType[]) => {
    const filteredHeroBanner = bannerData.length ? bannerData.filter(
      (banner) => banner.attributes.type.toLowerCase() === "hero"
    ):[];

    return filteredHeroBanner;
  };

  // @ Hero Banners
  const newArrivalBanners = (bannerData: BannerType[]) => {
    const filteredArrivalBanners = bannerData.length ? bannerData.filter(
      (banner) => banner.attributes.type.toLowerCase() === "new-arrival"
    ) : [];

    return filteredArrivalBanners;
  };

  // @ Trending Products

  const trendingProducts = (products: ProductType[]): ProductType[] | [] => {
    const filteredTrendingProducts =products.length ? products.filter((product) => {
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
    }) : [];
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
              <Banner bannerData={heroBanners(resolveData.banners)} />
              <Box id="category-slide" px={10} py={8} position="relative">
                <CategorySlider>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=headphones"
                      title="Headphones"
                      imgUrl="http://localhost:1337/uploads/Dr_dre_beats_solo_2_removebg_preview_349edbfaba.png"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=desktops"
                      title="Desktops"
                      imgUrl="http://localhost:1337/uploads/Desktop1_9178fc4ceb.png"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=cell-phones"
                      title="Mobile Phones"
                      imgUrl="http://localhost:1337/uploads/apple_iphone_11_fully_unlocked_2_removebg_preview_060a335f9e.png"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=smart-watches"
                      title="Smart Watches"
                      imgUrl="http://localhost:1337/uploads/apple_iphone_11_fully_unlocked_4_removebg_preview_08f9d954c6.png"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=ear-buds"
                      title="Ear Buds"
                      imgUrl="http://localhost:1337/uploads/j18_tws_bluetooth_stereo_earbuds_1_removebg_preview_3bb06023e2.png"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=laptops"
                      title="Laptops"
                      imgUrl="http://localhost:1337/uploads/hp_pro_c640_chromebook_enterprise_1_removebg_preview_3e25d5f817.png"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CategoryCard
                      cartegoryUrl="/shop/collection?q=men-fashion"
                      title="Men Fashion"
                      imgUrl="http://localhost:1337/uploads/White_Crew_Neck_Graphic_Shortsleeve_T_Shirt_4ab0a49dea.png"
                    />
                  </SwiperSlide>
                </CategorySlider>
              </Box>
              <Box px={10}>
                <Typography variant="h2" pb={6} fontSize={26} fontWeight={900}>
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
                      pb={6}
                      fontSize={26}
                      fontWeight={900}
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
