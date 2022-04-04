import styled from "styled-components"
import Header from "./Header"
import Ad from "./Ad"
import LeftSide from "./LeftSide"
import Main from "./Main"
import RightSide from "./RightSide"
import { Navigate } from "react-router-dom"
import { connect } from "react-redux"

function Home(props) {
  return (
    <>
      {!props.user && <Navigate to="/" replace />}
      <Header />
      <Ad />
      <Layout>
        <LeftSide />
        <Main />
        <RightSide />
      </Layout>
    </>
  )
}

// const Content = styled.div`
//   max-width: 1128px;
//   margin: 0 auto;
// `

const Layout = styled.div`
  display: grid;
  grid-template-areas: "left-side main right-side";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 0.3125em;
  }
`

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
}

export default connect(mapStateToProps)(Home)
