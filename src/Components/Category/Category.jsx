import React from 'react'
import { CategoryInfos } from './CategoryFullInfos' 
import CategoryCard from './CategoryCard'
import classes from "./Category.module.css"
const Category = () => {
  return (
		<section className={classes.category__container}>
			{CategoryInfos.map(
				(
					infos,
					index // Added unique key prop
				) => (
					<CategoryCard key={index} data={infos} /> // Added return statement
				)
			)}
		</section>
	);
}

export default Category