import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
export default function Sidebar({ isMobileMenu, handleMobileMenu }) {
  const { categoryList } = useSelector((state) => state.Categories) || {};

  return (
    <>
      <div className={`tpsideinfo ${isMobileMenu ? "tp-sidebar-opened" : ""}`}>
        <button className="tpsideinfo__close" onClick={handleMobileMenu}>
          Close
          <i className="fal fa-times ml-10" />
        </button>
        <div className="tpsideinfo__search text-center pt-35">
          <span className="tpsideinfo__search-title mb-20"></span>
        </div>
        <div className="tpsideinfo__nabtab">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation"></li>
            <li className="nav-item" role="presentation"></li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex={0}
            >
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`body-overlay ${isMobileMenu ? "opened" : ""}`}
        onClick={handleMobileMenu}
      />
    </>
  );
}
