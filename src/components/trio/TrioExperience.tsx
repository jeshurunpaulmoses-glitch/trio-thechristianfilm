/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Menu, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trioContent as c, type MediaAsset } from "@/content/trio";
import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { FundingSection } from "@/components/Funding/FundingSection";

function Placeholder({ media, className = "" }: { media: MediaAsset; className?: string }) {
  if (media.src)
    return (
      <img
        src={media.src}
        alt={media.alt}
        className={cn("h-full w-full object-cover", className)}
        loading="lazy"
      />
    );
  return (
    <div role="img" aria-label={media.alt} className={cn("placeholder-media", className)}>
      <span>{media.label}</span>
    </div>
  );
}

function TitleMark({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
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
  useEffect(() => {
    const id = window.setTimeout(onComplete, 5600);
    return () => window.clearTimeout(id);
  }, [onComplete]);
  return (
    <div className="intro-screen" aria-label="TRIO introduction">
      <Button variant="ghost" size="sm" className="intro-skip" onClick={onComplete}>
        {c.intro.skip}
      </Button>
      <div className="intro-sequence">
        <p>{c.intro.presenter}</p>
        <h1>
          <TitleMark className="intro-title-mark" priority />
        </h1>
        <div className="intro-tagline">
          {c.film.tagline.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <small>{c.intro.system}</small>
      </div>
    </div>
  );
}

function Navigation({ onWatch }: { onWatch: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <header className={cn("site-nav", scrolled && "site-nav-scrolled", open && "menu-open")}>
      <a className="wordmark" href="#top" aria-label="TRIO home">
        <TitleMark priority />
      </a>
      <nav className="desktop-links" aria-label="Main navigation">
        {c.navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <Button variant="cinematic" size="lg" className="nav-watch glass-soft" onClick={onWatch}>
        {c.ctas.watch}
        <ArrowRight />
      </Button>
      <Button
        variant="iconGhost"
        size="icon"
        className="menu-button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu glass-heavy"
          >
            <div className="mobile-menu-top">
              <span className="wordmark">
                <TitleMark priority />
              </span>
              <Button
                variant="iconGhost"
                size="icon"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>
            <nav>
              {c.navigation.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  <small>0{i + 1}</small>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <Button
              variant="cinematic"
              size="lg"
              className="glass-soft"
              onClick={() => {
                setOpen(false);
                onWatch();
              }}
            >
              {c.ctas.watch}
              <ArrowRight />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label">{children}</p>;
}

function TrailerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const fn = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-backdrop glass-heavy"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WorldCard({
  card,
  index,
  active,
  onToggle,
}: {
  card: { title: string; code: string; description: string; media: MediaAsset };
  index: number;
  active: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      type="button"
      className={cn("world-card glass-medium", active && "active")}
      onClick={onToggle}
      aria-expanded={active}
      whileHover={{ z: 20, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      <Placeholder media={card.media} />
      <div className="world-index">0{index + 1}</div>
      <div className="world-card-copy">
        <small>{card.code}</small>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        <span>
          ACCESS FILE <ArrowRight />
        </span>
      </div>
    </motion.button>
  );
}

const AtmosphericBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      {/* Cool grey cinematic haze */}
      <motion.div
        animate={{
          x: ["-10vw", "10vw", "-5vw", "-10vw"],
          y: ["-10vh", "20vh", "5vh", "-10vh"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[60vh] rounded-full bg-[radial-gradient(circle,rgba(200,220,255,0.02)_0%,transparent_70%)] blur-[80px]"
      />
      {/* Subtle red signal/flare */}
      <motion.div
        animate={{
          x: ["10vw", "-15vw", "5vw", "10vw"],
          y: ["10vh", "-10vh", "15vh", "10vh"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] right-[10%] w-[50vw] h-[50vh] rounded-full bg-[radial-gradient(circle,rgba(255,60,60,0.03)_0%,transparent_70%)] blur-[100px]"
      />

      {/* Floating HUD tracking crosses for empty space filling */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[8%] w-4 h-4 border-t border-l border-primary/40"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[12%] w-4 h-4 border-b border-r border-primary/40"
        />

        <motion.div
          animate={{ opacity: [0.05, 0.3, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          className="absolute top-[65%] left-[15%] w-1.5 h-1.5 rounded-full bg-primary/30"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.3, 0.05] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          className="absolute bottom-[35%] right-[25%] w-1.5 h-1.5 rounded-full bg-primary/30"
        />

        <motion.div
          animate={{ opacity: [0.05, 0.4, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, delay: 3, ease: "easeInOut" }}
          className="absolute top-[18%] right-[22%] text-[0.45rem] tracking-[0.4em] font-sans font-medium text-primary/30"
        >
          D6_SYS_TRACKING
        </motion.div>
        <motion.div
          animate={{ opacity: [0.05, 0.3, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[8%] text-[0.45rem] tracking-[0.4em] font-sans font-medium text-primary/30"
        >
          MANDATE_138A_ACTIVE
        </motion.div>
      </div>
    </div>
  );
};

const SystemInterlude = () => {
  const letters = "D6 STATUS: NOT FOUND".split("");
  const [glitching, setGlitching] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      onViewportEnter={() => {
        setGlitching(false);
        setTimeout(() => setGlitching(true), 3000);
      }}
      onViewportLeave={() => setGlitching(false)}
      className="system-interlude"
      aria-hidden="true"
    >
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: [0, 1, 0, 1],
            transition: { duration: 0.8, times: [0, 0.2, 0.5, 1] },
          },
        }}
      >
        SCANNING...
      </motion.span>

      <motion.strong
        className={cn(
          "relative inline-block text-primary font-display",
          glitching && "cyber-glitch-parent",
        )}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 1 } },
        }}
      >
        {letters.map((char, i) => (
          <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            {char}
          </motion.span>
        ))}

        {glitching && (
          <>
            <span className="cyber-glitch-layer cyan">D6 STATUS: NOT FOUND</span>
            <span className="cyber-glitch-layer fuchsia">D6 STATUS: NOT FOUND</span>
          </>
        )}
      </motion.strong>

      <motion.em
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: [0, 1, 0, 1, 0, 1],
            scale: 1,
            transition: { delay: 3.5, duration: 0.6 },
          },
        }}
      >
        ACCESS DENIED
      </motion.em>
    </motion.div>
  );
};

export function TrioExperience() {
  const [intro, setIntro] = useState(true);
  const [trailer, setTrailer] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeWorld, setActiveWorld] = useState<number | null>(null);
  const once = useRef(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setIntro(false);
  }, []);
  useEffect(() => {
    if (!once.current && !intro) {
      once.current = true;
      sessionStorage.setItem("trio-intro-seen", "1");
    }
  }, [intro]);
  useEffect(() => {
    if (sessionStorage.getItem("trio-intro-seen")) setIntro(false);
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const openTrailer = () => setTrailer(true);

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="trio-site" id="top">
      <AtmosphericBackground />
      {intro && <Intro onComplete={() => setIntro(false)} />}
      <Navigation onWatch={openTrailer} />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
            <Placeholder media={c.heroMedia} className="hero-media" />
          </motion.div>
          <div className="hero-overlay" />
          <div className="hero-system">
            D6 // PUBLIC TRANSMISSION
            <br />
            STATUS: MONITORED
          </div>
          <div className="hero-content">
            <motion.p initial="hidden" animate="visible" variants={fadeUp} className="hero-eyebrow">
              {c.film.studio} PRESENTS
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, filter: "blur(10px)" },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as any },
                },
              }}
              id="hero-title"
            >
              <TitleMark className="hero-title-mark" priority />
            </motion.h1>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.3 }}
              className="hero-tagline"
            >
              {c.film.tagline.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </motion.div>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.4 }}
              className="hero-inspiration"
            >
              {c.film.inspiration}
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 1, delay: 0.6 } },
              }}
              className="hero-actions"
            >
              <Button variant="cinematic" size="xl" className="glass-soft" onClick={openTrailer}>
                <Play />
                {c.ctas.watch}
              </Button>
              <Button variant="cinematicGhost" className="glass-soft bg-black/20" size="xl" asChild>
                <a href="#story">
                  {c.ctas.explore}
                  <ArrowDown />
                </a>
              </Button>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#story">
            <span>SCROLL TO ENTER</span>
            <ArrowDown />
          </a>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          id="story"
          className="story-section section-wrap"
        >
          <div className="story-grid">
            <div>
              <SectionLabel>{c.story.label}</SectionLabel>
              <h2 className="display-heading">{c.story.heading}</h2>
              <div className="story-copy">
                {c.story.synopsis.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="story-visual">
              <Placeholder media={c.story.media} />
              <div className="frame-code">FRAME 138A / ARCHIVE</div>
            </div>
          </div>
          <div className="story-beats">
            {c.story.beats.map((beat, i) => (
              <div key={beat}>
                <small>0{i + 1}</small>
                <strong>{beat}</strong>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          id="world"
          className="world-section section-wrap"
        >
          <SectionLabel>{c.world.label}</SectionLabel>
          <div className="section-intro">
            <h2 className="display-heading">{c.world.heading}</h2>
            <p>{c.world.copy}</p>
          </div>
          <div className="world-grid">
            {c.world.cards.map((card, i) => (
              <WorldCard
                key={card.title}
                card={card}
                index={i}
                active={activeWorld === i}
                onToggle={() => setActiveWorld(activeWorld === i ? null : i)}
              />
            ))}
          </div>
        </motion.section>

        <SystemInterlude />

        <section id="the-three" className="characters-section section-wrap">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionLabel>{c.characters.label}</SectionLabel>
            <h2 className="display-heading">{c.characters.heading}</h2>
          </motion.div>
          <div className="character-grid">
            {c.characters.people.map((person, i) => (
              <motion.article
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-5%" }}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 1.2, delay: i * 0.1, ease: [0.2, 0.8, 0.4, 1] as any },
                  },
                }}
                className="character"
                key={person.name}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1 }}
                  className="h-full w-full"
                >
                  <Placeholder media={person.image} />
                </motion.div>
                <div className="character-info glass-soft">
                  <span>SUBJECT / 0{i + 1}</span>
                  <h3>{person.name}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="quote-break">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, filter: "blur(10px)" },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 2, ease: "easeInOut" },
              },
            }}
            className="quote-line muted-line"
          >
            {c.quote[0]}
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: { duration: 2, delay: 0.5, ease: "easeInOut" },
              },
            }}
            className="quote-line"
          >
            {c.quote[1]}
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          id="behind"
          className="behind-section section-wrap"
        >
          <SectionLabel>{c.behind.label}</SectionLabel>
          <div className="section-intro">
            <h2 className="display-heading">{c.behind.heading}</h2>
            <p>{c.behind.copy}</p>
          </div>
          <ol className="production-timeline">
            {c.behind.stages.map((stage, i) => (
              <li key={stage}>
                <span>0{i + 1}</span>
                <strong>{stage}</strong>
              </li>
            ))}
          </ol>
          <div className="bts-gallery">
            {c.behind.images.map((image, i) => (
              <button
                key={image.label}
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`Open ${image.label}`}
                className="group relative overflow-hidden"
              >
                <Placeholder
                  media={image}
                  className="transition-transform duration-[800ms] group-hover:scale-105"
                />
                <span className="glass-soft font-medium px-3 py-1.5 rounded-sm">
                  SCENE {String(i + 1).padStart(2, "0")} / PRODUCTION
                </span>
              </button>
            ))}
          </div>
        </motion.section>

        <FundingSection />

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          id="vision"
          className="vision-section section-wrap"
        >
          <SectionLabel>{c.vision.label}</SectionLabel>
          <h2 className="vision-heading">
            {c.vision.heading.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <div className="vision-copy">
            {c.vision.copy.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="vision-signature">
            <strong>{c.creators.title}</strong>
            <span>×</span>
            <strong>{c.film.studio}</strong>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          className="creators-section section-wrap"
        >
          <div className="creators-mark">
            <h2>{c.creators.title}</h2>
            <p>{c.creators.subtitle}</p>
          </div>
          <div className="creators-copy">
            <p>{c.creators.copy}</p>
            <div>
              {c.creators.names.map((name, i) => (
                <span key={name}>
                  <small>0{i + 1}</small>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          id="watch"
          className="watch-section"
        >
          <Placeholder media={c.trailer.poster} />
          <div className="watch-overlay" />
          <div className="watch-content">
            <p>{c.trailer.eyebrow}</p>
            <h2>{c.trailer.heading}</h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="play"
                size="play"
                className="glass-soft"
                onClick={openTrailer}
                aria-label="Play TRIO teaser"
              >
                <Play fill="currentColor" />
              </Button>
            </motion.div>
            <div className="release-lockup">
              <TitleMark className="watch-title-mark" />
              <span>{c.film.releaseDate || c.film.releaseStatus}</span>
            </div>
          </div>
        </motion.section>

        <section className="credits-section section-wrap">
          <div className="credits-title">
            <h2>
              <TitleMark className="credits-title-mark" />
            </h2>
            <p>{c.creators.subtitle}</p>
          </div>
          <div className="credits-list">
            {c.credits.map((credit, i) => (
              <div key={`${credit.role}-${i}`}>
                <dt>{credit.role}</dt>
                <dd>
                  {credit.names.map((name) => (
                    <span key={name}>{name}</span>
                  ))}
                </dd>
              </div>
            ))}
          </div>
        </section>

        <section className="final-section">
          <div>
            <p>{c.finalMessage[0]}</p>
            <h2>{c.finalMessage[1]}</h2>
          </div>
          <div className="final-lockup">
            <TitleMark className="final-title-mark" />
            <p>{c.film.tagline.replace("\n", " ")}</p>
            <span>{c.film.releaseStatus}</span>
          </div>
        </section>
      </main>
      <footer>
        <TitleMark className="footer-title-mark" />
        <span>{c.film.copyright}</span>
        <nav aria-label="Footer navigation">
          {c.socials.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
      <TrailerModal open={trailer} onClose={() => setTrailer(false)} />
      <AnimatePresence>
        {lightbox !== null && c.behind.images[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Production image"
          >
            <Button
              variant="iconGhost"
              size="icon"
              onClick={() => setLightbox(null)}
              aria-label="Close image"
            >
              <X />
            </Button>
            <Placeholder media={c.behind.images[lightbox]} />
            <span>{c.behind.images[lightbox].label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
