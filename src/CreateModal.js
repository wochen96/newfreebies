import React, { Component, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { db, auth, storage } from './services/firebase';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class CreateModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createModalShow: false,
            selectedOption: 'limited',

            title: null,
            description: null,
            downvotes: null,
            isDefinite: null,
            location: null,
            tag: null,
            upvotes: null,
            startDate: null,
            endDate: null,

            imageToshow: null,
            imageToUpload: null,
            url: '',
            imageName: null,
            progress: 0
        }

        this.createOpenModal = this.createOpenModal.bind(this);
        this.createClose = this.createClose.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
        this.checkCondition = this.checkCondition.bind(this);
    }


    createOpenModal = () => {
        this.setState({ createModalShow: true })
    }

    createClose = () => this.setState({ createModalShow: false, startDate: null, endDate: null });

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }

    addNewPost = (event) => {
        const image = this.state.imageToUpload;

        if (image == null) {
            this.addNewPostWithDefaultImage();
        } else {
            this.addNewPostWithUploadImage(image);
        }
    }

    addNewPostWithUploadImage = (image) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Progess function:
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // error function:
                console.log('this is the error during upload: ' + error);
            },
            () => {
                // Complete function:
                storage.ref('images').child(image.name).getDownloadURL()
                    .then(url => {
                        this.setState(function () {

                            return {
                                title: document.getElementById('inputTitle').value,
                                location: document.getElementById('inputLocation').value,
                                description: document.getElementById('inputDescription').value,
                                isDefinite: this.state.selectedOption,
                                url: url,
                                imageName: image.name,
                                tag: document.getElementById('inputTag').value
                            }

                        }, () => this.addFunction())
                    });
            });
    }

    addNewPostWithDefaultImage = () => {
        this.setState(function () {
            return {
                title: document.getElementById('inputTitle').value,
                location: document.getElementById('inputLocation').value,
                description: document.getElementById('inputDescription').value,
                isDefinite: this.state.selectedOption,
                //url: 'https://firebasestorage.googleapis.com/v0/b/freebies-f44de.appspot.com/o/uw_icon.png?alt=media&token=40163c4d-8a5e-4406-87ee-9a4e139ab449',
                url: 'https://firebasestorage.googleapis.com/v0/b/freebies-test.appspot.com/o/uw_icon.png?alt=media&token=5edfd86e-7166-4435-83eb-cc529c7ecc65',
                imageName: 'default',
                tag: document.getElementById('inputTag').value
            }

        }, () => this.addFunction());
    }

    handleImageChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({
                imageToshow: URL.createObjectURL(image),
                imageToUpload: image
            })
        }
    }

    addFunction() {
        db.collection('posts')
            .add({
                title: this.state.title,
                location: this.state.location,
                description: this.state.description,
                downvotes: '0',
                endDate: this.state.endDate,
                isDefinite: this.state.isDefinite,
                url: this.state.url,
                startDate: this.state.startDate,
                tag: this.state.tag,
                upvotes: '0',
                imageName: this.state.imageName,
                createAt: new Date(),
                username: this.props.userEmail
            })
            .then(res => {
                console.log(res.id);
                // this.props.onUpdate();
                window.location.reload();
            })
        this.createClose();
    }

    checkCondition = (event) => {
        if (document.getElementById('inputTitle').value == '' || document.getElementById('inputLocation').value == '' ||
            document.getElementById('inputDescription').value == '' || document.getElementById('inputTag').value == '') {
            alert('Please fill out all the missing fields!');
        } else if (this.state.selectedOption == 'limited' && (this.state.startDate == null || this.state.endDate == null)) {
            alert('Please fill out a start time and end time!');
        } else if (this.state.selectedOption == 'limited' && this.state.startDate > this.state.endDate) {
            alert('The end time have to be later than the start time.');
        } else {
            this.addNewPost(event);
        }
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
                <Modal show={this.state.createModalShow} onHide={this.createClose} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body">

                            <input type="text" id="inputTitle" className="form-control mb-2" placeholder="Title"/>
                            <input type="text" id="inputLocation" className="form-control mb-2" placeholder="Location"/>

                            <div>
                                <p><span>Post image (optional):</span></p>
                                <img src={this.state.imageToshow} height='100' width='150' />
                                <input type='file' onChange={this.handleImageChange} />
                                <progress className="mb-2" value={this.state.progress} max="100" />

                                {/* <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height='300' width='400' /> */}
                            </div>


                            <div>
                                <p>Event time limit</p>
                                <div className="form-check form-check-inline">
                                    <input type="radio" value="limited" id="inputDefinite" checked={this.state.selectedOption === 'limited'} onChange={this.handleOptionChange} />
                                    <label className="form-check-label">Limited</label>
                                </div>
                                <div className="form-check form-check-inline mb-2">
                                    <input type="radio" value="unlimited" id="inputIndefinite" checked={this.state.selectedOption === 'unlimited'} onChange={this.handleOptionChange} />
                                    <label className="form-check-label">Unlimited</label>
                                </div>
                                
                                {this.state.selectedOption === "limited" ?
                                    <div>
                                        <p><span className="modal-label">Event Time: </span></p>
                                            
                                            <DatePicker
                                                placeholderText="Start Time"
                                                selected={this.state.startDate}
                                                onChange={date => this.setState({ startDate: date })}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                timeCaption="time"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                className="mb-2 form-control"
                                                id="inputStartDate"
                                            />
                              
                                            <DatePicker
                                                placeholderText="End Time"
                                                selected={this.state.endDate}
                                                onChange={date => this.setState({ endDate: date })}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                timeCaption="time"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                className="mb-2 form-control"
                                                id="inputEndDate"
                                            />

                                    </div> : null
                                }
                            </div>
                            
                            <textarea id="inputDescription" className="form-control mb-2" placeholder="Description"></textarea>
                            <input type="text" id="inputTag" className="form-control mb-2" placeholder="Tag"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.createClose}>
                            CANCEL
                            </Button>
                        <Button variant="primary" onClick={this.checkCondition}>
                            SUBMIT
                            </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        );

    }
}

export default CreateModal;