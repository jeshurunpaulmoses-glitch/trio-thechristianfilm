import firstLook from "@/assets/trio-first-look.jpg.asset.json";

export type MediaAsset = { src: string; alt: string; label: string };

const placeholder = (label: string, alt: string): MediaAsset => ({ src: "", alt, label });

/** Official TRIO first-look key art. */
export const firstLookArt: MediaAsset = {
  src: firstLook.url,
  alt: "TRIO official first look poster — Bible Way Galaxy presents a J³ film",
  label: "OFFICIAL FIRST LOOK",
};

export const trioContent = {
  film: {
    title: "TRIO",
    studio: "BIBLE WAY GALAXY",
    creators: "J³",
    creatorLine: "A J CUBE FILM",
    tagline: "WHEN THE WORLD CHOOSES TO BOW,\nTHREE MEN CHOOSE TO STAND.",
    inspiration: "Inspired by Daniel 3 × Revelation 13",
    releaseStatus: "COMING SOON",
    releaseDate: "",
    teaserUrl: "",
    copyright: "TRIO © 2026 Bible Way Galaxy",
  },
  navigation: [
    { label: "STORY", href: "#story" },
    { label: "WORLD", href: "#world" },
    { label: "THE THREE", href: "#the-three" },
    { label: "VISION", href: "#vision" },
    { label: "WATCH", href: "#watch" },
  ],
  ctas: { watch: "WATCH THE TEASER", explore: "EXPLORE TRIO" },
  intro: { presenter: "BIBLE WAY GALAXY PRESENTS", system: "D6 // SYSTEM INITIALIZED", skip: "SKIP INTRO" },
  heroMedia: firstLookArt,
  poster: firstLookArt,
  story: {
    label: "01 / THE STORY",
    heading: "A WORLD HAS CHOSEN TO BOW.\nTHREE MEN CHOOSE TO STAND.",
    synopsis: [
      "In a world where obedience is no longer requested but engineered, a new order measures loyalty through identity, access and surrender.",
      "Three men are faced with a single demand: bow with everyone else—or stand together for the God they refuse to deny.",
    ],
    beats: ["THE WORLD BOWED.", "THREE DIDN’T.", "THE SYSTEM NOTICED."],
    media: placeholder("OFFICIAL STORY STILL", "A cinematic still from TRIO"),
  },
  world: {
    label: "02 / THE WORLD",
    heading: "ENTER THE WORLD\nOF TRIO",
    copy: "Every system has rules.\nEvery rule demands obedience.",
    cards: [
      { title: "DOMINOR", code: "CLASSIFIED / FILE 01", description: "The corporate authority at the center of a world built on total compliance.", media: placeholder("DOMINOR", "Dominor world artwork") },
      { title: "ACT 138A", code: "MANDATE / FILE 02", description: "A law that turns public allegiance into an unavoidable act of submission.", media: placeholder("ACT 138A", "Act 138A world artwork") },
      { title: "D6 ECONOMIC CARD", code: "D6 DATABASE / FILE 03", description: "An identity system controlling who may buy, sell, work and participate.", media: placeholder("D6 SYSTEM", "D6 economic card artwork") },
      { title: "THE THREE", code: "ACCESS RESTRICTED", description: "Three men whose refusal exposes the limit of a system built to own belief.", media: placeholder("THE THREE", "The three central figures") },
    ],
  },
  characters: {
    label: "03 / THE THREE",
    heading: "THREE MEN.\nONE STAND.\nONE GOD.",
    people: [
      { name: "Jeshurun Paul Moses", image: placeholder("PORTRAIT 01", "Jeshurun Paul Moses in TRIO") },
      { name: "Jabin Jason Samuel", image: placeholder("PORTRAIT 02", "Jabin Jason Samuel in TRIO") },
      { name: "Jeremy Gladson", image: placeholder("PORTRAIT 03", "Jeremy Gladson in TRIO") },
    ],
  },
  quote: ["THEY CAN CONTROL THE SYSTEM.", "BUT NOT THEIR FAITH."],
  behind: {
    label: "04 / BEHIND TRIO",
    heading: "FROM SCRIPT\nTO SCREEN.",
    copy: "TRIO is an independently produced film shaped through faith, collaboration and ambitious filmmaking.",
    stages: ["CONCEPT", "PRODUCTION", "VFX", "FINAL FILM"],
    images: Array.from({ length: 7 }, (_, index) => placeholder(`PRODUCTION FRAME 0${index + 1}`, `Behind the scenes of TRIO, frame ${index + 1}`)),
  },
  vision: {
    label: "05 / THE VISION",
    heading: "REDEFINING\nCHRISTIAN CINEMA.",
    copy: [
      "TRIO represents a pursuit of uncompromising faith-driven storytelling presented with cinematic ambition and technical excellence.",
      "The goal is not simply to create Christian content. The goal is to tell powerful stories of faith with the cinematic craft they deserve.",
    ],
  },
  creators: {
    title: "J³",
    subtitle: "A J CUBE FILM",
    copy: "Jeshurun, Jabin and Jeremy form a collaborative filmmaking identity united by faith, craft and a shared vision for the screen.",
    names: ["JESHURUN", "JABIN", "JEREMY"],
  },
  trailer: { eyebrow: "THE WORLD OF TRIO AWAITS.", heading: "ENTER THE WORLD\nOF TRIO.", poster: placeholder("OFFICIAL TEASER POSTER", "TRIO teaser poster") },
  credits: [
    { role: "CAST", names: ["Jeshurun Paul Moses", "Jabin Jason Samuel", "Jeremy Gladson", "Leon Daniel Priyan", "Frank Jason", "Brendan Raj Vijay"] },
    { role: "DIRECTOR / SCREENPLAY", names: ["Jeshurun Paul Moses"] },
    { role: "DIRECTOR OF PHOTOGRAPHY", names: ["Richard Davidson"] },
    { role: "ORIGINAL MUSIC", names: ["Jabsam Musicals"] },
    { role: "OST SUPERVISOR", names: ["Jabin Samuel"] },
    { role: "CREATIVE DIRECTION & PRODUCTION MANAGER", names: ["Jeremy Gladson"] },
    { role: "EDITING / VFX / PUBLICITY DESIGN", names: ["Jeshurun Paul Moses"] },
    { role: "PRODUCED BY", names: ["Bible Way Galaxy"] },
    { role: "", names: ["FUNDED BY PEOPLE WHO BELIEVED IN OUR MINISTRY"] },
  ],
  finalMessage: ["BIBLE WAY GALAXY", "GLORY TO GOD, BECAUSE HE LIVES!"],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Contact", href: "#" },
  ],
} as const;