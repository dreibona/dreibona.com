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
const year = now.getFullYear();
export const formatDate = (date: Date) => {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};
const date = formatDate(now);
export { date, year };
