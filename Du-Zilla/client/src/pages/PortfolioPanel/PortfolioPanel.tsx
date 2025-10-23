import React from "react"
import "../style.css"
import "./portfolioPanel.css"


function PortfolioPanel(){
    return(
        <div>
        <div className="backgroundWallpeaper"></div>
        <section className="bodyPanelStyle"></section>

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
            </ul>
        </div>
        <div className="signButtonsBox" id="notLogedBox" style={{display: "none"}}>  
            <a href="login"><div className="signInButton"><h4 className="normal_text">Sign in</h4></div></a>
            <a href="signUp"><div className="signUpButton"><h4 className="normal_text">Sign Up</h4></div></a>
        </div>
        </nav>

        <div className="loadingPopUp" id="loadingPopUp"><div className="loadingIcon"></div></div>

        <section className="popUpPanel hiddenPopUpPanel" id="formPopUpPanel">
            <div className="closeButton" id="formPopUpCloseButton"></div>
            <h2 className="formName normal_text">Form name1</h2>
            <div className="loadingBox" id="userProposalBoxLoadingIcon">
                <div className="loadingIcon2"></div>
            </div>
            <div className="usersProposalPanel" id="usersProposalPanel">
                {/* <!-- <div className="userProposalBox">
                    <div className="userBox">
                    <div className="userIcon"></div>
                        <h4 className="userName normal_text">User Name</h4>
                        <h5 className="userNameId normal_text">userNameId</h5>
                        <div className="profileButton normal_text">See profile</div>
                    </div>
                    <div className="proposalBox">
                        <input className="contact normal_text" value="user email or phone number" readonly>
                        <textarea className="proposalDescription normal_text" readonly>Sou capaz</textarea>
                    </div>
                </div> --> */}
            </div>
        </section>
        <section className="blackFilter hiddenBlackFilter" id="blackFilter"></section>

        <section className="actionBar">
            <h3 className="normal_text" id="projectName">Portfolio name</h3>
            {/* <!-- <h3 className="normal_text">https://link.com/</h3> --> */}
            <div className="buttonBox">
                <div className="dropDownBox" id="visibilityDropDownButton">
                    <div className="icon public"></div>
                    <p className="normal_text">Public</p>
                    <div className="arrow down"></div>
                </div>
                <ul className="dropDown" id="visibilityDropDown">
                    <li>Public</li>
                    <li>Private</li>
                    <li>Just me</li>
                </ul>
                {/* <!-- <div className="button" id="saveButton"><p>Save</p></div> --> */}
                <div className="button" id="publishButton"><p>Publish</p></div>
            </div>
        </section>

        <section className="attributesPanel">
            <div className="editTextBox" id="portfolioNameBox">
                <div className="textTitleBox"><p className="normal_text">Portfolio Name</p></div>
                <input id="portfolioNameInput" placeholder="Portfolio Name"/>
            </div>

            <div className="dropDownBox" id="categoryDropDownButton">
                <p className="normal_text">Personal</p>
                <div className="arrow down"></div>
            </div>
            <ul className="dropDown" id="categoryDropDown">
                <li id="buisness">Buisness</li>
                <li id="personal">Personal</li>
                <li id="hiring">Hiring</li>
                <li id="store">Store</li>
                <li id="other">Other</li>
            </ul>

            <div className="editTextBoxDescription" id="portfolioDescriptionBox">
                <div className="textTitleBox"><p className="normal_text">Description</p></div>
                <textarea id="portfolioDescriptionInput" placeholder="Description"></textarea>
            </div>

            <div className="editTextBoxDescription" id="tagsBox">
                <div className="textTitleBox"><p className="normal_text">Tags</p></div>
                <textarea id="tagsInput" placeholder="Tags"></textarea>
            </div>

            <div className="uploadImage">
                <div className="textTitleBox"><p className="normal_text">Banner</p></div>
                <div className="icon"></div>
                <div className="info"><p>Upload image</p></div>
                <div className="blackFilter"></div>
                <div className="background"></div>
            </div>

            <section className="previewBox">
                <div className="textTitleBox"><p className="normal_text">Preview</p></div>

                {/* thunbNail */}
                

            </section>
        </section>

        <section className="portfolioPanel">

            <div className="editPortfolioBox" id="editPortfolioBox">
                <div className="textTitleBox"><p className="normal_text">Portfolio</p></div>
                <div className="icon"></div>
                <div className="info"><p>Edit Portfolio</p></div>
                <div className="blackFilter"></div>
                <div className="background"></div>
            </div>

            <div className="formsPanel" id="formsPanel">
                <div className="textTitleBox"><p className="normal_text">Forms</p></div>
                <div className="noFormsMessage" ><h3 className="normal_text">There are not forms in your portfolio.</h3></div>

                {/* <!-- <div className="formBox">
                    <div className="formIcon"></div>
                    <h3 className="normal_text">Form Name</h3>
                    <div className="assignment">
                        <div className="assignmentIcon"></div>
                        <p className="normal_text">0</p>
                    </div>
                    <div className="readButton normal_text">Read</div>
                </div> --> */}

            
            </div>
            
            <div className="ratesPanel">
                <div className="textTitleBox"><p className="normal_text">Rates</p></div>

                <div className="rateBox">
                    <div className="starIcon"></div>
                    <p>5</p>
                    <div className="rateLevelBar">
                        <div className="percent"></div>
                    </div>
                </div>


                <div className="rateBox">
                    <div className="starIcon"></div>
                    <p>4</p>
                    <div className="rateLevelBar">
                        <div className="percent"></div>
                    </div>
                </div>

                <div className="rateBox">
                    <div className="starIcon"></div>
                    <p>3</p>
                    <div className="rateLevelBar">
                        <div className="percent"></div>
                    </div>
                </div>

                <div className="rateBox">
                    <div className="starIcon"></div>
                    <p>2</p>
                    <div className="rateLevelBar">
                        <div className="percent"></div>
                    </div>
                </div>

                <div className="rateBox">
                    <div className="starIcon"></div>
                    <p>1</p>
                    <div className="rateLevelBar">
                        <div className="percent"></div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default PortfolioPanel;