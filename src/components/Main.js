import { useState, useEffect } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import PostModal from "./PostModal"
import { getArticlesAPI } from "../actions"
import ReactPlayer from "react-player"

function Main(props) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    props.getArticles()
  }, [])

  function handleClick(e) {
    e.preventDefault()
    setShowModal((prev) => !prev)
  }
  console.log(props.user)
  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src="images/user.svg" alt="" />
            ) : (
              <img src={props.user.photoURL} alt="" />
            )}
            <button
              onClick={handleClick}
              disabled={props.loading ? true : false}
            >
              Create a post
            </button>
          </div>

          <div>
            <button>
              <img src="/images/image-icon.svg" alt="" />
              <span>Photo</span>
            </button>

            <button>
              <img src="/images/video-icon.svg" alt="" />
              <span>Video</span>
            </button>

            <button>
              <img src="/images/event-icon.svg" alt="" />
              <span>Event</span>
            </button>

            <button>
              <img src="/images/write-article-icon.svg" alt="" />
              <span>Write article</span>
            </button>
          </div>
        </ShareBox>
        {props.articles.length === 0 ? (
          <p>There are no articles</p>
        ) : (
          <Content>
            {props.loading && <img src="/images/spin-loader.svg" alt="" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="images/ellipsis.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImage>
                    <a>
                      {!article.sharedImage && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImage && (
                          <img src={article.sharedImage} alt="" />
                        )
                      )}
                    </a>
                  </SharedImage>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src="/images/reactions1.svg" alt="" />
                        <img src="/images/reactions.svg" alt="" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments}</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src="/images/like-icon.svg" alt="" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comments-icon.svg" alt="" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src="/images/share-icon.svg" alt="" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src="/images/send-icon.svg" alt="" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
        )}
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  )
}

const Container = styled.div`
  grid-area: main;
`

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 0.5em;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 0.5em;
  background-color: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 0.5em 1em 0 1em;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 0.5em;
      }
      button {
        margin: 0.25em 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 1em;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 0.25em;

      button {
        img {
          margin: 0 0.25em 0 -0.125em;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 0.5em;
  overflow: visible;
`

const SharedActor = styled.div`
  flex-wrap: nowrap;
  padding: 0.75em 1em 0;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  a {
    margin-right: 0.75em;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 0.5em;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 0.75em;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`

const Description = styled.div`
  padding: 0 1.14285em;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`

const SharedImage = styled.div`
  margin-top: 0.5em;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 1em;
  padding: 0.5em 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    font-size: 12px;
    margin-right: 0.5em;
    button {
      display: flex;
      border: none;
      background: transparent;
    }
  }
`

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 0.25em 0.5em;
  button {
    display: inline-flex;
    align-items: center;
    color: #0a66c2;
    padding: 0.5em;
    border: none;
    background: transparent;

    @media (min-width: 768px) {
      span {
        margin-left: 0.5em;
      }
    }
  }
`

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
