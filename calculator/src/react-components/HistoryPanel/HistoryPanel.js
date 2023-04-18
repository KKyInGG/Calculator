import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class HistoryPanel extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    handleCancelButton = () => {
        this.props.onHide();

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
                    Your History Equation:
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    {
                        this.props.data.map(equation => {
                            return <p>{equation}</p>
                        })
                    }
                    </div>
                </Modal.Body>
          </Modal>
        )
    }

}

export default HistoryPanel;