import { createLogin } from '../login.js';


const homeBtn = document.getElementById("home-btn-ad")
homeBtn.onclick = () => {
    document.getElementById("admin").style.display = 'none';
    document.getElementById("home").style.display = 'block';
}
createLogin();
