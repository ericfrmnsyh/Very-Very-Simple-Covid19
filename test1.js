const main = () => {
    getIndonesiaData();
    getDataTable()
}

const formatDate = (date) => {
    return new Date(date).toLocaleString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

const getIndonesiaData = () => {
    const URL = "https://covid19.mathdro.id/api/countries/ID";
    let section = document.getElementById('section_indonesia');

    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            let { confirmed, recovered, deaths, lastUpdate } = data
            section.getElementsByClassName('confirm_count')[0].innerText = confirmed.value.toLocaleString()
            section.getElementsByClassName('recover_count')[0].innerText = recovered.value.toLocaleString()
            section.getElementsByClassName('death_count')[0].innerText = deaths.value.toLocaleString()

            document.getElementById('last_update').innerText = formatDate(lastUpdate)
        })
}

const getDataTable = () => {
    const URL = "http://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi";
    let section = document.getElementById('section_table');
    let table = section.getElementsByTagName('table')[0];
    let Prov = {};

    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            data.map(data_row => {
                let { provinsi, kasus, sembuh, meninggal } = data_row;
                if (Prov[provinsi] == undefined) {
                    Prov[provinsi] = {
                        "p": kasus,
                        "s": sembuh,
                        "m": meninggal
                    }
                } else {
                    Prov[provinsi]['p'] += kasus || 0;
                    Prov[provinsi]['s'] += sembuh || 0;
                    Prov[provinsi]['m'] += meninggal || 0;
                }
            });
        })
        .then(() => {

            // obj to array
            let arr_Prov = [];
            Object.keys(Prov).forEach((key) => {
                arr_Prov.push({
                    "name": key,
                    "p": Prov[key]['p'],
                    "s": Prov[key]['s'],
                    "m": Prov[key]['m'],
                })
            });

            // sort 'kasus positif terbanyak'
            arr_Prov.sort((a, b) => b.c - a.c);

            arr_Prov.map((provinsi, idx) => {
                let { name, p, s, m } = provinsi;

                let row = table.insertRow();
                row.insertCell().innerText = idx + 1
                row.insertCell().innerText = name
                row.insertCell().innerText = p.toLocaleString()
                row.insertCell().innerText = s.toLocaleString()
                row.insertCell().innerText = m.toLocaleString()
            });
        });
}

main();

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  
  
  
  (function($) {
  
    $(".sidenav a").on('click', function() {
          closeNav();
      });
  
  })