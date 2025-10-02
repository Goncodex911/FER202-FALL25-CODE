import { useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner"; // nếu muốn giữ banner mặc định

// 5 bài Slot7
import Ex1 from "./components/Ex1";
import Ex2 from "./components/Ex2";
import Ex3 from "./components/Ex3";
import Ex4 from "./components/Ex4";
import Ex5 from "./components/Ex5";

function App() {
  const [tab, setTab] = useState(1);

  return (
    <>
      <Navbar />

      {/* Bộ chọn bài */}
      <div className="container my-4">
        <div className="btn-group" role="group" aria-label="Examples">
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              type="button"
              className={`btn btn-${tab===n ? "primary" : "outline-primary"}`}
              onClick={() => setTab(n)}
            >
              Bài {n}
            </button>
          ))}
        </div>
      </div>

      {/* Tuỳ chọn: giữ banner chung cho tất cả, hoặc bỏ đi */}
      {/* <Banner /> */}

      {/* Hiển thị nội dung theo tab */}
      {tab === 1 && <Ex1 />}
      {tab === 2 && <Ex2 />}
      {tab === 3 && <Ex3 />}
      {tab === 4 && <Ex4 />}
      {tab === 5 && <Ex5 />}
    </>
  );
}

export default App;
