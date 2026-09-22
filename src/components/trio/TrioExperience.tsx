import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Menu, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trioContent as c, type MediaAsset } from "@/content/trio";
import { cn } from "@/lib/utils";
function Placeholder({ media, className = "" }: { media: MediaAsset; className?: string }) {
  if (media.src) return <img src={media.src} alt={media.alt} className={cn("h-full w-full object-cover", className)} loading="lazy" />;
  return <div role="img" aria-label={media.alt} className={cn("placeholder-media", className)}><span>{media.label}</span></div>;
}

function TitleMark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const { logo } = c.branding;
  return (
    <span className={cn("title-mark", className)}>
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
      />
    </span>
  );
}

function Intro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => { const id = window.setTimeout(onComplete, 5600); return () => window.clearTimeout(id); }, [onComplete]);
  return <div className="intro-screen" aria-label="TRIO introduction"><Button variant="ghost" size="sm" className="intro-skip" onClick={onComplete}>{c.intro.skip}</Button><div className="intro-sequence"><p>{c.intro.presenter}</p><h1><TitleMark className="intro-title-mark" priority /></h1><div className="intro-tagline">{c.film.tagline.split("\n").map(line => <span key={line}>{line}</span>)}</div><small>{c.intro.system}</small></div></div>;
}

function Navigation({ onWatch }: { onWatch: () => void }) {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <header className={cn("site-nav", scrolled && "site-nav-scrolled", open && "menu-open")}><a className="wordmark" href="#top" aria-label="TRIO home"><TitleMark priority /></a><nav className="desktop-links" aria-label="Main navigation">{c.navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><Button variant="cinematic" size="lg" className="nav-watch" onClick={onWatch}>{c.ctas.watch}<ArrowRight /></Button><Button variant="iconGhost" size="icon" className="menu-button" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></Button>{open && <div className="mobile-menu"><div className="mobile-menu-top"><span className="wordmark"><TitleMark priority /></span><Button variant="iconGhost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}><X /></Button></div><nav>{c.navigation.map((item, i) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}><small>0{i + 1}</small>{item.label}</a>)}</nav><Button variant="cinematic" size="lg" onClick={() => { setOpen(false); onWatch(); }}>{c.ctas.watch}<ArrowRight /></Button></div>}</header>;
}

function SectionLabel({ children }: { children: string }) { return <p className="section-label">{children}</p>; }

function TrailerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const fn = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();

    window.addEventListener("keydown", fn);

    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="TRIO teaser"
    >
      <Button
        variant="iconGhost"
        size="icon"
        className="modal-close"
        onClick={onClose}
        aria-label="Close teaser"
      >
        <X />
      </Button>

{c.film.teaserUrl ? (
  <iframe
    src={c.film.teaserUrl}
    title="TRIO Official Teaser"
    className="trailer-video"
    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
    allowFullScreen
  />
) : (
        <div className="trailer-missing">
          <span>D6 // SIGNAL PENDING</span>
          <h2>TEASER COMING SOON</h2>
          <p>The official teaser will appear here when released.</p>
        </div>
      )}
    </div>
  );
}

export function TrioExperience() {
  const [intro, setIntro] = useState(true); const [trailer, setTrailer] = useState(false); const [lightbox, setLightbox] = useState<number | null>(null); const [activeWorld, setActiveWorld] = useState<number | null>(null); const once = useRef(false);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setIntro(false); }, []);
  useEffect(() => { if (!once.current && !intro) { once.current = true; sessionStorage.setItem("trio-intro-seen", "1"); } }, [intro]);
  useEffect(() => { if (sessionStorage.getItem("trio-intro-seen")) setIntro(false); }, []);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && setLightbox(null); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  const openTrailer = () => setTrailer(true);
  return <div className="trio-site" id="top">{intro && <Intro onComplete={() => setIntro(false)} />}<Navigation onWatch={openTrailer} />
    <main>
      <section className="hero-section" aria-labelledby="hero-title"><Placeholder media={c.heroMedia} className="hero-media"/><div className="hero-overlay"/><div className="hero-system">D6 // PUBLIC TRANSMISSION<br/>STATUS: MONITORED</div><div className="hero-content"><p className="hero-eyebrow">{c.film.studio} PRESENTS</p><h1 id="hero-title"><TitleMark className="hero-title-mark" priority /></h1><div className="hero-tagline">{c.film.tagline.split("\n").map(line => <span key={line}>{line}</span>)}</div><p className="hero-inspiration">{c.film.inspiration}</p><div className="hero-actions"><Button variant="cinematic" size="xl" onClick={openTrailer}><Play />{c.ctas.watch}</Button><Button variant="cinematicGhost" size="xl" asChild><a href="#story">{c.ctas.explore}<ArrowDown /></a></Button></div></div><a className="scroll-cue" href="#story"><span>SCROLL TO ENTER</span><ArrowDown /></a>
      </section>

      <section id="story" className="story-section section-wrap"><div className="story-grid"><div><SectionLabel>{c.story.label}</SectionLabel><h2 className="display-heading">{c.story.heading}</h2><div className="story-copy">{c.story.synopsis.map(p => <p key={p}>{p}</p>)}</div></div><div className="story-visual"><Placeholder media={c.story.media}/><div className="frame-code">FRAME 138A / ARCHIVE</div></div></div><div className="story-beats">{c.story.beats.map((beat, i) => <div key={beat}><small>0{i + 1}</small><strong>{beat}</strong></div>)}</div></section>

      <section id="world" className="world-section section-wrap"><SectionLabel>{c.world.label}</SectionLabel><div className="section-intro"><h2 className="display-heading">{c.world.heading}</h2><p>{c.world.copy}</p></div><div className="world-grid">{c.world.cards.map((card, i) => <button type="button" className={cn("world-card", activeWorld === i && "active")} key={card.title} onClick={() => setActiveWorld(activeWorld === i ? null : i)} aria-expanded={activeWorld === i}><Placeholder media={card.media}/><div className="world-index">0{i + 1}</div><div className="world-card-copy"><small>{card.code}</small><h3>{card.title}</h3><p>{card.description}</p><span>ACCESS FILE <ArrowRight /></span></div></button>)}</div></section>

      <div className="system-interlude" aria-hidden="true"><span>SCANNING...</span><strong>D6 STATUS: NOT FOUND</strong><em>ACCESS DENIED</em></div>

      <section id="the-three" className="characters-section section-wrap"><SectionLabel>{c.characters.label}</SectionLabel><h2 className="display-heading">{c.characters.heading}</h2><div className="character-grid">{c.characters.people.map((person, i) => <article className="character" key={person.name}><Placeholder media={person.image}/><span>SUBJECT / 0{i + 1}</span><h3>{person.name}</h3></article>)}</div></section>

      <section className="quote-break"><div className="quote-line muted-line">{c.quote[0]}</div><div className="quote-line">{c.quote[1]}</div></section>

      <section id="behind" className="behind-section section-wrap"><SectionLabel>{c.behind.label}</SectionLabel><div className="section-intro"><h2 className="display-heading">{c.behind.heading}</h2><p>{c.behind.copy}</p></div><ol className="production-timeline">{c.behind.stages.map((stage, i) => <li key={stage}><span>0{i + 1}</span><strong>{stage}</strong></li>)}</ol><div className="bts-gallery">{c.behind.images.map((image, i) => <button key={image.label} type="button" onClick={() => setLightbox(i)} aria-label={`Open ${image.label}`}><Placeholder media={image}/><span>SCENE {String(i + 1).padStart(2, "0")} / PRODUCTION</span></button>)}</div></section>

      <section id="vision" className="vision-section section-wrap"><SectionLabel>{c.vision.label}</SectionLabel><h2 className="vision-heading">{c.vision.heading.split("\n").map(line => <span key={line}>{line}</span>)}</h2><div className="vision-copy">{c.vision.copy.map(p => <p key={p}>{p}</p>)}</div><div className="vision-signature"><strong>{c.creators.title}</strong><span>×</span><strong>{c.film.studio}</strong></div></section>

      <section className="creators-section section-wrap"><div className="creators-mark"><h2>{c.creators.title}</h2><p>{c.creators.subtitle}</p></div><div className="creators-copy"><p>{c.creators.copy}</p><div>{c.creators.names.map((name, i) => <span key={name}><small>0{i + 1}</small>{name}</span>)}</div></div></section>

      <section id="watch" className="watch-section"><Placeholder media={c.trailer.poster}/><div className="watch-overlay"/><div className="watch-content"><p>{c.trailer.eyebrow}</p><h2>{c.trailer.heading}</h2><Button variant="play" size="play" onClick={openTrailer} aria-label="Play TRIO teaser"><Play fill="currentColor" /></Button><div className="release-lockup"><TitleMark className="watch-title-mark" /><span>{c.film.releaseDate || c.film.releaseStatus}</span></div></div></section>

      <section className="credits-section section-wrap"><div className="credits-title"><h2><TitleMark className="credits-title-mark" /></h2><p>{c.creators.subtitle}</p></div><div className="credits-list">{c.credits.map((credit, i) => <div key={`${credit.role}-${i}`}><dt>{credit.role}</dt><dd>{credit.names.map(name => <span key={name}>{name}</span>)}</dd></div>)}</div></section>

      <section className="final-section"><div><p>{c.finalMessage[0]}</p><h2>{c.finalMessage[1]}</h2></div><div className="final-lockup"><TitleMark className="final-title-mark" /><p>{c.film.tagline.replace("\n", " ")}</p><span>{c.film.releaseStatus}</span></div></section>
    </main>
    <footer><TitleMark className="footer-title-mark" /><span>{c.film.copyright}</span><nav aria-label="Footer navigation">{c.socials.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}</nav></footer>
    <TrailerModal open={trailer} onClose={() => setTrailer(false)}/>{lightbox !== null && c.behind.images[lightbox] && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Production image"><Button variant="iconGhost" size="icon" onClick={() => setLightbox(null)} aria-label="Close image"><X /></Button><Placeholder media={c.behind.images[lightbox]}/><span>{c.behind.images[lightbox].label}</span></div>}
  </div>;
}