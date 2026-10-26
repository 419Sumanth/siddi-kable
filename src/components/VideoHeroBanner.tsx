import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/websiteContent';

interface VideoClip {
  id: string;
  title: string;
  videoSrc: string;
  poster: string;
}

const VIDEO_CLIPS: VideoClip[] = [
  {
    id: 'godown',
    title: 'Central Godown & Warehouse',
    videoSrc: '/videos/video_godown.mp4',
    poster: '/src/assets/images/godown_cable_warehouse_1792994589931.jpg',
  },
  {
    id: 'products',
    title: 'Industrial Electrical Products',
    videoSrc: '/videos/video_products.mp4',
    poster: '/src/assets/images/products_collection_1792994590628.jpg',
  },
  {
    id: 'cables_work',
    title: 'Precision Cable Assembly & Wiring',
    videoSrc: '/videos/video_cables_work.mp4',
    poster: '/src/assets/images/working_with_cables_1792994590598.jpg',
  },
  {
    id: 'automation',
    title: 'Automated Industrial Production Facility',
    videoSrc: '/videos/video_automation.mp4',
    poster: '/src/assets/images/hero_industrial_facility_1792987893482.jpg',
  },
];

const CYCLE_DURATION_MS = 60000; // 1 minute per clip

export const VideoHeroBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-scroll to the next video every 1 minute (60 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % VIDEO_CLIPS.length);
    }, CYCLE_DURATION_MS);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Ensure active video is playing
  useEffect(() => {
    const activeVideo = videoRefs.current[currentIndex];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {
        // Autoplay may be deferred until user interaction
      });
    }
  }, [currentIndex]);

  return (
    <div
      id="video-banner"
      className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] overflow-hidden bg-slate-950 text-white"
    >
      {/* Full-width Video Elements */}
      {VIDEO_CLIPS.map((clip, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={clip.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <video
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={clip.videoSrc}
              poster={clip.poster}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-[1.02]"
            />

            {/* Subtle bottom gradient scrim so the two lines of text are readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />
          </div>
        );
      })}

      {/* Two lines about the company in small fonts */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-8 sm:pb-12 pointer-events-none">
        <div className="max-w-xl bg-slate-950/40 backdrop-blur-xs p-4 sm:p-5 rounded-xl border border-white/10 pointer-events-auto">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-white leading-snug">
            {COMPANY_INFO.name} · Established 2008
          </p>
          <p className="text-xs sm:text-xs text-slate-300 font-normal mt-1 leading-relaxed">
            {COMPANY_INFO.tagline}
          </p>
        </div>

        {/* Minimal dot navigation for the 4 clips */}
        <div className="flex items-center gap-2 mt-4 pointer-events-auto">
          {VIDEO_CLIPS.map((clip, idx) => (
            <button
              key={clip.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-amber-400'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to ${clip.title}`}
              title={clip.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
