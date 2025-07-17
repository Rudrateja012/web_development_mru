import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: "50px", marginLeft: "50px" }}>

          <h1>Login</h1>

          <table>
            <tbody>
              <tr>
                <td>Enter EmailId</td>
                <td><input type='text' name='emailId' /></td>
              </tr>
              <tr>
                <td>Enter Password</td>
                <td><input type='password' name='password' /></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button > Login </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
