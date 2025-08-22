 var html = [];
        var textNumber = 1;
        function showHtml(){
            let htmlTxt = "";
            for(let i=0;i < html.length;i++){
                htmlTxt += html[i];
            }
            console.log(htmlTxt);
        }

        class DefaultElements{
            constructor(){
                this.text = "Hello World";
                this.color = "black";
                this.x = 40;
                this.y = 20;

                this.size = 40
                this.width = 'auto'
                this.height = 'auto'
                this.aligment = 'center'
                this.borderSize = 3
                this.borderColor = 'black'
                this.borderRadius = 10
                this.backgroundColor = 'none'
                this.fontFamily = "arial";

                this.nameFunction
                this.idRandom = "Text"+textNumber;
                this.htmlArrayPosition;
                this.htmlCode;
                this.element;
            }
            html(){
                if(this.element == "button"){
                    this.text = "My Button";
                }
                this.htmlCode = `<${this.element} id='${this.idRandom}' 
                style='
                color:${this.color};
                font-size: ${this.size}px;
                margin-left:${this.x}px;
                position:absolute;
                width:${this.width}px;height:${this.height}px;
                border-radius: ${this.borderRadius}px;
                border:${this.borderSize}px solid ${this.borderColor};
                background-color: ${this.backgroundColor};
                font-family: ${this.fontFamily};
                '
                onmouseover='showBorder("${this.idRandom}",${JSON.stringify(this)})'>
                ${this.text}</${this.element}>`;
                //return this.htmlCode;
            }
        }

        class editTextElement{
            constructor(element){
                this.text = "Type Something";
                this.color = "black";
                this.x = 40;
                this.y = 20;

                this.size = 40
                this.width = 'auto'
                this.height = 'auto'
                this.aligment = 'center'
                this.borderSize = 3
                this.borderColor = 'black'
                this.borderRadius = 10
                this.backgroundColor = 'none'
                this.fontFamily = "arial";

                this.nameFunction
                this.idRandom = "Text"+textNumber;
                this.htmlArrayPosition;
                this.htmlCode;
                this.element = "input";
            }
            html(){
                this.htmlCode = `<input id='${this.idRandom}' 
                placeholder='${this.text}'
                style='
                color:${this.color};
                font-size: ${this.size}px;
                margin-left:${this.x}px;
                position:absolute;
                width:${this.width}px;height:${this.height}px;
                border-radius: ${this.borderRadius}px;
                border:${this.borderSize}px solid ${this.borderColor};
                background-color: ${this.backgroundColor};
                font-family: ${this.fontFamily};
                '
                onmouseover='showBorder("${this.idRandom}",${JSON.stringify(this)})'>`;
                //return this.htmlCode;
            }
        }

        class DivBox{
            constructor(){
                this.color = "black";
                this.x = 40;
                this.y = 20;

                this.size = 40
                this.width = 100
                this.height = 100
                this.aligment = 'center'
                this.borderSize = 3
                this.borderColor = 'black'
                this.borderRadius = 10
                this.backgroundColor = 'none'
                this.fontFamily = "arial";

                this.nameFunction
                this.idRandom = "Text"+textNumber;
                this.htmlArrayPosition;
                this.htmlCode;
                this.element = "div";
            }
            html(){
                this.htmlCode = `<div id='${this.idRandom}' 
                style='
                color:${this.color};
                margin-left:${this.x}px;
                position:absolute;
                width:${this.width}px;height:${this.height}px;
                border-radius: ${this.borderRadius}px;
                border:${this.borderSize}px solid ${this.borderColor};
                background-color: ${this.backgroundColor};
                '
                onmouseover='showBorder("${this.idRandom}",${JSON.stringify(this)})'>
                </div>`;
                //return this.htmlCode;
            }
        }


        function refresh(nameClass){
            let previewSection = document.getElementById('createPreviewContent');
            switch(nameClass.element){
                case ("h1"):
                    html[nameClass.htmlArrayPosition] = 
                    `<${nameClass.element} 
                    id='${nameClass.idRandom}' 
                    style='color:${nameClass.color};
                    font-size: ${nameClass.size}px;
                    margin-left:${nameClass.x}px;
                    margin-top:${nameClass.y}px;
                    width:${nameClass.width}px;height:${nameClass.height}px;
                    border-radius: ${nameClass.borderRadius}px;
                    border:${nameClass.borderSize}px solid ${nameClass.borderColor};
                    background-color: ${nameClass.backgroundColor};
                    font-family: ${nameClass.fontFamily};
                    position:absolute' 
                    onmouseover='showBorder("${nameClass.idRandom}",${JSON.stringify(nameClass)})'>
                    ${nameClass.text}
                    </${nameClass.element}>`;
                break;
                case ("button"):
                    html[nameClass.htmlArrayPosition] = 
                    `<${nameClass.element} 
                    id='${nameClass.idRandom}' 
                    style='color:${nameClass.color};
                    font-size: ${nameClass.size}px;
                    margin-left:${nameClass.x}px;
                    margin-top:${nameClass.y}px;
                    width:${nameClass.width}px;height:${nameClass.height}px;
                    border-radius: ${nameClass.borderRadius}px;
                    border:${nameClass.borderSize}px solid ${nameClass.borderColor};
                    background-color: ${nameClass.backgroundColor};
                    font-family: ${nameClass.fontFamily};
                    position:absolute' 
                    onmouseover='showBorder("${nameClass.idRandom}",${JSON.stringify(nameClass)})'>
                    ${nameClass.text}
                    </${nameClass.element}>`;
                break;
                case("input"):
                    html[nameClass.htmlArrayPosition] = `<input id='${nameClass.idRandom}' 
                        placeholder='${nameClass.text}'
                        style='
                        color:${nameClass.color};
                        font-size: ${nameClass.size}px;
                        margin-left:${nameClass.x}px;
                        margin-top:${nameClass.y}px;
                        position:absolute;
                        width:${nameClass.width}px;height:${nameClass.height}px;
                        border-radius: ${nameClass.borderRadius}px;
                        border:${nameClass.borderSize}px solid ${nameClass.borderColor};
                        background-color: ${nameClass.backgroundColor};
                        font-family: ${nameClass.fontFamily};
                        '
                        onmouseover='showBorder("${nameClass.idRandom}",${JSON.stringify(nameClass)})'>`
                break;
                case("div"):
                    html[nameClass.htmlArrayPosition] = `<div id='${nameClass.idRandom}' 
                        style='
                        color:${nameClass.color};
                        margin-left:${nameClass.x}px;
                        margin-top:${nameClass.y}px;
                        position:absolute;
                        width:${nameClass.width}px;height:${nameClass.height}px;
                        border-radius: ${nameClass.borderRadius}px;
                        border:${nameClass.borderSize}px solid ${nameClass.borderColor};
                        background-color: ${nameClass.backgroundColor};
                        '
                        onmouseover='showBorder("${nameClass.idRandom}",${JSON.stringify(nameClass)})'>
                        </div>`;
                break;
            }

            let trueHtml = "";
            for(let i = 0;i < html.length;i++){
                trueHtml = trueHtml+html[i];
            }
            previewSection.innerHTML = trueHtml;
        }

        

        function pressed(command){
            let numberArrayHtml;
            let type;
            switch (command){
                case "text":
                    numberArrayHtml = html.length; 
                    type = new DefaultElements();
                    type.element = "h1"
                    type.htmlArrayPosition = numberArrayHtml;
                    type.html()
                break;
                case "button":
                    numberArrayHtml = html.length; 
                    type = new DefaultElements();
                    type.element = "button"
                    type.htmlArrayPosition = numberArrayHtml;
                    type.html()
                break;
                case "input":
                    numberArrayHtml = html.length; 
                    type = new editTextElement();
                    type.htmlArrayPosition = numberArrayHtml;
                    type.html()
                    break;
                case "div":
                numberArrayHtml = html.length; 
                    type = new DivBox();
                    type.htmlArrayPosition = numberArrayHtml;
                    type.html()
                    break;                    
            }

            html[numberArrayHtml] = type.htmlCode;
            textNumber++;
            faca();
        }
        
        function faca(){
            // teste = new Text();
            // teste.text = "facinha";
            // teste.color = "red";
            // teste.x = 200;

            // html = teste.html();
            let trueHtml = "";
            for(let i = 0;i < html.length;i++){
                trueHtml = trueHtml+html[i];
            }

            let section = document.getElementById('createPreviewContent');
            // section.srcdoc = "<html><body>"+html+"</html>";
            section.innerHTML = trueHtml;
        }


        function setAttributesOfEditBox(classElement){
            let editBox = document.getElementById('proprietyAtributesBox');
            let editText = document.getElementById('attributeEditText');
            let editTextColor = document.getElementById('attributeEditTextColor');
            let editTextSize = document.getElementById('attributeEditTextSize');
            let editTextAligment = document.getElementById('attributeEditTextAligment');
            let editWidth = document.getElementById('attributeEditWidth');
            let editHeight = document.getElementById('attributeEditHeight');
            let editBorderSize = document.getElementById('attributeEditBorderSize');
            let editBorderColor = document.getElementById('attributeEditBorderColor');
            let editBorderRadius = document.getElementById('attributeEditBorderRadius');
            let editBackgroundColor = document.getElementById('attributeEditBackgroundColor');

            let saveButton = document.getElementById('attributeEditSaveButton');

            let sizePointBottomRight = document.getElementById('sizePointBottomRight');

            editText.value = classElement.text;
            editTextColor.value = classElement.color;
            editTextSize.value = classElement.size;
            editTextAligment.value = classElement.aligment;
            editWidth.value = classElement.width;
            editHeight.value = classElement.height;
            editBorderSize.value = classElement.borderSize;
            editBorderColor.value = classElement.borderColor;
            editBorderRadius.value = classElement.borderRadius;
            editBackgroundColor.value = classElement.backgroundColor;

            


            document.addEventListener('keydown',function(e){
                if(e.key == 'Enter'){
                if(classElement.htmlArrayPosition== currentArray){
                    classElement.text= editText.value;
                    classElement.color= editTextColor.value;
                    classElement.size= editTextSize.value;
                    classElement.aligment= editTextAligment.value;
                    classElement.width= editWidth.value;
                    classElement.height= editHeight.value;
                    classElement.borderSize= editBorderSize.value;
                    classElement.borderColor= editBorderColor.value;
                    classElement.borderRadius= editBorderRadius.value;
                    classElement.backgroundColor= editBackgroundColor.value;
                    refresh(classElement);
                }
                }
            })
        }

        

        var currentArray;
        var currentArrayInMove;
        var clicked = false;

        
        function showBorder(id,nameClass){
            let previewSection = document.getElementById('createPreviewContent');
            let boxSelect = document.getElementById('selectedBox');
            let boxClicked = document.getElementById('clickedBox');

            let elem = document.getElementById(id);
            let proprietyBox = document.getElementById('proprietyBox');
            let showEditButton = document.getElementById('editProprietyButton');

            let editBox = document.getElementById('proprietyAtributesBox');

            let xInput = document.getElementById("positionX");
            let yInput = document.getElementById("positionY");
            let idText = document.getElementById("idTextInput");
            let deleteButton = document.getElementById("deleteButton");

            //elem.classList.add("previewSelected");
            let elementWidth = document.getElementById(nameClass.idRandom).offsetWidth;
            let elementHeight = document.getElementById(nameClass.idRandom).offsetHeight;
            let elementMarginLeft = document.getElementById(nameClass.idRandom).offsetLeft;
            let elementMarginTop = document.getElementById(nameClass.idRandom).offsetTop;

            deleteButton.addEventListener('click',function(){
                if(nameClass.htmlArrayPosition == currentArray){
                    html[nameClass.htmlArrayPosition] = "";
                    let trueHtml = "";
                    for(let i = 0;i < html.length;i++){
                        trueHtml = trueHtml+html[i];
                    }
                    previewSection.innerHTML = trueHtml;
                    proprietyBox.classList.add("invisible");
                    editBox.classList.add("invisible");
                    boxClicked.style = "display:none";
                    boxSelect.style = "display:none";
                }
                
            })


            let over = true;

            //if(!clicked){
                boxSelect.style = "width: "+elementWidth+"px;height: "
                +elementHeight+"px;margin-left:"+elementMarginLeft+"px;margin-top:"
                +elementMarginTop+"px;display:flex;";
            //}
            elem.addEventListener('mousedown',function(event){
                    editBox.classList.add('invisible')
                    over = true;
                    let mouseInPositionX = event.clientX - document.getElementById(nameClass.idRandom).getBoundingClientRect().left;
                    let mouseInPositionY = event.clientY - document.getElementById(nameClass.idRandom).getBoundingClientRect().top;

                    document.addEventListener('mousemove',function(event){
                        if(over){
                            let currentElement = document.getElementById(nameClass.idRandom);
                            let distanceLeft = previewSection.getBoundingClientRect().left; 
                            let distanceTop = previewSection.getBoundingClientRect().top;
                            currentArrayInMove = nameClass.htmlArrayPosition;

                            let currentPositionX = (event.clientX-distanceLeft)-mouseInPositionX;
                            let currentPositionY = (event.clientY-distanceTop)-mouseInPositionY;
                            nameClass.x = currentPositionX;
                            nameClass.y = currentPositionY;

                            boxClicked.style = "display:none";
                            boxClicked.classList.add('invisible');

                            let distanceTopPropertyBox = document.getElementById(nameClass.idRandom).offsetHeight + document.getElementById(nameClass.idRandom).getBoundingClientRect().top + 20;
                            let distanceLeftPropertyBox = previewSection.getBoundingClientRect().left;  
                            proprietyBox.style = "margin-top:"+distanceTopPropertyBox+"px;margin-left:"+(nameClass.x+distanceLeft-20)+"px;z-index:3;";

        
                            if(nameClass.htmlArrayPosition == currentArrayInMove){
                                refresh(nameClass);
                                xInput.value = nameClass.x;
                                yInput.value = nameClass.y;
                                document.getElementById(nameClass.idRandom).addEventListener('click',function(){
                                    console.log('clicked');
                                    proprietyBox.classList.remove('invisible');
                                    
                                })
                            }
                        }
                    });
            })
            document.addEventListener('mouseup',function(){
                over= false;
            })
                 
            
            elem.addEventListener('click',function(){

                let sizeOver = true;
                sizePointBottomRight.addEventListener('mousedown',function(event){
                    document.addEventListener('mousemove',function(event){
                        if(sizeOver){
                            //currentElement.getBoundingClientRect().left
                            let currentElement = document.getElementById(nameClass.idRandom);
                            let currentWidth = event.clientX - currentElement.getBoundingClientRect().left
                            let currentHeight = event.clientY - currentElement.getBoundingClientRect().top
                            nameClass.width = currentWidth;
                            nameClass.height = currentHeight;

                            boxClicked.style = "width: "+currentElement.offsetWidth+"px;height: "
                            +currentElement.offsetHeight+"px;margin-left:"+currentElement.offsetLeft+"px;margin-top:"
                            +currentElement.offsetTop+"px;display:flex;";
                            boxClicked.classList.remove('invisible');

                            let distanceTopPropertyBox = document.getElementById(nameClass.idRandom).offsetHeight + document.getElementById(nameClass.idRandom).getBoundingClientRect().top + 20;
                            let distanceLeftPropertyBox = previewSection.getBoundingClientRect().left;  
                            proprietyBox.style = "margin-top:"+distanceTopPropertyBox+"px;margin-left:"+(nameClass.x+distanceLeft-20)+"px;z-index:3;";


                            if(nameClass.htmlArrayPosition == currentArray){
                            refresh(nameClass)
                            console.log("refreshing22222");
                            }
                        }
                    })
                })
                document.addEventListener('mouseup',function(){
                    sizeOver = false;
                })

                // sizePointBottomRight.addEventListener('drag',function(event){
                //     event.preventDefault();
                // })
                
                //elem.classList.remove("previewSelected");
                //elem.classList.add("previewClicked");
                boxClicked.style = "width: "+elementWidth+"px;height: "
                +elementHeight+"px;margin-left:"+elementMarginLeft+"px;margin-top:"
                +elementMarginTop+"px;display:flex;";
                boxClicked.classList.remove('invisible');


                clicked = true;

                let distanceTop = document.getElementById(nameClass.idRandom).offsetHeight + document.getElementById(nameClass.idRandom).getBoundingClientRect().top + 20;
                let distanceLeft = previewSection.getBoundingClientRect().left;  

   
                proprietyBox.classList.remove('invisible')

                showEditButton.addEventListener('click',function(){
                    editBox.classList.remove('invisible');
                    editBox.style = "margin-top:"+(distanceTop+30)+"px;margin-left:"+(nameClass.x+distanceLeft-20)+"px;z-index:4;"
                    setAttributesOfEditBox(nameClass);
                })



                proprietyBox.style = "margin-top:"+distanceTop+"px;margin-left:"+(nameClass.x+distanceLeft-20)+"px;z-index:3;";
                xInput.value = nameClass.x;
                yInput.value = nameClass.y;
                idText.value = nameClass.idRandom;

                currentArray = nameClass.htmlArrayPosition;



                document.addEventListener('click',function(event){
                    if(!document.getElementById(nameClass.idRandom).contains(event.target) && !(document.getElementById('proprietyBox')).contains(event.target)
                        && !editBox.contains(event.target)){

                        if(currentArray == nameClass.htmlArrayPosition){
                            boxClicked.style = "display:none;"; 
                            boxSelect.style = "display:none;";  

                            proprietyBox.classList.add('invisible');
                            editBox.classList.add('invisible');
                            currentArray = null;
                            clicked = false;
                        }
                    }
                })
            })
            elem.addEventListener('mouseleave',function(){
                if(!clicked){
                    boxSelect.style = "display: none;";
                }
            })
        }