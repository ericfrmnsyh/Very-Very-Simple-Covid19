arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
arrhari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];
date = new Date();
millisecond = date.getMilliseconds();
detik = date.getSeconds();
menit = date.getMinutes();
jam = date.getHours();
hari = date.getDay();
tanggal = date.getDate();
bulan = date.getMonth();
tahun = date.getFullYear();

document.getElementById('date').innerText = arrhari[hari] +", "+ tanggal +"-"+ arrbulan[bulan] +"-"+ tahun