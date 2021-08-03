import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import reactViews from './ProfViewStore'
import confused from './img/confused.png'
import surprised from './img/surprised.png'
import happy from './img/happy.png'
import nerd from './img/nerd.png'
import './ProfView.css'
import {
    Button
} from 'primereact/button';
import tracks from "./img/tracks.png"
import { Chart } from 'primereact/chart'

const variabila3 = localStorage.getItem("myCodeProf")


class ProfView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            feedbacks: [],
            feedback: {
                emoji: '',
                details: '',
                createdAt:''
            },

        }
                  
        this.logOut=()=>{
            window.location.replace("http://localhost:3000/#/login");
            localStorage.clear();
        }


        this.imageBodyTemplate = (rowData) => {

            
            if(rowData.emoji===1){
                return(
                <img src={nerd} style={{'width': '15%'}} alt={rowData.image} className="product-image" />)
                
            }
            if(rowData.emoji===2){
                return(
                <img src={confused} style={{'width': '15%'}} alt={rowData.image} className="product-image" />)
            }
            if(rowData.emoji===3){
                return(
                <img src={surprised} style={{'width': '15%'}} alt={rowData.image} className="product-image" />)
            }
            if(rowData.emoji===4){
                return(
                <img src={happy} style={{'width': '15%'}} alt={rowData.image} className="product-image" />)
            }
            
            
        }


        
        
    }

    componentDidMount() {
        reactViews.getAll(variabila3)
        //setInterval(this.getAll, 5000)
        reactViews.emitter.addListener('GET_ALL_SUCCESS', () => {
            this.setState({
                feedbacks: reactViews.data
            })
            
        
        })
        this.reload()
    }

    reload() {
        setTimeout(function () {
            window.location.reload();
        }, 3000);
    }


    render() {

        return(
            <div id="pageRect">
            <div id="viewFeedback">
        <div className="header">
                         <div id="logo">
                     <img src = {tracks} width="40px"></img>
                     <p id="titleHeader">The Lazy Dog</p>
                     </div>
    <Button id="logOutBtn" label='Log Out' icon='pi pi-sign-out' className='p-button p-button-outlined' onClick={this.logOut} />
    </div>
                <div id="tableContainer">

                    <DataTable id = "tableProf" value={this.state.feedbacks} >
                        <Column field="emoji" header="Reaction" class="header" style={{'display': 'none'}}></Column>
                        <Column header="Feedback" body={this.imageBodyTemplate}></Column>
                        <Column field="details" header="Message" class="header"></Column>
                        <Column field="createdAt" header="Date" class="header"></Column>
                    </DataTable>

                </div>

                </div>
            </div>
        )
    }

}
export default ProfView;