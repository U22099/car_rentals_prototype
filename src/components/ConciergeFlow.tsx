"use client";

import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import WineBarIcon from "@mui/icons-material/WineBar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleIcon from "@mui/icons-material/People";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Calendar from "./Calendar";

interface ConciergeFlowProps {
  brandName: string;
  email?: string;
  currency: string;
}

interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

const VEHICLE_CATEGORIES = [
  {
    id: "supercar",
    title: "Exotic Supercar",
    subtitle: "Ferrari, Lamborghini, McLaren, Porsche GT3",
    icon: SpeedIcon,
  },
  {
    id: "sedan",
    title: "Ultra-Luxury Sedan",
    subtitle: "Rolls-Royce Ghost, Mercedes-Maybach, Bentley",
    icon: DirectionsCarFilledIcon,
  },
  {
    id: "suv",
    title: "Prestige & Armored SUV",
    subtitle: "Range Rover SV, Cadillac Escalade ESV, G-Wagon",
    icon: SecurityIcon,
  },
  {
    id: "daily_executive",
    title: "Executive & Daily Luxury",
    subtitle: "Mercedes S-Class, BMW 7 Series, Audi A8",
    icon: DirectionsCarFilledIcon,
  },
  {
    id: "security_protocol",
    title: "Security Escort & Protocol",
    subtitle: "Bulletproof SUV Convoys & Close Protection Vehicles",
    icon: SecurityIcon,
  },
  {
    id: "delegation_van",
    title: "VIP Delegation Sprinter",
    subtitle: "Custom Executive Van & Luxury Shuttle for Crews",
    icon: AirportShuttleIcon,
  },
];

const OCCASIONS = [
  "Executive Business & Corporate Travel",
  "VIP Airport Tarmac / FBO Arrival",
  "Wedding & VIP Entourage",
  "Interstate / Touring Protocol Escort",
  "Red Carpet, Gala & Media Shoot",
  "Weekend Getaway & Track Day",
];

const LUXURY_SERVICES = [
  {
    id: "executive_chauffeur",
    title: "Professional Executive Chauffeur",
    desc: "Suited, vetted, knowledgeable about city navigation & VIP protocol",
    icon: PeopleIcon,
  },
  {
    id: "armed_escort",
    title: "Private Security Detail / Chase Convoy",
    desc: "Trained tactical protection vehicles for high-security movements",
    icon: SecurityIcon,
  },
  {
    id: "tarmac_fbo",
    title: "Airport Tarmac / FBO Meet & Greet",
    desc: "Airside direct vehicle handover at private aviation terminal",
    icon: FlightTakeoffIcon,
  },
  {
    id: "enclosed_delivery",
    title: "White-Glove Flatbed Delivery",
    desc: "Zero-mile enclosed truck delivery to private residence or hotel",
    icon: LocalShippingIcon,
  },
  {
    id: "champagne_refreshment",
    title: "In-Car Refreshments & Champagne",
    desc: "Chilled vintage beverages, mints, and custom refreshments",
    icon: WineBarIcon,
  },
];

const BUDGET_TIERS = [
  {
    id: "daily",
    title: "Daily Executive",
    range: "\$500 – \$900 / day",
    desc: "Cadillac Escalade, Mercedes S-Class, Executive Sedans",
  },
  {
    id: "premium",
    title: "Premium SUV & Luxury",
    range: "\$1,000 – \$1,500 / day",
    desc: "Range Rover Autobiography, Porsche Cayenne Turbo",
  },
  {
    id: "high_luxury",
    title: "High-End Luxury",
    range: "\$1,600 – \$2,200 / day",
    desc: "Rolls-Royce Ghost, Mercedes-Maybach, Lamborghini Urus",
  },
  {
    id: "ultra_exotic",
    title: "Ultra-Exotic & Supercars",
    range: "\$2,500 – \$5,000+ / day",
    desc: "Ferrari F8 Spider, Porsche 911 GT3, Custom Supercars",
  },
  {
    id: "flexible",
    title: "Flexible / Tailored Quote",
    range: "Custom Quotation",
    desc: "Recommend the best vehicle matching my precise itinerary",
  },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ConciergeFlow({
  brandName,
  email = "u22099dandev@gmail.com",
  currency,
}: ConciergeFlowProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [selectedCategory, setSelectedCategory] = useState<string>("supercar");
  const [selectedOccasion, setSelectedOccasion] = useState<string>(
    OCCASIONS[0],
  );
  const [durationPreset, setDurationPreset] = useState<string>("weekend");
  const [dateRange, setDateRange] = useState<DateRange>({
    checkIn: null,
    checkOut: null,
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [locationPreference, setLocationPreference] = useState(
    "Brickell / Miami Beach, FL",
  );
  const [drivingPreference, setDrivingPreference] = useState<
    "chauffeur" | "self_drive"
  >("chauffeur");
  const [passengers, setPassengers] = useState(2);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "executive_chauffeur",
  ]);
  const [selectedBudget, setSelectedBudget] = useState<string>("premium");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  const days =
    dateRange.checkIn && dateRange.checkOut
      ? Math.max(
          1,
          Math.round(
            (dateRange.checkOut.getTime() - dateRange.checkIn.getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : durationPreset === "single"
        ? 1
        : durationPreset === "weekend"
          ? 3
          : durationPreset === "week"
            ? 7
            : 30;

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectedCategoryObj = VEHICLE_CATEGORIES.find(
    (c) => c.id === selectedCategory,
  );
  const selectedBudgetObj = BUDGET_TIERS.find((b) => b.id === selectedBudget);

  const activeServiceTitles = selectedServices
    .map((id) => LUXURY_SERVICES.find((s) => s.id === id)?.title)
    .filter(Boolean);

  const generateEmailContent = () => {
    const datesStr =
      dateRange.checkIn && dateRange.checkOut
        ? `${formatDate(dateRange.checkIn)} to ${formatDate(dateRange.checkOut)} (${days} day${days > 1 ? "s" : ""})`
        : `${durationPreset.toUpperCase()} DURATION (~${days} day${days > 1 ? "s" : ""}) — Dates flexible`;

    const servicesStr =
      activeServiceTitles.length > 0
        ? activeServiceTitles.map((s) => `• ${s}`).join("\n")
        : "• Standard VIP Handover";

    const subject = `VIP Fleet Sourcing Inquiry: ${selectedCategoryObj?.title} (${days} Days)`;
    const body =
      `VIP CONCIERGE FLEET SOURCING — ${brandName.toUpperCase()}\n\n` +
      `👤 Client Name: ${clientName.trim() || "VIP Client"}\n` +
      (clientEmail.trim() ? `✉️ Client Email: ${clientEmail.trim()}\n` : "") +
      `🏎️ Vehicle Category: ${selectedCategoryObj?.title}\n` +
      `🎯 Occasion/Usage: ${selectedOccasion}\n` +
      `📅 Duration & Dates: ${datesStr}\n` +
      `📍 Handover Destination: ${locationPreference}\n` +
      `👔 Driving Preference: ${drivingPreference === "chauffeur" ? "Executive Chauffeur" : "Self-Drive"}\n` +
      `👥 Passengers: ${passengers}\n` +
      `💰 Budget Tier: ${selectedBudgetObj?.title} (${selectedBudgetObj?.range})\n\n` +
      `🛡️ Additional Services Requested:\n${servicesStr}\n` +
      (customNotes.trim()
        ? `\n📝 Special Requirements: ${customNotes.trim()}\n`
        : "") +
      `\nPlease respond with matching available fleet options, high-resolution imagery, and exact rates.\n\nBest regards,`;

    return { subject, body };
  };

  const { subject, body } = generateEmailContent();
  const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section
      id="consultation"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20"
    >
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/15 mb-3">
          <AutoAwesomeIcon
            sx={{ fontSize: 14, color: "var(--color-text-secondary)" }}
          />
          <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-medium">
            Interactive Fleet Questionnaire
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Configure Your Vehicle Request
        </h2>
        <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto mt-2">
          Takes under 60 seconds. Our concierge desk will review your itinerary
          and email matching fleet options instantly.
        </p>

        <div className="flex items-center justify-between gap-2 mt-8 max-w-md mx-auto">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (i + 1 < step) setStep(i + 1);
              }}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
                step > i + 1
                  ? "bg-white"
                  : step === i + 1
                    ? "bg-white scale-y-125"
                    : "bg-zinc-800"
              }`}
              title={`Go to step ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex justify-between max-w-md mx-auto mt-2 text-[10px] uppercase tracking-wider text-stone-500 font-medium">
          <span>Category</span>
          <span>Occasion</span>
          <span>Dates</span>
          <span>Driver</span>
          <span>Services</span>
          <span>Review</span>
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-10 shadow-2xl relative">
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white font-serif">
                1. What category of vehicle do you require?
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                From high-performance supercars to elite chauffeur-driven
                sedans.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {VEHICLE_CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-white bg-white/10"
                        : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-10 h-10 rounded-xl bg-zinc-700 flex items-center justify-center text-zinc-300">
                        <IconComponent sx={{ fontSize: 22 }} />
                      </div>
                      {isSelected && (
                        <CheckCircleIcon
                          sx={{
                            fontSize: 20,
                            color: "var(--color-accent-primary)",
                          }}
                        />
                      )}
                    </div>
                    <h4 className="text-white font-semibold text-[15px]">
                      {cat.title}
                    </h4>
                    <p className="text-zinc-400 text-[12px] mt-1 leading-snug">
                      {cat.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white font-serif">
                2. What is the occasion or purpose of rental?
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Helps us coordinate appropriate delivery specs, driver protocol,
                and vehicle prep.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OCCASIONS.map((occ) => {
                const isSelected = selectedOccasion === occ;
                return (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setSelectedOccasion(occ)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "border-white bg-white/10 text-white"
                        : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-600"
                    }`}
                  >
                    <span className="text-[13px] font-medium">{occ}</span>
                    {isSelected && (
                      <CheckCircleIcon
                        sx={{
                          fontSize: 18,
                          color: "var(--color-accent-primary)",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white font-serif">
                3. Rental Duration &amp; Handover Destination
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Choose a duration shortcut or pick precise calendar dates.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-stone-300 text-xs uppercase tracking-wider font-semibold block mb-2">
                  Duration Quick Select
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "single", label: "1 Day (Immediate)" },
                    { id: "weekend", label: "Weekend (2-3 Days)" },
                    { id: "week", label: "1 Week (7 Days)" },
                    { id: "month", label: "Monthly / Extended" },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setDurationPreset(preset.id);
                        setShowCalendar(false);
                      }}
                      className={`p-3 rounded-xl border text-[12px] font-medium transition-all cursor-pointer ${
                        durationPreset === preset.id && !showCalendar
                          ? "border-white bg-white/10 text-white font-semibold"
                          : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full flex items-center justify-between p-3.5 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-zinc-500 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <CalendarMonthIcon
                      sx={{ fontSize: 18, color: "var(--color-text-dim)" }}
                    />
                    <span className="text-zinc-200 text-[13px] font-medium">
                      {dateRange.checkIn && dateRange.checkOut
                        ? `${formatDate(dateRange.checkIn)} → ${formatDate(dateRange.checkOut)} (${days} days)`
                        : "Prefer exact calendar dates? Click to select"}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">
                    {showCalendar ? "Hide" : "Select Dates"}
                  </span>
                </button>

                {showCalendar && (
                  <div className="mt-3 p-4 bg-zinc-800 rounded-xl border border-zinc-700 animate-fadeIn">
                    <Calendar value={dateRange} onChange={setDateRange} />
                  </div>
                )}
              </div>

              <div>
                <label className="text-zinc-300 text-xs uppercase tracking-wider font-semibold block mb-2">
                  Handover Destination
                </label>
                <div className="relative">
                  <PlaceIcon
                    sx={{ fontSize: 18, color: "var(--color-text-dim)" }}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  />
                  <input
                    type="text"
                    value={locationPreference}
                    onChange={(e) => setLocationPreference(e.target.value)}
                    placeholder="e.g. Miami FBO Tarmac, Beverly Hills Hotel, Mayfair London"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:border-zinc-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white font-serif">
                4. Driver Preference &amp; Passenger Capacity
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Select your preferred operation mode.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDrivingPreference("chauffeur")}
                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                  drivingPreference === "chauffeur"
                    ? "border-white bg-white/10"
                    : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <PeopleIcon
                    sx={{ fontSize: 22, color: "var(--color-text-secondary)" }}
                  />
                  {drivingPreference === "chauffeur" && (
                    <CheckCircleIcon
                      sx={{
                        fontSize: 18,
                        color: "var(--color-accent-primary)",
                      }}
                    />
                  )}
                </div>
                <h4 className="text-white font-semibold text-[15px]">
                  Executive Chauffeur
                </h4>
                <p className="text-zinc-400 text-[12px] mt-1">
                  Professional suited driver, airport meet &amp; greet, zero
                  travel stress.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDrivingPreference("self_drive")}
                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                  drivingPreference === "self_drive"
                    ? "border-white bg-white/10"
                    : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <DirectionsCarFilledIcon
                    sx={{ fontSize: 22, color: "var(--color-text-secondary)" }}
                  />
                  {drivingPreference === "self_drive" && (
                    <CheckCircleIcon
                      sx={{
                        fontSize: 18,
                        color: "var(--color-accent-primary)",
                      }}
                    />
                  )}
                </div>
                <h4 className="text-white font-semibold text-[15px]">
                  Self-Drive Experience
                </h4>
                <p className="text-zinc-400 text-[12px] mt-1">
                  Requires valid driver’s license and refundable security
                  deposit.
                </p>
              </button>
            </div>

            <div className="p-4 bg-zinc-800 rounded-xl border border-zinc-700 flex items-center justify-between">
              <div>
                <h4 className="text-white text-sm font-medium">
                  Passenger Count
                </h4>
                <p className="text-zinc-500 text-xs">Number of occupants</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center text-zinc-200 hover:bg-zinc-600 cursor-pointer"
                >
                  −
                </button>
                <span className="text-white font-semibold text-sm">
                  {passengers}
                </span>
                <button
                  type="button"
                  onClick={() => setPassengers(Math.min(14, passengers + 1))}
                  className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center text-zinc-200 hover:bg-zinc-600 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white font-serif">
                5. Additional Services (Concierge Add-ons)
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Select bespoke additions essential to high-end luxury rentals.
              </p>
            </div>

            <div className="space-y-3">
              {LUXURY_SERVICES.map((srv) => {
                const IconComp = srv.icon;
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "border-white bg-white/10"
                        : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-zinc-700 flex items-center justify-center text-zinc-300">
                        <IconComp sx={{ fontSize: 18 }} />
                      </div>
                      <div>
                        <h4 className="text-white text-[14px] font-medium">
                          {srv.title}
                        </h4>
                        <p className="text-zinc-400 text-[11px]">{srv.desc}</p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isSelected
                          ? "bg-white border-white text-black"
                          : "border-zinc-600"
                      }`}
                    >
                      {isSelected && <CheckCircleIcon sx={{ fontSize: 14 }} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white font-serif">
                6. Budget Tier &amp; Instant Email Concierge Dispatch
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Confirm your daily budget preference and contact details for our
                team to email you matching options.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BUDGET_TIERS.map((tier) => {
                const isSelected = selectedBudget === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedBudget(tier.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "border-white bg-white/10"
                        : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-[14px]">
                        {tier.title}
                      </span>
                      {isSelected && (
                        <CheckCircleIcon
                          sx={{
                            fontSize: 16,
                            color: "var(--color-accent-primary)",
                          }}
                        />
                      )}
                    </div>
                    <p className="text-zinc-300 font-semibold text-[13px]">
                      {tier.range}
                    </p>
                    <p className="text-zinc-500 text-[11px] mt-1">
                      {tier.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-zinc-300 text-xs uppercase tracking-wider font-semibold block mb-1.5">
                  Your Full Name / Title
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Mr. Alexander Wright"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:border-zinc-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 text-xs uppercase tracking-wider font-semibold block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="e.g. alexander@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:border-zinc-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wider font-semibold block mb-1.5">
                Special Instructions (Optional)
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Specific exterior color, private aviation flight number, security detail requirements..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:border-zinc-400 focus:outline-none"
              />
            </div>

            <div className="p-5 bg-zinc-800 rounded-xl border border-zinc-700 space-y-3">
              <div className="flex items-center gap-2 text-zinc-300">
                <AutoAwesomeIcon
                  sx={{ fontSize: 16, color: "var(--color-text-dim)" }}
                />
                <span className="text-[11px] uppercase font-semibold tracking-wider">
                  Request Summary
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px]">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">
                    Category
                  </span>
                  <span className="font-semibold text-white">
                    {selectedCategoryObj?.title}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">
                    Driving
                  </span>
                  <span className="font-semibold text-white">
                    {drivingPreference === "chauffeur"
                      ? "Chauffeur"
                      : "Self-Drive"}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">
                    Duration
                  </span>
                  <span className="font-semibold text-white">
                    ~{days} Day{days > 1 ? "s" : ""}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">
                    Services
                  </span>
                  <span className="font-semibold text-white">
                    {activeServiceTitles.length} Selected
                  </span>
                </div>
              </div>
            </div>

            <a
              href={mailUrl}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-base bg-white text-black hover:bg-zinc-200 transition-all duration-200 shadow-lg cursor-pointer"
            >
              <EmailIcon sx={{ fontSize: 22 }} />
              Dispatch VIP Request to Concierge Desk
            </a>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-800">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              <ArrowBackIcon sx={{ fontSize: 14 }} />
              Previous
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
            >
              Continue
              <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
