import React, { Component } from "react";

import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";

class Search extends Component {
    state = {
        articles: [],
        status: null,
    };

    render() {
        var searched = this.props.match.params.search;

        return (
            <div id="feed">
                <Slider title={'Búsqueda: ' + searched} size="slider-small" />
                <div className="center">
                    <div id="content">
                        {/* Listado de articulos que vendran del api rest de node */}
                        <Articles search={searched}/>
                    </div>
                    <Sidebar feed="true" />
                </div>
            </div>
        );
    }
}

export default Search;
