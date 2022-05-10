import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: null
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.prompt.value)
  }
  form() {
    return (
      <form className='row w-100' onSubmit={this.handleSubmit}>
        <label className='col-full' htmlFor="prompt">Enter prompt</label>
        <textarea className='col-full my-dot5' name="prompt" id="prompt" cols="30" rows="10"></textarea>
        <div className="row justify-content-end w-100">
          <input className='submit-button' type="submit" value='Submit' />
        </div>
      </form>
    )
  }
  render() {
    return (
      <div className='container'>
        <h1>Fun with AI</h1>
        <div className="row w-100">
          {this.form()}
        </div>
        <h2>Response</h2>
      </div>
    )
  }
}

export default App
