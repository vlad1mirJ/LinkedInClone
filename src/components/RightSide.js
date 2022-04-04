import styled from "styled-components"

function RightSide() {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src="/images/feed-icon.svg" alt="" />
        </Title>
        <FeedList>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#LinkedIn</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </FeedList>
        <Recommendation>
          View all recommendations
          <img src="/images/right-icon.svg" alt="" />
        </Recommendation>
      </FollowCard>
      <BannerCard>
        <img src="/images/jobs-ad.jpeg" alt="" />
      </BannerCard>
    </Container>
  )
}

const Container = styled.div`
  grid-area: right-side;
`

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 0.5em;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 0.75em;
`
const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`

const FeedList = styled.ul`
  margin-top: 1em;
  li {
    display: flex;
    align-items: center;
    margin: 0.85714em 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }
    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 1.1428em;
      align-items: center;
      box-sizing: border-box;
      font-weight: 600;
      border-radius: 15px;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`

const Avatar = styled.div`
  background-image: url("images/right-hash.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 0.5em;
`

const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
`

const BannerCard = styled(FollowCard)`
  img {
    width: 100%;
    height: 100%;
  }
`

export default RightSide
