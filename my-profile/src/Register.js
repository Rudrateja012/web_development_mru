import React, { Component } from 'react'

export default class Register extends Component {
  render() {
    return (
      <div>
        <h1 align="center">Register</h1>

        <table align="center">
            <tbody>
                <tr>
                    <td>EmpId</td>
                    <td><input type='text' name='empId' /></td>
                </tr>
                <tr>
                    <td>EmpName</td>
                    <td><input type='text' name='empName' /></td>
                </tr>                
                <tr>
                    <td>Salary</td>
                    <td><input type='text' name='salary' /></td>
                </tr>                
                <tr>
                    <td>Gender</td>
                    <td>
                        <select>
                            <option value="" selected>Select Gender</option>
                            <option valu="Male">Male</option>
                            <option valu="Female">Female</option>
                            <option valu="Others">Others</option>
                        </select>
                    </td>
                </tr>
                
                <tr>
                    <td>Date Of Join</td>
                    <td><input type='date' name='doj' /></td>
                </tr>
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
                    <td><button>SignUp</button></td>
                </tr>
            </tbody>
        </table>
      </div>

    )
  }
}
