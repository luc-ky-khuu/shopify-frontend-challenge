import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseList: [],
      promptList: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    const previousDataJSON = localStorage.getItem('prompts-and-responses');
    if (previousDataJSON !== null) {
      this.setState(JSON.parse(previousDataJSON));
    }
  }

  deleteItem(index) {
    const newPromptList = this.state.promptList;
    const newResponseList = this.state.responseList;
    newPromptList.splice(index, 1);
    newResponseList.splice(index,1);
    this.setState({
      responseList: newResponseList,
      promptList: newPromptList
    },() => this.saveData())
  }

  handleSubmit(event) {
    event.preventDefault();
    const prompt = event.target.prompt.value;
    if (!prompt) {
      return;
    }
    const data = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.APIKey}`,
      },
      body: JSON.stringify(data),
    })
    .then(result => result.json())
    .then(result => {
      event.target.prompt.value = '';
      const newResponseList = result.choices.concat(this.state.responseList);
      const newPromptList = [prompt].concat(this.state.promptList);
      this.setState({
        responseList: newResponseList,
        promptList: newPromptList
      },() => this.saveData())
    });
  }

  saveData() {
    const dataJSON = JSON.stringify(this.state);
    localStorage.setItem('prompts-and-responses', dataJSON);
  }

  form() {
    return (
      <form className='row w-100' onSubmit={this.handleSubmit}>
        <label className='col-full fw-bolder' htmlFor="prompt">Enter prompt</label>
        <textarea className='col-full my-dot5' name="prompt" id="prompt" cols="30" rows="10"></textarea>
        <div className="row justify-content-end w-100">
          <button className='submit-button' type="submit">Submit</button>
        </div>
      </form>
    )
  }

  createListItem(item, index, prompt) {
    return(
      <li className='response-list-item mb-1 fs-1dot3 relative' key={index}>
        <button className='absolute right-1 delete-button' onClick={() => this.deleteItem(index)}>
          <i className='material-symbols-outlined'>close</i>
        </button>
        <div className="row mb-1">
          <div className="col-20 fw-bolder">Prompt:</div>
          <div className="col-80">{this.state.promptList[index]}</div>
        </div>
        <div className="row fs-1dot3">
          <div className="col-20 fw-bolder">Response:</div>
          <div className="col-80">{item.text}</div>
        </div>
      </li>
    )
  }

  render() {
    return (
      <div className='container'>
        <h1>Fun with AI</h1>
        <div className="row w-100">
          {this.form()}
        </div>
        <h2>Responses</h2>
        <div className="row w-100">
          <ul className='w-100'>
            {this.state.responseList && this.state.responseList.map((item, index) => this.createListItem(item, index))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
