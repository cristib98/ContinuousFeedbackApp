import React from 'react'
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import nerd from './img/nerd.png'
import confused from './img/confused.png'
import surprised from './img/surprised.png'
import happy from './img/happy.png'
import './Reactions.css'
import reactions from './ReactionsStore'
import tracks from "./img/tracks.png"

//var myStorage = window.localStorage
// localStorage.clear();

//const parseMetaRefresh = require('http-equiv-refresh');
//ESPN_refresh=window.setTimeout(function(){window.location.href='http://localhost:3000/#/ProfView'},900000)

var idActivity = localStorage.getItem("myCode")
console.log("Id" + idActivity)
    // window.onload = function() {
    //     if(!window.location.hash) {
    //         window.location = window.location + '#loaded';
    //         window.location.reload();
    //     }
    // }

function snakbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}
class Reactions extends React.Component {
    constructor(props) {
        super(props)
        this.formTemplate = () => {
            return ( <div className = 'formTemplate' >
                </div>
            )
        }
        this.state = {
            feedback: {
                emoji: '',
                details: ''
            }
        }
                    
        this.logOut=()=>{
            window.location.replace("http://localhost:3000/#/login");
            localStorage.clear();
        }

        this.handleChange = (evt) => {
            const feedback = this.state.feedback
            feedback[evt.target.name] = evt.target.value
            this.setState({
                feedback: feedback
            })

        }

        this.sendSad = () => {
            this.state.feedback.emoji = 1;

            reactions.addOne(this.state.feedback, idActivity)
                //parseMetaRefresh('5; url=http://localhost:3000/#/ProfView')
                //window.open("http://localhost:3000/#/ProfView");
                //window.location.reload()
                //adaugat
            //document.getElementById("details").value = ""
            snakbar();
        }
        this.sendConfused = () => {
            this.state.feedback.emoji = 2;
            reactions.addOne(this.state.feedback, idActivity);
            //document.getElementById("details").value = ""
            snakbar();
        }
        this.sendSurprised = () => {
            this.state.feedback.emoji = 3;
            reactions.addOne(this.state.feedback, idActivity)
           // document.getElementById("details").value = ""
            snakbar();
        }
        this.sendHappy = () => {
            this.state.feedback.emoji = 4;
            reactions.addOne(this.state.feedback, idActivity)
            //document.getElementById("details").value = ""
            snakbar();
        }
    }

    render() {
        return ( < div >
        <div id="pageRect">
<div className="header">
                         <div id="logo">
                     <img src = {tracks} width="40px"></img>
                     <p id="titleHeader">The Lazy Dog</p>
                     </div>
    <Button id="logOutBtn" label='Log Out' icon='pi pi-sign-out' className='p-button p-button-outlined' onClick={this.logOut} />
    </div>
            <div id="containerReact">
            <div className = "p-field-checkbox"
            id = "rectTot" >
            <div id = "rect1" >
            <Button className = "reactionBtn" > < img className = "reaction"
            src = { nerd }
            onClick = { this.sendSad }/></Button >
            <Button className = "reactionBtn" > 
            < img className = "reaction" src = { confused } onClick = { this.sendConfused } />
            </Button >
            </div> 
            <div id = "rect2" >
            <Button className = "reactionBtn" > < img className = "reaction"
            src = { surprised }
            onClick = { this.sendSurprised }/></Button >
            <Button className = "reactionBtn" > < img className = "reaction"
            src = { happy }
            onClick = { this.sendHappy }/></Button >
            </div> </div>
             <div className = "p-field"
            id = "detalii" >
            <label htmlFor = "details" > Detalii </label> 
            <InputText id = "details"
            type = "text"
            name = "details"
            value = { this.state.feedback.details }
            onChange = { this.handleChange }
            /> 
            </div> 
            <div id = "snackbar" > Reaction Sent! </div> 
            </div>
            </div>
            </div>
        )
    }

}
export default Reactions;