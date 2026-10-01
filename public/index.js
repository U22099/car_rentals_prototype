(function() {
  const CONFIG = {
    brandName: "DED Luxury",
    phone: "2349096968751",
    currency: "₦"
  };

  const VEHICLE_CATEGORIES = [
    { id: "supercar", title: "Exotic Supercar", subtitle: "Ferrari, Lamborghini, McLaren, Porsche GT3", icon: "speed" },
    { id: "sedan", title: "Ultra-Luxury Sedan", subtitle: "Rolls-Royce Ghost, Mercedes-Maybach, Bentley", icon: "sedan" },
    { id: "suv", title: "Prestige & Armored SUV", subtitle: "Land Cruiser 300, Range Rover SV, Escalade, G-Wagon", icon: "security" },
    { id: "daily_executive", title: "Executive & Daily Luxury", subtitle: "Toyota Prado TXL, Lexus ES350, Mercedes E-Class, Camry", icon: "sedan" },
    { id: "security_protocol", title: "Security Escort & Protocol", subtitle: "Toyota Hilux Adventure, Armed Convoy, Bulletproof Option", icon: "security" },
    { id: "delegation_van", title: "Delegation Van & Bus", subtitle: "Toyota HiAce Executive, Coaster Bus for Crews", icon: "van" }
  ];

  const OCCASIONS = [
    "Executive Business & Daily Errands",
    "Airport Tarmac / FBO Arrival",
    "Wedding & Entourage",
    "Interstate Travel & Protocol Escort",
    "Red Carpet, Gala & Video Shoot",
    "Weekend Getaway & Road Trip"
  ];

  const LUXURY_SERVICES = [
    { id: "executive_chauffeur", title: "Professional Executive Chauffeur", desc: "Suited, vetted & protocol-trained driver (Included with all rentals)", icon: "people", fixed: true },
    { id: "armed_escort", title: "Armed Security Detail / Chase Convoy", desc: "MOPOL armed escort vehicle for high-security movements", icon: "security" },
    { id: "tarmac_fbo", title: "Airport Tarmac / FBO Meet & Greet", desc: "Airside vehicle handover at private aviation terminal", icon: "flight" },
    { id: "enclosed_delivery", title: "White-Glove Flatbed Delivery", desc: "Zero-mile enclosed truck delivery to residence or hotel", icon: "truck" },
    { id: "champagne_refreshment", title: "In-Car Refreshments & Beverages", desc: "Chilled drinks, mints, wet towels, and bottled beverages", icon: "wine" }
  ];

  const BUDGET_TIERS = [
    { id: "daily", title: "Daily Executive", range: "₦70,000 – ₦180,000 / day", desc: "Toyota Prado, Lexus ES350, Hilux, Camry, Executive Sedans" },
    { id: "premium", title: "Premium SUV & Executive", range: "₦200,000 – ₦450,000 / day", desc: "Land Cruiser 300, Mercedes E-Class, HiAce VIP, Armored Prado" },
    { id: "high_luxury", title: "High-End Luxury", range: "₦600,000 – ₦1,200,000 / day", desc: "Range Rover SV, Mercedes-Benz G-Wagon, S-Class" },
    { id: "ultra_exotic", title: "Ultra-Exotic & Supercars", range: "₦1,500,000 – ₦3,500,000+ / day", desc: "Rolls-Royce Ghost, Lamborghini Urus, Ferrari F8, Maybach V12" },
    { id: "flexible", title: "Flexible / Tailored Quote", range: "Custom Quotation", desc: "Recommend the best vehicle matching my precise schedule" }
  ];

  let step = 1;
  const totalSteps = 6;

  let selectedCategory = "daily_executive";
  let selectedOccasion = OCCASIONS[0];
  let durationPreset = "weekend";
  let dateRange = { checkIn: null, checkOut: null };
  let showCalendar = false;
  let locationPreference = "Victoria Island / Lekki, Lagos";
  let drivingPreference = "chauffeur";
  let passengers = 2;
  let selectedServices = ["executive_chauffeur"];
  let selectedBudget = "daily";
  let clientName = "";
  let clientPhone = "";
  let customNotes = "";

  let calViewMonth = new Date().getMonth();
  let calViewYear = new Date().getFullYear();

  function formatDate(date) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function getDays() {
    if (dateRange.checkIn && dateRange.checkOut) {
      return Math.max(1, Math.round((dateRange.checkOut - dateRange.checkIn) / 86400000));
    }
    if (durationPreset === "single") return 1;
    if (durationPreset === "weekend") return 3;
    if (durationPreset === "week") return 7;
    return 30;
  }

  function toggleService(id) {
    if (id === "executive_chauffeur") return;
    if (selectedServices.includes(id)) {
      selectedServices = selectedServices.filter(s => s !== id);
    } else {
      selectedServices = [...selectedServices, id];
    }
    render();
  }

  function syncStepInputs() {
    const nameEl = document.getElementById("ded-name");
    const phoneEl = document.getElementById("ded-phone");
    const notesEl = document.getElementById("ded-notes");
    const locEl = document.getElementById("ded-location");

    if (nameEl) clientName = nameEl.value;
    if (phoneEl) clientPhone = phoneEl.value;
    if (notesEl) customNotes = notesEl.value;
    if (locEl) locationPreference = locEl.value;
  }

  function generateWhatsAppMessage() {
    syncStepInputs();

    const days = getDays();
    const datesStr = dateRange.checkIn && dateRange.checkOut
      ? `${formatDate(dateRange.checkIn)} to ${formatDate(dateRange.checkOut)} (${days} day${days > 1 ? "s" : ""})`
      : `${durationPreset.toUpperCase()} DURATION (~${days} day${days > 1 ? "s" : ""}) — Dates flexible`;

    const cat = VEHICLE_CATEGORIES.find(c => c.id === selectedCategory);
    const budget = BUDGET_TIERS.find(b => b.id === selectedBudget);
    const servicesStr = selectedServices.length
      ? selectedServices.map(id => {
          const s = LUXURY_SERVICES.find(x => x.id === id);
          return s ? `  • ${s.title}` : "";
        }).filter(Boolean).join("\n")
      : "  • Executive Chauffeur Handover";

    return (
      `*FLEET REQUEST — ${CONFIG.brandName.toUpperCase()}*\n\n` +
      `👤 *Client Name:* ${clientName.trim() || "Not specified"}\n` +
      `📞 *Contact Phone:* ${clientPhone.trim() || "Not specified"}\n` +
      `🏎️ *Vehicle Category:* ${cat ? cat.title : ""}\n` +
      `🎯 *Occasion/Usage:* ${selectedOccasion}\n` +
      `📅 *Duration & Dates:* ${datesStr}\n` +
      `📍 *Delivery / Pickup Destination:* ${locationPreference}\n` +
      `👔 *Driving Preference:* Executive Chauffeur (Standard)\n` +
      `👥 *Passengers:* ${passengers}\n` +
      `💰 *Budget Tier:* ${budget ? budget.title : ""} (${budget ? budget.range : ""})\n\n` +
      `🛡️ *Additional Services Requested:*\n${servicesStr}\n` +
      (customNotes.trim() ? `\n📝 *Special Requirements:* ${customNotes.trim()}\n` : "") +
      `\nPlease respond with matching available vehicles, photos, and exact rates.`
    );
  }

  const ICONS = {
    speed: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`,
    sedan: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 17h14v-5l-2-4H7l-2 4v5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>`,
    security: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    van: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 17h18v-6l-3-5H6L3 11v6z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
    people: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 1 0 7.75"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    flight: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
    truck: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    wine: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 22h8"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-1-4-5-8-4 4-5 6-5 8a5 5 0 0 0 5 5z"/></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    calendar: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    place: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    sparkle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z"/></svg>`,
    arrowBack: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
    arrowForward: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
  };

  function injectStyles() {
    if (document.getElementById("ded-booking-styles")) return;
    const style = document.createElement("style");
    style.id = "ded-booking-styles";
    style.textContent = `
      #booking * { box-sizing: border-box; }
      #booking {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #fff;
        max-width: 850px;
        margin: 0 auto;
        padding: 12px 8px;
        width: 100%;
        overflow-x: hidden;
      }
      #booking .ded-header { text-align: center; margin-bottom: 16px; }
      #booking .ded-badge {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 4px 12px; border-radius: 999px;
        background: rgba(201, 162, 39, 0.1); border: 1px solid rgba(201, 162, 39, 0.35);
        margin-bottom: 8px; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
        color: #e5c158; font-weight: 600;
      }
      #booking h2 {
        font-size: clamp(1.3rem, 4vw, 2rem); font-weight: 700; letter-spacing: -0.02em;
        margin: 0 0 6px; color: #fff;
      }
      #booking .ded-sub {
        color: #a1a1aa; font-size: 12px; max-width: 440px; margin: 0 auto; line-height: 1.35;
      }
      
      #booking .ded-progress {
        display: flex; gap: 4px; max-width: 360px; margin: 16px auto 6px; width: 100%;
      }
      #booking .ded-progress button {
        flex: 1; height: 5px; border-radius: 999px; border: none; cursor: pointer;
        background: #27272a; transition: all 0.25s; padding: 0; min-width: 0;
      }
      #booking .ded-progress button.active { background: #c9a227; transform: scaleY(1.3); box-shadow: 0 0 8px rgba(201,162,39,0.5); }
      #booking .ded-progress button.done { background: #a1811e; }
      
      #booking .ded-step-indicator {
        font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
        color: #e5c158; font-weight: 700; margin-top: 4px; text-align: center;
      }
      #booking .ded-labels {
        display: none; justify-content: space-between; max-width: 420px; margin: 0 auto;
        font-size: 9px; text-transform: uppercase; letter-spacing: 0.05em; color: #a1a1aa; font-weight: 600;
      }
      @media (min-width: 641px) {
        #booking .ded-labels { display: flex; }
        #booking .ded-step-indicator { display: none; }
      }

      #booking .ded-card {
        background: #18181b; border: 1px solid rgba(201,162,39,0.25); border-radius: 16px;
        padding: 16px 12px; box-shadow: 0 20px 40px -12px rgba(0,0,0,0.7); width: 100%;
      }
      @media (min-width: 640px) { #booking .ded-card { padding: 28px 24px; border-radius: 20px; } }
      
      #booking .ded-step-title {
        font-size: clamp(1.1rem, 3vw, 1.35rem); font-weight: 600; margin: 0 0 4px;
        font-family: Georgia, "Times New Roman", serif; color: #f4f4f5; line-height: 1.3;
      }
      #booking .ded-step-desc { color: #a1a1aa; font-size: 12px; margin: 0 0 16px; line-height: 1.35; }
      
      #booking .ded-grid { display: grid; gap: 8px; width: 100%; }
      #booking .ded-grid-2 { grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); }
      
      #booking .ded-option {
        padding: 12px 14px; border-radius: 12px; border: 1px solid #3f3f46;
        background: #27272a; text-align: left; cursor: pointer; transition: all 0.2s;
        color: inherit; font: inherit; width: 100%; min-width: 0; box-sizing: border-box;
        display: flex; flex-direction: column; overflow: hidden;
      }
      #booking .ded-option:hover { border-color: #c9a227; }
      #booking .ded-option.selected { border-color: #c9a227; background: rgba(201, 162, 39, 0.08); box-shadow: 0 0 12px rgba(201, 162, 39, 0.15); }
      #booking .ded-option.disabled-option { cursor: default; opacity: 0.95; border-color: #c9a227; }
      #booking .ded-option h4 { margin: 0; font-size: 13px; font-weight: 600; color: #fff; word-break: break-word; flex: 1; }
      
      #booking .ded-option p {
        margin: 6px 0 0; font-size: 11px; color: #a1a1aa; line-height: 1.3;
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        overflow: hidden; text-overflow: ellipsis; white-space: normal; word-break: break-word;
      }
      
      #booking .ded-option .icon-wrap {
        width: 32px; height: 32px; border-radius: 8px; background: rgba(201, 162, 39, 0.12);
        display: flex; align-items: center; justify-content: center; color: #e5c158; flex-shrink: 0;
      }
      #booking .ded-option .top-row { display: flex; align-items: center; gap: 10px; width: 100%; margin-bottom: 2px; }
      #booking .ded-check { color: #c9a227; flex-shrink: 0; margin-left: auto; display: flex; align-items: center; }
      
      #booking .ded-label {
        display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
        font-weight: 600; color: #e5c158; margin-bottom: 6px;
      }
      #booking .ded-input {
        width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #3f3f46;
        background: #27272a; color: #fff; font-size: 13px; outline: none; transition: border 0.2s;
      }
      #booking .ded-input:focus { border-color: #c9a227; }
      #booking .ded-input::placeholder { color: #71717a; }
      #booking .ded-input-icon { position: relative; width: 100%; }
      #booking .ded-input-icon svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #e5c158; pointer-events: none; }
      #booking .ded-input-icon input { padding-left: 38px; }
      
      #booking .ded-presets { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 110px), 1fr)); gap: 6px; }
      #booking .ded-preset {
        padding: 8px 6px; border-radius: 10px; border: 1px solid #3f3f46; background: #27272a;
        font-size: 11px; font-weight: 500; color: #a1a1aa; cursor: pointer; transition: all 0.2s; text-align: center;
      }
      #booking .ded-preset.selected { border-color: #c9a227; background: rgba(201, 162, 39, 0.12); color: #fff; font-weight: 600; }
      
      #booking .ded-cal-btn {
        width: 100%; display: flex; align-items: center; justify-content: space-between;
        padding: 10px 12px; background: #27272a; border: 1px solid #3f3f46; border-radius: 10px;
        color: #e4e4e7; font-size: 12px; cursor: pointer; transition: border 0.2s; min-width: 0;
      }
      #booking .ded-cal-btn:hover { border-color: #c9a227; }
      #booking .ded-cal-btn svg { color: #c9a227; flex-shrink: 0; }
      #booking .ded-cal-wrap { margin-top: 10px; padding: 10px; background: #27272a; border: 1px solid #3f3f46; border-radius: 10px; overflow-x: auto; }
      #booking .ded-cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
      #booking .ded-cal-header button {
        background: #3f3f46; border: none; color: #fff; width: 28px; height: 28px;
        border-radius: 6px; cursor: pointer; font-size: 14px;
      }
      #booking .ded-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; font-size: 11px; }
      #booking .ded-cal-dayname { color: #e5c158; padding: 4px 0; font-weight: 600; }
      #booking .ded-cal-day {
        padding: 6px 0; border-radius: 6px; cursor: pointer; color: #e4e4e7; border: none; background: transparent;
      }
      #booking .ded-cal-day:hover:not(.empty):not(.disabled) { background: #3f3f46; }
      #booking .ded-cal-day.selected { background: #c9a227; color: #18181b; font-weight: 700; }
      #booking .ded-cal-day.in-range { background: rgba(201, 162, 39, 0.2); }
      #booking .ded-cal-day.empty, #booking .ded-cal-day.disabled { color: #52525b; cursor: default; }
      
      #booking .ded-passenger {
        display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;
        padding: 12px 14px; background: #27272a; border: 1px solid #3f3f46; border-radius: 10px;
      }
      #booking .ded-passenger h4 { margin: 0; font-size: 13px; font-weight: 500; color: #fff; }
      #booking .ded-passenger p { margin: 2px 0 0; font-size: 11px; color: #a1a1aa; }
      #booking .ded-counter { display: flex; align-items: center; gap: 10px; }
      #booking .ded-counter button {
        width: 28px; height: 28px; border-radius: 6px; background: #3f3f46; border: none;
        color: #e4e4e7; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center;
      }
      #booking .ded-counter button:hover { background: #c9a227; color: #18181b; }
      #booking .ded-counter span { font-weight: 600; font-size: 13px; min-width: 18px; text-align: center; }
      
      #booking .ded-service {
        width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid #3f3f46;
        background: #27272a; display: flex; align-items: center; justify-content: space-between; gap: 8px;
        cursor: pointer; transition: all 0.2s; text-align: left; color: inherit; font: inherit; min-width: 0;
      }
      #booking .ded-service:hover:not(.locked) { border-color: #c9a227; }
      #booking .ded-service.selected { border-color: #c9a227; background: rgba(201, 162, 39, 0.08); }
      #booking .ded-service.locked { cursor: not-allowed; opacity: 0.75; border-color: rgba(201, 162, 39, 0.35); }
      #booking .ded-service .left { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }
      #booking .ded-service .icon-box {
        width: 32px; height: 32px; border-radius: 6px; background: rgba(201, 162, 39, 0.12);
        display: flex; align-items: center; justify-content: center; color: #e5c158; flex-shrink: 0;
      }
      #booking .ded-service h4 { margin: 0; font-size: 13px; font-weight: 600; color: #fff; word-break: break-word; }
      #booking .ded-service p {
        margin: 2px 0 0; font-size: 11px; color: #a1a1aa; line-height: 1.3;
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        overflow: hidden; text-overflow: ellipsis; white-space: normal;
      }
      #booking .ded-checkbox {
        width: 18px; height: 18px; border-radius: 5px; border: 1px solid #52525b;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: auto;
      }
      #booking .ded-service.selected .ded-checkbox { background: #c9a227; border-color: #c9a227; color: #18181b; }
      
      @media (max-width: 640px) {
        #booking .ded-option { padding: 10px 12px; }
        #booking .ded-option p:first-of-type { display: none; }
        #booking .ded-option .icon-wrap { display: none; }
        #booking .ded-service { padding: 10px 12px; }
        #booking .ded-service p { display: none; }
        #booking .ded-service .icon-box { display: none; }
      }

      #booking .ded-summary {
        padding: 12px; background: #27272a; border: 1px solid rgba(201,162,39,0.3); border-radius: 10px; margin-top: 10px;
      }
      #booking .ded-summary-header {
        display: flex; align-items: center; gap: 6px; color: #e5c158; font-size: 10px;
        text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; margin-bottom: 8px;
      }
      #booking .ded-summary-grid {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 90px), 1fr)); gap: 8px; font-size: 11px;
      }
      #booking .ded-summary-grid span.label { display: block; font-size: 9px; text-transform: uppercase; color: #a1a1aa; margin-bottom: 1px; }
      #booking .ded-summary-grid span.value { font-weight: 600; color: #fff; word-break: break-word; }
      
      #booking .ded-wa-btn {
        display: inline-flex; align-items: center; justify-content: center; gap: 6px;
        padding: 8px 16px; border-radius: 10px; border: none;
        background: #25D366; color: #000; font-weight: 700; font-size: 11px;
        letter-spacing: 0.04em; text-transform: uppercase;
        cursor: pointer; text-decoration: none; transition: background 0.2s;
        box-shadow: 0 0 12px rgba(37, 211, 102, 0.25); width: fit-content; margin-left: auto; flex-shrink: 0;
      }
      #booking .ded-wa-btn:hover { background: #20bd5a; }
      
      #booking .ded-nav {
        display: flex; justify-content: space-between; align-items: center; gap: 8px;
        padding-top: 14px; margin-top: 14px; border-top: 1px solid #27272a; width: 100%;
      }
      #booking .ded-btn-prev {
        display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px;
        border-radius: 10px; background: #27272a; border: 1px solid #3f3f46;
        color: #d4d4d8; font-size: 11px; font-weight: 600; text-transform: uppercase;
        letter-spacing: 0.04em; cursor: pointer; transition: color 0.2s; flex-shrink: 0;
      }
      #booking .ded-btn-prev:hover { color: #fff; border-color: #52525b; }
      #booking .ded-btn-next {
        display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px;
        border-radius: 10px; background: #c9a227; border: none; color: #18181b;
        font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
        cursor: pointer; transition: background 0.2s; margin-left: auto; flex-shrink: 0;
      }
      #booking .ded-btn-next:hover { background: #e5c158; }
      #booking .ded-fade { animation: dedFade 0.3s ease; }
      @keyframes dedFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
    `;
    document.head.appendChild(style);
  }

  function renderCalendar() {
    const first = new Date(calViewYear, calViewMonth, 1);
    const last = new Date(calViewYear, calViewMonth + 1, 0);
    const startDay = first.getDay();
    const daysInMonth = last.getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    let html = `
      <div class="ded-cal-header">
        <button type="button" data-action="cal-prev">‹</button>
        <span style="font-weight:600;font-size:13px;color:#e5c158">${monthNames[calViewMonth]} ${calViewYear}</span>
        <button type="button" data-action="cal-next">›</button>
      </div>
      <div class="ded-cal-grid">
        <div class="ded-cal-dayname">Su</div><div class="ded-cal-dayname">Mo</div><div class="ded-cal-dayname">Tu</div>
        <div class="ded-cal-dayname">We</div><div class="ded-cal-dayname">Th</div><div class="ded-cal-dayname">Fr</div>
        <div class="ded-cal-dayname">Sa</div>
    `;

    for (let i = 0; i < startDay; i++) {
      html += `<button type="button" class="ded-cal-day empty" disabled></button>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(calViewYear, calViewMonth, d);
      date.setHours(0, 0, 0, 0);
      const isPast = date < today;
      const isSelected = (dateRange.checkIn && date.getTime() === dateRange.checkIn.getTime()) ||
                         (dateRange.checkOut && date.getTime() === dateRange.checkOut.getTime());
      let inRange = false;
      if (dateRange.checkIn && dateRange.checkOut) {
        inRange = date > dateRange.checkIn && date < dateRange.checkOut;
      }
      let cls = "ded-cal-day";
      if (isPast) cls += " disabled";
      if (isSelected) cls += " selected";
      if (inRange) cls += " in-range";
      html += `<button type="button" class="${cls}" data-date="${date.toISOString()}" ${isPast ? "disabled" : ""}>${d}</button>`;
    }

    html += `</div>`;
    return html;
  }

  function render() {
    const root = document.getElementById("booking");
    if (!root) return;

    syncStepInputs();

    const days = getDays();
    const cat = VEHICLE_CATEGORIES.find(c => c.id === selectedCategory);
    const budget = BUDGET_TIERS.find(b => b.id === selectedBudget);

    let stepHtml = "";

    if (step === 1) {
      stepHtml = `
        <div class="ded-fade">
          <h3 class="ded-step-title">1. Vehicle Category</h3>
          <p class="ded-step-desc">From supercars to luxury sedans and SUVs.</p>
          <div class="ded-grid ded-grid-2">
            ${VEHICLE_CATEGORIES.map(c => `
              <button type="button" class="ded-option ${selectedCategory === c.id ? "selected" : ""}" data-action="select-cat" data-id="${c.id}">
                <div class="top-row">
                  <div class="icon-wrap">${ICONS[c.icon] || ""}</div>
                  <h4>${c.title}</h4>${selectedCategory === c.id ? `<span class="ded-check">${ICONS.check}</span>` : ""}
                </div>
                <p title="${c.subtitle}">${c.subtitle}</p>
              </button>
            `).join("")}
          </div>
        </div>`;
    }

    if (step === 2) {
      stepHtml = `
        <div class="ded-fade">
          <h3 class="ded-step-title">2. Rental Purpose</h3>
          <p class="ded-step-desc">Helps us recommend appropriate driver etiquette and vehicle finish.</p>
          <div class="ded-grid ded-grid-2">
            ${OCCASIONS.map(o => `
              <button type="button" class="ded-option ${selectedOccasion === o ? "selected" : ""}" data-action="select-occ" data-val="${o.replace(/"/g, "&quot;")}">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
                  <span style="font-size:12px;font-weight:500">${o}</span>${selectedOccasion === o ? `<span class="ded-check">${ICONS.check}</span>` : ""}
                </div>
              </button>
            `).join("")}
          </div>
        </div>`;
    }

    if (step === 3) {
      const dateLabel = dateRange.checkIn && dateRange.checkOut
        ? `${formatDate(dateRange.checkIn)} → ${formatDate(dateRange.checkOut)} (${days} days)`
        : "Select calendar dates";

      stepHtml = `
        <div class="ded-fade">
          <h3 class="ded-step-title">3. Duration & Destination</h3>
          <p class="ded-step-desc">Choose a duration shortcut or pick specific calendar dates.</p>
          <div style="margin-bottom:14px">
            <label class="ded-label">Duration Quick Select</label>
            <div class="ded-presets">
              ${[
                { id: "single", label: "1 Day" },
                { id: "weekend", label: "Weekend (2-3 Days)" },
                { id: "week", label: "1 Week" },
                { id: "month", label: "Monthly" }
              ].map(p => `
                <button type="button" class="ded-preset ${durationPreset === p.id && !showCalendar ? "selected" : ""}" data-action="preset" data-id="${p.id}">${p.label}</button>
              `).join("")}
            </div>
          </div>
          <div style="margin-bottom:14px">
            <button type="button" class="ded-cal-btn" data-action="toggle-cal">
              <span style="display:flex;align-items:center;gap:8px;min-width:0;overflow:hidden">
                ${ICONS.calendar}
                <span style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden">${dateLabel}</span>
              </span>
              <span style="font-size:11px;color:#e5c158;flex-shrink:0">${showCalendar ? "Hide" : "Select Dates"}</span>
            </button>
            ${showCalendar ? `<div class="ded-cal-wrap">${renderCalendar()}</div>` : ""}
          </div>
          <div>
            <label class="ded-label">Delivery Destination</label>
            <div class="ded-input-icon">
              ${ICONS.place}
              <input type="text" class="ded-input" id="ded-location" value="${locationPreference.replace(/"/g, "&quot;")}" placeholder="e.g. Airport Terminal, Victoria Island, Lekki Phase 1">
            </div>
          </div>
        </div>`;
    }

    if (step === 4) {
      stepHtml = `
        <div class="ded-fade">
          <h3 class="ded-step-title">4. Chauffeur & Capacity</h3>
          <p class="ded-step-desc">All rentals include a professional, vetted executive chauffeur.</p>
          <div class="ded-grid" style="margin-bottom:14px">
            <div class="ded-option selected disabled-option">
              <div class="top-row">
                <h4>Executive Chauffeur Included</h4>
                <span class="ded-check">${ICONS.check}</span>
              </div>
            </div>
          </div>
          <div class="ded-passenger">
            <div>
              <h4>Passenger Count</h4>
              <p>Number of people travelling</p>
            </div>
            <div class="ded-counter">
              <button type="button" data-action="pass-minus">−</button>
              <span>${passengers}</span>
              <button type="button" data-action="pass-plus">+</button>
            </div>
          </div>
        </div>`;
    }

    if (step === 5) {
      stepHtml = `
        <div class="ded-fade">
          <h3 class="ded-step-title">5. Additional Services</h3>
          <p class="ded-step-desc">Select additional protocol or security services for your request.</p>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${LUXURY_SERVICES.map(s => {
              const isSelected = selectedServices.includes(s.id);
              const isLocked = s.fixed;
              return `
                <button type="button" class="ded-service ${isSelected ? "selected" : ""} ${isLocked ? "locked" : ""}" data-action="toggle-service" data-id="${s.id}">
                  <div class="left">
                    <div class="icon-box">${ICONS[s.icon] || ""}</div>
                    <div>
                      <h4>${s.title}</h4>
                      <p>${s.desc}</p>
                    </div>
                  </div>
                  <div class="ded-checkbox">${isSelected ? ICONS.check : ""}</div>
                </button>
              `;
            }).join("")}
          </div>
        </div>`;
    }

    if (step === 6) {
      stepHtml = `
        <div class="ded-fade">
          <h3 class="ded-step-title">6. Budget & Contact Details</h3>
          <p class="ded-step-desc">Select your target range and provide contact info for your custom quote.</p>
          
          <div style="margin-bottom:16px">
            <label class="ded-label">Estimated Budget Tier</label>
            <div class="ded-grid ded-grid-2">
              ${BUDGET_TIERS.map(b => `
                <button type="button" class="ded-option ${selectedBudget === b.id ? "selected" : ""}" data-action="select-budget" data-id="${b.id}">
                  <div class="top-row">
                    <h4>${b.title}</h4>${selectedBudget === b.id ? `<span class="ded-check">${ICONS.check}</span>` : ""}
                  </div>
                  <p>${b.desc}</p>
                  <p style="color:#e5c158;font-weight:600;margin-top:4px">${b.range}</p>
                </button>
              `).join("")}
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:10px;margin-bottom:12px">
            <div>
              <label class="ded-label">Full Name</label>
              <input type="text" class="ded-input" id="ded-name" value="${clientName.replace(/"/g, "&quot;")}" placeholder="e.g. Chief Adeleke">
            </div>
            <div>
              <label class="ded-label">Phone / WhatsApp</label>
              <input type="tel" class="ded-input" id="ded-phone" value="${clientPhone.replace(/"/g, "&quot;")}" placeholder="e.g. 08012345678">
            </div>
          </div>

          <div style="margin-bottom:12px">
            <label class="ded-label">Special Notes (Optional)</label>
            <input type="text" class="ded-input" id="ded-notes" value="${customNotes.replace(/"/g, "&quot;")}" placeholder="Flight number, preferred exterior color, or security preferences...">
          </div>

          <div class="ded-summary">
            <div class="ded-summary-header">${ICONS.sparkle} Request Summary</div>
            <div class="ded-summary-grid">
              <div><span class="label">Vehicle:</span><span class="value">${cat ? cat.title : "—"}</span></div>
              <div><span class="label">Purpose:</span><span class="value">${selectedOccasion}</span></div>
              <div><span class="label">Duration:</span><span class="value">${days} Day${days > 1 ? "s" : ""}</span></div>
              <div><span class="label">Budget:</span><span class="value">${budget ? budget.title : "—"}</span></div>
            </div>
          </div>
        </div>`;
    }

    const stepLabels = ["Category", "Purpose", "Dates", "Chauffeur", "Services", "Submit"];

    root.innerHTML = `
      <div class="ded-header">
        <div class="ded-badge">${ICONS.sparkle} ${CONFIG.brandName} Concierge</div>
        <h2>Luxury Fleet Request</h2>
        <p class="ded-sub">Configure your vehicle specifications and receive direct WhatsApp quotes with real-time fleet photos.</p>
      </div>

      <div class="ded-card">
        <div class="ded-progress">
          ${Array.from({ length: totalSteps }, (_, i) => {
            const num = i + 1;
            let cls = "";
            if (num === step) cls = "active";
            else if (num < step) cls = "done";
            return `<button type="button" class="${cls}" data-action="go-step" data-step="${num}" title="${stepLabels[i]}"></button>`;
          }).join("")}
        </div>
        
        <div class="ded-step-indicator">Step ${step} of ${totalSteps}: ${stepLabels[step - 1]}</div>
        
        <div class="ded-labels">
          ${stepLabels.map((lbl, idx) => `
            <span style="color:${idx + 1 === step ? "#e5c158" : idx + 1 < step ? "#a1811e" : "#52525b"}">${lbl}</span>
          `).join("")}
        </div>

        <div style="margin-top:16px">${stepHtml}</div>

        <div class="ded-nav">
          ${step > 1 ? `
            <button type="button" class="ded-btn-prev" data-action="prev">
              ${ICONS.arrowBack} Back
            </button>
          ` : `<div></div>`}

          ${step < totalSteps ? `
            <button type="button" class="ded-btn-next" data-action="next">
              Next ${ICONS.arrowForward}
            </button>
          ` : `
            <a href="https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(generateWhatsAppMessage())}" target="_blank" class="ded-wa-btn">
              ${ICONS.whatsapp} Send Request
            </a>
          `}
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    const root = document.getElementById("booking");
    if (!root) return;

    root.onclick = function(e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      const action = btn.getAttribute("data-action");

      if (action === "next" && step < totalSteps) {
        step++;
        render();
      } else if (action === "prev" && step > 1) {
        step--;
        render();
      } else if (action === "go-step") {
        const targetStep = parseInt(btn.getAttribute("data-step"), 10);
        if (targetStep) {
          step = targetStep;
          render();
        }
      } else if (action === "select-cat") {
        selectedCategory = btn.getAttribute("data-id");
        render();
      } else if (action === "select-occ") {
        selectedOccasion = btn.getAttribute("data-val");
        render();
      } else if (action === "preset") {
        durationPreset = btn.getAttribute("data-id");
        showCalendar = false;
        dateRange = { checkIn: null, checkOut: null };
        render();
      } else if (action === "toggle-cal") {
        showCalendar = !showCalendar;
        render();
      } else if (action === "cal-prev") {
        calViewMonth--;
        if (calViewMonth < 0) { calViewMonth = 11; calViewYear--; }
        render();
      } else if (action === "cal-next") {
        calViewMonth++;
        if (calViewMonth > 11) { calViewMonth = 0; calViewYear++; }
        render();
      } else if (action === "pass-minus") {
        if (passengers > 1) { passengers--; render(); }
      } else if (action === "pass-plus") {
        if (passengers < 15) { passengers++; render(); }
      } else if (action === "toggle-service") {
        const id = btn.getAttribute("data-id");
        toggleService(id);
      } else if (action === "select-budget") {
        selectedBudget = btn.getAttribute("data-id");
        render();
      }
    };

    root.onchange = function(e) {
      if (e.target.id === "ded-location") locationPreference = e.target.value;
      if (e.target.id === "ded-name") clientName = e.target.value;
      if (e.target.id === "ded-phone") clientPhone = e.target.value;
      if (e.target.id === "ded-notes") customNotes = e.target.value;
    };

    const calWrap = root.querySelector(".ded-cal-wrap");
    if (calWrap) {
      calWrap.onclick = function(e) {
        const dayBtn = e.target.closest("[data-date]");
        if (!dayBtn || dayBtn.disabled) return;

        const clickedDate = new Date(dayBtn.getAttribute("data-date"));

        if (!dateRange.checkIn || (dateRange.checkIn && dateRange.checkOut)) {
          dateRange.checkIn = clickedDate;
          dateRange.checkOut = null;
        } else if (dateRange.checkIn && !dateRange.checkOut) {
          if (clickedDate < dateRange.checkIn) {
            dateRange.checkIn = clickedDate;
          } else if (clickedDate.getTime() === dateRange.checkIn.getTime()) {
            dateRange.checkOut = null;
          } else {
            dateRange.checkOut = clickedDate;
          }
        }
        render();
      };
    }
  }

  injectStyles();
  render();
})();