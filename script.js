const SERVER_IP = 'nexomc.icsv.pl';
const DISCORD = 'https://discord.gg/WbhVMepzP';

const toast = document.getElementById('toast');
function showToast(text){
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2200);
}

async function copyIp(){
  try{
    await navigator.clipboard.writeText(SERVER_IP);
    showToast('Skopiowano IP: ' + SERVER_IP);
  }catch(e){
    showToast('IP serwera: ' + SERVER_IP);
  }
}
['copyIpBtn','copyIpBtn2','copyIpBtn3'].forEach(id=>{
  const btn=document.getElementById(id);
  if(btn) btn.addEventListener('click',copyIp);
});

const menuBtn=document.getElementById('menuBtn');
const navLinks=document.getElementById('navLinks');
menuBtn?.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

async function loadServerStatus(){
  const status=document.getElementById('onlineStatus');
  const players=document.getElementById('playersOnline');
  try{
    const res=await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
    const data=await res.json();
    if(data.online){
      status.textContent='Online';
      players.textContent=`${data.players?.online ?? 0}/${data.players?.max ?? '?'}`;
    }else{
      status.textContent='Offline';
      players.textContent='0';
    }
  }catch(e){
    status.textContent='Brak danych';
    players.textContent='—';
  }
}
loadServerStatus();
setInterval(loadServerStatus,60000);
