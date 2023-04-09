import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import './ButtonBody.css'


class ButtonBody extends React.Component{

    constructor(props) {
        super(props);
        this.state = {hasMemoryValue: false, displayValue: "0", memoryValue: "", hasSqrt: false};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    getResult = (curDisplayText) => {
        try{
            curDisplayText = curDisplayText.replace("%", "* 0.01");
            curDisplayText = curDisplayText.replace("Exp", "**");
            curDisplayText = curDisplayText.replace("Sqrt", "1*Math.sqrt");
            return String(eval(curDisplayText));
        }
        catch(error){
            return "Error";
        }
    }

    handleClick(event){
        var curChar = event.target.value;
        var curDisplayText = this.state.displayValue;
        var curMemoryText = this.state.memoryValue;
        if (curDisplayText == "Error"){
            curDisplayText = "0"
        }
        if(curDisplayText == "0"){
            if(curChar == "0"){
                curChar = "";
            }
            else if(curChar > "0" && curChar <= "9" || curChar == "Sqrt" || curChar == "Exp" || curChar == "(" || curChar == ")"){
                curDisplayText = "";
            }
        }

        if(curChar == "AC"){
            curDisplayText = "0";
        }
        else if(curChar == "CE"){
            if(curDisplayText == "Error" || curDisplayText.length == 1){
                curDisplayText = "0"
            }
            else{
                curDisplayText = curDisplayText.substring(0,curDisplayText.length-1);
            }
        }
        else if(curChar == "MC"){
            curMemoryText = "";
            this.setState({hasMemoryValue: false});
        }
        else if(curChar == "MR"){
            curDisplayText = curDisplayText + curMemoryText;
        }
        else if(curChar == "M+"){
            const curResult = this.getResult(curMemoryText + "+" + curDisplayText);
            if(curResult != "Error"){
                this.setState({hasMemoryValue: true});
                curMemoryText = curResult;
            }
        }
        else if(curChar == "M-"){
            const curResult = this.getResult(curMemoryText + "-" + curDisplayText);
            if(curResult != "Error"){
                this.setState({hasMemoryValue: true});
                curMemoryText = curResult;
            }
        }
        else if(curChar == "="){
            curDisplayText = this.getResult(curDisplayText);
        }
        else if(curChar == "Sqrt"){
            curDisplayText += "Sqrt("
        }
        else if(curChar == "Exp"){
            curDisplayText += "Exp("
        }
        else{
            curDisplayText += curChar
        }
        console.log(curDisplayText);
        if(curDisplayText == "NaN"){
            curDisplayText = "Error"
        }
        this.setState({displayValue: curDisplayText, memoryValue: curMemoryText})
        
    }

    handleChange(event){
        console.log(event);
    }

    render(){
        const elements = 
        [["AC", "(",")","CE"],
        ["MC","MR","M-","M+"],
        ["HIS","%","Sqrt","Exp"],
        ["7","8","9","/"],
        ["4","5","6","*"],
        ["1","2","3","-"],
        ["0",".","=","+"]]

        return(
                <div className="buttonBody">
                    {this.state.hasMemoryValue ? <span id="memoryText">Memory Value: {this.state.memoryValue}</span> : <span>No Memory Value</span>}
                    <input class="form-control displayBox" variant="light" value={this.state.displayValue} onChange={this.handleChange}></input>
                    {
                        elements.map(element => {
                            const buttons = element.map(value => {
                                return (<Button className="button" id={value} disabled={value == "MR" ? !this.state.hasMemoryValue : false}value={value} onClick={this.handleClick} variant={value == "MR" && this.state.hasMemoryValue ? "secondary" : "light"}>{value}</Button>)
                            })
                            return (
                                <ButtonToolbar className="buttonGroup">
                                    {buttons}
                                </ButtonToolbar>
                            )
                        })
                    }
                </div>
        )
    }

}

export default ButtonBody;