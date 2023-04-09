import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class SignInWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showSignInWindow: true}
    }

    handleCancelButton = () => {
        this.props.onHide();
        this.setState({showSignInWindow: true});
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
                        placeholder="ex.user123"
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
                    <Button variant="success" onClick={this.props.onHide}>Log In</Button>
                    </> :
                    <>
                    <Button variant="success" onClick={this.props.onHide}>Sign Up</Button>
                    </>
                }
                </Modal.Footer>
          </Modal>
        )
    }

}

export default SignInWindow;