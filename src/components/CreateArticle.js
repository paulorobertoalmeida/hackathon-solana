import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";

import Global from "../Global";
import Sidebar from "./Sidebar";

// Validating Forms
class CreateArticle extends Component {
    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null,
    };

    constructor(props) {
        super(props);
        // Load Object and create a form
        this.validator = new SimpleReactValidator({
            messages: {
                required: "Este campo es requerido",
            },
        });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
            },
        });

        this.validator.showMessages();
        this.forceUpdate();
        //console.log(this.state);
    };

    saveArticle = (e) => {
        e.preventDefault();

        // Completing with Form(create) State
        this.changeState();

        if (this.validator.allValid()) {
            // Hacer una peticion http por post para guardar el articulo
            axios.post(this.url + "save", this.state.article).then((res) => {
                //console.log(this.state);
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: "waiting",
                    });

                    swal(
                        "AArticle created",
                        "El artículo ha sido creado correctamente",
                        "success"
                    );

                    //Subir la imagen
                    if (this.state.selectedFile !== null) {
                        // Sacar el id del artículo guardado
                        var articleId = this.state.article._id;

                        // Crear form data y añadir fichero
                        const formData = new FormData();
                        formData.append(
                            "file0",
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        );

                        // Petición ajax
                        axios
                            .post(
                                this.url + "upload-image/" + articleId,
                                formData
                            )
                            .then((res) => {
                                if (res.data.article) {
                                    this.setState({
                                        article: res.data.article,
                                        status: res.data.status,
                                    });
                                } else {
                                    this.setState({
                                        article: res.data.article,
                                        status: "failed",
                                    });
                                }
                            });
                    } else {
                        this.setState({
                            status: res.data.status,
                        });
                    }
                } else {
                    this.setState({
                        status: "failed",
                    });
                }
            });
        } else {
            // Fallo en la validación
            this.setState({
                status: "failed",
            });

            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
        });
    };

    render() {
        if (this.state.status === "success") {
            return <Redirect to="/feed" />;
        }

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Create Box Question</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Question</label>
                            <input
                                type="text"
                                name="title"
                                ref={this.titleRef}
                                onChange={this.changeState}
                            />

                            {this.validator.message(
                                "title",
                                this.state.article.title,
                                "required|alpha_num_space"
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea
                                name="content"
                                ref={this.contentRef}
                                onChange={this.changeState}
                            ></textarea>

                            {this.validator.message(
                                "content",
                                this.state.article.content,
                                "required"
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Image</label>
                            <input
                                type="file"
                                name="file0"
                                onChange={this.fileChange}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Guardar"
                            className="btn btn-success"
                        />
                    </form>
                </section>

                <Sidebar />
            </div>
        );
    }
}

export default CreateArticle;
