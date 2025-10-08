// src/components/Footer/MyFooter.jsx
import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({ author, email, linkGithub }) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} {author}. All rights reserved</p>
      <Button variant="link" href={linkGithub?.url || "#"} target="_blank">
        My Link Github: {linkGithub?.label || "Project"}
      </Button>
    </footer>
  );
}

export default MyFooter;
