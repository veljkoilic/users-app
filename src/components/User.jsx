import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const User = ({ user }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [deleted, setDeleted] = useState(false);
  const emptyAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
  const currentUser = useSelector((state) => state.user.user);
  const [editingMode, setEditingMode] = useState(false);
  const [userData, setUserData] = useState(user);
  const deleteUser = () => {
    axios
      .delete(`https://reqres.in/api/users/${user.id}`, headers)
      .then((res) => {
        if (res.status === 204) {
          console.log("User Deleted");
          setDeleted(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const updateUserData = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const updateUser = (e) => {
    e.preventDefault();
    setEditingMode(false);
    axios.put(`https://reqres.in/api/users/${user.id}`, userData, headers).then((res) => {
      if (res.status === 200) {
        console.log("User updated");
        console.log(res.data);
      }
    });
  };
  return (
    <>
      {!deleted && (
        <Container>
          {!editingMode && (
            <>
              <img
                src={user.avatar || emptyAvatar}
                style={currentUser.id === user.id ? { border: "8px solid orange" } : null}
                alt=""
              />

              <div className="info">
                <span>
                  {userData.first_name} {userData.last_name}
                </span>
                <span>{userData.email}</span>
                <div className="options">
                  <button className="btn btn-reverse" onClick={() => setEditingMode(true)}>
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      deleteUser();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
          {editingMode && (
            <div className="info editing">
              <form className="form-group" onSubmit={(e) => updateUser(e)}>
                <label className="label" htmlFor="image">
                  <img
                    src={user.avatar || emptyAvatar}
                    style={currentUser.id === user.id ? { border: "8px solid orange" } : null}
                    alt=""
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  name="avatar"
                  onChange={(e) => {
                    let imageStringArray = e.target.value.split('\\')
                    const avatarObj = {
                        target: {
                            value: imageStringArray[imageStringArray.length-1],
                            name: 'avatar',
                            fullpath: e.target.value
                        }
                    }
                    updateUserData(avatarObj);
                  }}
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  name="first_name"
                  value={userData.first_name}
                  onChange={(e) => {
                    updateUserData(e);
                  }}
                />
                <input
                  type="text"
                  name="last_name"
                  value={userData.last_name}
                  onChange={(e) => {
                    updateUserData(e);
                  }}
                />
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={(e) => {
                    updateUserData(e);
                  }}
                />
                <div className="options">
                  <button className="btn">Confirm</button>
                  <button className="btn btn-reverse" onClick={() => setEditingMode(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    top: 44px;
    border: 8px solid #f2f2f2;
    box-shadow: 0px 7px 13px -6px rgba(0, 0, 0, 0.2);
  }
  .info {
    display: block;
    min-width: 200px;
    max-width: 300px;
    background-color: #f2f2f2;
    border-radius: 10px;
    padding: 50px 50px 20px 50px;
    box-shadow: 0px 7px 13px -6px rgba(0, 0, 0, 0.2);
    text-align: center;
    &.editing {
      padding: 10px 30px 20px 30px;
    }
    .form-group {
      img {
        position: static;
      }
    }
    .label {
      margin-left: 35%;
    }
  }
  .options {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    .btn {
      padding: 10px 20px;
      border: 1px solid #000;
      border-radius: 5px;
      background: #000;
      color: #fff;
      font-size: 14px;
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
        background: #f2f2f2;
        color: #000;
      }
    }
    .btn-reverse {
      background: #f2f2f2;
      color: #000;
      transition: 0.2s;
      &:hover {
        transition: 0.2s;
        background: #000;
        color: #f2f2f2;
      }
    }
  }
  span {
    display: block;
  }
  form,
  .content {
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 10px;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 95%;
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
    cursor: pointer;
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
