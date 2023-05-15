import "./styles.css";
import { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [comments, setComments] = useState([]);
  const [visible, setVisible] = useState(0);
  const [lastVisible, setLastVisible] = useState(0);

  const [deBouncecounter, setDeBouncecounter] = useState(0);
  const [decomments, setDeComments] = useState([]);
  const [deVisible, setDeVisible] = useState(0);
  const [delastVisible, setDeLastVisible] = useState(0);

  const [throttlecounter, setThrottlecounter] = useState(0);
  const [throttleComments, setThrottleComments] = useState([]);
  const [throttleVisible, setThrottleVisible] = useState(0);
  const [throttleLastVisible, setthrottleLastVisible] = useState(0);

  function normalClcikHandler() {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      console.log(res.data);
      setComments(res.data);
    });

    setVisible(visible + 3);
    setLastVisible(visible - 0);
    setCounter((count) => count + 1);
  }
  function debounceClcikHandler() {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      console.log(res.data);
      setDeComments(res.data);
    });

    setDeVisible(visible + 3);
    setDeLastVisible(visible - 0);
    setDeBouncecounter((count) => count + 1);
  }

  function throttleClcikHandler() {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      console.log(res.data);
      setThrottleComments(res.data);
    });

    setThrottleVisible(visible + 3);
    setthrottleLastVisible(visible - 0);
    setThrottlecounter((count) => count + 1);
  }

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 2000);
    };
  };

  const throttle = (func) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        return;
      }
      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, 2000);
    };
  };

  const debouncedClick = debounce(debounceClcikHandler);
  const throttleClick = throttle(throttleClcikHandler);

  const renderCard = (comment) => {
    return (
      <div key={comment.id}>
        <Card
          style={{
            width: "18rem",
            height: "10rem",
            padding: "12px",
            margin: "12px"
          }}
        >
          <Card.Body>
            <Card.Title>{comment.name}</Card.Title>
            <Card.Subtitle>{comment.email}</Card.Subtitle>
            <Card.Text>{comment.body}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <div className="">
      <div>
        <h3
          style={{
            textAlign: "center",
            backgroundColor: "#f3f4f5",
            padding: "10px"
          }}
        >
          Do Check the Network Tab for Rest Calls
        </h3>
      </div>
      <div>
        <button onClick={normalClcikHandler}>Normal Click</button>
        <p>
          Normal Counter:<b>{counter}</b>
          <span class="label other">
            Rest API call will trigger after 1.5 sec of ideal time after clicks
          </span>
        </p>
        <div style={{ display: "flex" }} className="d-flex-sm">
          {comments.slice(lastVisible, visible).map(renderCard)}
        </div>
      </div>

      <div>
        <button onClick={debouncedClick}>Debounce Click</button>
        <p>
          Debounce Counter :<b> {deBouncecounter}</b>
          <span class="label other">
            Rest API call will trigger only once every 1.5 sec for all clicks
          </span>
        </p>
        <div style={{ display: "flex" }}>
          {decomments.slice(delastVisible, deVisible).map(renderCard)}
        </div>
      </div>
      <div>
        <button onClick={throttleClick}>Throttle Click</button>
        <p>
          Throttle Counter :<b> {throttlecounter}</b>
          <span class="label other">
            Rest API call will trigger only once every 1.5 sec for all clicks
            clicks
          </span>
        </p>
        <div style={{ display: "flex" }}>
          {throttleComments
            .slice(throttleLastVisible, throttleVisible)
            .map(renderCard)}
        </div>
      </div>
    </div>
  );
}
