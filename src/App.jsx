import React, { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import {Type} from "./Utilities/action.js"
import {auth} from "./Utilities/firebase.js"


function App() {
	const [{user}, dispatch] = useContext(DataContext);
	useEffect(()=>{
		auth.onAuthStateChanged((authUser)=>{
			if(authUser){
				dispatch({
					type:Type.SET_USER,
					user:authUser})
			}else {
				dispatch({
					type:Type.SET_USER,
					user:null})
			}
		})
	},[])
	return (
		<>
			<Routing />
		</>
	);
}

export default App;
