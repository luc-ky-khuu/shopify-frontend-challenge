import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const prompt = event.target.prompt.value;
    const data = {
      prompt: "Write a poem about a dog wearing skis",
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    const sampleId = {
      "id": "cmpl-56Ty4Str7M4xbSHHHa8BeyaryUQx4",
      "object": "text_completion",
      "created": 1652226848,
      "model": "text-curie:001",
      "choices": [
        {
          "text": "\n\nDogs wearing skis\n\nOn the snow\n\nThey're a sight to see\n\nSo happy and carefree\n\nWhat a joy to watch!",
          "index": 0,
          "logprobs": null,
          "finish_reason": "stop"
        }
      ]
    }
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
      this.setState({
        prompt: prompt,
        response: result.choices[0].text
      })
    });
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
