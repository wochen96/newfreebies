import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './postModal.css';


class PostModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const style = {
            height: '20vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }

        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className="modal-header" closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.onePost.data.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="modal-body">
                            <div style={style}>
                                <img src={this.props.onePost.data.url || 'http://via.placeholder.com/100x150'} height='100' width='150' />
                            </div>
                            <p><span className="modal-label"><span class="postHeaders"> Type: </span></span><span class="postValue">{this.props.onePost.data.isDefinite}</span></p>
                            <p><span className="modal-label"><span class="postHeaders">Location:  </span></span><span class="postValue">{this.props.onePost.data.location}</span></p>

                            {
                                this.props.onePost.data.isDefinite == 'limited' ?
                                    <div>
                                        <p><span className="modal-label"><span class="postHeaders">Event Date and Time: </span></span></p>
                                        <p><span className="modal-label"><span class="postHeaders"> Start date and time:</span> </span><span class="postValue">{this.props.onePost.data.startDate.toDate().toString().slice(0, -32)} hours</span></p>
                                        <p><span className="modal-label"><span class="postHeaders"> End date and time: </span></span><span class="postValue">{this.props.onePost.data.endDate.toDate().toString().slice(0, -32)} hours</span></p>
                                    </div> : null
                            }

                            <p><span className="modal-label"><span class="postHeaders">Description: </span> </span><span class="postValue">{this.props.onePost.data.description}</span></p>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <span className="mr-auto">
                            <Button variant="primary" className="mr-2" onClick={this.props.upOneVote}>Up Vote</Button>
                            <span className="mr-2">{this.props.upVote}</span>
                            <Button variant="primary" className="mr-2" onClick={this.props.downOneVote}>Down Vote</Button>
                            <span>{this.props.downVote}</span>
                        </span>

                        <span class="postValue">Created by: {this.props.onePost.data.username}</span>
                        {
                            this.props.userEmail == this.props.onePost.data.username ?
                                <div>
                                    <Button variant="secondary" className="mr-2" onClick={this.props.openEditModal}>Edit</Button>

                                    <Button variant="danger" onClick={this.props.openDeleteModal}>Delete</Button>
                                </div> : null
                        }

                    </Modal.Footer>
                </Modal>
            </div>
        );

    }
}

export default PostModal;