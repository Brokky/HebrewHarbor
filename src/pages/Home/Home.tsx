import "./Home.scss";
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <div className="home">
      <Header title={"Hebrew Harbor"} />
      <main className="home-main">
        <section className="info">
          <section className="about">
            <h2>About Us</h2>
            <p>
              We are dedicated to providing the best resources for learning
              Hebrew. Whether you are a beginner or an advanced learner, we have
              something for you.
            </p>
          </section>
          <section className="how-it-works">
            <h2>How It Works</h2>
            <p>
              Begin by adding words, along with their translations and
              transcriptions, to your personalized dictionary. Once ready, dive
              into lessons to practice and refine your skills, enriching your
              learning journey with Hebrew.
            </p>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Home;
