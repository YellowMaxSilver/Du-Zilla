import React from 'react'
import "../style.css"
import "./Authentication.css"

function Register(){
    return(
            <div className="mainBox">

                <div className="infoBox">
                    <h1 className="title" style={{marginTop: 10,marginLeft: 30}}>Du-Zilla</h1>
                    <h1 className="darkTitle">Hello! Welcome to Du-Zila</h1>
                    <h3 className="darkNormalText" style={{marginLeft: 30}}>If you dont have an account, you can sign up <a>here!</a></h3>
                </div>

                <div className="signBox">
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center",marginTop: 50}}>
                        <h2 className="normal_text">Sign Up</h2>
                    </div>


                    <input className="signInput" id="nameInput" placeholder="Name" type="text" style={{marginTop: "5vh"}}/>
                    <input className="signInput" id="nameIdInput" placeholder="Id Name ex: @my_id_name" type="text" style={{marginTop: 40}}/>
                    <input className="signInput" id="emailInput" placeholder="Email" type="email" style={{marginTop: 40}}/>
                    
                    <div style={{display: "flex",alignItems: "end",position: "relative"}}>
                        <input className="signInput" id="passwordInput" placeholder="Password" type="password" style={{marginTop: 40}}/>
                        <div className="visibilityButton" id="visibilityButton" style={{marginBottom: "10",marginRight: "10%",position: "absolute",right: 0}}></div>
                    </div>
                    <input className="signInput" id="verifyPasswordInput" placeholder="Verify Password" type="password" style={{marginTop: 40}}/>
                    
                    
                    <div className="loginButton" id="signUpButton">
                        <h3 className="normal_text">Create Account</h3>
                    </div>

                </div>
                
            </div>
    )
}

export default Register;