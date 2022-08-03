import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.user.user);
  const onSubmitHandle = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/register", {
        email,
        password,
      })
      .then(function (response) {
        console.log(response.data);
        setError(false);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        axios
          .get(`https://reqres.in/api/users/${response.data.id}`)
          .then((response) => {
            console.log(response.data.data);
            dispatch(setUser(response.data.data));
          })
          .catch((err) => {
            console.log(err);
          });
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response.data.error);
      });
  };
  return (
    <Container>
      <Form>
        <h2>Register</h2>
        <span>Some credentials that work with the api</span>
          <ul>
            <li>george.bluth@reqres.in</li>
            <li>janet.weaver@reqres.in</li>
            <li>emma.wong@reqres.in</li>
          </ul>
          <span>Any Password will work</span>

        <form action="" className="form-group" onSubmit={(e) => onSubmitHandle(e)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Your E-mail"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Your Password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {error && <Error>{error}</Error>}
          <input type="submit" className="btn btn-block" value="Register" />
        </form>
      </Form>
    </Container>
  );
};
const Container = styled.section`
  padding: 0 10%;
  height: calc(100vh - 109px);
  display: flex;
  justify-content: center;
  margin-top: 150px;
`;
const Error = styled.span`
  color: red;
  display: block;
  margin: 10px 0;
  text-transform: capitalize;
`;
const Form = styled.div`
  width: 350px;
  .form,
  .content {
    width: 70%;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 10px;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: inherit;
    box-sizing: border-box;
  }

  .form-group label {
    text-align: left;
    display: block;
    margin: 0 0 5px 3px;
    :first-of-type{
    margin-top: 20px;
  }
  }
  .btn {
    padding: 10px 20px;
    border: 1px solid #000;
    border-radius: 5px;
    background: #000;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    appearance: button;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    &:hover {
      transition: 0.2s;
      background: #fff;
      color: #000;
    }
  }
  .btn-block {
    width: 100%;
    margin-bottom: 20px;
  }
`;
