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

    const cerca_immagini = async () => {
        try {
            const res = await fetch("http://localhost:5600/images");
            if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
            const data = await res.json();
            console.log(data);
            addCar(data); 
        } catch (e) {
            console.log(e);
        }
    }
    
    const truncate_immagini = async () => {
        try {
            const res = await fetch("http://localhost:5600/truncate", {
                method: "DELETE" // Specifica il metodo DELETE
            });
            if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
            const data = await res.json();
            console.log(data);
            addCar(data); 
        } catch (e) {
            console.log(e);
        }
    }

    const delete_immagini = async (id) => {
        try {
            const res = await fetch(`http://localhost:5600/delete/${id}`, {
                method: "DELETE" // Specifica il metodo DELETE
            });
            if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
            const data = await res.json();
            console.log(data);
            addCar(data); 
        } catch (e) {
            console.log(e);
        }
    }

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
            console.log(data);
            link.setAttribute("href", data.url);
            link.innerText = data.url;
            addCar(data.url); 
        } catch (e) {
            console.log(e);
        }
    }

    function addCar(imgUrl) {
        console.log(imgUrl)
        const carouselInner = document.querySelector('#carousel');
        let html="";
        imgUrl.forEach((img,index)=> {
            console.log(img,img.name)
            if (index===0){
                html += `
            <div class="carousel-item active">
                <img src=".${img.name}" class="d-block w-100" alt="Image">
            </div>
        `;
            }else
            {html += `
            <div class="carousel-item">
                <img src=".${img.name}" class="d-block w-100" alt="Image">
            </div>
        `;}
        }); 
        console.log(html)
        carouselInner.innerHTML = html;
    }
    cerca_immagini();
    button.onclick = handleSubmit;
})();
