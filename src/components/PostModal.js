import styled from "styled-components"
import { useState } from "react"
import ReactPlayer from "react-player"
import { connect } from "react-redux"
import { Timestamp } from "firebase/firestore"
import { postArticleAPI } from "../actions"

function PostModal(props) {
  const [editorText, setEditorText] = useState("")
  const [shareImage, setShareImage] = useState("")
  const [videoLink, setVideoLink] = useState("")
  const [assetArea, setAssetArea] = useState("")

  function handleChange(e) {
    const image = e.target.files[0]

    if (image === "" || image === undefined) {
      alert(`Not an image, the file is a ${typeof image}`)
      return
    }
    setShareImage(image)
  }

  function switchAssetArea(area) {
    setShareImage("")
    setVideoLink("")
    setAssetArea(area)
  }

  function postArticle(e) {
    e.preventDefault()
    if (e.target !== e.currentTarget) {
      return
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.now(),
    }
    props.postArticle(payload)
    reset(e)
  }

  function reset(e) {
    setEditorText("")
    setShareImage("")
    setVideoLink("")
    setAssetArea("")
    props.handleClick(e)
  }

  return (
    <>
      {props.showModal && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => {
                    setEditorText(e.target.value)
                  }}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg/, image/jpg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">
                        <span>Select</span> an image to share
                      </label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/share-image-icon.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/share-video-icon.svg" alt="" />
                </AssetButton>
              </AttachAssets>

              <ShareComment>
                <AssetButton>
                  <img src="/images/share-comment-icon.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>

              <PostButton
                disabled={!editorText ? true : false}
                onClick={(e) => postArticle(e)}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`

const Header = styled.div`
  display: block;
  padding: 1em 1.25em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border: none;
    background-color: transparent;

    img {
      pointer-events: none;
    }
  }
`

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 0.5em 0.75em;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75em 1.5em;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    line-height: 1.5;
    margin-left: 0.3125em;
  }
`

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75em 1.5em 0.75em 1em;
`

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  color: rgba(0, 0, 0, 0.5);
`

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0.5em;
  ${AssetButton} {
  }
`

const ShareComment = styled.div`
  padding-left: 0.5em;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    img {
      margin-right: 0.3125em;
    }
  }
`

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding: 0 1em;
  background-color: ${(props) =>
    props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2"};
  color: white;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(0,0,0,0.5)" : "#004182"};
  }
`

const Editor = styled.div`
  padding: 0.75em 1.5em;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }

  input {
    width: 100%;
    height: 35px;
    margin-bottom: 1.25em;
  }
`

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
  label {
    span {
      cursor: pointer;
      text-decoration: underline;
      color: #0a66c2;
      &:hover {
        text-decoration: none;
        color: black;
      }
    }
  }
`

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)
