import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { User } from "../components/User";
import styled from "styled-components";
import { CreateUserForm } from "../components/CreateUserForm";
import { setUsers } from "../redux/usersSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const users = useSelector((state) => state.users.users);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users?page=${page}`, headers)
      .then((response) => {
        setTotalPages(response.data.total_pages);
        dispatch(setUsers(response.data.data));
      })
      .catch((err) => console.log(err));
  }, [page]);

  const sortUsers = (sortType) => {
    if (sortType === "id") {
      const newUsers = [...users];
      dispatch(setUsers(newUsers.sort((a, b) => b.id - a.id)));
    }
    if (sortType === "first_name") {
      const newUsers = [...users];
      dispatch(setUsers(newUsers.sort((a, b) => a.first_name > b.first_name)));
    }
  };
  return (
    <Container>
      <CreateUserForm />
      <select
        name="sort"
        id="sort"
        onChange={(e) => {
          sortUsers(e.target.value);
        }}
      >
        <option value="">Sort By</option>
        <option value="id">ID</option>
        <option value="first_name">First Name</option>
      </select>
      <Users>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </Users>
      <div className="pagination">
        <span
          className="arrow"
          onClick={() => {
            if (page != 1) {
              setPage(page - 1);
            }
          }}
        >
          &lsaquo;
        </span>
        <span>
          {page}/{totalPages}
        </span>
        <span> Pages</span>

        <span
          className="arrow"
          onClick={() => {
            if (page < totalPages) setPage(page + 1);
          }}
        >
          &rsaquo;
        </span>
      </div>

    </Container>
  );
};
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  select {
    padding: 5px 10px;
    background-color: #f2f2f2;
    border: none;
    border-radius: 5px;
    margin-left: 15%;
    font-size: 16px;
    width: 200px;
  }
  .pagination {
    width: 90%;
    padding: 20px;
    text-align: right;
  }
  .arrow {
    padding: 10px;
    font-size: 25px;
    cursor: pointer;
    user-select: none;
    text-align: right;
    &:hover {
      color: orange;
    }
  }
`;
const Users = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;
