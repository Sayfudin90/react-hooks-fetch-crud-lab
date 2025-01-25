import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const newQuestion = {
      prompt: formData.prompt,
      answers: [
        formData.answer1, 
        formData.answer2, 
        formData.answer3, 
        formData.answer4
      ],
      correctIndex: parseInt(formData.correctIndex)
    };

    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuestion)
    })
      .then(r => r.json())
      .then(addedQuestion => {
        onAddQuestion(addedQuestion);
        // Reset form
        setFormData({
          prompt: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctIndex: 0,
        });
      });
  }

  return (
    <section>
    <h1>New Question</h1>
    <form onSubmit={handleSubmit}>
    <label>
     Prompt:
    <input
      type="text"
      name="prompt"
      placeholder="Enter Prompt"
      value={formData.prompt}
      onChange={handleChange}
    />
    </label>
    <input
      type="text"
      name="answer1"
      placeholder="Answer 1"
      value={formData.answer1}
      onChange={handleChange}
    />
    <input
      type="text"
      name="answer2"
      placeholder="Answer 2"
      value={formData.answer2}
      onChange={handleChange}
    />
    <select
      name="correctIndex"
      placeholder="Correct Answer"
      value={formData.correctIndex}
      onChange={handleChange}
    >
      <option value="0">Answer 1</option>
      <option value="1">Answer 2</option>
    </select>
    <button type="submit">Add Question</button>
    </form>
    </section>
    );
  }
    export default QuestionForm;