import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    coding: false,
    design: false,
    gaming: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setInterests((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const selectedInterests = Object.keys(interests)
    .filter((key) => interests[key])
    .join(", ");

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <h2>Newsletter Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <h3>Interests</h3>
          <input
            type="checkbox"
            id="coding"
            name="coding"
            checked={interests.coding}
            onChange={handleInterestChange}
          />
          <label htmlFor="coding">Coding</label>
          <input
            type="checkbox"
            id="design"
            name="design"
            checked={interests.design}
            onChange={handleInterestChange}
          />
          <label htmlFor="design">Design</label>
          <input
            type="checkbox"
            id="gaming"
            name="gaming"
            checked={interests.gaming}
            onChange={handleInterestChange}
          />
          <label htmlFor="gaming">Gaming</label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {isSubmitted && (
        <div>
          <p>Thanks for signing up, {name}!</p>
          {selectedInterests && <p>Your interests: {selectedInterests}</p>}
        </div>
      )}
    </main>
  );
}

export default App;

