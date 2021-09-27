import React, { Component } from "react";

import Slider from "./Slider";
import Sidebar from "./Sidebar";

class Formulario extends Component {
    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    state = {
        user: {},
    };

    recibirFormulario = (e) => {
        e.preventDefault();

        var genero = "hombre";

        if (this.generoHombreRef.current.checked) {
            genero = this.generoHombreRef.current.value;
        } else if (this.generoMujerRef.current.checked) {
            genero = this.generoMujerRef.current.value;
        } else {
            genero = this.generoOtroRef.current.value;
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero,
        };

        this.setState({
            user: user,
        });

        //console.log(user);
    };

    render() {
        if (this.state.user.nombre) {
            var user = this.state.user;
        }

        return (
            <div id="formulario">
                <Slider title="Create Questions" btn="Go to feed" size="slider-big" />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Question Box</h1>
                        {/* Mostrar datos del formulario */}
                        {this.state.user.nombre && (
                            <div id="user-data">
                                <p>
                                    First Name: <strong>{user.nombre}</strong>
                                </p>
                                <p>
                                    Last Name: <strong>{user.apellidos}</strong>
                                </p>
                                <p>
                                    Box Question: <strong>{user.bio}</strong>
                                </p>
                                <p>
                                    Price: <strong>{user.genero}</strong>
                                </p>
                            </div>
                        )}

                        {/* Crear un formulario */}
                        <form
                            className="mid-form"
                            onSubmit={this.recibirFormulario}
                            onChange={this.recibirFormulario}
                        >
                            <div className="form-group">
                                <label htmlFor="nombre">First Name</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    ref={this.nombreRef}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Last Name</label>
                                <input
                                    type="text"
                                    name="apellidos"
                                    ref={this.apellidosRef}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Box Question</label>
                                <textarea
                                    name="bio"
                                    ref={this.bioRef}
                                ></textarea>
                            </div>

                            <div className="form-group radibuttons">
                            Price
                                <input
                                    type="radio"
                                    name="genero"
                                    value="1 sol"
                                    ref={this.generoHombreRef}
                                />{" "}
                                1 Sol
                                <input
                                    type="radio"
                                    name="genero"
                                    value="2 sol"
                                    ref={this.generoMujerRef}
                                />{" "}
                                2 Sol
                                <input
                                    type="radio"
                                    name="genero"
                                    value="3 sol"
                                    ref={this.generoOtroRef}
                                />{" "}
                                3 Sol
                            </div>

                            <div className="clearfix"></div>

                            <input
                                type="submit"
                                value="Enviar"
                                className="btn btn-success"
                            />
                        </form>
                    </div>
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Formulario;
