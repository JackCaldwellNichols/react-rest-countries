import axios from "axios";
import { useEffect, useState, Suspense, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Container from "react-bootstrap/esm/Container";
import { Canvas } from "@react-three/fiber";
import Earth from "../components/Earth";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { logout } from "../context/AuthActions";

const Profile = () => {
  const { dispatch } = useContext(AuthContext);
  const path = useLocation();
  const username = path.pathname.split("/")[2];
  const [currentUser, setCurrentUser] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BASE_URL + `user/${username}`
        );
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [username]);

  const handleDelete = async () => {
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + `user/${username}`);
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      fluid
      style={{ height: "100vh", width: "100vw" }}
      className="p-0 profile"
    >
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
      <Container className="search">
        <Image
          src={`https://robohash.org/${username}?set=set3&size=180x180`}
          className="object-fit-cover"
        />
        <Container className="p-0">
          <h1 className="text-white">Hey there, {currentUser.username}</h1>
          <Button onClick={handleShow} variant="danger" className="mt-4">
            Delete Account
          </Button>
        </Container>
      </Container>
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="modal text-white"
        >
          <Modal.Header className="bg-dark">
            <Modal.Title>Danger Zone!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            By clicking on delete, your account will be forever lost.
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
};

export default Profile;
