import React, { Component } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import PostView from './PostView';
import './PostCardDetail.css';

class PostCardDetail extends Component {
    constructor(props) {
        super(props);

        this.refPostView = React.createRef();
    }    

    onPostClick = () => {
        const currentPostView = this.refPostView.current;

        if (currentPostView.state.showPostModal == false) {
            currentPostView.openPostModal();
            //console.log("onPostClick are called and show PostView");
        }
    }

    render() {
        return (
            <div>
                <PostView ref={this.refPostView} onePost={this.props.onePost} userEmail={this.props.userEmail} getDataToDisplay={this.props.getDataToDisplay}></PostView>

                <Card onClick={this.onPostClick}>
                    <Card.Img id = "cardImg" variant="top" src={this.props.onePost.data.url} height="200" width="100" />
                    <Card.Body>
                        <Card.Title style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>{this.props.onePost.data.title}</Card.Title>
                        <Card.Text id="cardText" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            {this.props.onePost.data.location}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );

    }
}

export default PostCardDetail;