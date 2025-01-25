import React, { useState, useEffect } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true; // Add a flag to check if the component is mounted

    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) {
          setQuestions(data); // Update state only if the component is still mounted
        }
      });

    return () => {
      isMounted = false; // Cleanup when the component unmounts
    };
  }, []);

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== id)
        );
      }
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.prompt}
            <button onClick={() => handleDeleteQuestion(question.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
