import { Logo } from "@pmndrs/branding";
import {
  AiFillCamera,
  AiOutlineArrowLeft,
  AiOutlineHighlight,
  AiOutlineShopping,
} from "react-icons/ai";

import { useSnapshot } from "valtio";
import { state } from "./store";

export default function Overlay() {
  const snap = useSnapshot(state);

  return (
    <div className="container">
      <header>
        <Logo width="40" height="40" />
        <AiOutlineShopping size="3em" />
      </header>
      {snap.intro ? <Intro /> : <Customizer />}
    </div>
  );
}

function Intro() {
  return (
    <section key="main">
      <div className="section--container">
        <div>
          <h1>LET&apos;S DO IT.</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Unleash your imagination</strong> and
              define your own style.
            </p>
            <button
              style={{ background: "black" }}
              onClick={() => (state.intro = false)}
            >
              CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Customizer() {
  const snap = useSnapshot(state);
  const colors = [
    "#ccc",
    "#EFBD4E",
    "#80C670",
    "#726DE8",
    "#EF674E",
    "#353934",
  ];
  const decals = ["react", "three2", "pmndrs"];
  return (
    <section key="custom">
      <div className="customizer">
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => {
                state.selectedColor = color;
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="decals">
        <div className="decals--container">
          {decals.map((decal) => (
            <div key={decal} className="decal">
              <img src={decal + "_thumb.png"} alt="brand" />
            </div>
          ))}
        </div>
      </div>

      <button
        className="share"
        style={{ background: snap.selectedColor }}
        onClick={() => {
          const link = document.createElement("a");
          link.setAttribute("download", "canvas.png");
          link.setAttribute(
            "href",
            document
              .querySelector("canvas")
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream")
          );
          link.click();
        }}
      >
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button>

      <button
        className="exit"
        style={{ background: snap.selectedColor }}
        onClick={() => (state.intro = true)}
      >
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button>
    </section>
  );
}