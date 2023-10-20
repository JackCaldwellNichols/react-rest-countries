import { useRef, useState, Suspense } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/Alert";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import Earth from "../components/Earth";

function Register() {
  const userRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_BASE_URL + "register", {
        username: userRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      navigate("/");
    } catch (error) {
      setError(true);
      setMessage(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Container fluid className="home">
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
      <Container className="registerContainer">
        <Container className="d-flex flex-column w-50 align-items-center justify-content-center">
          <Form className="text-white" onSubmit={handleSignUp}>
            <Form.Group
              className="mb-3 d-flex align-items-center justify-content-center flex-column"
              controlId="formBasicEmail"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                ref={emailRef}
                className="lgnInput"
              />
            </Form.Group>
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
              <Button className="lgnBtn" type="submit">
                Sign Up
              </Button>
              <Form.Text className="text-white py-3">
                Have an account?
              </Form.Text>
              <Link to="/">
                <Button className="lgnBtn mt-0" type="submit">
                  Login
                </Button>
              </Link>
            </Container>
            {error && (
              <>
                {["danger"].map((variant) => (
                  <Alert key={variant} variant={variant} className="mt-5">
                    {message}
                  </Alert>
                ))}
              </>
            )}
          </Form>
        </Container>
      </Container>
    </Container>
  );
}

export default Register;
