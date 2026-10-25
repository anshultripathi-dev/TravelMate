const pages = [
  ["dashboard", "Dashboard", "home"],
  ["trips", "My Trips", "map"],
  ["new-trip", "New trip", "plus"],
  ["explore", "Explore", "compass"],
  ["itinerary", "Itinerary", "calendar"],
  ["budget", "Budget", "wallet"],
  ["history", "History", "history"],
]

const defaultTrip = {
  destination: "Jaipur, Rajasthan",
  title: "Rajasthan, the royal route",
  route: "Jaipur → Jodhpur",
  startDate: "2025-10-12",
  endDate: "2025-10-17",
  travellers: 2,
  budget: 42000,
  pace: "Balanced",
  image: "images/jaipur.jpg",
  expenses: [
    { name: "Samode Haveli", category: "Stay", date: "12 Oct", amount: 12500 },
    {
      name: "Trains and local cabs",
      category: "Travel",
      date: "12–17 Oct",
      amount: 8240,
    },
    {
      name: "Meals and cafés",
      category: "Food",
      date: "12–17 Oct",
      amount: 4720,
    },
    {
      name: "Forts and experiences",
      category: "Activities",
      date: "13–16 Oct",
      amount: 3000,
    },
  ],
}

const places = [
  ["Jaipur", "Rajasthan", "images/jaipur.jpg", "Culture", "₹18,500", "4.9"],
  [
    "Alappuzha",
    "Kerala",
    "images/kerala.jpg",
    "Slow travel",
    "₹22,000",
    "4.8",
  ],
  ["Udaipur", "Rajasthan", "images/udaipur.jpg", "Weekend", "₹16,800", "4.7"],
]

const iconPaths = {
  home: '<rect x="3" y="10" width="18" height="11" rx="2"/><path d="m3 10 9-7 9 7M9 21v-7h6v7"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4 4-2Z"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  wallet:
    '<path d="M4 6h15a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h13"/><path d="M16 12h5"/>',
  history:
    '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  plane: '<path d="m2 16 20-9-2 10-7-2-4 5-1-7-6-2Z"/>',
  pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
  arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
  back: '<path d="M19 12H5M10 7l-5 5 5 5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  chevron: '<path d="m8 10 4 4 4-4"/>',
  sparkles:
    '<path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 15l.7 2.3L8 18l-2.3.7L5 21l-.7-2.3L2 18l2.3-.7L5 15Z"/>',
  rupee: '<path d="M6 5h12M6 9h12M7 5c7 0 7 8 0 8l9 7"/>',
}

const icon = (name, size = 18) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.arrow}</svg>`

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

const dateValue = (value) => new Date(`${value}T12:00:00`)
const city = (trip) => trip.destination.split(",")[0].trim()
const region = (trip) =>
  trip.destination.split(",").slice(1).join(",").trim() || city(trip)
const days = (trip) =>
  Math.max(
    1,
    Math.round(
      (dateValue(trip.endDate) - dateValue(trip.startDate)) / 86400000,
    ) + 1,
  )
const actualSpend = (trip) =>
  trip.expenses.reduce((sum, item) => sum + item.amount, 0)
const dateRange = (trip) => {
  const start = dateValue(trip.startDate)
  const end = dateValue(trip.endDate)
  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  const first = sameMonth
    ? start.getDate()
    : start.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  return `${first}–${end.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
}

const safeText = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")

let trip = (() => {
  try {
    return {
      ...defaultTrip,
      ...JSON.parse(localStorage.getItem("travelmate-active-trip") || "{}"),
    }
  } catch {
    return defaultTrip
  }
})()
let tripFilter = "All trips"
let itineraryDay = 0

const currentPage = () => {
  const value = location.hash.replace("#/", "")
  return pages.some(([id]) => id === value) ? value : "dashboard"
}

const go = (page) => {
  location.hash = `/${page}`
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const badge = (text, muted = false) =>
  `<span class="badge${muted ? " badge-muted" : ""}">${safeText(text)}</span>`

const heading = ({ eyebrow, title, description, back, action = "" }) => `
  <header class="page-heading">
    <div>
      ${
        back
          ? `<button class="back-button" data-nav="${back.page}">${icon("back", 15)}${back.label}</button>`
          : ""
      }
      <p class="eyebrow">${safeText(eyebrow)}</p>
      <h1>${safeText(title)}</h1>
      <p>${safeText(description)}</p>
    </div>
    ${action}
  </header>`

const stat = (label, value, detail, symbol) => `
  <article class="surface stat-card">
    <div class="stat-icon">${icon(symbol, 20)}</div>
    <div><p>${safeText(label)}</p><strong>${safeText(value)}</strong><span>${safeText(detail)}</span></div>
  </article>`

const destinationCards = (items = places) =>
  items
    .map(
      ([name, state, image, tag, price, rating]) => `
      <article class="destination-card">
        <img src="${image}" alt="${name}, ${state}">
        <div class="destination-overlay"></div>
        ${badge(tag)}
        <div class="destination-copy"><p>${state}</p><h3>${name}</h3><span>From ${price} · ★ ${rating}</span></div>
      </article>`,
    )
    .join("")

const dashboard = () => `
  ${heading({
    eyebrow: "Your travel workspace",
    title: "Namaste, Anshul",
    description: "Your next adventure is taking shape. Here’s the latest.",
    action: `<button class="primary-button" data-nav="new-trip">${icon("plus")}Plan a new trip</button>`,
  })}
  <section class="stats-grid">
    ${stat("Trips this year", "06", "2 more than last year", "plane")}
    ${stat("Total spent", "₹1,24,600", "Across 4 completed trips", "rupee")}
    ${stat("Places explored", "18", "Across 7 Indian states", "pin")}
  </section>
  <section class="dashboard-grid">
    <article class="hero-trip">
      <img src="${trip.image}" alt="${safeText(trip.destination)}">
      <div class="hero-shade"></div>
      <div class="hero-top">${badge("Next trip")}</div>
      <div class="hero-content">
        <p>${dateRange(trip)} · ${days(trip)} days</p>
        <h2>${safeText(trip.title)}</h2>
        <div class="hero-meta"><span>${icon("pin", 15)}${safeText(trip.route)}</span><span>${icon("calendar", 15)}${trip.travellers} travellers</span></div>
      </div>
    </article>
    <article class="surface plan-card">
      <div class="plan-title"><div><p class="eyebrow">Trip readiness</p><h2>Almost ready to go</h2></div><div class="progress-ring"><span>72%</span></div></div>
      <div class="check-list">
        ${[
          "Travel tickets confirmed",
          `Stay in ${city(trip)} shortlisted`,
          `Confirm the next stop on ${trip.route}`,
          "Build day-wise itinerary",
        ]
          .map(
            (label, index) =>
              `<div class="check-row"><span class="check${
                index < 2 ? " done" : ""
              }">${index < 2 ? icon("check", 13) : ""}</span><span class="${
                index < 2 ? "completed" : ""
              }">${safeText(label)}</span></div>`,
          )
          .join("")}
      </div>
      <div class="plan-actions">
        <button class="secondary-button" data-nav="itinerary">View itinerary ${icon("arrow", 16)}</button>
        <button class="text-button" data-nav="history">Manage budget</button>
      </div>
    </article>
  </section>
  <section><div class="section-heading"><h2>Recommended for you</h2><button class="text-button" data-nav="explore">Explore all ${icon("arrow", 16)}</button></div><div class="destination-grid">${destinationCards()}</div></section>`

const tripRows = () => {
  const spent = actualSpend(trip)
  const active = {
    title: trip.title,
    dates: dateRange(trip),
    status: "Upcoming",
    image: trip.image,
    budget: formatINR(trip.budget),
    spent: formatINR(spent),
    progress: Math.min(100, Math.round((spent / trip.budget) * 100)),
    target: "itinerary",
  }
  const others = [
    {
      title: "Kerala backwaters",
      dates: "8–13 Jan 2026",
      status: "Planning",
      image: "images/kerala.jpg",
      budget: "₹36,000",
      spent: "₹8,100",
      progress: 23,
      target: "itinerary",
    },
    {
      title: "Lakes and old city",
      dates: "3–6 Feb 2025",
      status: "Completed",
      image: "images/udaipur.jpg",
      budget: "₹25,000",
      spent: "₹23,850",
      progress: 100,
      target: "history",
    },
  ]
  return [active, ...others]
    .filter((item) => tripFilter === "All trips" || item.status === tripFilter)
    .map(
      (item) => `<article class="surface trip-row">
        <img src="${item.image}" alt="${safeText(item.title)}">
        <div class="trip-main">
          <div>${badge(item.status, item.status === "Completed")}<h2>${safeText(item.title)}</h2><p>${icon("calendar", 15)}${safeText(item.dates)}</p></div>
          <div class="trip-budget"><span>Actual: ${safeText(item.spent)}</span><strong>Planned: ${safeText(item.budget)}</strong><div class="progress-track"><span style="width:${item.progress}%"></span></div></div>
          <button class="icon-button" data-nav="${item.target}" aria-label="Open ${safeText(item.title)}">${icon("arrow")}</button>
        </div>
      </article>`,
    )
    .join("")
}

const myTrips = () => `
  ${heading({ eyebrow: "Your journeys", title: "My Trips", description: "All your plans, bookings and memories in one place.", back: { page: "dashboard", label: "Back to dashboard" }, action: `<button class="primary-button" data-nav="new-trip">${icon("plus")}New trip</button>` })}
  <div class="filter-row" role="group" aria-label="Filter trips">
    ${["All trips", "Upcoming", "Planning", "Completed"].map((item) => `<button class="filter-chip${tripFilter === item ? " active" : ""}" data-filter="${item}">${item}</button>`).join("")}
  </div>
  <div class="trip-list">${tripRows()}</div>`

const newTrip = () => `
  ${heading({ eyebrow: "Start somewhere", title: "Plan a new trip", description: "Tell us the basics. You can fine-tune every detail later.", back: { page: "trips", label: "Back to my trips" } })}
  <div class="new-trip-layout">
    <form class="surface trip-form" id="trip-form">
      <div class="form-step"><span>01</span><div><h2>Where are you headed?</h2><p>Pick one destination to begin.</p></div></div>
      <label>Destination<span class="input-shell">${icon("pin")}<input name="destination" value="${safeText(trip.destination)}" required></span></label>
      <div class="form-grid">
        <label>Start date<span class="input-shell">${icon("calendar")}<input name="startDate" type="date" value="${trip.startDate}" required></span></label>
        <label>End date<span class="input-shell">${icon("calendar")}<input name="endDate" type="date" min="${trip.startDate}" value="${trip.endDate}" required></span></label>
      </div>
      <div class="form-grid">
        <label>Travellers<span class="input-shell"><input name="travellers" type="number" min="1" value="${trip.travellers}" required></span></label>
        <label>Planned budget<span class="input-shell">${icon("rupee")}<input name="budget" type="number" min="1000" step="500" value="${trip.budget}" required></span></label>
      </div>
      <fieldset><legend>What’s your travel style?</legend><div class="style-options">
        ${["Slow & easy", "Balanced", "Full power"].map((pace) => `<label class="style-card${trip.pace === pace ? " selected" : ""}"><input type="radio" name="pace" value="${pace}" ${trip.pace === pace ? "checked" : ""}><strong>${pace}</strong><span>${pace === "Balanced" ? "A bit of everything" : pace === "Slow & easy" ? "Plenty of breathing room" : "Pack every day in"}</span></label>`).join("")}
      </div></fieldset>
      <button class="primary-button form-submit" type="submit">${icon("sparkles")}Generate my trip</button>
    </form>
    <aside class="planning-aside"><img src="images/palms.jpg" alt="A scenic Indian road lined with palm trees"><div><p class="eyebrow">TravelMate tip</p><blockquote>“Leave one unscheduled morning. That’s usually where the best story begins.”</blockquote></div></aside>
  </div>`

const explore = () => `
  ${heading({ eyebrow: "Ideas for your next break", title: "Explore India", description: "Hand-picked routes, stays and local experiences.", back: { page: "dashboard", label: "Back to dashboard" } })}
  <div class="explore-search">${icon("search", 20)}<input id="place-search" aria-label="Search destinations" placeholder="Search by city, state or mood"><button>Filters</button></div>
  <div class="feature-banner"><img src="images/rajasthan.jpg" alt="Historic architecture in Rajasthan"><div class="feature-shade"></div><div>${badge("Editor’s route")}<h2>Seven days through royal Rajasthan</h2><p>Forts at sunrise, old-city food walks and one unforgettable desert night.</p><button class="light-button" data-nav="new-trip">Plan this route ${icon("arrow", 16)}</button></div></div>
  <div class="section-heading"><h2>Popular right now</h2></div><div class="explore-grid" id="place-grid">
    ${places.map(([name, state, image, tag, price, rating]) => `<article class="surface explore-card" data-search="${name} ${state} ${tag}"><img src="${image}" alt="${name}, ${state}"><div class="explore-card-copy"><div><p>${state}</p><h3>${name}</h3></div><span>★ ${rating}</span></div><div class="explore-footer"><span>Trips from ${price}</span><button data-nav="new-trip" aria-label="Plan a trip to ${name}">${icon("arrow", 17)}</button></div></article>`).join("")}
  </div>`

const itineraryData = () => {
  const start = dateValue(trip.startDate)
  const date = (offset) => {
    const value = new Date(start)
    value.setDate(start.getDate() + offset)
    return value.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  }
  return [
    {
      day: "Day 1",
      date: date(0),
      items: [
        [
          "10:30",
          `Arrive in ${city(trip)}`,
          `${trip.travellers} travellers · Arrival details to confirm`,
        ],
        [
          "13:00",
          "Check in and settle",
          `Stay allocation: ${formatINR(Math.round(trip.budget * 0.43))}`,
        ],
        [
          "17:30",
          `${city(trip)} orientation walk`,
          `${trip.pace} pace · Flexible evening`,
        ],
      ],
    },
    {
      day: "Day 2",
      date: date(1),
      items: [
        [
          "08:00",
          `Local highlights of ${city(trip)}`,
          "Start early to enjoy a quieter morning",
        ],
        ["13:30", "Regional lunch", "A local favourite · Table to be booked"],
        ["16:00", "Signature experience", `Part of your ${trip.route} plan`],
      ],
    },
  ]
}

const itinerary = () => {
  const itineraryDays = itineraryData()
  const selected = itineraryDays[itineraryDay] || itineraryDays[0]
  return `
    ${heading({ eyebrow: `${region(trip)} · ${dateRange(trip)}`, title: "Your itinerary", description: `A ${days(trip)}-day ${trip.pace.toLowerCase()} plan for ${trip.route}.`, back: { page: "trips", label: "Back to my trips" }, action: `<div class="heading-actions"><button class="secondary-button" data-nav="budget">${icon("wallet")}View budget</button><button class="secondary-button">${icon("plus")}Add activity</button></div>` })}
    <div class="itinerary-tabs">${itineraryDays.map((item, index) => `<button data-day="${index}" class="${itineraryDay === index ? "active" : ""}"><span>${item.day}</span><small>${item.date}</small></button>`).join("")}</div>
    <section class="itinerary-layout">
      <div class="surface timeline-card"><div class="timeline-heading"><div><p class="eyebrow">${safeText(selected.day)} · ${safeText(selected.date)}</p><h2>${safeText(city(trip))}</h2></div>${badge("3 activities")}</div>
        <div class="timeline">${selected.items.map(([time, title, detail]) => `<article><time>${safeText(time)}</time><span class="timeline-dot">${icon("pin", 17)}</span><div><h3>${safeText(title)}</h3><p>${safeText(detail)}</p></div></article>`).join("")}</div>
      </div>
      <aside class="surface day-summary"><div class="mini-map"><span class="route-line"></span><span class="map-stop stop-one">1</span><span class="map-stop stop-two">2</span><span class="map-stop stop-three">3</span></div><h3>Day at a glance</h3><div><span>Travel time</span><strong>1 hr 20 min</strong></div><div><span>Activities</span><strong>3 planned</strong></div><div><span>Estimated spend</span><strong>${formatINR(Math.round(trip.budget / days(trip)))}</strong></div></aside>
    </section>`
}

const budget = () => {
  const spent = actualSpend(trip)
  const settings = [
    ["Stay", 0.43],
    ["Travel", 0.24],
    ["Food", 0.19],
    ["Activities", 0.14],
  ]
  const categories = settings.map(([label, share]) => {
    const planned = Math.round(trip.budget * share)
    const actual = trip.expenses
      .filter((item) => item.category === label)
      .reduce((sum, item) => sum + item.amount, 0)
    return {
      label,
      planned,
      actual,
      progress: planned
        ? Math.min(100, Math.round((actual / planned) * 100))
        : 0,
    }
  })
  const largest = [...trip.expenses].sort((a, b) => b.amount - a.amount)[0]
  return `
    ${heading({ eyebrow: `${region(trip)} · ${days(trip)} days`, title: "Trip budget", description: `Planned costs and actual spending for ${trip.title}.`, back: { page: "itinerary", label: "Back to itinerary" }, action: `<div class="heading-actions"><button class="secondary-button" data-nav="history">${icon("history")}Spending history</button><button class="primary-button">${icon("plus")}Add expense</button></div>` })}
    <section class="budget-summary">
      <article class="budget-total"><p>Planned trip budget</p><h2>${formatINR(trip.budget)}</h2><div class="budget-bar"><span style="width:${Math.min(100, Math.round((spent / trip.budget) * 100))}%"></span></div><div><span>${formatINR(spent)} actually spent</span><span>${formatINR(Math.max(0, trip.budget - spent))} unspent</span></div></article>
      ${stat("Actual daily average", formatINR(Math.round(spent / days(trip))), `${formatINR(Math.round(trip.budget / days(trip)))} planned per day`, "calendar")}
      ${stat("Largest actual spend", largest ? formatINR(largest.amount) : formatINR(0), largest ? `${largest.category} · ${largest.name}` : "No expenses recorded yet", "wallet")}
    </section>
    <section><div class="section-heading"><h2>Planned vs actual by category</h2></div><div class="category-grid">
      ${categories.map((item) => `<article class="surface category-card"><div class="category-icon">${icon("rupee")}</div><div><h3>${item.label}</h3><p><strong>${formatINR(item.actual)} actual</strong> · ${formatINR(item.planned)} planned</p><div class="progress-track"><span style="width:${item.progress}%"></span></div></div></article>`).join("")}
    </div></section>
    <section class="surface expenses"><div class="section-heading"><h2>Actual expenses recorded</h2></div>
      ${
        trip.expenses.length
          ? trip.expenses
              .map(
                (item) =>
                  `<div class="expense-row"><span class="expense-mark">${icon("rupee")}</span><div><strong>${safeText(item.name)}</strong><span>${safeText(item.category)} · ${safeText(item.date)}</span></div><strong>${formatINR(item.amount)}</strong></div>`,
              )
              .join("")
          : `<p class="empty-expenses">No actual spending has been recorded. Your planned allocations remain unchanged.</p>`
      }
    </section>`
}

const history = () => `
  ${heading({ eyebrow: "Past journeys", title: "Travel history", description: "The places you’ve been and the memories you’ve made.", back: { page: "dashboard", label: "Back to dashboard" } })}
  <section class="surface active-trip-history"><div>${badge("Current trip")}<h2>${safeText(trip.title)}</h2><p>${dateRange(trip)} · ${safeText(trip.route)}</p></div><div class="history-budget"><span>Actual spending</span><strong>${formatINR(actualSpend(trip))}</strong><small>of ${formatINR(trip.budget)} planned</small></div><button class="secondary-button" data-nav="budget">View budget details ${icon("arrow", 16)}</button></section>
  <section class="history-highlight"><img src="images/udaipur.jpg" alt="Lake and palace in Udaipur"><div class="history-shade"></div><div>${badge("Most recent")}<h2>Udaipur in winter</h2><p>3–6 February 2025 · 4 days · 26 photos</p><button class="light-button">View memories</button></div></section>
  <section class="surface history-table"><div class="table-head"><div><h2>All completed trips</h2><p>12 journeys since 2021</p></div></div>
    ${[
      ["Udaipur, Rajasthan", "03–06 Feb 2025", "4 days", "₹23,850"],
      ["Pondicherry", "11–15 Aug 2024", "5 days", "₹31,200"],
      ["Dharamshala, Himachal", "02–08 Apr 2024", "7 days", "₹42,500"],
      ["Varanasi, Uttar Pradesh", "17–20 Nov 2023", "4 days", "₹19,400"],
    ]
      .map(
        ([place, date, duration, cost]) =>
          `<div class="history-row"><span class="history-pin">${icon("pin")}</span><div><strong>${place}</strong><span>${date}</span></div><span>${duration}</span><strong>${cost}</strong><button data-nav="itinerary" aria-label="View ${place}">${icon("arrow", 17)}</button></div>`,
      )
      .join("")}
  </section>`

const pageContent = {
  dashboard,
  trips: myTrips,
  "new-trip": newTrip,
  explore,
  itinerary,
  budget,
  history,
}

function render() {
  const active = currentPage()
  const activeLabel = pages.find(([id]) => id === active)?.[1] || "Dashboard"
  document.querySelector("#app").innerHTML = `
    <div class="app-shell">
      <button class="sidebar-backdrop" data-close-menu aria-label="Close menu"></button>
      <aside class="sidebar">
        <div class="brand"><span class="brand-mark">${icon("plane", 19)}</span><span>TravelMate</span><button class="mobile-close" data-close-menu aria-label="Close menu">${icon("close")}</button></div>
        <div class="sidebar-search">${icon("search", 16)}<span>Search anything</span><kbd>⌘K</kbd></div>
        <p class="nav-label">Workspace</p>
        <nav aria-label="Main navigation">
          ${pages.map(([id, label, symbol]) => `<button class="nav-item${active === id ? " active" : ""}" data-nav="${id}" ${active === id ? 'aria-current="page"' : ""}>${icon(symbol)}<span>${label}</span>${id === "trips" ? "<small>3</small>" : ""}</button>`).join("")}
        </nav>
        <div class="sidebar-promo">${icon("sparkles")}<strong>Ready for somewhere new?</strong><p>Build a complete trip in a few simple steps.</p><button data-nav="new-trip">Start planning</button></div>
        <button class="profile-card"><span class="avatar">AS</span><span><strong>Anshul Sharma</strong><small>anshul@example.in</small></span>${icon("chevron", 16)}</button>
      </aside>
      <div class="app-main">
        <header class="topbar"><button class="menu-button" data-open-menu aria-label="Open navigation">${icon("menu", 22)}</button><div class="topbar-copy"><span>Travel workspace</span><strong>${activeLabel}</strong></div><div class="topbar-actions"><button class="notification-button" aria-label="Notifications">${icon("bell", 19)}<span></span></button><button class="top-profile"><span class="avatar">AS</span><span><strong>Anshul</strong><small>Personal account</small></span>${icon("chevron", 15)}</button></div></header>
        <main class="page-content">${pageContent[active]()}</main>
        <footer><span>TravelMate · Made for journeys across India</span><span>Plain HTML, CSS and JavaScript</span></footer>
      </div>
    </div>`
  bindPageEvents()
}

function bindPageEvents() {
  document
    .querySelectorAll("[data-nav]")
    .forEach((button) =>
      button.addEventListener("click", () => go(button.dataset.nav)),
    )
  document.querySelector("[data-open-menu]")?.addEventListener("click", () => {
    document.querySelector(".sidebar").classList.add("mobile-open")
    document.querySelector(".sidebar-backdrop").classList.add("visible")
  })
  document.querySelectorAll("[data-close-menu]").forEach((button) =>
    button.addEventListener("click", () => {
      document.querySelector(".sidebar").classList.remove("mobile-open")
      document.querySelector(".sidebar-backdrop").classList.remove("visible")
    }),
  )
  document.querySelectorAll("[data-filter]").forEach((button) =>
    button.addEventListener("click", () => {
      tripFilter = button.dataset.filter
      render()
    }),
  )
  document.querySelectorAll("[data-day]").forEach((button) =>
    button.addEventListener("click", () => {
      itineraryDay = Number(button.dataset.day)
      render()
    }),
  )
  document
    .querySelector("#place-search")
    ?.addEventListener("input", (event) => {
      const query = event.target.value.toLowerCase()
      document.querySelectorAll("[data-search]").forEach((card) => {
        card.hidden = !card.dataset.search.toLowerCase().includes(query)
      })
    })
  document.querySelectorAll('input[name="pace"]').forEach((input) =>
    input.addEventListener("change", () => {
      document
        .querySelectorAll(".style-card")
        .forEach((card) => card.classList.remove("selected"))
      input.closest(".style-card").classList.add("selected")
    }),
  )
  document.querySelector("#trip-form")?.addEventListener("submit", (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const destination = String(data.get("destination")).trim()
    const destinationCity = destination.split(",")[0].trim()
    trip = {
      destination,
      title: `${destinationCity}, your next escape`,
      route: `${destinationCity} and nearby`,
      startDate: String(data.get("startDate")),
      endDate: String(data.get("endDate")),
      travellers: Number(data.get("travellers")),
      budget: Number(data.get("budget")),
      pace: String(data.get("pace")),
      image: destinationImage(destination),
      expenses: [],
    }
    localStorage.setItem("travelmate-active-trip", JSON.stringify(trip))
    itineraryDay = 0
    go("itinerary")
  })
}

function destinationImage(destination) {
  const value = destination.toLowerCase()
  if (value.includes("kerala") || value.includes("alappuzha"))
    return "images/kerala.jpg"
  if (value.includes("udaipur")) return "images/udaipur.jpg"
  if (value.includes("rajasthan") || value.includes("jaipur"))
    return "images/jaipur.jpg"
  return "images/palms.jpg"
}

window.addEventListener("hashchange", render)
render()
