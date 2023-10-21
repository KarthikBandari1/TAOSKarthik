import {Component} from 'react'

import {MdEmail} from 'react-icons/md'

import './index.css'

class RegistrationForm extends Component {
  state = {
    emailInput: '',
    showEmailError: false,
    isFormSubmitted: false,
    result: '',
  }

  onBlurEmail = () => {
    const isValidEmail = this.validateEmail()

    this.setState({showEmailError: !isValidEmail})
  }

  onChangeEmail = event => {
    const {target} = event
    const {value} = target

    this.setState({
      emailInput: value,
    })
  }

  validateEmail = () => {
    const {emailInput} = this.state

    return emailInput !== ''
  }

  renderEmailField = () => {
    const {emailInput, showEmailError} = this.state
    const className = showEmailError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="email">
          <MdEmail />
        </label>
        <input
          type="text"
          id="email"
          className={className}
          value={emailInput}
          placeholder="Enter Your Email"
          onChange={this.onChangeEmail}
          onBlur={this.onBlurEmail}
        />
      </div>
    )
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const isValidEmail = this.validateEmail()

    const {emailInput} = this.state
    const userDetails = {
      email: emailInput,
    }

    const url = 'https://mern-task-app2.onrender.com'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.text()
    if (response.status !== 400) {
      this.setState({isFormSubmitted: true, result: data})
    }
    if (isValidEmail) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showEmailError: !isValidEmail,
        isFormSubmitted: false,
      })
    }
    return this.userDetails
  }

  renderRegistrationForm = () => {
    const {showEmailError} = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        {this.renderEmailField()}
        {showEmailError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  renderSubmissionSuccessView = () => {
    const {result} = this.state
    const data = JSON.parse(result)
    return (
      <div>
        <div className="succ-view">
          <p>Your Details are:</p>
          <p className="succ-text"> First_Name: {data.First_Name}</p>
          <p className="succ-text">Middle_Name: {data.Middle_Name}</p>

          <p className="succ-text">Last_Name: {data.Last_Name}</p>

          <p className="succ-text">Email: {data.Email}</p>

          <p className="succ-text">Phone_Number: {data.Phone_Number}</p>

          <p className="succ-text"> Address: {data.Address}</p>

          <p className="succ-text"> City: {data.City}</p>

          <p className="succ-text"> State: {data.State}</p>

          <p className="succ-text">Zip_Code: {data.Zip_Code}</p>
          <p className="succ-text">Date_of_Birth: {data.Date_of_Birth}</p>
        </div>
      </div>
    )
  }

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-form-container">
        <h1 className="form-title">Form</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
