import React, { useRef, useEffect, useLayoutEffect, useState} from 'react'
import "../style.css"
import { PopUpPanel } from '../Widgets';
import { title } from 'process';
import { getAllPortfolios } from '../../Query/portfolioQuery';
import { PortfolioDocument } from '../../Query/interface/portfolioInterface';

console.log("hello");

const TemplatePanel:React.FC = ()=>{
  return(
    <div>

    </div>
  )
}

const getPortfolios = async () =>{
  try{
    const Portfolios:PortfolioDocument[] = await getAllPortfolios();
    console.log(Portfolios)
  }catch(err){
    console.error("deu ruin:",err);
  }
}

function Home() {
  // const popUpPanel = useRef<React.FC|null>(null);
  const firstNotification = useRef<boolean>(false);


  getPortfolios();
  const {PopUpPanelElement, activePopUpPanel} = PopUpPanel();
  return (
    <div>
    <title>Du-Zilla</title>
    <nav className="topNav">
      <h2 className="titleIcon">Du-Zilla</h2>
      <div className="loadingBox" id="loadingBox"><div className="loadingIcon3"></div></div>
      <div className="accountBox" id="logedBox" style={{display: "none"}}>        
        <div className="icon"></div>
        <p className="normal_text" id="accountName">Account Name</p>
        <div className="arrowDownIcon" id="accountDropDownButton"></div>
        <ul className="accountDropDown" id="accountDropDown">
          <li><a href="/account"><div className="dropDownIcon accountIcon"></div><h4 className="normal_text">My Account</h4></a></li>
          <li><a href="/studio/my-projects"><div className="dropDownIcon projectsIcon"></div><h4 className="normal_text">My Projects</h4></a></li>
          <li><a href="/notification"><div className="dropDownIcon notificationIcon"></div><h4 className="normal_text">Notification</h4></a></li>
          <li><a href="/messager"><div className="dropDownIcon messagerIcon"></div><h4 className="normal_text">Messager</h4></a></li>
          <li><a href="/account/settings"><div className="dropDownIcon settingsIcon"></div><h4 className="normal_text">Settings</h4></a></li>
          <li><a href="/help"><div className="dropDownIcon helpIcon"></div><h4 className="normal_text">Help</h4></a></li>
          <li><a href="/logout"><div className="dropDownIcon helpIcon"></div><h4 className="normal_text">Log out</h4></a></li>
        </ul>
      </div>
      <div className="signButtonsBox" id="notLogedBox" style={{display:"none"}}>  
          <a href="login"><div className="signInButton"><h4 className="normal_text">Sign in</h4></div></a>
          <a href="register"><div className="signUpButton"><h4 className="normal_text">Sign Up</h4></div></a>
      </div>
    </nav>

    <PopUpPanelElement title="Create Portfolio" Content={TemplatePanel}></PopUpPanelElement>

    <section className="globalBox searchSection">
        <div>
            <div style={{display: "flex",justifyContent: "center",alignItems: "center",height: "50px",marginTop: "40px",marginBottom: "40px"}}><h1 className="title">Du-Zilla</h1></div>
            <div style={{display: "flex"}}>
              <input id="search" className="inputSearch" type="text" placeholder="Pesquisar"/>
              <div id="searchButton" className="searchButton" style={{marginLeft: "10px"}}></div>
            </div>

            <div style={{display: "flex",justifyContent: "center",alignItems: "center",width: "100%",marginTop: "5%"}}>
              <div className="createOwnButton" id="createOwnButton" onClick={activePopUpPanel}><h3 className="normal_text">Criar Novo Portfolio</h3></div>
            </div>

          <div className="signButtonsBox">
            <a href="login"><div className="signInButton"><h4 className="normal_text">Sign in</h4></div></a>
            <a href="signUp"><div className="signUpButton"><h4 className="normal_text">Sign Up</h4></div></a>
          </div>
        </div>
    </section>

    <section className="thunbsSection" id="portfoliosThunbNails" style={{marginTop: "40px"}}>

    </section>
    </div>
  )
}

export default Home;
