import React, { useRef, useEffect, useLayoutEffect, useState} from 'react'
import "../style.css"
import "../thunbnail.css"
import { CreateThunbNail, PopUpPanel, ThunbNail, TopNavBar } from '../Widgets';
import { title } from 'process';
import { getAllPortfolios } from '../../Query/portfolioQuery';
import { PortfolioDocument } from '../../Query/interface/portfolioInterface';
import { JsxElement } from 'typescript';

console.log("hello");

const TemplatePanel:React.FC = ()=>{
  return(
    <div className='thunbsLayoutInPanel'>
      <CreateThunbNail width='280px' height='150px'></CreateThunbNail>
      <ThunbNail width='280px' height='150px' title='portfolio teste' description='' rateLevel={0} userTab={false}></ThunbNail>
      <ThunbNail width='280px' height='150px' title='portfolio teste' description='' rateLevel={0} userTab={false}></ThunbNail>
    </div>
  )
}

const getPortfolios = async ():Promise<PortfolioDocument[]> =>{
  try{
    const Portfolios:PortfolioDocument[] = await getAllPortfolios();
    
    if(!Portfolios){
      throw new Error("thers no portfolios");
    }

    return Portfolios;
  }catch(err){
    throw new Error("Error: "+err);
  }
}


function Home() {
  // const popUpPanel = useRef<React.FC|null>(null);
  const firstNotification = useRef<boolean>(false);

  const {PopUpPanelElement, activePopUpPanel} = PopUpPanel();
 
  const [portfolios, setPortfolios] = useState<PortfolioDocument[]>([])
  useEffect(()=>{
    const loadData = async ()=>{
      try{
        const tryingPortfolios = await getPortfolios();
        setPortfolios(tryingPortfolios);
      }catch(err){
        console.log("haha: "+err);
      }finally{

      }
    }

    loadData()
  },[]);

  
  return (
    <div>
    <title>Du-Zilla</title>
    <TopNavBar />

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
    {
      portfolios.map( (portfolio:PortfolioDocument) =>(
        <div key={String(portfolio._id)}>
        { }
        <ThunbNail
         width='380px' height='280px'
         title={portfolio.name} userUid={portfolio.creator} rateLevel={0} userTab={true}
        ></ThunbNail>
        </div>
      ))
    }
    </section>
    </div>
  )
}

export default Home;
