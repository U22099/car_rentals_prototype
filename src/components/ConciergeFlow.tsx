"use client";

import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";
import PlaceIcon from "@mui/icons-material/Place";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Calendar from "./Calendar";
import TikTokIcon from "./TikTokIcon";
import { rentalFleet } from "@/lib/fleet";
import { brand } from "@/lib/properties";

interface ConciergeFlowProps {
  brandName: string;
  phone: string;
  currency: string;
  selectedVehicleId: string;
  onVehicleSelect: (id: string) => void;
}

interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

const TRIP_PURPOSES = [
  "Business or daily travel",
  "Airport pickup or drop-off",
  "Wedding or special event",
  "Family or leisure trip",
  "Inter-state journey",
  "Group or corporate transport",
  "Other",
];

const BOOKING_REQUIREMENTS = [
  { id: "airport", title: "Airport pickup or drop-off", icon: PlaceIcon },
  { id: "multiple_stops", title: "Multiple stops", icon: PlaceIcon },
  { id: "luggage", title: "Extra luggage or equipment", icon: LocalShippingIcon },
  { id: "long_distance", title: "Long-distance travel", icon: DirectionsCarFilledIcon },
  { id: "child_seat", title: "Child seat required", icon: PeopleIcon },
];

const BUDGET_TIERS = [
  { id: "standard", title: "Standard", range: "70,000–180,000 / day", desc: "Indicative range for Hilux and Prado requests" },
  { id: "executive", title: "Executive SUV", range: "200,000–450,000 / day", desc: "Indicative range for GX 460 and Land Cruiser requests" },
  { id: "premium", title: "Premium SUV", range: "600,000–1,200,000 / day", desc: "Indicative range for Lexus LX 600 requests" },
  { id: "group", title: "Group or custom quote", range: "Price confirmed on request", desc: "For Sprinter Bus, Coastal Bus, or a tailored request" },
];

const DURATION_PRESETS = [
  { id: "single", label: "1 day", days: 1 },
  { id: "weekend", label: "Weekend", days: 3 },
  { id: "week", label: "1 week", days: 7 },
  { id: "month", label: "Monthly", days: 30 },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ConciergeFlow({
  brandName,
  phone,
  currency,
  selectedVehicleId,
  onVehicleSelect,
}: ConciergeFlowProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [selectedOccasion, setSelectedOccasion] = useState(TRIP_PURPOSES[0]);
  const [durationPreset, setDurationPreset] = useState("weekend");
  const [dateRange, setDateRange] = useState<DateRange>({ checkIn: null, checkOut: null });
  const [showCalendar, setShowCalendar] = useState(false);
  const [locationPreference, setLocationPreference] = useState("");
  const [drivingPreference, setDrivingPreference] = useState<"chauffeur" | "self_drive">("chauffeur");
  const [passengers, setPassengers] = useState(2);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("standard");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  const selectedVehicle = rentalFleet.find((vehicle) => vehicle.id === selectedVehicleId);
  const selectedBudgetObj = BUDGET_TIERS.find((tier) => tier.id === selectedBudget);
  const activeServiceTitles = selectedServices
    .map((id) => BOOKING_REQUIREMENTS.find((service) => service.id === id)?.title)
    .filter((title): title is string => Boolean(title));
  const days = dateRange.checkIn && dateRange.checkOut
    ? Math.max(1, Math.round((dateRange.checkOut.getTime() - dateRange.checkIn.getTime()) / 86_400_000))
    : DURATION_PRESETS.find((preset) => preset.id === durationPreset)?.days ?? 3;

  const toggleService = (id: string) => {
    setSelectedServices((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const generateWhatsAppMessage = () => {
    const dates = dateRange.checkIn && dateRange.checkOut
      ? `${formatDate(dateRange.checkIn)} to ${formatDate(dateRange.checkOut)} (${days} day${days === 1 ? "" : "s"})`
      : `${durationPreset.toUpperCase()} duration, approximately ${days} day${days === 1 ? "" : "s"}; dates flexible`;
    const requirements = activeServiceTitles.length
      ? activeServiceTitles.map((title) => `- ${title}`).join("\n")
      : "No additional requirements";
    const budget = selectedBudgetObj?.range === "Price confirmed on request"
      ? selectedBudgetObj.range
      : `${currency}${selectedBudgetObj?.range}`;

    return [
      `*${brandName.toUpperCase()} — VEHICLE HIRE REQUEST*`,
      "",
      `*Name:* ${clientName.trim() || "Not provided"}`,
      `*Contact number:* ${clientPhone.trim() || "Not provided"}`,
      `*Requested vehicle:* ${selectedVehicle?.name ?? "To be confirmed"}`,
      `*Trip purpose:* ${selectedOccasion}`,
      `*Dates and duration:* ${dates}`,
      `*Pickup / destination:* ${locationPreference.trim() || "To be confirmed"}`,
      `*Driving preference:* ${drivingPreference === "chauffeur" ? "Chauffeur requested" : "Self-drive requested"}`,
      `*Passengers:* ${passengers}`,
      `*Budget guide:* ${selectedBudgetObj?.title} (${budget}) — indicative only`,
      "*Additional requirements:*",
      requirements,
      ...(customNotes.trim() ? ["", `*Notes:* ${customNotes.trim()}`] : []),
      "",
      "Please confirm vehicle availability and the final rental rate. Thank you.",
    ].join("\n");
  };

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(generateWhatsAppMessage())}`;
  const stepLabels = ["Vehicle", "Purpose", "Dates", "Driver", "Needs", "Quote"];

  return (
    <section id="booking" className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-20 scroll-mt-20">
      <div className="mb-8 sm:mb-10">
        <p className="text-[11px] tracking-[0.22em] uppercase text-[#d7b75d] font-semibold mb-3">Book with Landpeace</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Tell us about your trip.</h2>
        <p className="text-zinc-400 text-sm max-w-xl mt-2 leading-relaxed">
          Share a few details and send your request directly to our WhatsApp team. Availability and final pricing are confirmed with you.
        </p>

        <div className="mt-7" aria-label={`Step ${step} of ${totalSteps}`}>
          <div className="grid grid-cols-6 gap-1.5" aria-hidden="true">
            {stepLabels.map((label, index) => (
              <div key={label} className={`h-1 transition-colors duration-300 ${step >= index + 1 ? "bg-[#d7b75d]" : "bg-white/15"}`} />
            ))}
          </div>
          <div className="grid grid-cols-6 gap-1 mt-2 text-center text-[8px] min-[400px]:text-[9px] uppercase tracking-wide text-zinc-500">
            {stepLabels.map((label, index) => <span key={label} className={step === index + 1 ? "text-[#e2c56e]" : ""}>{label}</span>)}
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-[#171715] border border-white/10 p-4 sm:p-8 lg:p-10 shadow-[0_22px_80px_rgba(0,0,0,0.24)]">
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">1. Choose a vehicle</h3>
              <p className="text-zinc-400 text-sm mt-1">Select the vehicle you would like to hire.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rentalFleet.map((vehicle) => {
                const VehicleIcon = vehicle.name.includes("Bus") ? AirportShuttleIcon : DirectionsCarFilledIcon;
                const isSelected = selectedVehicleId === vehicle.id;
                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => { onVehicleSelect(vehicle.id); setSelectedBudget(vehicle.budgetId); }}
                    aria-pressed={isSelected}
                    className={`flex min-h-[68px] items-center gap-3 rounded-xl p-3 border text-left transition-colors ${isSelected ? "border-[#d7b75d] bg-[#29251b]" : "border-zinc-700 bg-zinc-800 hover:border-[#d7b75d]/70"}`}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-black/25 text-[#d7b75d]"><VehicleIcon sx={{ fontSize: 22 }} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-white text-sm font-semibold">{vehicle.name}</span>
                      <span className="block text-zinc-400 text-xs mt-1">{vehicle.type}</span>
                    </span>
                    {isSelected && <CheckCircleIcon sx={{ fontSize: 19, color: "#d7b75d" }} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">2. What is the trip for?</h3>
              <p className="text-zinc-400 text-sm mt-1">This helps us understand how you plan to use the vehicle.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRIP_PURPOSES.map((purpose) => {
                const isSelected = selectedOccasion === purpose;
                return (
                  <button key={purpose} type="button" onClick={() => setSelectedOccasion(purpose)} aria-pressed={isSelected}
                    className={`flex min-h-12 items-center justify-between gap-3 p-4 border text-left text-sm transition-colors ${isSelected ? "border-[#d7b75d] bg-[#29251b] text-white" : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500"}`}>
                    <span>{purpose}</span>
                    {isSelected && <CheckCircleIcon sx={{ fontSize: 18, color: "#d7b75d" }} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">3. When and where?</h3>
              <p className="text-zinc-400 text-sm mt-1">Choose an estimated duration or set exact dates.</p>
            </div>
            <div>
              <p className="text-zinc-300 text-xs uppercase tracking-wider font-semibold mb-2.5">Rental duration</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DURATION_PRESETS.map((preset) => {
                  const isSelected = durationPreset === preset.id && !showCalendar;
                  return <button key={preset.id} type="button" onClick={() => {
                    setDurationPreset(preset.id);
                    setDateRange({ checkIn: null, checkOut: null });
                    setShowCalendar(false);
                  }} aria-pressed={isSelected}
                    className={`min-h-11 px-3 border text-sm font-medium transition-colors ${isSelected ? "border-[#d7b75d] bg-[#29251b] text-white" : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500"}`}>
                    {preset.label}
                  </button>;
                })}
              </div>
            </div>

            <div>
              <button type="button" onClick={() => setShowCalendar((shown) => !shown)} aria-expanded={showCalendar}
                className="flex min-h-12 w-full items-center justify-between gap-3 p-3.5 bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-left transition-colors">
                <span className="flex min-w-0 items-center gap-2.5">
                  <CalendarMonthIcon sx={{ fontSize: 19, color: "#d7b75d" }} />
                  <span className="truncate text-zinc-200 text-sm font-medium">{dateRange.checkIn && dateRange.checkOut ? `${formatDate(dateRange.checkIn)} to ${formatDate(dateRange.checkOut)} (${days} days)` : "Choose exact dates (optional)"}</span>
                </span>
                <span className="shrink-0 text-xs text-[#e2c56e] font-medium">{showCalendar ? "Hide" : "Choose"}</span>
              </button>
              {showCalendar && <div className="mt-3 p-3 sm:p-4 bg-zinc-800 border border-zinc-700 animate-fadeIn"><Calendar value={dateRange} onChange={setDateRange} /></div>}
            </div>

            <div>
              <label htmlFor="pickup-location" className="block text-zinc-300 text-xs uppercase tracking-wider font-semibold mb-2">Pickup and destination</label>
              <div className="relative">
                <PlaceIcon sx={{ fontSize: 18, color: "#d7b75d" }} className="absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input id="pickup-location" type="text" value={locationPreference} onChange={(event) => setLocationPreference(event.target.value)} placeholder="Enter your pickup area and destination"
                  className="min-h-12 w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:border-[#d7b75d] focus:outline-none" />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">4. Choose a driving option</h3>
              <p className="text-zinc-400 text-sm mt-1">Your preference will be confirmed with the vehicle and final quote.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {([
                { id: "chauffeur", title: "Chauffeur requested", detail: "Include a driver with the rental request.", icon: PeopleIcon },
                { id: "self_drive", title: "Self-drive requested", detail: "Ask about requirements and availability.", icon: DirectionsCarFilledIcon },
              ] as const).map((option) => {
                const isSelected = drivingPreference === option.id;
                const OptionIcon = option.icon;
                return <button key={option.id} type="button" onClick={() => setDrivingPreference(option.id)} aria-pressed={isSelected}
                  className={`min-h-32 p-4 border text-left transition-colors ${isSelected ? "border-[#d7b75d] bg-[#29251b]" : "border-zinc-700 bg-zinc-800 hover:border-zinc-500"}`}>
                  <span className="flex items-center justify-between"><OptionIcon sx={{ fontSize: 22, color: "#d7b75d" }} />{isSelected && <CheckCircleIcon sx={{ fontSize: 18, color: "#d7b75d" }} />}</span>
                  <span className="block text-white text-sm font-semibold mt-3">{option.title}</span>
                  <span className="block text-zinc-400 text-xs mt-1">{option.detail}</span>
                </button>;
              })}
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl p-4 bg-zinc-800 border border-zinc-700">
              <div><p className="text-white text-sm font-medium">How many passengers?</p><p className="text-zinc-500 text-xs mt-1">An estimate is fine.</p></div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setPassengers((count) => Math.max(1, count - 1))} aria-label="Remove one passenger" className="grid size-11 place-items-center bg-zinc-700 text-white hover:bg-zinc-600">−</button>
                <span className="w-6 text-center text-white font-semibold tabular-nums" aria-live="polite">{passengers}</span>
                <button type="button" onClick={() => setPassengers((count) => Math.min(60, count + 1))} aria-label="Add one passenger" className="grid size-11 place-items-center bg-zinc-700 text-white hover:bg-zinc-600">+</button>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">5. Any additional requirements?</h3>
              <p className="text-zinc-400 text-sm mt-1">Select anything that may help us prepare your quote.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BOOKING_REQUIREMENTS.map((requirement) => {
                const RequirementIcon = requirement.icon;
                const isSelected = selectedServices.includes(requirement.id);
                return <button key={requirement.id} type="button" onClick={() => toggleService(requirement.id)} aria-pressed={isSelected}
                  className={`flex min-h-12 items-center gap-3 p-3.5 border text-left transition-colors ${isSelected ? "border-[#d7b75d] bg-[#29251b]" : "border-zinc-700 bg-zinc-800 hover:border-zinc-500"}`}>
                  <RequirementIcon sx={{ fontSize: 19, color: "#d7b75d" }} />
                  <span className="flex-1 text-zinc-200 text-sm">{requirement.title}</span>
                  {isSelected && <CheckCircleIcon sx={{ fontSize: 17, color: "#d7b75d" }} />}
                </button>;
              })}
            </div>
            <div>
              <label htmlFor="booking-notes" className="block text-zinc-300 text-xs uppercase tracking-wider font-semibold mb-2">Notes for the team <span className="text-zinc-500 normal-case">(optional)</span></label>
              <textarea id="booking-notes" value={customNotes} onChange={(event) => setCustomNotes(event.target.value)} rows={3} placeholder="Share timing, route, luggage, or other details"
                className="min-h-24 w-full resize-y px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:border-[#d7b75d] focus:outline-none" />
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">6. Your quote and contact details</h3>
              <p className="text-zinc-400 text-sm mt-1">Budget ranges are guides. Final rates and availability are confirmed on WhatsApp.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BUDGET_TIERS.map((tier) => {
                const isSelected = selectedBudget === tier.id;
                const range = tier.range === "Price confirmed on request" ? tier.range : `${currency}${tier.range}`;
                return <button key={tier.id} type="button" onClick={() => setSelectedBudget(tier.id)} aria-pressed={isSelected}
                  className={`min-h-[108px] p-4 border text-left transition-colors ${isSelected ? "border-[#d7b75d] bg-[#29251b]" : "border-zinc-700 bg-zinc-800 hover:border-zinc-500"}`}>
                  <span className="flex items-center justify-between gap-2"><span className="text-white font-semibold text-sm">{tier.title}</span>{isSelected && <CheckCircleIcon sx={{ fontSize: 17, color: "#d7b75d" }} />}</span>
                  <span className="block text-[#e2c56e] font-semibold text-sm mt-2">{range}</span>
                  <span className="block text-zinc-500 text-xs mt-1">{tier.desc}</span>
                </button>;
              })}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="client-name" className="block text-zinc-300 text-xs uppercase tracking-wider font-semibold mb-2">Your name</label>
                <input id="client-name" type="text" autoComplete="name" value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Full name"
                  className="min-h-12 w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:border-[#d7b75d] focus:outline-none" />
              </div>
              <div>
                <label htmlFor="client-phone" className="block text-zinc-300 text-xs uppercase tracking-wider font-semibold mb-2">Your contact number</label>
                <input id="client-phone" type="tel" inputMode="tel" autoComplete="tel" value={clientPhone} onChange={(event) => setClientPhone(event.target.value)} placeholder="e.g. 0801 234 5678"
                  className="min-h-12 w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:border-[#d7b75d] focus:outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl p-4 bg-black/20 border border-white/10 text-xs">
              <div><span className="block text-zinc-500 uppercase text-[10px]">Vehicle</span><span className="block text-white font-semibold mt-1">{selectedVehicle?.name}</span></div>
              <div><span className="block text-zinc-500 uppercase text-[10px]">Driver</span><span className="block text-white font-semibold mt-1">{drivingPreference === "chauffeur" ? "Chauffeur" : "Self-drive"}</span></div>
              <div><span className="block text-zinc-500 uppercase text-[10px]">Duration</span><span className="block text-white font-semibold mt-1">About {days} day{days === 1 ? "" : "s"}</span></div>
              <div><span className="block text-zinc-500 uppercase text-[10px]">Passengers</span><span className="block text-white font-semibold mt-1">{passengers}</span></div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-900/90 via-zinc-800/60 to-zinc-900/90 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-black/40 border border-[#d7b75d]/40 text-[#e2c56e]">
                  <TikTokIcon className="size-5" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold flex items-center gap-2">
                    See our fleet in action on TikTok
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#d7b75d]/20 text-[#e2c56e] border border-[#d7b75d]/30">Live Videos</span>
                  </p>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    Watch walkthroughs of our luxury SUVs &amp; buses at <span className="text-[#e2c56e] font-medium">{brand.socials.tiktok.handle}</span>
                  </p>
                </div>
              </div>
              <a
                href={brand.socials.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 px-4 rounded-full border border-white/20 bg-white/5 hover:border-[#d7b75d] hover:bg-[#d7b75d]/10 hover:text-[#e2c56e] text-zinc-200 text-xs font-semibold transition-all shrink-0 self-start sm:self-center"
              >
                <TikTokIcon className="size-3.5 text-[#e2c56e]" />
                <span>View on TikTok</span>
              </a>
            </div>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full px-4 bg-[#25d366] text-[#071b0e] font-bold text-sm sm:text-base hover:bg-[#49e384] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <WhatsAppIcon sx={{ fontSize: 22 }} />Send request on WhatsApp
            </a>
          </div>
        )}

        <div className="sticky bottom-0 z-20 -mx-4 -mb-4 mt-7 flex items-center justify-between gap-4 rounded-b-3xl border-t border-white/10 bg-[#171715]/95 px-4 pt-4 pb-4 backdrop-blur-md sm:-mx-8 sm:-mb-8 sm:px-8 lg:-mx-10 lg:-mb-10 lg:px-10">
          {step > 1 ? <button type="button" onClick={() => goToStep(step - 1)} className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 text-xs font-semibold uppercase tracking-wider"><ArrowBackIcon sx={{ fontSize: 16 }} />Back</button> : <span />}
          {step < totalSteps && <button type="button" onClick={() => goToStep(step + 1)} className="inline-flex min-h-11 items-center gap-2 rounded-full px-6 bg-accent-primary text-accent-contrast hover:bg-accent-hover text-xs font-bold uppercase tracking-wider transition-colors">Continue<ArrowForwardIcon sx={{ fontSize: 16 }} /></button>}
        </div>
      </div>
    </section>
  );
}