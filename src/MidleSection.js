import React, { Component } from 'react';
import { CardColumns } from 'react-bootstrap';
//import PostView from './PostView';
import PostCardDetail from './PostCardDetail';
import { db, auth } from './services/firebase';
import './PostCardDetail.css';


class MidleSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: null,
            selectedFile: null
        }
    }

    getDataToDisplay = props => {
        const posts = [];

        db.collection('posts').where('isDefinite', '==', this.props.isDefiniteSelected).orderBy('startDate', 'desc')
            .get()
            .then(snapshot => {
                
                snapshot.forEach(doc => {
                    const data = doc.data();
                    console.log('data: ' + data.toString());
                    posts.push({
                        key: doc.id,
                        data: data
                    })
                    //console.log("gettingDataDisplay counts")
                })
                //db.off();

                this.setState({ posts: posts })
            })
            .catch(error => console.log(error));
    }

    searchDatabase = props => {
        var searchTerm = document.getElementById("search").value.toLowerCase();

        db.collection("posts")
            .get()
            .then(snapshot => {
                const posts = [];
                snapshot.forEach(doc =>  {

                    const data = doc.data();

                    if (data.title.toLowerCase().includes(searchTerm)) {
                        //console.log(doc.data().title);

                        posts.push({
                            key: doc.id,
                            data: data
                        })
                        //console.log(posts);
                    }
                });
                this.setState({ posts: posts });
            })
            .catch(error => console.log(error));
    }

    render() {

        if (this.props.searchCheck == 'yes') {
            this.searchDatabase(this.props);
        } else if (this.state.posts == null) {
            this.getDataToDisplay(this.props);
        } else {
            console.log('Esle state: ' + this.state.posts)
        }

        return (
            <section class="middleSection">
                <CardColumns class="cardContainer">

                    {this.state.posts &&
                        this.state.posts.map((onePost, i) => {
                            return (
                                <PostCardDetail class="detail" userEmail={this.props.userEmail} onePost={onePost} getDataToDisplay={this.getDataToDisplay} key={i} />
                            );
                        })
                    }

                </CardColumns>


            </section>
        );

    }
}

export default MidleSection;

/*{Data.map((onePost, i) => {
    return (
        <PostCardDetail onePost={onePost} key={i} />
    );
})}*/

/*{this.state.posts &&
    this.state.posts.map((onePost, i) => {
        return (
            <PostCardDetail onePost={onePost} key={i} />
        )
    });
}*/


