import { createLogin } from '../login.js';


const homeBtn = document.getElementById("home-btn-ad")
homeBtn.onclick = () => {
    document.getElementById("admin").style.display = 'none';
    document.getElementById("home").style.display = 'block';
}
createLogin();

(async () => {
    const inputFile = document.querySelector('#file');
    const button = document.querySelector("#button");
    const link = document.querySelector("#link");
  
    const handleSubmit = async (event) => {
      const formData = new FormData();
      formData.append("file", inputFile.files[0]);
      const body = formData;
      const fetchOptions = {
        method: 'post',
        body: body
      };
      try {
        const res = await fetch("http://localhost:5600/upload", fetchOptions);
        if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
        const data = await res.json();
        link.setAttribute("href", data.url);
        link.innerText = data.url;
      } catch (e) {
        console.log(e);
      }
    }
  
    button.onclick = handleSubmit;
  })();