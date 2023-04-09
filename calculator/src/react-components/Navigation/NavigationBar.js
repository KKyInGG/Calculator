import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import SignInWindow from '../SignInWindow/SignInWindow';

class NavigationBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {showSignInWindow: false}
    }

    hideSignInWindow = () => {
        this.setState({showSignInWindow:false});
    }

    render(){
        return(
            <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">Basic Calculator</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Button variant="outline-success" onClick={() => this.setState({showSignInWindow: true})}>Sign In / Sign Up</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <SignInWindow show={this.state.showSignInWindow} onHide={this.hideSignInWindow}/>
            </>
        )
    }

}

export default NavigationBar;