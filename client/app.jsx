import React from 'react'

class App extends React.Component {


  form() {
    return (
      <form className='row w-100' action='submit'>
        <label className='col-full' htmlFor="prompt">Enter prompt</label>
        <textarea className='col-full' name="prompt" id="prompt" cols="30" rows="10"></textarea>
        <input type="submit" />
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
