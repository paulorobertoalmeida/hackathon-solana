import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import swal from "sweetalert";

import Global from "../Global";
import Sidebar from "./Sidebar";

class Article extends Component {
    url = Global.url;

    state = {
        article: false,
        status: null,
    };

    getArticle = () => {
        var id = this.props.match.params.id;

        axios
            .get(this.url + "article/" + id)
            .then((res) => {
                this.setState({
                    article: res.data.article,
                    status: res.data.status,
                });
            })
            .catch((err) => {
                this.setState({
                    articles: false,
                    status: "success",
                });
            });
    };

    componentDidMount() {
        this.getArticle();
    }

    deleteArticle = (id) => {
        swal({
            title: "Are you Sure",
            text: "Una vez eliminado no podrás recuperar el artículo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(this.url + "article/" + id).then((res) => {
                    this.setState({
                        article: res.data.article,
                        status: "deleted",
                    });

                    swal(
                        "Artículo borrado",
                        "Article erased",
                        "success"
                    );
                });
            } else {
                swal("Borrado cancelado");
            }
        });
    };

    render() {
        if (this.state.status === "deleted") {
            return <Redirect to="/feed" />;
        }

        var article = this.state.article;

        return (
            <div className="center">
                <section id="content">
                    {article && (
                        <article className="article-item article-detail">
                            {article.image !== null && (
                                <div className="image-wrap">
                                    <img
                                        src={
                                            this.url +
                                            "get-image/" +
                                            article.image
                                        }
                                        alt={article.title}
                                    />
                                </div>
                            )}

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>
                                    {article.date}
                                </Moment>
                            </span>
                            <p>{article.content}</p>

                            <button
                                onClick={() => {
                                    this.deleteArticle(article._id);
                                }}
                                className="btn btn-danger"
                            >
                                Eliminate
                            </button>
                            <Link to={"/feed/editar/" + article._id} className="btn btn-warning">
                                Edit
                            </Link>

                            <div className="clearfix"></div>
                        </article>
                    )}

                    {!this.state.article && this.state.status === "success" && (
                        <div id="article">
                            <h2 className="subheader">Doesn't exist</h2>
                            <p>Try Later</p>
                        </div>
                    )}

                    {this.state.status == null && (
                        <div id="article">
                            <h2 className="subheader">Loading...</h2>
                            <p>Waiting Seconds...</p>
                        </div>
                    )}
                </section>

                <Sidebar />
            </div>
        );
    }
}

export default Article;
