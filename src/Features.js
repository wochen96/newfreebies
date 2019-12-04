import React, { Component } from 'react';

class Features extends Component{
    render() {
        return(
            <section id="features" className="features text-white py-5">
                <h2 className="text-center mb-5">Features</h2>
                <div className="row">
                    <div className="col-md-4 mb-5">
                        <div className="h-100">
                            <img className="feature-img mb-3" src="img/resources.png"/>
                            <h4 className="text-center">Resourceful</h4>
                            <p className="text-center ml-3">A hub for all of the free resources on your campus. Look for and enjoy all of the resources that interest you. Resources that you might find are free food, classes, software and much more! </p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="h-100">
                            <img className="feature-img mb-3" src="img/community.png"/>
                            <h4 className="text-center">Community</h4>
                            <p className="text-center">Share and find resources that you and many other students have posted. Upvote the resources that you find useful and that others should use.</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="h-100">
                            <img className="feature-img mb-3 " src="img/search.png"/>
                            <h4 className="text-center">Search</h4>
                            <p className="text-center mr-3">Look for the resources that matches what you are looking for. Find them quickly, because there are resources out there that only last for a limited time!</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Features;