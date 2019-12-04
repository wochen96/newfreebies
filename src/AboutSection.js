import React, { Component } from 'react';

class AboutSection extends Component{
    render() {
        return(
            <section className="features text-white library py-5">
                <h2 className="text-center mb-5">About Freebies</h2>
                <div className="row justify-content-md-center">
                    <div className="col-md-6 mb-5">
                        <div className="h-100">
                            <h4 className="text-center">What is Freebies?</h4>
                            <p className="text-center mb-5">Freebies connects students at the University of Washington to the resources that they may be unaware of. Freebies allows for students to share resources amongst each other that they have found. </p>
                            <h4 className="text-center">Why choose Freebies?</h4>
                            <p className="text-center">As a crowd-sourced hub, we bring you resources that others are interested in, which might be an interest for you. Using this real-time platform is a convenient way to share information, rather than having to wait through the unversity's system.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AboutSection;