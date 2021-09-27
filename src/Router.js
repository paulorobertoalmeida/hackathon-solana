import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Importar componentes
// import MiComponente from "./components/MiComponente";
// import SeccionPruebas from "./components/SeccionPruebas";
import Peliculas from "./components/Peliculas";
import Error from "./components/Error";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Formulario from "./components/Formulario";
import Article from "./components/Article";
import Search from "./components/Search";
import CreateArticle from "./components/CreateArticle";
import EditArticle from "./components/EditArticle";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />

                {/*Configurar rutas y páginas */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/feed" component={Feed} />
                    <Route
                        exact
                        path="/feed/articulo/:id"
                        component={Article}
                    />
                    <Route
                        exact
                        path="/feed/crear"
                        component={CreateArticle}
                    />
                    <Route
                        exact
                        path="/feed/editar/:id"
                        component={EditArticle}
                    />
                    <Route
                        exact
                        path="/feed/busqueda/:search"
                        component={Search}
                    />
                    <Route
                        exact
                        path="/redirect/:search"
                        render={(props) => {
                            var search = props.match.params.search;
                            return <Redirect to={"/feed/busqueda/" + search} />;
                        }}
                    />
                    <Route exact path="/formulario" component={Formulario} />
                    <Route exact path="/peliculas" component={Peliculas} />

                    }

                    <Route component={Error} />
                </Switch>
                <div className="clearfix"></div>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;