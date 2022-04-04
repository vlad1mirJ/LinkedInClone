import styled from "styled-components"

function Ad() {
  return (
    <Container>
      <Section>
        <h5>
          <a href="https://www.upwork.com/">Hiring in a hurry? - &nbsp;</a>
        </h5>
        <p>
          Find talented pros in record time with Upwork an keep business moving.
        </p>
      </Section>
    </Container>
  )
}

export default Ad

const Container = styled.div`
  max-width: 100%;
  padding-top: 2em;
`

const Section = styled.section`
  min-height: 50px;
  padding: 1em 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;

  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }

  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 0.3125em;
  }
`
