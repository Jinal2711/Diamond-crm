import React, { Component } from 'react';

export default class Cards extends Component {

  state = {
    shapesNames: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/shapes`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          shapesNames: data
        }, () => console.log(this.state.shapesNames))
      })
  }

  render() {
    let i = 0.2;
    let shapes = this.state.shapesNames.map((shape, index) => {
      return (
        <div className="col-sm-3 mb-3" key={shape.id}>
          <div className="card  mb-3" style={{ animationDelay: `${i}+0.2s` }}>
            <div class="card-header carddiv"
              style={{ backgroundImage: `url(${shape.filepath != null ? `http://localhost:3000/${shape.filepath.replace('public/', '')}` : ''})` }}>
            </div>
            <div className="card-body text-center">
              <h5 className="card-title">{shape.shapeName}</h5>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="container-fluid mt-3 mb-3">

        <div className={`tag_1 mb-3${this.props.scroll_top > 100 ? ' card_animation' : ''}`}>
          <h1>Made by nature. Designed for you.</h1>
          <h4><i>Specifically cut to achieve a sparkle that commands the attention of every eye in the room</i></h4>
        </div>
        <div className={`mt-3 cardRow row${this.props.scroll_top > 100 ? ' card_animation' : ''}`}>
          {shapes}
        </div>
      </div>
    );
  }
}