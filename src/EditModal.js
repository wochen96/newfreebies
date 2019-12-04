import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { db, auth, storage } from './services/firebase';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class EditModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.onePost.data.title,
            description: this.props.onePost.data.description,
            isDefinite: this.props.onePost.data.isDefinite,
            location: this.props.onePost.data.location,
            tag: this.props.onePost.data.tag,

            imageName: this.props.onePost.data.imageName,
            imageToUpload: null,
            imageToShow: this.props.onePost.data.url,
            url: this.props.onePost.data.url,
            progress: 0,

            startDate: null,
            endDate: null
        }

        if (this.state.isDefinite == 'limited') {
            this.state.startDate = this.props.onePost.data.startDate.toDate();
            this.state.endDate = this.props.onePost.data.endDate.toDate();
        }
    }

    editOnePost = (event) => {

        const image = this.state.imageToUpload;

        if (image == null) {
            this.editPostWithDefaultImage();
        } else {
            this.editPostWithUploadImage(image);
        }
    }

    editFunction() {
        db.collection('posts').doc(this.props.onePost.key)
            .update({
                title: this.state.title,
                location: this.state.location,
                description: this.state.description,
                url: this.state.url,
                tag: this.state.tag,
                imageName: this.state.imageName,
                //createAt: new Date('December 17, 1995 03:24:00'),
                startDate: this.state.startDate,
                endDate: this.state.endDate
            })
            .then(function () {
                console.log("Document successfully updated!");
                window.location.reload();
                //this.props.getDataToDisplay();
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        this.props.onHide();
    }

    editPostWithUploadImage = (image) => {
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

                // This statement is to delete the old image from firebase.
                if (!(this.state.imageName == 'default')) {
                    // Create a reference to the file to delete
                    var desertRef = storage.ref('images').child(this.state.imageName);

                    // Delete the file
                    desertRef.delete().then(function () {
                        // File deleted successfully
                        console.log('Delete image yes.');
                    }).catch(function (error) {
                        // Uh-oh, an error occurred!
                        console.log('error in delete the image.')
                    });
                }


                // Complete function:
                storage.ref('images').child(image.name).getDownloadURL()
                    .then(url => {

                        this.setState(function () {
                            return {
                                title: document.getElementById('inputEditTitle').value,
                                location: document.getElementById('inputEditLocation').value,
                                description: document.getElementById('inputEditDescription').value,
                                url: url,
                                imageName: image.name,
                                tag: document.getElementById('inputEditTag').value
                            }

                        }, () => this.editFunction());
                    });
            });
    }

    editPostWithDefaultImage = () => {
        this.setState(function () {
            return {
                title: document.getElementById('inputEditTitle').value,
                location: document.getElementById('inputEditLocation').value,
                description: document.getElementById('inputEditDescription').value,
                tag: document.getElementById('inputEditTag').value
            }

        }, () => this.editFunction());
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

    checkCondition = (event) => {
        if (document.getElementById('inputEditTitle').value == '' || document.getElementById('inputEditLocation').value == '' ||
            document.getElementById('inputEditDescription').value == '' || document.getElementById('inputEditTag').value == '') {
            alert('Please fill out all the missing fields!');
        } else if (this.state.isDefinite == 'limited' && (this.state.startDate == null || this.state.endDate == null)) {
            alert('Please fill out a start time and end time!');
        } else if (this.state.isDefinite == 'limited' && this.state.startDate > this.state.endDate) {
            alert('The end time have to be later than the start time.');
        } else {
            this.editOnePost(event);
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
                <Modal
                    {...this.props}
                    backdrop="static"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className="modal-header" closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            EDIT POST
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body">
                            <span className="modal-label">Title: </span><input type="text" className="form-control mb-2" placeholder="Title" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} id="inputEditTitle"></input>
                            <span className="modal-label">Location: </span><input type="text" className=" form-control mb-2" placeholder="Location" value={this.state.location} onChange={e => this.setState({ location: e.target.value })} id="inputEditLocation"></input>
                            <div>
                                <p><span>Post image (optional):</span></p>
                                <img src={this.state.imageToshow} height='100' width='150' />
                                <input type='file' onChange={this.handleImageChange} />
                                <progress className="mb-2" value={this.state.progress} max="100" />
                            </div>
                            <div>
                                <p><span className="modal-label">Type: </span>{this.state.isDefinite}</p>
                                {this.state.isDefinite === "limited" ?
                                    <div>
                                        <p>
                                            <span className="modal-label">Start Time: </span>
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={date => this.setState({ startDate: date })}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                timeCaption="time"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                className="mb-2 form-control"
                                                id="inputEditStartDate"
                                            />
                                        </p>
                                        <p>
                                            <span className="modal-label">End Time: </span>
                                            <DatePicker
                                                selected={this.state.endDate}
                                                onChange={date => this.setState({ endDate: date })}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                timeCaption="time"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                className="mb-2 form-control"
                                                id="inputEditEndDate"
                                            />
                                        </p>
                                    </div> : null
                                }
                            </div>
                            <p><span className="modal-label">Description: </span><input type="text" className="form-control mb-2" placeholder="Description" value={this.state.description} onChange={e => this.setState({ description: e.target.value })} id="inputEditDescription"></input></p>
                            <p><span className="modal-label">Tag: </span><input type="text" className="form-control mb-2" placeholder="Tag" value={this.state.tag} onChange={e => this.setState({ tag: e.target.value })} id="inputEditTag"></input></p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>CANCEL</Button>
                        <Button variant="primary" onClick={this.checkCondition}>SUBMIT</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default EditModal;

