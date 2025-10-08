// src/pages/FooterPage.jsx
import MyFooter from "../components/Footer/MyFooter";

export default function FooterPage() {
  return (
    <div className="footer">
      <h2 style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
      </h2>
      <MyFooter
        author="Nguyễn Lương Hiếu Thuận"
        email="nguyenhieuthuan0301qb@gmail.com"
        linkGithub={{ label: "Lab3 - Movie -project", url: "https://github.com/Goncodex911/FER202-FALL25-CODE.git" }}
      />
    </div>
  );
}
