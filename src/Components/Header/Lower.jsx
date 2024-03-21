import React from "react";
import classes from "./Lower.module.css";
import { AiOutlineMenuFold } from "react-icons/ai";
// import { CiMenuBurger } from "react-icons/ci";

function Lower() {
	return (
		<div className={classes.lower__container}>
			<ul>
				<li>
					<AiOutlineMenuFold />
					<p>All</p>
				</li>
				<li>Today's Deals</li>
				<li> Customer Service</li>
				<li>Registry</li>
				<li>Gift Cards</li>
				<li>Sell</li>
			</ul>
		</div>
	);
}

export default Lower;
