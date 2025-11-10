import React, {useEffect, useRef, useState} from "react";
import { form, Spinner, TopNavBar } from "../Widgets";
import "./PortfolioEditor.css"
import "../style.css"
import { title } from "process";

function PortfolioEditor(){
    const [Main, setMain] = useState<JSX.Element[]>([]);
    const [MainIds, setMainIds] = useState<string[]>([]);

    const overBox = useRef<HTMLDivElement|null>(null);
    const clickedBox = useRef<HTMLDivElement|null>(null);
    const background = useRef<HTMLDivElement|null>(null);

    const {activeAttributesPanel, AttributesPanelElement} = AttributesPanel();
    const {activeFormAttributesPanel, FormAttributesPanelElement } = FormAttributesPanel();
    const {activeNewWidgetPanel, hiddenNewWidgetPanel, NewWidgetPanelElement} = NewWidgetPanel();
    const {activeBackgroundAttributesPanel, BackgroundAttributesPanelElement} = BackgroundAttributesPanel();

    class Widget {
            constructor(
                widgetType: string,
                argument1: any,
                argument2: any|null,
                argument3: any|null,
                argument4: any|null,
                argument5: any|null,
                argument6: any|null,
                argument7: any|null,
            ) {
                const { formWidget } = form();
                let elementId: string = "Wdg"+String(Math.floor(Math.random() * (999999999 - 10 + 1)) + 10);
                
                //text, image, video, audio, button, divider, spacer, social media icons
                switch(widgetType){
                    case "text":
                        //text -->
                        //argument1 = text
                        //argument2 = font size
                        //argument3 = color
                        //argument4 = alignment
                        //argument5 = weight
                        //argument6 = font style
                        //argument7 = font family
                        //argument8 = width
                        //argument9 = height
    
                        const text = argument1;
                        const fontSize = argument2;
                        const color = argument3;
                        const algn = argument4;
                        const weight = argument5;
                        const fontStyle = argument6;
                        const fontFamily = argument7;
    
                        const widgetStyle:React.CSSProperties = {
                            fontSize:fontSize,
                            color:color,
                            textAlign:algn,
                            fontWeight:weight,
                            fontStyle:fontStyle,
                            fontFamily:fontFamily,
                            width:"auto",
                            height:"auto",
                            cursor:"pointer",
                            margin:0
                        }
    
                        const widgetElement:JSX.Element = (
                            <h1 style={widgetStyle} id={elementId} key={elementId}>
                                {text}
                            </h1>
                        )
    
                        setMain((prevItens)=>[...prevItens,widgetElement]);
                        setMainIds((prevItens)=>[...prevItens,elementId]);
                    break;
                    case "form":
                        //form -->
                        //argument1 = formId
                        //argument2 = formName
                        //argument3 = formDescription
    
                        setMain((prevItens)=>[...prevItens,formWidget(elementId,argument2,argument3,"userName","@userNameId")]);
                        
                    break;
                    case "background":
                        //background -->
                        //argument1 = background type <-> options (solid color, gradient, image) 
                        //argument2 = main value <-> options (solid color or first color of gradient, imageId)
                        //argument3 = second color of gradient
                        //argument4 = gradient angle.

                        if(argument1 == "solidColor"){
                            if(background.current){
                                background.current.style.backgroundColor = argument2;
                            }
                        }
                    break;
                }

                setTimeout(()=>{
                    const widget = document.querySelector("#"+elementId) as HTMLElement;
                    if(widget){
                        widget.addEventListener("mouseenter",()=>{
                            onWidgetMouseOver(elementId)
                        })

                        widget.addEventListener("mousedown",()=>{
                            onWidgetClicked(elementId,widgetType)
                        })

                        widget.addEventListener("mouseout",()=>{
                            if(overBox.current){
                                overBox.current.style.display = "none";
                            }
                        })

                    }
                },100)
                
            }
    }

    var widgetIdOfAttributePanel;

    function onWidgetClicked(widgetId: string,widgetType:string) {
        let widget: HTMLElement | undefined = document.getElementById(widgetId) as HTMLElement;
        let positionX:number = widget.offsetLeft;
        let positionY:number = widget.offsetTop;
        let width:any = widget.offsetWidth;
        let height:any = widget.offsetHeight;
        if(clickedBox.current){
            //clickedBox.current.style = `margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
            clickedBox.current.style.marginLeft = positionX+"px";
            clickedBox.current.style.marginTop = positionY+"px";
            clickedBox.current.style.width = width+"px";
            clickedBox.current.style.height = height+"px";
        }
        if(widgetType == "form"){
            widgetIdOfAttributePanel = widgetId;
            activeFormAttributesPanel(widgetId);
        }else{
            widgetIdOfAttributePanel = widgetId;
            activeAttributesPanel(widgetId);
        }
        //console.log(widget.textContent);
    }


    function onWidgetMouseOver(widgetId:string) {
        let widget: HTMLElement | undefined = document.getElementById(widgetId) as HTMLElement;
        let positionX:number = widget.offsetLeft;
        let positionY:number = widget.offsetTop;
        let width:any = widget.offsetWidth;
        let height:any = widget.offsetHeight;
        if(overBox.current){
            //overBox.current.style = `display:flex;margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
            overBox.current.style.display = "flex";
            overBox.current.style.marginLeft = positionX+"px";
            overBox.current.style.marginTop = positionY+"px";
            overBox.current.style.width = width+"px";
            overBox.current.style.height = height+"px";
        }
    }

    function convertRGBColor(color:any):string{
        let colorValue = color;
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(colorValue)) {
            // Try to convert rgb/rgba to hex
            const rgbMatch = colorValue.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            if (rgbMatch) {
                const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
                const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
                const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
                return `#${r}${g}${b}`;
            } else {
                return "#000000";
            }
        }else{
            return "#000000";
        }
    }

    function AttributesPanel(){
            const [widgetId, setWidgetId] = useState<string>("");
            const text = useRef<HTMLInputElement|null>(null);
            const textColor = useRef<HTMLInputElement|null>(null);
            const fontSize = useRef<HTMLInputElement|null>(null);
            const fontWeight = useRef<HTMLInputElement|null>(null);
            const backgroundColor = useRef<HTMLInputElement|null>(null);
            const previewText = useRef<HTMLInputElement|null>(null);
            const portfolioPopUpPanel = useRef<HTMLDivElement|null>(null);
     
            const hiddenAttributesPanel = ()=>{
                 portfolioPopUpPanel.current?.classList.add("hiddenPopUpPanel");
            }
            

            const activeAttributesPanel = (widgetIdP:string)=>{
                
                  portfolioPopUpPanel.current?.classList.remove("hiddenPopUpPanel");  

                  const element = document.querySelector("#"+widgetIdP) as HTMLElement;
                  if(element){
                    setWidgetId(widgetIdP);

                    if(text.current){
                        text.current.value = element.textContent+"";
                    }

                    if(textColor.current){
                        textColor.current.value = convertRGBColor(element.style.color);
                    }
                  }
            }

            const refresh = ()=>{
                const element = document.querySelector("#"+widgetId) as HTMLElement;
                if(!element || !previewText.current){
                    return;
                }

                if(text.current){
                    element.textContent = text.current?.value;
                    previewText.current.textContent = text.current?.value;
                }
                if(textColor.current){
                    element.style.color = textColor.current.value;
                    previewText.current.style.color = textColor.current.value;
                }
                if(fontSize.current){
                    element.style.fontSize = fontSize.current.value+"px";
                    previewText.current.style.fontSize = fontSize.current.value+"px";
                }
                if(backgroundColor.current){
                    element.style.backgroundColor = backgroundColor.current.value;
                    previewText.current.style.backgroundColor = backgroundColor.current.value;
                }

                let positionX:number = element.offsetLeft;
                let positionY:number = element.offsetTop;
                let width:any = element.offsetWidth;
                let height:any = element.offsetHeight;
                if(clickedBox.current){
                    clickedBox.current.style.marginLeft = positionX+"px";
                    clickedBox.current.style.marginTop = positionY+"px";
                    clickedBox.current.style.width = width+"px";
                    clickedBox.current.style.height = height+"px";
                }
            }
    
            const AttributesPanelElement: React.FC = () =>{
                const closeIconStyle:React.CSSProperties = {
                    width: 30,
                    height: 30,
                    position: "absolute",
                    top: 20,
                    right:20,
                }
                return(
                    <div>
                        <section className="popUpPanel editorPopUpPanel hiddenPopUpPanel" ref={portfolioPopUpPanel}>
                            <div className="closeIcon" onClick={hiddenAttributesPanel} style={closeIconStyle}></div>
                            <div className="topTitle"><h2 className="normal_text">Portfolio Name</h2></div>

                            <div className="attribute">
                                <div className="attributePanelPreviewBox">
                                    <h1 ref={previewText}>Title</h1>
                                </div>
                            </div>
                            <div className="panel">
                                <div className="attribute">
                                    <h4 className="normal_text text">Text</h4>
                                    <input className="attributeInputText" ref={text} onChange={refresh}></input>
                                </div>
                                <div className="attribute">
                                    <h4 className="normal_text text">Color</h4>
                                    <input  type="color" className="attributeColorInput" ref={textColor} onChange={refresh}></input>
                                </div>       
                                <div className="attribute">
                                    <h4 className="normal_text text">Font Size</h4>
                                    <input className="attributeInputText" type="number" step={1} ref={fontSize} onChange={refresh}></input>
                                </div>
                                <div className="attribute">
                                    <h4 className="normal_text text">Font Weight</h4>
                                    <input ref={fontWeight}></input>
                                </div>               
                                <div className="attribute">
                                    <h4 className="normal_text text">Font Algn</h4>
                                    <div className="itens">
                                        <div className="iconButton algnLeftIcon" id="attributePanelAlgnLeftButton"></div>
                                        <div className="iconButton algnCenterIcon" id="attributesPanelAlgnCenterButton"></div>
                                        <div className="iconButton algnRightIcon" id="attributesPanelAlgnRightButton"></div>
                                    </div>
                                </div>
                                <div className="attribute">
                                    <h4 className="normal_text text">Font</h4>
                                    <div className="dropDownButton normal_text" id="fontFamilyDropDownButton">Arial</div>
                                </div>
                                <div className="attribute">
                                    <h4 className="normal_text text">Background Color</h4>
                                    <input type="color" className="attributeColorInput" ref={backgroundColor} onChange={refresh}></input>
                                </div>
                            </div>    
                        </section>
                    </div>
                );
            }
            return{
              activeAttributesPanel,
              hiddenAttributesPanel,
              AttributesPanelElement
            }
    }

    function FormAttributesPanel(){
            const [widgetId, setWidgetId] = useState<string>("");
            const title = useRef<HTMLInputElement|null>(null);
            const description = useRef<HTMLTextAreaElement|null>(null);
            const portfolioPopUpPanel = useRef<HTMLDivElement | null>(null);
     
            const hiddenFormAttributesPanel = ()=>{
                  portfolioPopUpPanel.current?.classList.add("hiddenPopUpPanel");
            }
            
            const activeFormAttributesPanel = (widgetIdP:string)=>{
                  const panelElement = portfolioPopUpPanel.current;
                  if(panelElement ){
                      panelElement.classList.remove("hiddenPopUpPanel");
                  }   
                  console.log("HAHA: "+widgetIdP);
                  const element = document.querySelector("#"+widgetIdP) as HTMLElement;
                  if(element){
                    setWidgetId(widgetIdP);
                  }
            }

            const refresh = ()=>{
                const element = document.querySelector("#"+widgetId) as HTMLElement;
                if(!element){
                    return;
                }

                if(title.current){
                    const titleText = element.querySelector("#title") as HTMLElement;
                    if(titleText){
                        titleText.textContent = title.current.value;
                    }
                }

                if(description.current){
                    const descriptionText = element.querySelector("#description") as HTMLElement;
                    if(descriptionText){
                        descriptionText.textContent = description.current.value;
                    }
                }

                let positionX:number = element.offsetLeft;
                let positionY:number = element.offsetTop;
                let width:any = element.offsetWidth;
                let height:any = element.offsetHeight;
                if(clickedBox.current){
                    clickedBox.current.style.marginLeft = positionX+"px";
                    clickedBox.current.style.marginTop = positionY+"px";
                    clickedBox.current.style.width = width+"px";
                    clickedBox.current.style.height = height+"px";
                }
            }
    
            const FormAttributesPanelElement: React.FC = () =>{
                const closeIconStyle:React.CSSProperties = {
                    width: 30,
                    height: 30,
                    position: "absolute",
                    top: 20,
                    right:20,
                }
                return(
                    <div>
                        <section className="popUpPanel editorPopUpPanel hiddenPopUpPanel" ref={portfolioPopUpPanel}>
                            <div className="closeIcon" onClick={hiddenFormAttributesPanel} style={closeIconStyle}></div>
                            <div className="topTitle"><h2 className="normal_text">Form</h2></div>

                            <div className="attribute">
                                
                            </div>
                            <div className="panel">
                                <div className="attribute">
                                    <h4 className="normal_text text">Title</h4>
                                    <input className="attributeInputText" ref={title} onChange={refresh}></input>
                                </div>
                                <div className="attribute">
                                    <h4 className="normal_text text">Description</h4>
                                    <textarea ref={description} onChange={refresh}></textarea>
                                </div>       
                            </div>    
                        </section>
                    </div>
                );
            }
            return{
              activeFormAttributesPanel,
              hiddenFormAttributesPanel,
              FormAttributesPanelElement
            }
    }


    function BackgroundAttributesPanel(){
            const [widgetId, setWidgetId] = useState<string>("");
            const portfolioPopUpPanel = useRef<HTMLDivElement | null>(null);
            const solidColorAttributes = useRef<HTMLDivElement| null>(null);
            const gradientAttributes = useRef<HTMLDivElement| null>(null);

            const backgroundSolidColor = useRef<HTMLInputElement| null>(null);

            const firstColorGradient = useRef<HTMLInputElement| null>(null);
            const secondColorGradient = useRef<HTMLInputElement| null>(null);
            
            var mode = "Solid Color";

            const hiddenBackgroundAttributesPanel = ()=>{
                  portfolioPopUpPanel.current?.classList.add("hiddenPopUpPanel");
            }
            
            const activeBackgroundAttributesPanel = ()=>{
                  const panelElement = portfolioPopUpPanel.current;
                  if(panelElement ){
                      panelElement.classList.remove("hiddenPopUpPanel");
                  }   
            }

            const refresh = ()=>{
                if(mode == "Solid Color"){
                    if (background.current && backgroundSolidColor.current) 
                        background.current.style.backgroundColor = backgroundSolidColor.current.value;
                }else if(mode == "Gradient"){
                    if (background.current && backgroundSolidColor.current) {
                        background.current.style.backgroundImage = `linear-gradient(to right,${firstColorGradient.current?.value},${secondColorGradient.current?.value})`;
                    }
                }

            }

    
            const BackgroundAttributesPanelElement: React.FC = () =>{
                const closeIconStyle:React.CSSProperties = {
                    width: 30,
                    height: 30,
                    position: "absolute",
                    top: 20,
                    right:20,
                }
                return(
                    <div>
                        <section className="popUpPanel editorPopUpPanel hiddenPopUpPanel" ref={portfolioPopUpPanel}>
                            <div className="closeIcon" onClick={hiddenBackgroundAttributesPanel} style={closeIconStyle}></div>
                            <div className="topTitle"><h2 className="normal_text">Background</h2></div>

                            <div className="attribute">
                                
                            </div>
                            <div className="panel">
                                <div className="attribute">
                                    <h4 className="normal_text text">Style: </h4>
                                    {Spinner(["Solid Color","Gradient","Image"],0,(selected)=>{
                                        mode = selected;
                                        if(selected == "Solid Color"){
                                            if (solidColorAttributes.current) solidColorAttributes.current.style.display = "flex";
                                            if (gradientAttributes.current) gradientAttributes.current.style.display = "none";
                                        }else if (selected == "Gradient"){
                                            if (solidColorAttributes.current) solidColorAttributes.current.style.display = "none";
                                            if (gradientAttributes.current) gradientAttributes.current.style.display = "block";
                                        }
                                    })}
                                </div>
                            
                                <div className="attribute" ref={solidColorAttributes}>
                                    <h4 className="normal_text text">Background Color</h4>
                                    <input  type="color" className="attributeColorInput" ref={backgroundSolidColor} onChange={refresh}></input>
                                </div>

                                <div ref={gradientAttributes} style={{width:"100%",display:"block"}}>
                                    <div className="attribute">
                                        <h4 className="normal_text text">Primeira Cor:</h4>
                                        <input  type="color" className="attributeColorInput" ref={firstColorGradient} onChange={refresh}></input>
                                    </div>

                                    <div className="attribute">
                                        <h4 className="normal_text text">Segunda cor:</h4>
                                        <input  type="color" className="attributeColorInput" ref={secondColorGradient} onChange={refresh}></input>
                                    </div>
                                </div>
                            </div>    
                        </section>
                    </div>
                );
            }
            return{
              activeBackgroundAttributesPanel,
              hiddenBackgroundAttributesPanel,
              BackgroundAttributesPanelElement
            }
    }


    function NewWidgetPanel(){
            const newWidgetPopUpPanel = useRef<HTMLDivElement | null>(null);
     
            const hiddenNewWidgetPanel = ()=>{
                  newWidgetPopUpPanel.current?.classList.add("hiddenPopUpPanel");
            }
            
            const activeNewWidgetPanel = ()=>{
                  const panelElement = newWidgetPopUpPanel.current;
                  if(panelElement ){
                      panelElement.classList.remove("hiddenPopUpPanel");
                  }   
            }

            const newText = ()=>{
                new Widget("text","Title", 52, "#00000","center",100,"normal","Arial, Helvetica, sans-serif")
            }

            const newForm = ()=>{
                new Widget("form","id", "formName", "description",null,null,null,null);
            }
    
            const NewWidgetPanelElement: React.FC = () =>{
                const closeIconStyle:React.CSSProperties = {
                    width: 30,
                    height: 30,
                    position: "absolute",
                    top: 20,
                    right:20,
                }
                return(
                    <div>
                        <section className="popUpPanel hiddenPopUpPanel" ref={newWidgetPopUpPanel}>
                            <div className="closeIcon" onClick={hiddenNewWidgetPanel} style={closeIconStyle}></div>
                            <div className="topTitle"><h2 className="normal_text">Adicionar um Elemento</h2></div>
    
                            <div className="panel">
                                
                                <div className="widgetButton" onClick={newText}>
                                    <div className="icon"></div>
                                    <h3 className="normal_text">Text (Label)</h3>
                                </div>

                                <div className="widgetButton" onClick={newForm}>
                                    <div className="icon"></div>
                                    <h3 className="normal_text">Formulário</h3>
                                </div>
                                
                            </div>    
                        </section>
                    </div>
                );
            }
            return{
              activeNewWidgetPanel,
              hiddenNewWidgetPanel,
              NewWidgetPanelElement
            }
    }

    return(
        <div>
            <TopNavBar/>
            <div className="notificationSection" id="notificationSection"></div>
            <AttributesPanelElement />
            <FormAttributesPanelElement />
            <NewWidgetPanelElement />
            <BackgroundAttributesPanelElement />

            <section className="pagePreviewBox">
                <div className="topBarEdit">
                    {/* <div className="pageNameBox">
                        <h2 className="normal_text" id="pageName">portfolioName</h2>
                    </div> */}
                    <div className="newWidgetButton" onClick={activeNewWidgetPanel}>
                        <div className="icon newWidgetIcon"></div>
                        <h5 className="normal_text">Novo Elemento</h5>
                    </div>
                    <div className="newWidgetButton" style={{width:120}} onClick={activeBackgroundAttributesPanel}>
                        <div className="icon backgroundIcon"></div>
                        <h5 className="normal_text">Background</h5>
                    </div>

                    <div className="newWidgetButton" onClick={activeNewWidgetPanel}>
                        <div className="icon communicationIcon"></div>
                        <h5 className="normal_text">Atributos de comunicação</h5>
                    </div>

                    <div className="topBarButtons">
                        <div className="normalButton topBarButton normal_text" style={{color:"var(--textSoloColor)"}}>Visualizar</div>
                        <div className="createPortfolioButton topBarButton normal_text">Publicar</div>
                    </div>
                </div>
                <div ref={background} className="editPreview">
                    <div id="selectedBox" className="previewSelected" ref={overBox}></div>
                    <div id="clickedBox" className="previewClicked" ref={clickedBox}>
                        <div className="sizePoint bottomRight" id="sizePointBottomRight"></div>
                        <div className="sizePoint bottomLeft"></div>
                        <div className="sizePoint topRight"></div>
                        <div className="sizePoint topLeft"></div>
                    </div>
                    <div id="createPreviewContent" className="createPreviewContent">
                        {Main}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PortfolioEditor;