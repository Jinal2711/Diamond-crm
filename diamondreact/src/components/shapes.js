import React, { Component } from 'react';
import { FaEdit } from 'react-icons/fa';
import { TiTrash } from "react-icons/ti";
import { Link } from "react-router-dom";



export default class Shapes extends Component {
  state = {
    shapes: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/shapes", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          shapes: data
        })
      })
  }

  deleteShape(id) {
    console.log(id);
    fetch(`http://localhost:3000/shapes/delete/${id}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.status == "OK") {
          alert("Shape Name deleted successfully");
        }
      })
  }

  render() {
    if (this.state.shapes.length == 0) return null
    let getShapes = this.state.shapes.map((shape, index) => {

      return (
        <tr key={shape.id}>
          <td>{index + 1}</td>
          <td>
            <img src={shape.filepath != null ? `http://localhost:3000/${shape.filepath.replace('public/', '')}` : ''} style={{ height: "100px", width: "100px" }} />
          </td>
          <td>{shape.shapeName}</td>

          <td>
            <Link to={`/edit/${shape.id}`}><button className="btn btn-success">
              <FaEdit />Edit
              </button></Link>
          </td>
          <td>
            <button className="btn btn-danger" onClick={() => this.deleteShape(shape.id)}>
              <TiTrash />Delete
              </button>
          </td>
        </tr>
      )
    })
    return (
      <div className="container">
        <Link to="/add">
          <button type="button" className="btn btn-primary">
            Add
          </button>
        </Link>
        <table className="table table-bordered text-center table-hover">
          <thead className="thead-light">
            <tr>
              <th>Id</th>
              <td>Icon</td>
              <th>Shape Name</th>
              <th colSpan="2">Settings</th>
            </tr>
          </thead>
          <tbody>
            {getShapes}
          </tbody>
        </table>
      </div >
    );
  }
}