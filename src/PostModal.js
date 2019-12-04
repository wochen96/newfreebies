import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './postModal.css';
import { db } from './services/firebase';


class PostModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            upVote: parseInt(this.props.onePost.data.upvotes),
            downVote: parseInt(this.props.onePost.data.downvotes)
        }
    }

    upVote = e => {
        this.setState({
            upVote: this.state.upVote + 1
        }, () => {
            db.collection('posts').doc(this.props.onePost.key)
                .update({
                    upvotes: this.state.upVote.toString()
                })
                .then(function () {
                    console.log("Document successfully updated!");
                    //window.location.reload();
                    //this.props.getDataToDisplay();
                })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        });
    }

    downVote = e => {
        this.setState({
            downVote: this.state.downVote + 1
        }, () => {
            db.collection('posts').doc(this.props.onePost.key)
                .update({
                    downvotes: this.state.downVote.toString()
                })
                .then(function () {
                    console.log("Document successfully updated!");
                    //window.location.reload();
                    //this.props.getDataToDisplay();
                })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        });
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
                        <span>{this.state.upVote}</span>
                        <Button variant="primary" onClick={this.upVote}>Up Vote</Button>
                        <Button variant="primary" onClick={this.downVote}>Down Vote</Button>
                        <span>{this.state.downVote}</span>

                        <span class="postValue">Created by: {this.props.onePost.data.username}</span>
                        {
                            this.props.userEmail == this.props.onePost.data.username ?
                                <div>
                                    <Button variant="danger" onClick={this.props.openEditModal}>Edit</Button>

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