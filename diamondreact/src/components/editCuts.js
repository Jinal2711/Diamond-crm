import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class EditCuts extends Component {

  state = {
    cutFldInput: '',
    cutId: ''
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.match.params.id == undefined) return

    this.setState({
      cutId: this.props.match.params.id
    })

    fetch(`http://localhost:3000/cuts/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.cutName)

        this.setState({
          cutFldInput: data.cutName
        })
      })

  }

  handleChange = (e) => {
    this.setState({
      cutFldInput: e.target.value
    })
  }
  saveCutName() {
    if (this.state.cutId) {
      this.updateCutName();
    }
    else {
      this.postCutName();
    }
  }

  updateCutName() {
    debugger
    fetch(`http://localhost:3000/cuts/update/${this.state.cutId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        cutName: this.state.cutFldInput
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status == "OK") {
          alert("data updated successfullly")
          return <Redirect to='/' />
        }
      })
  }

  postCutName() {
    fetch(`http://localhost:3000/cuts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        cutName: this.state.cutFldInput
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status == "OK") {
          alert("data post successfullly")
          return <Redirect to='/' />
        }
      })
  }
  render() {
    return (
      <div className="container-fluid shapeEditFld">
        <div className="form-group">
          Add Shape Name
        <input
            type="text"
            className="form-control"
            id="usr"
            placeholder="Add name"
            autoFocus
            onInput={(e) => this.handleChange(e)}
            value={this.state.cutFldInput}
          />
        </div>
        <button className="btn btn-primary" onClick={() => this.saveCutName()}>Save</button>
      </div>
    );
  }
}