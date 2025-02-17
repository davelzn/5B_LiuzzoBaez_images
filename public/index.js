import { createLogin } from '../login.js';
import { addCar } from '../carosello.js';
import { cTable } from '../table.js';
//import { createNavigator } from '../navigator.js';

//const navigator = createNavigator(document.querySelector('#container'));
const homeBtn = document.getElementById("home-btn-ad");
const tableAd = document.getElementById("ad-table");
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
            if (data == []){
                console.log("trunc")
                truncate_immagini();
            }
            
            addCar(data); 
            cTable(tableAd, data, delete_immagini);
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
            cTable(tableAd, data, delete_immagini);
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
            const res1 = await fetch("http://localhost:5600/images");
            if (!res1.ok) throw new Error(`Errore HTTP: ${res1.status}`);
            const data = await res1.json();
            console.log(data);
            addCar(data); 
            cTable(tableAd, data, delete_immagini);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
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

    
    
    cerca_immagini();
    
    
    
    button.onclick = handleSubmit;
})();
