import { useRef, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../context/API_Calls";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const { dispatch, isFetching } = useContext(AuthContext);
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(
      {
        username: userRef.current.value,
        password: passwordRef.current.value,
      },
      dispatch,
      setError,
      setMessage,
      navigate
    );
  };

  return (
    <Form className="text-white" onSubmit={handleLogin}>
      <Form.Group
        className="mb-3 d-flex align-items-center justify-content-center flex-column"
        controlId="formBasicUsername"
      >
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="test"
          placeholder="Enter username"
          ref={userRef}
          className="lgnInput"
        />
      </Form.Group>

      <Form.Group
        className="mb-3 d-flex align-items-center justify-content-center flex-column"
        controlId="formBasicPassword"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="lgnInput"
        />
      </Form.Group>
      <Container className="d-flex flex-column">
        {!isFetching ? (
          <Button className="lgnBtn" type="submit">
            Login
          </Button>
        ) : (
          <Button
            className="lgnBtn d-flex align-items-center justify-content-center"
            type="submit"
          >
            <CircularProgress color="inherit" size={20} />
          </Button>
        )}
        <Form.Text className="py-3 text-white">Not signed up? </Form.Text>
        <Link to="/register">
          <Button className="lgnBtn mt-0" type="submit">
            Sign Up
          </Button>
        </Link>
      </Container>
      {error && (
        <>
          {["danger"].map((variant) => (
            <Alert key={variant} variant={variant}>
              {message}
            </Alert>
          ))}
        </>
      )}
    </Form>
  );
}

export default Login;
