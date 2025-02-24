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
					index 
				) => (
					<CategoryCard key={index} data={infos} />  
				)
			)}
		</section>
	);
}

export default Category