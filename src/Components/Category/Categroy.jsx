import React from "react";
import { CategoryInfos } from "./CategoryFulli.js";
import CategoryCard from "./CategoryCard";
import classes from "./Categroy.module.css";

function Categroy() {
	return (
		<section>
			{CategoryInfos.map((info) => {
				<CategoryCard data={info} key={info.imgLink} />;
			})}
		</section>
	);
}

export default Categroy;
