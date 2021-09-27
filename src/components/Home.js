import React, { Component } from "react";

import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";

class Home extends Component {
    render() {
        return (
            <div id="home">
                <Slider
                    title="Send Questions for Anyone you want"
                    btn="START"
                    size="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Last Questions</h1>
                        <Articles home="true" />
                    </div>
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Home;
