import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";
const CarouselEffect = () => {
	return (
		<div>
			<Carousel
				autoPlay={true}
				infiniteLoop={true}
				showIndicators={false}
				showThumbs={false}
			>
				{img?.map((images, index) => {
					return <img src={images} key={index} />;
				})}
			</Carousel>
			<div className={classes.hero_image}></div>
		</div>
	);
};

export default CarouselEffect;
