import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class SignInWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showSignInWindow: true, passWord: "", userName: "", userData: null}
    }

    handleCancelButton = () => {
        this.props.onHide();
        this.setState({showSignInWindow: true});
    }
    
    handleLogIn = () =>{
        const curPassWord = this.state.passWord;
        const curUserName = this.state.userName;
        console.log(curUserName);
        const url = "http://localhost:3001/login";
        const request = new Request(url, {
            method: "post",
            body: JSON.stringify({username: curUserName, password: curPassWord}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        fetch(request).then(res => {
            if(res.status == 201){
                console.log("Log In succesful!");
                this.handleCancelButton();
                res.json().then((data) => {
                    console.log(data.token);
                    window.localStorage.setItem("token", data.token);
                    this.props.handleLogIn();
                    // window.location.href = "./userDetails";
                    this.setUpUserData();
                })
            }
            else{
                console.log("User or Password Incorrect");
            }
        }).catch(error =>{
            console.log(error);
        })

    }
    setUpUserData = () => {
        console.log("setUpData");
        const url = "http://localhost:3001/userData";
        const request = new Request(url, {
            method: "post",
            body: JSON.stringify({token: window.localStorage.getItem("token")}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        fetch(request).then(res => {
            if(res.status == 201){
                res.json().then(data => {
                    console.log("here1", data);
                    this.props.sendOutData(data);
                })
            }
            else{
                console.log("Could not add User!")
            }

        }).catch(error =>{
            console.log(error);
        })
    }

    createNewAccount = () => {
        const curPassWord = this.state.passWord;
        const curUserName = this.state.userName;
        console.log(curUserName);
        const url = "http://localhost:3001/register";
        const request = new Request(url, {
            method: "post",
            body: JSON.stringify({username: curUserName, password: curPassWord}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        fetch(request).then(res => {
            if(res.status == 200){
                console.log("Sign up succesful!")
            }
            else{
                console.log("Could not add User!")
            }

        }).catch(error =>{
            console.log(error);
        })
    }

    render(){
        return(
            <Modal
                show={this.props.show}
                sdialogClassName="modal-50w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={this.handleCancelButton}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Welcome to Basic Calculator!
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder=""
                        value = {this.state.userName}
                        onChange={e => this.setState({userName: e.target.value })}
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder=""
                        value = {this.state.passWord}
                        onChange={e => this.setState({passWord: e.target.value })}
                        autoFocus
                    />
                    <small variant="danger">Incorrect Username or Password!</small>
                    </Form.Group>
                    {/* <Form.Check>

                    </Form.Check> */}
                </Form>
                </Modal.Body>
                <Modal.Footer>
                {
                    this.state.showSignInWindow ?
                    <>
                    <Button onClick={() => this.setState({showSignInWindow:false})}>Create Account</Button>
                    <Button variant="success" onClick={this.handleLogIn}>Log In</Button>
                    </> :
                    <>
                    <Button variant="success" onClick={this.createNewAccount}>Sign Up</Button>
                    </>
                }
                </Modal.Footer>
          </Modal>
        )
    }

}

export default SignInWindow;