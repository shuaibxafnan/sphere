import "./Contact.css";
import contactImg from "../../assests/images/blog.jpg"
import TopBar from "../../components/topbar/TopBar";
const Contact = () => {
    return (
        <>
            <TopBar />
            <div className="contact">
                <div className="contactLeft">
                    <img src={contactImg} alt="" />
                </div>
                <div className="contactRight">
                    <div className="contactTitle">
                        <h3>Contact Form</h3>
                    </div>
                    <div className="contactBx">
                        <form>
                            <input type="text" name="" id="" placeholder="Full Name" />
                            <input type="email" name="" id="" placeholder="Email" />
                            <textarea name="" id="" cols="30" rows="10" placeholder="Message"></textarea>
                            <button>Contact Us</button>
                        </form>
                        <div className="contactDet">
                            <span>
                                <h4>Contact</h4>
                                <p>alchemy@gmail.com</p>
                            </span>
                            <span>
                                <h4>Based in</h4>
                                <p>Andhra Pradesh, India</p>
                            </span>
                            <span className="iconsContact">
                                <i class="fa-brands fa-instagram"></i>
                                <i class="fa-brands fa-twitter"></i>
                                <i class="fa-brands fa-facebook"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;