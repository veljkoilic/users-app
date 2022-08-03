import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
export const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(setUser(false));
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Container>
      <Logo>
        <NavLink to="/" className="link">
          Users App
        </NavLink>
      </Logo>
      <Menu>
        {user && (
          <>
            <User>
              <img src={user.avatar} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </User>
            <ul>
              <li>
                <NavLink to="/" className="link">
                  Home
                </NavLink>
              </li>
              <li onClick={() => logout()} style={{ cursor: "pointer" }}>
                <a href="#" className="link">Logout</a>
              </li>
            </ul>
          </>
        )}
        {!user && (
          <ul>
            <li>
              <NavLink to="/login" className="link">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="link">
                Register
              </NavLink>
            </li>
          </ul>
        )}
      </Menu>
    </Container>
  );
};

const Container = styled.header`
  margin-top: 0;
  margin-bottom: 50px;
  padding: 0px 10%;
  box-shadow: 0px 7px 13px -6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
  padding: 0;
  a{
    border: none;
  }
`;
const Menu = styled.nav`
  display: flex;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    li {
      padding: 20px 0;
      a {
        padding: 20px 20px;
        &:hover {
          border-bottom: 2px solid orange;
        }
      }
    }
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-right: 10px;
  img {
    width: 35px;
    border-radius: 50%;
  }
`;
