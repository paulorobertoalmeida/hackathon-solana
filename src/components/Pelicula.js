import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Pelicula extends Component {
  marcar = () => {
    this.props.marcarFavorita(this.props.pelicula, this.props.indice);
  };

  render() {
    const { titulo, image } = this.props.pelicula;

    return (
      <article class="article-item" id="article-template">
        <div class="image-wrap">
          <img src={image} alt={titulo} />
        </div>

        <h2>{titulo}</h2>
        <span className="date">% minutes</span>
        <Link to={'/feed'}>Read More</Link>
        <button onClick={this.marcar}>Mark as Favorite</button>

        <div class="clearfix"></div>
      </article>
    );
  }
}

export default Pelicula;
