import React ,{useContext, useState} from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BiCartAdd } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import Lower from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from "../../Utilities/firebase"

function Header() {

	const [{user ,basket}, dispatch] = useContext(DataContext);
	const totalItems = basket?.reduce((amount ,item)=>{
		return (item?.amount || 0) + amount;
	}, 0)
	
	return (
		<section className={classes.fixed}>
			<section className={classes.header__container}>
				<div className={classes.logo__container}>
					<Link to="/">
						<img
							src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
							alt="amazon logo"
						/>
					</Link>
					<div className={classes.delivery}>
						<span>
							<SlLocationPin />
						</span>
						<div>
							<p>Delivered to</p>
						    <span>Eritrea</span>
						</div>						
					</div>
				</div>
				<div className={classes.search}>
                    <select name="" id="" className={classes.searchSelect}>
                    <option value="">All</option>
                    </select>
				  <input 
    type="text" 
    className={classes.searchInput} 
    placeholder="Search Amazon" 
  />
  <button className={classes.searchIcon} >
    <FaSearch size={20} />
  </button>
</div>
				<div className={classes.order__container}>
					<Link to="" className={classes.language}>
						{" "}
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1920px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
							alt=""
						/>
						<select name="" id="">
							<option value=""> EN </option>
						</select>
					</Link>

					{/* three components  */}

					<Link to={!user && "/auth"}>
					    <div>
						  {
							user? ( 
								<>
								<p>Hello {user?.email?.split("@")[0]}</p>
								<span onClick={()=> auth.signOut()}>Sign Out</span>
								</>
								 ) : ( 
	    						 <>
								 <p>Hello, Sign In</p>
								 <span>Account & Lists</span>								 
								 </>)}
						</div>
					</Link>
					{/* orders */}
					<Link to="/orders">
						<p>returns</p>
						<span>& Orders</span>
					</Link>
					{/* cart */}
					<Link to="/cart" className={classes.cart}>
						{/* icon */}
						<BiCartAdd size={35} />
						<span>{totalItems}</span>
					</Link>
				</div>
			</section>
			<section>
				<Lower />
			</section>
		</section>
	);
}
// time 5:3o today 14th feb 2024

export default Header;
