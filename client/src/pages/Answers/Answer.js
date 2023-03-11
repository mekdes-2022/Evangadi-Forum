import axios from "axios";
import "./Answer.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";

function Answer() {
  const [userData, setUserData] = useContext(UserContext);
  const [post, setPost] = useState({});
  const [form, setForm] = useState({});
  const [answer, setAnswer] = useState([]);
  const navigate = useNavigate();
  console.log(userData.singleQuestion);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.post(
        `http://localhost:5000/api/questions/id`,
        {
          post_id: userData.singleQuestion.post_id,
        }
      );
      console.log(response);
      setPost({
        question: response.data.data,
      });
    };
    fetch();
  }, []);

  useEffect(() => {
    const get = async () => {
      const res = await axios.post(`http://localhost:5000/api/answers/all`, {
        question_id: userData.singleQuestion.question_id,
      });
      console.log(res);
      setAnswer(res.data.data);
    };
    get();
  }, [answer.length]);

  const handleChange = (e) => {
    setForm({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/answers`, {
      answer: form.answer,
      user_id: userData.user.id,
      question_id: post.question.question_id,
    });
    setAnswer([]);
    setForm({ answer: "" });
  };
  console.log(answer);
  console.log(post);
  if (answer.length == 0) {
    navigate("/");
  }
  return (
    <div className="answer">
      <h3 style={{ fontSize: "18px", fontWeight: "500" }}>Question</h3>
      <h5 style={{ marginTop: "-15px", fontSize: "15px" }}>
        {post?.question?.question}
      </h5>
      <p style={{ marginTop: "-15px", fontSize: "12px" }}>
        {post?.question?.question_description}
      </p>
      <hr />
      <h3>Answer From The Community</h3>
      <hr />
      {answer &&
        answer?.map((item) => (
          <div>
            <div className="answer__info">
              <div>
                <AccountCircleTwoToneIcon style={{ fontSize: "60px" }} />
                <p style={{ marginTop: "-10px", fontSize: "13px" }}>
                  {item.user_name}
                </p>
              </div>

              <p style={{ paddingLeft: "20px" }}>{item.answer}</p>
            </div>
            <hr />
          </div>
        ))}

      <div className="answer__write">
        <h2>Answer The Top Questions</h2>
        <div>Go to question page</div>
        <br />
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          style={{
            borderRadius: "8px",
            border: "1px solid gray",
          }}
          name="answer"
          id=""
          cols="110"
          rows="10"
          placeholder="Your Answer here"
          value={form.answer}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <div className="answer__button">
          {" "}
          <button style={{ marginTop: "-15px" }}>Post Your Answer</button>
        </div>
      </form>
    </div>
  );
}

export default Answer;
