const API_URL = "https://dummyjson.com/products/category/home-decoration?limit=20";
const ideaGrid = document.querySelector("#ideaGrid");
const ideaStatus = document.querySelector("#ideaStatus");
const ideaSearch = document.querySelector("#ideaSearch");
const ideaSort = document.querySelector("#ideaSort");
let decorItems = [];

const money = value => `৳${Math.round(Number(value) * 110)}`; // illustrative BDT conversion for this student demo

async function loadDecorIdeas() {
  ideaStatus.textContent = "Loading decor inspiration...";
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`API request failed (${response.status})`);
    const data = await response.json();
    decorItems = Array.isArray(data.products) ? data.products : [];
    renderDecorIdeas();
    ideaStatus.textContent = decorItems.length ? `${decorItems.length} ideas loaded from DummyJSON API.` : "No decor ideas found.";
  } catch (error) {
    ideaStatus.textContent = "Could not load ideas. Please check your internet connection and refresh.";
    console.error(error);
  }
}

function renderDecorIdeas() {
  const term = ideaSearch.value.trim().toLowerCase();
  let filtered = decorItems.filter(item => item.title.toLowerCase().includes(term));
  if (ideaSort.value === "low") filtered.sort((a,b) => a.price-b.price);
  if (ideaSort.value === "high") filtered.sort((a,b) => b.price-a.price);
  ideaGrid.innerHTML = "";
  if (!filtered.length) {
    ideaGrid.innerHTML = '<p class="muted">No matching ideas. Try another keyword.</p>';
    return;
  }
  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "idea-card";
    const image = document.createElement("img");
    image.src = item.thumbnail || item.images?.[0] || "";
    image.alt = item.title;
    image.loading = "lazy";
    const info = document.createElement("div");
    info.className = "idea-info";
    const title = document.createElement("h3");
    title.textContent = item.title;
    const description = document.createElement("p");
    description.textContent = item.description || "A little inspiration for your home.";
    const bottom = document.createElement("div");
    bottom.className = "idea-bottom";
    const price = document.createElement("b");
    price.textContent = money(item.price);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Use as idea ↗";
    button.addEventListener("click", () => {
      document.querySelector("#bookingService").value = "Room decoration";
      document.querySelector("#bookingForm textarea").value = `I like this decor idea: ${item.title}`;
      document.querySelector("#booking").scrollIntoView({behavior:"smooth"});
    });
    bottom.append(price, button);
    info.append(title, description, bottom);
    card.append(image, info);
    ideaGrid.append(card);
  });
}
ideaSearch.addEventListener("input", renderDecorIdeas);
ideaSort.addEventListener("change", renderDecorIdeas);

// Booking data is stored in Local Storage and survives a page refresh.
const STORAGE_KEY = "homeglow-bookings-v1";
const bookingForm = document.querySelector("#bookingForm");
const bookingList = document.querySelector("#bookingList");
const bookingMessage = document.querySelector("#bookingMessage");
const dateInput = document.querySelector("#bookingDate");

function getBookings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveBookings(bookings) { localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings)); }
function renderBookings() {
  const bookings = getBookings();
  bookingList.innerHTML = "";
  if (!bookings.length) {
    bookingList.innerHTML = '<p class="muted">No bookings saved yet.</p>';
    return;
  }
  bookings.forEach(booking => {
    const item = document.createElement("article");
    item.className = "booking-item";
    const details = document.createElement("div");
    const name = document.createElement("b");
    name.textContent = `${booking.service} · ${booking.name}`;
    const meta = document.createElement("small");
    meta.textContent = `${booking.date} at ${booking.time} · ${booking.phone}`;
    details.append(name, meta);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", `Remove booking for ${booking.name}`);
    remove.addEventListener("click", () => {
      saveBookings(getBookings().filter(entry => entry.id !== booking.id));
      renderBookings();
    });
    item.append(details, remove);
    bookingList.append(item);
  });
}
dateInput.min = new Date().toISOString().split("T")[0];
bookingForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const booking = Object.fromEntries(formData.entries());
  if (booking.date < dateInput.min) {
    bookingMessage.textContent = "Please choose today or a future date.";
    return;
  }
  booking.id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const bookings = getBookings();
  bookings.unshift(booking);
  saveBookings(bookings);
  bookingForm.reset();
  bookingMessage.textContent = "Your request is saved on this device. Contact the team to confirm.";
  renderBookings();
});
document.querySelector("#clearBookings").addEventListener("click", () => {
  if (confirm("Delete all saved booking requests from this browser?")) {
    saveBookings([]);
    renderBookings();
    bookingMessage.textContent = "Booking history cleared.";
  }
});
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector("#bookingService").value = link.dataset.service;
  });
});
document.querySelector("#menuToggle").addEventListener("click", () => document.querySelector("#mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(link => link.addEventListener("click", () => document.querySelector("#mainNav").classList.remove("open")));
document.querySelector("#year").textContent = new Date().getFullYear();
renderBookings();
loadDecorIdeas();
