import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/websiteContent';
import heroFacilityImage from '../assets/images/hero_industrial_facility_1792987893482.jpg';
import lappProductImage from '../assets/images/product_lapp_cables_1792987894896.jpg';
import eatonProductImage from '../assets/images/product_eaton_switchgear_1792987895288.jpg';
import mennekesProductImage from '../assets/images/product_mennekes_plugs_1792987895718.jpg';

interface VideoClip {
  id: string;
  title: string;
  badge: string;
  videoSrc: string;
  poster: string;
}

const VIDEO_CLIPS: VideoClip[] = [
  {
    id: 'factory',
    title: 'Advanced Industrial Manufacturing & Automation Plant',
    badge: 'Factory Facility',
    videoSrc: `${import.meta.env.BASE_URL}videos/video_facility.mp4`,
    poster: heroFacilityImage,
  },
  {
    id: 'kable',
    title: 'LAPP Industrial Cables & ÖLFLEX® Power Connectivity',
    badge: 'Cables & Conduits',
    videoSrc: `${import.meta.env.BASE_URL}videos/video_lapp.mp4`,
    poster: lappProductImage,
  },
  {
    id: 'eaton',
    title: 'EATON Moeller Switchgears & Motor Control Systems',
    badge: 'Industrial Switchgears',
    videoSrc: `${import.meta.env.BASE_URL}videos/video_eaton.mp4`,
    poster: eatonProductImage,
  },
  {
    id: 'mennekes',
    title: 'MENNEKES Heavy-Duty Industrial CEE Plugs & Sockets',
    badge: 'Industrial Plugs & Sockets',
    videoSrc: `${import.meta.env.BASE_URL}videos/video_mennekes.mp4`,
    poster: mennekesProductImage,
  },
];

// Set slider cycle duration to 3 seconds per clip
const CYCLE_DURATION_MS = 3000;
// Smooth 500ms crossfade duration
const FADE_DURATION_MS = 500;

export const VideoHeroBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-scroll to the next video every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % VIDEO_CLIPS.length);
    }, CYCLE_DURATION_MS);

    return () => clearInterval(interval);
  }, []);

  // Smooth, shake-free video playback management
  useEffect(() => {
    // Start active video smoothly
    const activeVideo = videoRefs.current[currentIndex];
    if (activeVideo) {
      const playPromise = activeVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handled
        });
      }
    }

    // Allow previous video to finish its 500ms fade-out without abrupt reset
    const timeout = setTimeout(() => {
      videoRefs.current.forEach((video, idx) => {
        if (idx !== currentIndex && video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, FADE_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div
      id="video-banner"
      className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] overflow-hidden bg-slate-950 text-white select-none isolate [contain:paint]"
    >
      {/* Full-width Video Elements - zero-shake hardware accelerated */}
      {VIDEO_CLIPS.map((clip, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={clip.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out will-change-[opacity] [transform:translate3d(0,0,0)] [backface-visibility:hidden] ${
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
              preload="auto"
              className="w-full h-full object-cover [transform:translate3d(0,0,0)] [backface-visibility:hidden] pointer-events-none"
            />

            {/* Stable gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/35 pointer-events-none [transform:translateZ(0)]" />
          </div>
        );
      })}

      {/* Information badge & company info - fixed layout to prevent shifts */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-8 sm:pb-12 pointer-events-none">
        <div className="max-w-xl w-full bg-slate-950/60 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-white/10 pointer-events-auto shadow-2xl">
          <div className="h-7 mb-2 flex items-center overflow-hidden">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="shrink-0">{VIDEO_CLIPS[currentIndex].badge}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/90 normal-case font-normal truncate max-w-[260px] sm:max-w-[340px]">
                {VIDEO_CLIPS[currentIndex].title}
              </span>
            </div>
          </div>
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
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                idx === currentIndex
                  ? 'w-8 bg-amber-400'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to ${clip.title}`}
              title={`${clip.badge}: ${clip.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
