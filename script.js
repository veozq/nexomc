const SERVER_IP = "nexomc.icsv.pl";
const DISCORD_URL = "https://discord.gg/WbhVMepzP";

const toast = document.getElementById("toast");
const copyIpBtn = document.getElementById("copyIpBtn");
const copyDiscordBtn = document.getElementById("copyDiscordBtn");
const serverStatus = document.getElementById("serverStatus");
const playersOnline = document.getElementById("playersOnline");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch (error) {
    showToast("Nie udało się skopiować");
  }
}

copyIpBtn?.addEventListener("click", () => copyText(SERVER_IP, "Skopiowano IP serwera!"));
copyDiscordBtn?.addEventListener("click", () => copyText(DISCORD_URL, "Skopiowano link Discord!"));

menuBtn?.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

async function loadServerStatus() {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
    const data = await res.json();

    if (data.online) {
      serverStatus.textContent = "Online";
      playersOnline.textContent = `${data.players?.online ?? 0} / ${data.players?.max ?? "?"}`;
    } else {
      serverStatus.textContent = "Offline";
      playersOnline.textContent = "0";
    }
  } catch (error) {
    serverStatus.textContent = "Brak danych";
    playersOnline.textContent = "--";
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
loadServerStatus();
