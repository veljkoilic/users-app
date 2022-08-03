import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/usersSlice";

export const CreateUserForm = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const formData = {
    first_name,
    last_name,
    email,
    birthday,
  };
  const submitForm = (e) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formData, headers).then((res) => {
      if (res.status === 201) {
        console.log("User Created");
        console.log(res.data);
        dispatch(addUser(res.data))
      }
    });
  };
  return (
    <Container>
      <form className="form-group" onSubmit={(e) => submitForm(e)}>
        <h2>Create User</h2>

        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          required
          name="firstname"
          value={first_name}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          id="firstname"
        />

        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          required
          name="lastname"
          value={last_name}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          id="lastname"
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          required
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="email"
        />
        <DatePicker selected={birthday} dateFormat="dd/MM/yyyy" onChange={(date) => setBirthday(date)} />
        <button type="submit" className="btn btn-block">
          Create
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  form,
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
  }

  .form-group label {
    text-align: left;
    display: block;
    margin: 0 0 5px 3px;
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
  }

  .btn svg {
    margin-right: 8px;
  }

  .btn-reverse {
    background: #fff;
    color: #000;
  }

  .btn-block {
    width: 100%;
    margin-bottom: 20px;
  }
`;
