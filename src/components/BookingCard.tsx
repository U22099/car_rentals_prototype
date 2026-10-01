"use client";

import { useState, useMemo } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import StarIcon from "@mui/icons-material/Star";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SpeedIcon from "@mui/icons-material/Speed";
import AirlineSeatReclineExtraOutlinedIcon from "@mui/icons-material/AirlineSeatReclineExtraOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Calendar from "./Calendar";
import type { Vehicle } from "@/lib/properties";

export type Property = Vehicle;

interface BookingCardProps {
  property: Vehicle;
  currency: string;
  phone: string;
  brandName: string;
}

interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(amount: number): string {
  return amount.toLocaleString("en-US");
}

export default function PropertyBookingCard({
  property,
  currency,
  phone,
  brandName,
}: BookingCardProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    checkIn: null,
    checkOut: null,
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [needsChauffeur, setNeedsChauffeur] = useState(true);
  const [deliveryType, setDeliveryType] = useState<"address" | "airport" | "showroom">("address");
  const [passengers, setPassengers] = useState(2);

  const images = [...(property.images ?? [property.image])];

  const days = useMemo(() => {
    if (!dateRange.checkIn || !dateRange.checkOut) return 0;
    const ms = dateRange.checkOut.getTime() - dateRange.checkIn.getTime();
    return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
  }, [dateRange]);

  const dailyRate = property.pricePerDay || property.pricePerNight;
  const baseTotal = days * dailyRate;
  const chauffeurTotal = needsChauffeur ? days * (property.chauffeurFeePerDay || 50000) : 0;
  const securityDeposit = property.securityDeposit || property.cleaningFee || 300000;
  const grandTotal = baseTotal + chauffeurTotal + securityDeposit;

  const datesSelected = Boolean(dateRange.checkIn && dateRange.checkOut && days > 0);

  const deliveryLabels = {
    address: "White-Glove Delivery to Address/Hotel",
    airport: "VIP Airport Tarmac / FBO Pick-up",
    showroom: "Private Showroom Handover",
  };

  const whatsappUrl = useMemo(() => {
    if (!datesSelected) return "#";
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const message =
      `Hello! I would like to reserve the *${property.name}* (${property.category}) with ${brandName}.\n\n` +
      `📅 Pickup: ${formatDate(dateRange.checkIn!)}\n` +
      `📅 Return: ${formatDate(dateRange.checkOut!)} (${days} day${days > 1 ? "s" : ""})\n` +
      `👔 Chauffeur: ${needsChauffeur ? "Yes – Executive Chauffeur" : "No – Self-Drive"}\n` +
      `📍 Delivery: ${deliveryLabels[deliveryType]}\n` +
      `👥 Passengers: ${passengers}\n` +
      `💰 Total: ${currency}${formatPrice(grandTotal)} (includes ${currency}${formatPrice(securityDeposit)} refundable deposit)\n` +
      `🔗 Preview: ${currentUrl.split("?")[0]}\n\n` +
      `Please confirm availability and dispatch details.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, [
    datesSelected, property, brandName, dateRange, days,
    needsChauffeur, deliveryType, passengers, currency,
    grandTotal, securityDeposit, phone,
  ]);

  return (
    <section className="w-full bg-bg-primary border-t border-zinc-800/60" id="booking">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-14 md:py-20">

        {/* Section heading */}
        <div className="mb-6 sm:mb-10">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-medium mb-1">
            {brandName} · Reserve
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
            {property.name}
          </h2>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-[13px] text-zinc-400">
            <span className="flex items-center gap-1 sm:gap-1.5">
              <PlaceOutlinedIcon sx={{ fontSize: 13 }} />
              {property.location}
            </span>
            <span className="flex items-center gap-1">
              <StarIcon sx={{ fontSize: 13, color: "var(--color-accent-primary)" }} />
              <span className="text-white font-semibold">{property.rating}</span>
              <span className="text-zinc-500">({property.reviewCount} reviews)</span>
            </span>
            <span>{property.seats} seats · {property.horsepower} HP · {property.acceleration}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">

          {/* ── LEFT: Images + specs + amenities ── */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 min-w-0">
            {/* Main image */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] group border border-zinc-800">
              <img
                src={images[activeImage]}
                alt={`${property.name} view ${activeImage + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Price badge — readable on image */}
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 border border-white/10">
                <span className="text-white font-bold text-sm sm:text-lg block leading-tight">
                  {currency}{formatPrice(dailyRate)}
                </span>
                <span className="text-zinc-400 text-[9px] sm:text-[11px]">/ day</span>
              </div>
              <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/70 backdrop-blur-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-200">
                {property.category}
              </span>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 sm:gap-2.5">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-16 sm:w-20 h-11 sm:h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === i
                        ? "border-white scale-105"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[
                { label: "Horsepower", value: `${property.horsepower} HP`, Icon: SpeedIcon },
                { label: "0–60 mph", value: property.acceleration, Icon: DirectionsCarOutlinedIcon },
                { label: "Powertrain", value: property.engine, Icon: DirectionsCarOutlinedIcon },
                { label: "Seating", value: `${property.seats} pax`, Icon: AirlineSeatReclineExtraOutlinedIcon },
              ].map(({ label, value, Icon }) => (
                <div key={label} className="p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500 font-medium mb-1">{label}</p>
                  <div className="flex items-center gap-1.5">
                    <Icon sx={{ fontSize: 13, color: "var(--color-text-secondary)" }} />
                    <span className="text-zinc-100 font-semibold text-xs sm:text-[13px] truncate">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Amenities */}
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 sm:p-5">
              <h3 className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-400 mb-3 sm:mb-4">
                Included Standards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {property.amenities.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-[13px] text-zinc-300">
                    <CheckCircleOutlineIcon sx={{ fontSize: 14, color: "var(--color-text-dim)" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Booking panel ── */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 sm:p-6 sticky top-20 space-y-4 sm:space-y-5">

              {/* Price header */}
              <div className="flex items-baseline justify-between pb-3 sm:pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    {currency}{formatPrice(dailyRate)}
                  </span>
                  <span className="text-zinc-500 text-xs sm:text-sm ml-1.5 sm:ml-2">/ day</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] sm:text-[10px] text-zinc-500 block uppercase tracking-wider">Deposit</span>
                  <span className="text-zinc-200 text-xs sm:text-sm font-semibold">
                    {currency}{formatPrice(securityDeposit)}
                  </span>
                </div>
              </div>

              {/* Date picker */}
              <div>
                <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block mb-1.5 sm:mb-2">
                  Rental Dates
                </label>
                <button
                  onClick={() => setCalendarOpen(!calendarOpen)}
                  className="w-full flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: "var(--color-text-dim)" }} />
                    <span className="text-zinc-200 text-xs sm:text-[13px]">
                      {dateRange.checkIn && dateRange.checkOut
                        ? `${formatDate(dateRange.checkIn)} → ${formatDate(dateRange.checkOut)}`
                        : "Select pickup & return dates"}
                    </span>
                  </div>
                  {days > 0 && (
                    <span className="bg-white/10 text-zinc-200 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-semibold shrink-0">
                      {days}d
                    </span>
                  )}
                </button>
                {calendarOpen && (
                  <div className="mt-3 p-3 sm:p-4 rounded-xl bg-zinc-800 border border-zinc-700 animate-fadeIn">
                    <Calendar
                      value={dateRange}
                      onChange={(range) => {
                        setDateRange(range);
                        if (range.checkIn && range.checkOut) setCalendarOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Driver preference */}
              <div>
                <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block mb-1.5 sm:mb-2">
                  Driver
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: true, label: "Chauffeur", sub: "Vetted executive driver" },
                    { val: false, label: "Self-Drive", sub: "Valid licence required" },
                  ].map(({ val, label, sub }) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => setNeedsChauffeur(val)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        needsChauffeur === val
                          ? "border-white bg-white/10 text-white"
                          : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <p className="text-[11px] sm:text-[12px] font-semibold text-zinc-100">{label}</p>
                      <p className="text-[9px] sm:text-[10px] text-zinc-500 mt-0.5">{sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div>
                <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block mb-1.5 sm:mb-2">
                  Handover
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {(
                    [
                      { id: "address", label: "Address" },
                      { id: "airport", label: "Airport" },
                      { id: "showroom", label: "Showroom" },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDeliveryType(item.id)}
                      className={`p-2 sm:p-2.5 rounded-lg border text-center text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer ${
                        deliveryType === item.id
                          ? "border-white bg-white/10 text-white"
                          : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Passengers */}
              <div>
                <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block mb-1.5 sm:mb-2">
                  Passengers
                </label>
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-zinc-800 border border-zinc-700">
                  <span className="text-xs sm:text-[13px] text-zinc-300">Count</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-zinc-600 cursor-pointer text-xs"
                    >
                      −
                    </button>
                    <span className="text-xs sm:text-sm font-semibold text-white w-4 text-center">{passengers}</span>
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.min(property.seats, passengers + 1))}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-zinc-600 cursor-pointer text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Cost breakdown */}
              {datesSelected && (
                <div className="border-t border-zinc-800 pt-3 sm:pt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-[13px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>{currency}{formatPrice(dailyRate)} × {days}d</span>
                    <span className="text-zinc-200">{currency}{formatPrice(baseTotal)}</span>
                  </div>
                  {needsChauffeur && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Chauffeur ({days}d)</span>
                      <span className="text-zinc-200">{currency}{formatPrice(chauffeurTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-500">
                    <span>Security deposit (refundable)</span>
                    <span>{currency}{formatPrice(securityDeposit)}</span>
                  </div>
                  <div className="border-t border-zinc-800 pt-2 flex justify-between items-baseline">
                    <span className="font-semibold text-white">Total</span>
                    <span className="text-lg sm:text-xl font-bold text-white">{currency}{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              )}

              {/* CTA */}
              {datesSelected ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="reserve-whatsapp-btn"
                  className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-[14px] bg-brand-whatsapp text-black hover:bg-brand-whatsapp-hover transition-all duration-200 cursor-pointer"
                >
                  <WhatsAppIcon sx={{ fontSize: 18 }} />
                  Reserve via WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setCalendarOpen(true)}
                  className="w-full py-3 sm:py-3.5 rounded-xl font-medium text-xs sm:text-[13px] bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white transition-all cursor-pointer"
                >
                  Select Dates to Continue
                </button>
              )}

              <p className="text-[10px] sm:text-[11px] text-center text-zinc-600">
                Direct WhatsApp booking · No commission fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
