import React, { Component } from "react";

import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";

class Feed extends Component {
    state = {
        articles: [],
        status: null,
    };

    render() {
        return (
            <div id="feed">
                <Slider title="Feed" size="slider-big" />
                <div className="center">
                    <div id="content">
                        {/* Feed will come from Node rest API */}
                        <Articles />
                    </div>
                    <Sidebar feed="true" />
                </div>
            </div>
        );
    }
}

export default Feed;
