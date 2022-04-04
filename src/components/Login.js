import styled from "styled-components"
import { connect } from "react-redux"
import { signInAPI } from "../actions"
import { Navigate } from "react-router-dom"
import { useState } from "react"

function Login(props) {
  const [showModal, setShowModal] = useState(false)
  return (
    <Container>
      {props.user && <Navigate to="/home" />}
      {showModal && (
        <LoginModal>
          <Wrapper>
            <CloseBtn onClick={() => setShowModal(false)}>
              <img src="images/close-icon.svg" alt="" />
            </CloseBtn>
            <Google onClick={() => props.signIn()}>
              <img src="images/google.svg" alt="" />
              Sign In with Google
            </Google>
          </Wrapper>
        </LoginModal>
      )}
      <Nav>
        <a href="/">
          <img src="images/login-logo.svg" alt="" />
        </a>
        <div>
          <Join onClick={() => setShowModal(true)}>Join Now</Join>
          <SignIn onClick={() => setShowModal(true)}>Sign In</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src="images/login-hero.svg" alt="" />
        </Hero>
        <Form>
          <Google onClick={() => props.signIn()}>
            <img src="images/google.svg" alt="" />
            Sign In with Google
          </Google>
        </Form>
      </Section>
    </Container>
  )
}

const LoginModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  animation: fadeIn 0.3s;
  display: flex;
  align-items: center;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 400px;
  min-height: 200px;
  padding: 0 5em;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    padding: 0 3em;
    width: 70%;
  }
`

const CloseBtn = styled.button`
  position: absolute;
  height: 40px;
  width: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.15);
  border: none;
  background-color: transparent;
  top: 5px;
  right: 5px;
  img {
    pointer-events: none;
  }
`

const Container = styled.div`
  padding: 0px 10px;
`

const Nav = styled.nav`
  max-width: 1120px;
  margin: auto;
  padding: 0.75em 0 1em;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`

const Join = styled.a`
  font-size: 1rem;
  padding: 0.625em 0.75em;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 0.75em;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    border-radius: 4px;
  }
`

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 1.5em;
  transition-duration: 167ms;
  font-size: 1rem;
  font-weight: 600;
  line-height: 40px;
  padding: 0.625em 1.5em;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`

const Section = styled.section`
  display: flex;
  align-content: flex-start;
  min-height: 700px;
  padding-bottom: 8.625em;
  padding-top: 2.5em;
  padding: 3.75em 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  } ;
`

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 59%;
    font-size: 3.5rem;
    color: #2977c9;
    font-weight: 200;
    line-height: 4.375rem;
    @media (max-width: 768px) {
      font-size: 1.25rem;
      text-align: center;
      width: 100%;
      line-height: 2;
    }
  }
  img {
    /* z-index: -1; */
    width: 700px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media (max-width: 898px) {
      width: 70%;
    }
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`

const Form = styled.div`
  margin-top: 6.25em;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 1.25em;
    margin-left: auto;
    margin-right: auto;
  }
`

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0/60%), inset 0 0 0 2px rgb(0 0 0/0%),
    inset 0 0 0 1px rgb(0 0 0/0%);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 1.25rem;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
