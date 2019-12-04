import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class DeleteModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Modal
                    {...this.props}
                    backdrop="static"
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Body>
                        Are you sure you want to delete this post?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleDeleteOnePost}>YES</Button>
                        <Button variant="danger" onClick={this.props.onHide}>NO</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );

    }
}

export default DeleteModal;