import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import SignInWindow from '../SignInWindow/SignInWindow';

class NavigationBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {showSignInWindow: false, showLogOutButton: false}
    }

    hideSignInWindow = () => {
        this.setState({showSignInWindow:false});
    }

    handleLogOut = () => {
        window.localStorage.clear();
        this.setState({showLogOutButton: false})
        this.props.updateData()
    }

    handleLogIn = () =>{
        this.setState({showLogOutButton: true})
    }

    sendOutData = (data) => {
        console.log("here2", data);
        this.props.sendOutData(data);
    }

    render(){
        return(
            <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">Basic Calculator</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    {this.state.showLogOutButton ? <Button variant="outline-success" onClick={this.handleLogOut}>Log Out</Button> : <Button variant="outline-success" onClick={() => this.setState({showSignInWindow: true})}>Sign In / Sign Up</Button>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <SignInWindow show={this.state.showSignInWindow} onHide={this.hideSignInWindow} handleLogIn={this.handleLogIn} sendOutData={this.sendOutData}/>
            </>
        )
    }

}

export default NavigationBar;