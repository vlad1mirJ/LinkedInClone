import { connect } from "react-redux"
import styled from "styled-components"
import { signOutAPI } from "../actions"

function Header(props) {
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/home-logo.svg" alt="logo" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src="images/search-icon.svg" alt="search icon" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a href="/home">
                <img src="/images/nav-home.svg" alt="home icon" />
                <span>Home</span>
              </a>
            </NavList>

            <NavList>
              <a href="/home">
                <img src="/images/nav-network.svg" alt="home icon" />
                <span>My Network</span>
              </a>
            </NavList>

            <NavList>
              <a href="/home">
                <img src="/images/nav-jobs.svg" alt="home icon" />
                <span>Jobs</span>
              </a>
            </NavList>

            <NavList>
              <a href="/home">
                <img src="/images/nav-messaging.svg" alt="home icon" />
                <span>Messaging</span>
              </a>
            </NavList>

            <NavList>
              <a href="/home">
                <img src="/images/nav-notifications.svg" alt="home icon" />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>
                  Me
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
              <SignOut onClick={() => props.signOut()}>
                <a href="#">Sign Out</a>
              </SignOut>
            </User>
            <Work>
              <a href="/home">
                <img src="/images/nav-work.svg" alt="profile" />
                <span>
                  Work
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  /* left: 0; */
  padding: 0 1.5em;
  position: sticky;
  /* width: 100vw; */
  z-index: 100;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`

const Logo = styled.span`
  font-size: 0px;
  margin-right: 8px;
  @media (max-width: 768px) {
    padding: 8px 0;
    margin-right: 16px;
  }
`

const Search = styled.div`
  opacity: 1;
  display: flex;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 0.57em 0 2.857em;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  box-shadow: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: white;
    width: 100%;
  }
`

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style: none;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid rgba(0, 0, 0, 0.9);
      position: absolute;
      bottom: 0;
      left: 0;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      /* border-color: rgba(0,0,0,0.9) */
    }
  }

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`

const NavList = styled.li`
  display: flex;
  align-items: center;

  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      min-width: 65px;
      font-size: 10px;
      font-weight: 700;
    }
    @media (max-width: 460px) {
      min-width: 45px;
      font-size: 9px;
      font-weight: 700;
    }
  }

  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`
const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background-color: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 1rem;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  @media (max-width: 768px) {
    top: -45px;
    transform: translateX(-25%);
  }
`

const User = styled(NavList)`
  position: relative;
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${SignOut} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
