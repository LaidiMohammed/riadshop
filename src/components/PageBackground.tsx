"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Top hero band (upper block): video on home, image on other pages.
 *  Zooms OUT on scroll down. Rest of the page sits on solid noir. */
export default function PageBackground({
  image,
  video,
  video2,
  poster,
  overlay = true,
  children,
  bandClass = "h-[46vh] md:h-[54vh]",
}: {
  image: string;
  video?: string;
  video2?: string;
  poster?: string;
  overlay?: boolean;
  children?: React.ReactNode;
  bandClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  // local hero.mp4 only plays when the page opts into video (?v= cache-bust)
  const sources = [
    video ? "/brand/hero.mp4?v=5" : null,
    video,
    video2,
  ].filter(Boolean) as string[];

  const showVideo = sources.length > 0 && videoOk;
  const bg = poster || image;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] ring-1 ring-white/10 shadow-2xl shadow-black/50 ${bandClass}`}
    >
      <motion.div style={{ scale, y }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover animate-kenburns"
        />
        {showVideo && (
          <video
            key={sources.join("|")}
            ref={(el) => {
              // force-muted + kick playback: some browsers ignore the
              // muted attribute and then block autoplay with sound
              if (el) {
                el.muted = true;
                el.play().catch(() => {});
              }
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={bg}
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoOk(false)}
            className={`absolute inset-0 h-full w-full object-cover animate-videodrift transition-opacity duration-300 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            {sources.map((s) => (
              <source key={s} src={s} type="video/mp4" />
            ))}
          </video>
        )}
      </motion.div>
      {overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#121210]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </>
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
