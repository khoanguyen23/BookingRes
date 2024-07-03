import React from "react";
import { Swiper, SwiperItem } from "@nutui/nutui-react-native";
import { Image } from "react-native";
import PropTypes from "prop-types";

const Banner = ({ images }) => {
  return (
    <Swiper
      style={{ marginTop: 35 }}
      width="100%"
      height={150}
      paginationColor="#426543"
      paginationBgColor="#426ddd"
      autoPlay={3000}
      initPage={0}
      paginationVisible
    >
      {images.map((imageUrl, index) => (
        <SwiperItem key={index}>
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: "100%",
              height: 150,
            }}
          />
        </SwiperItem>
      ))}
    </Swiper>
  );
};

Banner.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Banner;
