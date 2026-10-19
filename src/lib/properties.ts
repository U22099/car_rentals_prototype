export interface BrandProperties {
  name: string;
  tagline: string;
  phone: string;
  phone2: string;
  currency: string;
  socials: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  address: string;
  city: string;
}

export const brand: BrandProperties = {
  name: "DOUBLE I.TANZE LTD.",
  tagline: "Elegance in motion.",
  phone: "2348160221236",
  phone2: "2349158989731",
  currency: "₦",
  socials: {
    instagram: "https://www.instagram.com/doubleitanze",
    facebook: "https://www.facebook.com/share/18NHNVFE8a/",
    tiktok: "https://www.tiktok.com/@doubleitanze01",
  },
  address: "1, awonde strt, off ajesa strt Wuse 2, Abuja",
  city: "Abuja",
};
