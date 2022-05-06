import "./About.css";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";

function About(){
    return(
        <div>
            <div class="bg-light">
            <div class="container py-5">
                <div class="row h-100 align-items-center py-5">
                <div class="col-lg-6">
                    <h1 class="display-4">Customer Description</h1>
                    <p class="lead text-muted mb-0">Keep View Note is primarily a note-saving app. One can create a new note and save it to view later. The user needs to signup in order to create a note and needs to be logged in to review the information that he saved before. Every note is saved and related to a user-specific profile. The note can be shared through mail or other social media & it can even be published on the web.</p>
                </div>
                <div class="col-lg-6 d-none d-lg-block"><img src="https://bootstrapious.com/i/snippets/sn-about/illus.png" alt="" class="img-fluid"></img></div>
                </div>
            </div>
            </div>
            <div class="bg-white py-5">
                <div class="container py-5">
                <div class="row align-items-center mb-5">
                    <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                    <h2 class="font-weight-light">Our Principle</h2>
                    <p class="font-italic text-muted mb-4">Our vision is to develop solutions satisfying the customer's business requirements and providing an enriching experience to the user. This leads to the mutual growth of the stakeholder involved i.e, organization and clients. With practices like agile and emphasis on customer feedback we share & welcome new ideas.</p>
                    </div>
                    <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://bootstrapious.com/i/snippets/sn-about/img-1.jpg" alt="" class="img-fluid mb-4 mb-lg-0"></img></div>
                </div>
                <div class="row align-items-center">
                    <div class="col-lg-5 px-5 mx-auto"><img src="https://bootstrapious.com/i/snippets/sn-about/img-2.jpg" alt="" class="img-fluid mb-4 mb-lg-0"></img></div>
                    <div class="col-lg-6"><i class="fa fa-leaf fa-2x mb-3 text-primary"></i>
                    <h2 class="font-weight-light">Our Design Principle</h2>
                    <p class="font-italic text-muted mb-4">The design principle of the project is based on three core aspects, ensuring a bug-less robust code with the best user experience. Implementing a scalable solution to provide high-level services in the future. Finally, to ensure writing a clean code with an aim to provide easy readability to other developers and reduce waste (DRY).</p>
                    </div>
                </div>
                </div>
            </div>
            <div class="bg-light py-5">
            <div class="container py-5">
                <div class="row mb-4">
                <div class="col-lg-5">
                    <h2 class="display-4 font-weight-light">Our team</h2>
                </div>
                </div>
                <div class="row text-center">
                <div class="col-xl-3 col-sm-6 mb-5">
                    <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://avatars.githubusercontent.com/u/97913824?v=4" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"></img>
                    <h5 class="mb-0">Uday</h5>
                    <ul class="social mb-0 list-inline mt-3">
                        <li class="list-inline-item"><a href="https://instagram.com/uday_reddy_c?utm_medium=copy_link" class="social-link"><FontAwesomeIcon icon={faInstagram} size="2x" /></a></li>
                        <li class="list-inline-item"><a href="http://www.linkedin.com/in/uday-cheekatipalli" class="social-link"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a></li>
                    </ul>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-5">
                    <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-4.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"></img>
                    <h5 class="mb-0">Sruthi</h5>
                    <ul class="social mb-0 list-inline mt-3">
                        <li class="list-inline-item"><a href="https://instagram.com/sruthi_bandlamudi?utm_medium=copy_link" class="social-link"><FontAwesomeIcon icon={faInstagram} size="2x" /></a></li>
                        <li class="list-inline-item"><a href="https://www.linkedin.com/in/sruthi-bandlamudi-815a17184" class="social-link"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a></li>
                    </ul>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-5">
                    <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"></img>
                    <h5 class="mb-0">Hruday</h5>
                    <ul class="social mb-0 list-inline mt-3">
                        <li class="list-inline-item"><a href="https://instagram.com/hruday_kumar?utm_medium=copy_link" class="social-link"><FontAwesomeIcon icon={faInstagram} size="2x" /></a></li>
                        <li class="list-inline-item"><a href="https://www.linkedin.com/in/hruday-bollepally-102502111" class="social-link"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a></li>
                    </ul>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-5">
                    <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://avatars.githubusercontent.com/u/98074957?s=400&u=a990ce8b34faf068c1e1317bce763e07501e2e3a&v=4" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"></img>
                    <h5 class="mb-0">Sushma</h5>
                    <ul class="social mb-0 list-inline mt-3">
                        <li class="list-inline-item"><a href="https://instagram.com/sushma__chitturi?utm_medium=copy_link" class="social-link"><FontAwesomeIcon icon={faInstagram} size="2x" /></a></li>
                        <li class="list-inline-item"><a href="https://www.linkedin.com/in/sushma-chitturi-2ab024128" class="social-link"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default About;