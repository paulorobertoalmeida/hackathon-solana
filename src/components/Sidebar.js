import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

class Sidebar extends Component {
    searchRef = React.createRef();

    state = {
        search: "",
        redirect: false,
    };

    redirectToSearch = (e) => {
        e.preventDefault();
        this.setState({
            search: this.searchRef.current.value,
            redirect: true,
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={"/redirect/" + this.state.search} />;
        }

        return (
            <aside id="sidebar">
                {this.props.feed === "true" && (
                    <div id="nav-feed" className="sidebar-item">
                        <h3>PYou can do this</h3>
                        <Link to={'/feed/crear'} className="btn btn-success">
                            Create Questions
                        </Link>
                    </div>
                )}

                <div id="search" className="sidebar-item">
                    <h3>Search</h3>
                    {/* <p>Search for Questions</p> */}
                    <form onSubmit={this.redirectToSearch}>
                        <input type="text" name="search" ref={this.searchRef} />
                        <input
                            type="submit"
                            name="submit"
                            value="Search"
                            className="btn"
                        />
                    </form>
                </div>
            </aside>
        );
    }
}

export default Sidebar;
