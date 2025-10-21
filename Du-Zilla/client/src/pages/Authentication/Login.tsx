import React from 'react'
import "../style.css"
import "./Authentication.css"

// import { notification } from "./notification";



function Login(){
    return(
        <div className="mainBox">

            <div className="infoBox">
                <h1 className="title" style={{marginTop: "10px",marginLeft: "30px"}}>Du-Zilla</h1>
                <h1 className="darkTitle">Hello! Welcome back to Du-Zila</h1>
                <h3 className="darkNormalText" style={{marginLeft: "30px"}}>If you dont have an account, you can sign up <a>here!</a></h3>
            </div>

            <div className="signBox">
                <div style={{display: "flex",justifyContent: "center",alignItems: "center",marginTop: "50px"}}>
                    <h2 className="normal_text">Log in</h2>
                </div>


                <input className="signInput" id="emailInput" placeholder="Email" type="email"style={{marginTop: "10vh"}}/>

                <div style={{display: "flex",alignItems: "end",position: "relative"}}>
                    <input className="signInput" id="passwordInput" placeholder="Password" type="password" style={{marginTop: "40px"}}/>
                    <div className="visibilityButton" id="visibilityButton" style={{marginBottom: "10px",marginRight: "10%",position: "absolute",right: "0"}}></div>
                </div>
                <h5 className="normal_text" style={{marginLeft: "10%",marginTop: "10px"}}> <a className="linkText">I forgot my password</a></h5>
                <h5 className="normal_text" style={{marginLeft: "10%",marginTop: "10px"}}> <a className="linkText" href="signUp">I don't have an account</a></h5>
                
                <div className="loginButton" id="loginButton">
                    <h4 id="loginText" className="normal_text">Log in</h4>
                    <div id="loginLoading" className="loadingIcon2" style={{display: "none"}}></div>
                </div>
              
                
            </div>
            
        </div>
    );
}

export default Login;