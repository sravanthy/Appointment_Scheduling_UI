import React from "react";
import "./RegisterComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Row } from "react-bootstrap";

export default function RegisterComponent() {
  return (
    <>
      <Container className="d-flex p-4  justify-content-center">
        <Row className="d-flex">
          {["Light"].map((variant, idx) => (
            <Card
              bg={variant.toLowerCase()}
              key={idx}
              text={variant.toLowerCase() === "light" ? "dark" : "white"}
              style={{ width: "100%", height: "110%" }}
            >
              <Card.Header>
                <h3 className="Auth-form-title">
                  {" "}
                  What are you waiting for? Sign Up is Free!
                </h3>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <form>
                    <div class="form-group">
                      <label>First Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                      />
                    </div>
                    <div class="form-group">
                      <label>Last Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                    <div class="form-group">
                      <label>Email Address:</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Email Address"
                      />
                    </div>
                    <div class="form-group">
                      <label>Phone Number for Text Alerts:</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div class="form-group">
                      <label>User Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="User Name"
                      />
                    </div>
                    <div class="form-group">
                      <label>Password:</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <input
                      type="submit"
                      value="Sign up"
                      class="btn btn-primary btn-block btn-lg"
                    />
                  </form>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
}
