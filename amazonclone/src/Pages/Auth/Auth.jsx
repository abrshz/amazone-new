import React, { useState , useContext} from 'react'
import classes from "./Auth.module.css"
import { Link , useLocation, useNavigate} from 'react-router-dom'
import {auth} from "../../Utilities/firebase"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {DataContext , Type} from "../../Components/DataProvider/DataProvider"
import { ClipLoader } from 'react-spinners'


function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading , setLoading] = useState({
    signIn: false,
    signUp: false
  })
  const [{user} , dispatch] = useContext(DataContext);
  const navigate = useNavigate()
  const navStateData = useLocation();

  // Video

  
  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "signin") {
      // firebase auth
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUP: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUP: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUP: false });
        });
    }
  };

  
  // const handleAuth = async (e) => {
  //   e.preventDefault();
  //   const action = e.target.name;
  //   setError('');

  //   try {
  //     setLoading(prev => ({...prev, [action]: true}));      
  //     const authFunction = action === 'signin' 
  //       ? signInWithEmailAndPassword 
  //       : createUserWithEmailAndPassword;
  //       navigate(navStateData?.state?.redirect || "/")
  //     const userCredential = await authFunction(auth, email, password);
  //     console.log(authFunction);
      
  //     dispatch({
  //       type: Type.SET_USER,
  //       user: userCredential.user
  //     });

  //     navigate("/");
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(prev => ({...prev, [action]: false}));
  //   }
  // };
  
  return (
    
        <section className={classes.login}>
          <Link to="/">
          <img src="https://www.hatchwise.com/wp-content/uploads/2022/08/Amazon-Logo-2000-present-1024x576.jpeg" alt="" />
          </Link>
          <div className={classes.login_container}>
          <h1>Sign-in</h1>
          {navStateData?.state?.msg && 
          ( 
            <small 
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }} > 
            {navStateData?.state?.msg} 
            </ small >
           )}                 
          
          <form action="">
            <div>
            <label htmlFor="">Email</label> 
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email" id='email' /> 
            </div>
            <div>
            <label htmlFor="">Password</label> 
            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" id='password' placeholder="Password" />
            </div>
            <button name='signin' onClick={authHandler} type='submit' className={classes.login_signin}>
              {loading.signIn ? (<ClipLoader size={15} color='#000' />): ("Sign in")}
              </button>
          </form>
          <p>By sign in you agree to the Amazon fake clone conditions of use and save. Please our privacy notice and our Interest Based Ads Notice   </p>
            <button name='signup' onClick={authHandler} type='submit' className={classes.login_register}>
            {loading.signUp ? (<ClipLoader size={15} color='#000' />): ("Create your Amazon Account")}               
            </button> 
            {error && <small style={{paddingTop: "5px", color: "red"}}>{error}</small>}
          </div>
          
        </section>

  )
}

export default Auth