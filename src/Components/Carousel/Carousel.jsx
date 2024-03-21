import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carosuel.module.css";

function CarouselEffect() {
	return (
		<div>
			<Carousel
				autoPlay={true}
				infiniteloop={true}
				showIndicators={false}
				showThumbs={false}
			>
				{img.map((image) => {
					return <img src={image} key={image} />;
				})}
			</Carousel>
			<div className={classes.hero_image}></div>
		</div>
	);
}

export default CarouselEffect;
