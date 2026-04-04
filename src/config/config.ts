// --- Metadata --- //
export const meta = {
  site: "https://dreibona.com/",
  title: "dreibona",
  description: "",
  author: "dreibona",
  image: "cover.jpg",
  loc: "en",
  type: "website",
  robot: true,
};

// --- Main Nav --- //
export const nav = [{ page: "/lab/" }, { page: "/about/" }, { page: "/now/" }];

// --- Dates --- //
const now = new Date();
const day = now.getDate().toString().padStart(2, "0");
const month = (now.getMonth() + 1).toString().padStart(2, "0");
const year = now.getFullYear();
const date = `${day}/${month}/${year}`;
export { date, year };
