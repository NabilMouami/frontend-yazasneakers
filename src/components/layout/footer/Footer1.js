import Link from "next/link";
import Image from "next/image";
export default function Footer1() {
  return (
    <>
      <footer>
        <div className="footer-area theme-bg pt-65">
          <div className="container">
            <div className="main-footer pb-15 mb-30">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-1 mb-40">
                    <div className="footer-logo mb-30">
                      <Link href="/">
                        <Image
                          src="/assets/img/logo/logo.webp"
                          alt="logo"
                          width={100}
                          height={100}
                        />
                      </Link>{" "}
                    </div>
                    <div className="footer-content">
                      <p>
                        We offer only authentic product and our team of experts
                        checks all our sneakers. All our employees are real
                        sneaker fanatics! Are you one aswel? Have a look arround
                        and let's sneak together! Ordered before 18:00 = Shipped
                        today!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-2 ml-30 mb-40">
                    <h4 className="footer-widget__title mb-30">Information</h4>
                    <div className="footer-widget__links">
                      <ul>
                        <li>
                          <Link href="#">Custom Service</Link>
                        </li>
                        <li>
                          <Link href="#">FAQs</Link>
                        </li>
                        <li>
                          <Link href="/track">Ordering Tracking</Link>
                        </li>
                        <li>
                          <Link href="/contact">Contacts</Link>
                        </li>
                        <li>
                          <Link href="#">Events</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-3 mb-40">
                    <h4 className="footer-widget__title mb-30">My Account</h4>
                    <div className="footer-widget__links">
                      <ul>
                        <li>
                          <Link href="#">Delivery Information</Link>
                        </li>
                        <li>
                          <Link href="#">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link href="#">Discount</Link>
                        </li>
                        <li>
                          <Link href="#">Custom Service</Link>
                        </li>
                        <li>
                          <Link href="#">Terms Condition</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-4 mb-40">
                    <h4 className="footer-widget__title mb-30">
                      Social Network
                    </h4>
                    <div className="footer-widget__links">
                      <ul>
                        <li>
                          <Link href="#">
                            <i className="fab fa-facebook-f" />
                            Facebook
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fab fa-instagram" />
                            Instagram
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fab fa-tiktok" />
                            TikTok
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="footer-widget footer-col-5 mb-40">
                    <h4 className="footer-widget__title mb-30">
                      Get Newsletter
                    </h4>
                    <p>Get on the list and get 10% off your first order!</p>
                    <div className="footer-widget__newsletter">
                      <form action="#">
                        <input type="email" placeholder="Enter email address" />
                        <button className="footer-widget__fw-news-btn tpsecondary-btn">
                          Subscribe Now
                          <i className="fal fa-long-arrow-right" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-cta pb-20">
              <div className="row justify-content-between align-items-center">
                <div className="col-xl-6 col-lg-4 col-md-4 col-sm-6">
                  <div className="footer-cta__contact">
                    <div className="footer-cta__icon">
                      <i className="far fa-phone" />
                    </div>
                    <div className="footer-cta__text">
                      <Link href="/tel:0626309597"> +212 626 30 9597</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright footer-bg">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-7 col-md-5 col-sm-12">
                  <div className="footer-copyright__content">
                    <span>
                      Copyright {new Date().getFullYear()}{" "}
                      <Link href="/">©YazaSneakers</Link>. All rights reserved.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
