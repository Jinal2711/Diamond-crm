import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

export default class EditShapes extends Component {
  state = {
    shapeFldInput: '',
    shapeId: '',
    selectedFile: '',
    fileName: '',
    iconsImg: ''
  }

  constructor(props) {
    super(props);
    this.uploadFile = React.createRef();
  }

  componentDidMount() {
    if (this.props.match.params.id == undefined) return
    this.setState({
      shapeId: this.props.match.params.id
    })

    fetch(`http://localhost:3000/shapes/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        this.setState({
          shapeFldInput: data.shapeName
        })
      })
  }

  handleChange(e) {
    this.setState({
      shapeFldInput: e.target.value
    }, () => console.log(this.state.shapeFldInput))
  }
  onChangeHandler(e) {
    this.setState({
      selectedFile: e.target.files[0],
      fileName: e.target.files[0].name
    }, () => console.log(this.state.selectedFile))
  }
  saveShapeName = () => {
    console.log(this.state.shapeId)
    if (this.state.shapeId) {
      this.updateOnSaveButton();
    }
    else {
      this.postOnSaveButton();
    }

  }

  updateOnSaveButton = () => {
    fetch(`http://localhost:3000/shapes/update/${this.state.shapeId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        shapeName: this.state.shapeFldInput,
        filepath: this.state.iconsImg
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

  postOnSaveButton = () => {
    fetch(`http://localhost:3000/shapes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        shapeName: this.state.shapeFldInput,
        filepath: this.state.iconsImg
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

  sendImage() {
    var formData = new FormData();
    console.log(this.uploadFile.current.files[0]);
    formData.append('shapeimg', this.uploadFile.current.files[0]);
    fetch("http://localhost:3000/shapes/upload", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          iconsImg: data.path
        })
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
            value={this.state.shapeFldInput}
          />
        </div>

        <div className="custom-file">
          <input type="file"
            className="custom-file-input"
            id="customFileLang"
            ref={this.uploadFile}
            lang="pl-Pl" onChange={(e) => this.onChangeHandler(e)} />
          <label className="custom-file-label"
            for="customFileLang">{this.state.fileName ? this.state.fileName : 'Choose file...'}</label>
        </div>
        <div className="text-center">
          <button className="btn btn-success mt-3" onClick={() => this.sendImage()}>Submit</button>
        </div>
        {/* <SaveShapesName /> */}
        <button className="btn btn-primary" onClick={() => this.saveShapeName()}>Save</button>
      </div>
    );
  }
}