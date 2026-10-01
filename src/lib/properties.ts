export interface BrandProperties {
  name: string;
  tagline: string;
  phone: string;
  currency: string;
  socials: {
    tiktok: {
      username: string;
      handle: string;
      url: string;
    };
  };
}

export const brand: BrandProperties = {
  name: "LANDPEACE LOGISTICS",
  tagline: "Your Cargo, Our Priority.",
  phone: "2348064004439",
  currency: "₦",
  socials: {
    tiktok: {
      username: "landpeace_logistic2010",
      handle: "@landpeace_logistic2010",
      url: "https://www.tiktok.com/@landpeace_logistic2010",
    },
  },
};