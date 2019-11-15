import React, { Component } from 'react';
import { FaEdit } from 'react-icons/fa';
import { TiTrash } from "react-icons/ti";
import { Link } from "react-router-dom";

export default class Cuts extends Component {
  state = {
    cuts: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/cuts", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        this.setState({
          cuts: data
        })
      })
  }
  deleteCut(id) {
    fetch(`http://localhost:3000/cuts/delete/${id}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.status == "OK") {
          alert("Cut Name deleted successfully");
        }
      })
  }
  render() {
    let getCuts = this.state.cuts.map((cut, index) => {
      return (
        <tr key={cut.id}>
          <td>{index + 1}</td>
          <td>{cut.cutName}</td>
          <td>
            <Link to={`/edit_cut/${cut.id}`}>
              <button className="btn btn-success">
                <FaEdit />Edit
              </button>
            </Link>
          </td>
          <td>
            <button className="btn btn-danger" onClick={() => this.deleteCut(cut.id)}>
              <TiTrash />Delete
            </button>
          </td>
        </tr>
      )
    })

    return (
      <div className="cuts container">
        <Link to="/add_cut">
          <button type="button" className="btn btn-primary">
            Add
          </button>
        </Link>
        <table className="table table-bordered text-center table-hover">
          <thead className="thead-light">
            <tr>
              <th>Id</th>
              <th>Cut Name</th>
              <th colSpan="2">Settings</th>
            </tr>
          </thead>
          <tbody>
            {getCuts}
          </tbody>
        </table>
      </div>
    );
  }
}