const main = () => {
    getGlobalData();
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

const getGlobalData = () => {
    const URL = "https://covid19.mathdro.id/api";
    let section = document.getElementById('section_seluruh_dunia');

    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            let { confirmed, recovered, deaths, lastUpdate } = data
            section.getElementsByClassName('confirm_count')[0].innerText = confirmed.value.toLocaleString()
            section.getElementsByClassName('recover_count')[0].innerText = recovered.value.toLocaleString()
            section.getElementsByClassName('death_count')[0].innerText = deaths.value.toLocaleString()
        
            // set date 
            document.getElementById('last_update').innerText = formatDate(lastUpdate)
        })
}

const getDataTable = () => {
    const URL = "https://covid19.mathdro.id/api/confirmed";
    let section = document.getElementById('section_table');
    let table = section.getElementsByTagName('table')[0];
    let countries = {};

    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            data.map(data_row => {
                let {combinedKey, countryRegion, confirmed, recovered, deaths} = data_row;
                if(countries[countryRegion] == undefined) {
                    countries[countryRegion] = {
                        "c": confirmed,
                        "r": recovered,
                        "d": deaths
                    }
                } else {
                    countries[countryRegion]['c'] += confirmed || 0;
                    countries[countryRegion]['r'] += recovered || 0;
                    countries[countryRegion]['d'] += deaths || 0;
                }
            });
        })
        .then(() => {

            // obj to array
            let arr_countries = [];
            Object.keys(countries).forEach((key) => {
                arr_countries.push({
                    "name": key,
                    "c": countries[key]['c'],
                    "d": countries[key]['d'],
                    "r": countries[key]['r'],
                })
            });

            // sort 'kasus positif terbanyak'
            arr_countries.sort((a,b) => b.c - a.c);

            arr_countries.map((country, idx) => {
                let {name, c, d, r} = country;

                let row = table.insertRow();
                row.insertCell().innerText = idx + 1
                row.insertCell().innerText = name
                row.insertCell().innerText = c.toLocaleString()
                row.insertCell().innerText = r.toLocaleString()
                row.insertCell().innerText = d.toLocaleString()
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