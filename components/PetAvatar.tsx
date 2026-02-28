"use client";

import { motion } from "framer-motion";
import { PetStage } from "@/lib/pet";

interface PetAvatarProps {
  stage: PetStage;
  happiness: number;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

// SVG-based pet avatars for each evolution stage
function EggPet({ scale }: { scale: number }) {
  return (
    <g transform={`scale(${scale})`}>
      {/* Egg body */}
      <ellipse cx="50" cy="55" rx="28" ry="35" fill="url(#eggGrad)" />
      <ellipse cx="50" cy="55" rx="28" ry="35" fill="none" stroke="#FFB5C8" strokeWidth="2" />
      {/* Crack line */}
      <path d="M35 45 L42 50 L38 55 L45 60" stroke="#F0A0B8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Sparkle dots */}
      <circle cx="58" cy="40" r="2" fill="#FFD700" opacity="0.6" />
      <circle cx="65" cy="48" r="1.5" fill="#FFD700" opacity="0.4" />
      <defs>
        <linearGradient id="eggGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFEEF3" />
          <stop offset="100%" stopColor="#FFD1E0" />
        </linearGradient>
      </defs>
    </g>
  );
}

function BabyPet({ scale, happiness }: { scale: number; happiness: number }) {
  const isHappy = happiness > 40;
  return (
    <g transform={`scale(${scale})`}>
      {/* Body */}
      <circle cx="50" cy="58" r="25" fill="url(#babyGrad)" />
      <circle cx="50" cy="58" r="25" fill="none" stroke="#FFB5C8" strokeWidth="2" />
      {/* Blush */}
      <ellipse cx="37" cy="62" rx="5" ry="3" fill="#FFB5C8" opacity="0.5" />
      <ellipse cx="63" cy="62" rx="5" ry="3" fill="#FFB5C8" opacity="0.5" />
      {/* Eyes */}
      <circle cx="42" cy="55" r="3" fill="#3D2B4E" />
      <circle cx="58" cy="55" r="3" fill="#3D2B4E" />
      <circle cx="43" cy="54" r="1" fill="white" />
      <circle cx="59" cy="54" r="1" fill="white" />
      {/* Mouth */}
      {isHappy ? (
        <path d="M44 64 Q50 70 56 64" stroke="#3D2B4E" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M44 66 Q50 63 56 66" stroke="#3D2B4E" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
      {/* Small ear-like protrusions */}
      <circle cx="33" cy="40" r="8" fill="#FFE4EF" stroke="#FFB5C8" strokeWidth="1.5" />
      <circle cx="67" cy="40" r="8" fill="#FFE4EF" stroke="#FFB5C8" strokeWidth="1.5" />
      <defs>
        <linearGradient id="babyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF5F8" />
          <stop offset="100%" stopColor="#FFE4EF" />
        </linearGradient>
      </defs>
    </g>
  );
}

function ChildPet({ scale, happiness }: { scale: number; happiness: number }) {
  const isHappy = happiness > 40;
  return (
    <g transform={`scale(${scale})`}>
      {/* Body */}
      <ellipse cx="50" cy="60" rx="27" ry="24" fill="url(#childGrad)" />
      <ellipse cx="50" cy="60" rx="27" ry="24" fill="none" stroke="#C8B5FF" strokeWidth="2" />
      {/* Ears */}
      <ellipse cx="30" cy="40" rx="10" ry="12" fill="#EEE4FF" stroke="#C8B5FF" strokeWidth="1.5" transform="rotate(-15 30 40)" />
      <ellipse cx="70" cy="40" rx="10" ry="12" fill="#EEE4FF" stroke="#C8B5FF" strokeWidth="1.5" transform="rotate(15 70 40)" />
      {/* Inner ear */}
      <ellipse cx="30" cy="40" rx="5" ry="7" fill="#DDD0FF" transform="rotate(-15 30 40)" />
      <ellipse cx="70" cy="40" rx="5" ry="7" fill="#DDD0FF" transform="rotate(15 70 40)" />
      {/* Eyes */}
      <ellipse cx="40" cy="56" rx="4" ry="4.5" fill="#3D2B4E" />
      <ellipse cx="60" cy="56" rx="4" ry="4.5" fill="#3D2B4E" />
      <circle cx="41.5" cy="54.5" r="1.5" fill="white" />
      <circle cx="61.5" cy="54.5" r="1.5" fill="white" />
      {/* Blush */}
      <ellipse cx="33" cy="62" rx="6" ry="3.5" fill="#FFB5C8" opacity="0.4" />
      <ellipse cx="67" cy="62" rx="6" ry="3.5" fill="#FFB5C8" opacity="0.4" />
      {/* Mouth */}
      {isHappy ? (
        <path d="M43 67 Q50 74 57 67" stroke="#3D2B4E" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <ellipse cx="50" cy="67" rx="4" ry="3" fill="#3D2B4E" opacity="0.6" />
      )}
      {/* Sparkle accessory */}
      <path d="M50 30 L51.5 34 L56 34.5 L52.5 37.5 L53.5 42 L50 39.5 L46.5 42 L47.5 37.5 L44 34.5 L48.5 34 Z" fill="#FFD700" opacity="0.8" />
      <defs>
        <linearGradient id="childGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF5F8" />
          <stop offset="100%" stopColor="#F0E8FF" />
        </linearGradient>
      </defs>
    </g>
  );
}

function TeenPet({ scale, happiness }: { scale: number; happiness: number }) {
  const isHappy = happiness > 40;
  return (
    <g transform={`scale(${scale})`}>
      {/* Body */}
      <ellipse cx="50" cy="58" rx="28" ry="26" fill="url(#teenGrad)" />
      <ellipse cx="50" cy="58" rx="28" ry="26" fill="none" stroke="#C8B5FF" strokeWidth="2" />
      {/* Ears with gradient */}
      <ellipse cx="28" cy="36" rx="11" ry="14" fill="url(#earGrad)" stroke="#C8B5FF" strokeWidth="1.5" transform="rotate(-10 28 36)" />
      <ellipse cx="72" cy="36" rx="11" ry="14" fill="url(#earGrad)" stroke="#C8B5FF" strokeWidth="1.5" transform="rotate(10 72 36)" />
      {/* Crown/tiara */}
      <path d="M38 34 L42 26 L46 32 L50 24 L54 32 L58 26 L62 34" stroke="#FFD700" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="24" r="2.5" fill="#FFD700" />
      {/* Eyes — sparkly */}
      {isHappy ? (
        <>
          <path d="M37 54 L40 51 L43 54 L40 57 Z" fill="#3D2B4E" />
          <path d="M57 54 L60 51 L63 54 L60 57 Z" fill="#3D2B4E" />
          <circle cx="41" cy="52.5" r="1" fill="white" />
          <circle cx="61" cy="52.5" r="1" fill="white" />
        </>
      ) : (
        <>
          <circle cx="40" cy="54" r="4" fill="#3D2B4E" />
          <circle cx="60" cy="54" r="4" fill="#3D2B4E" />
          <circle cx="41.5" cy="53" r="1.5" fill="white" />
          <circle cx="61.5" cy="53" r="1.5" fill="white" />
        </>
      )}
      {/* Blush */}
      <ellipse cx="32" cy="60" rx="6" ry="3.5" fill="#FFB5C8" opacity="0.5" />
      <ellipse cx="68" cy="60" rx="6" ry="3.5" fill="#FFB5C8" opacity="0.5" />
      {/* Smile */}
      {isHappy ? (
        <path d="M42 65 Q50 73 58 65" stroke="#3D2B4E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M44 67 L56 67" stroke="#3D2B4E" strokeWidth="2" strokeLinecap="round" />
      )}
      <defs>
        <linearGradient id="teenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF0F5" />
          <stop offset="50%" stopColor="#F5EEFF" />
          <stop offset="100%" stopColor="#EEE4FF" />
        </linearGradient>
        <linearGradient id="earGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5EEFF" />
          <stop offset="100%" stopColor="#E0D4FF" />
        </linearGradient>
      </defs>
    </g>
  );
}

function AdultPet({ scale, happiness }: { scale: number; happiness: number }) {
  const isHappy = happiness > 40;
  return (
    <g transform={`scale(${scale})`}>
      {/* Aura glow */}
      <circle cx="50" cy="55" r="38" fill="url(#auraGrad)" opacity="0.3" />
      {/* Body */}
      <ellipse cx="50" cy="58" rx="28" ry="26" fill="url(#adultGrad)" />
      <ellipse cx="50" cy="58" rx="28" ry="26" fill="none" stroke="url(#adultStroke)" strokeWidth="2" />
      {/* Ears */}
      <ellipse cx="28" cy="35" rx="12" ry="15" fill="url(#adultEarGrad)" stroke="url(#adultStroke)" strokeWidth="1.5" transform="rotate(-10 28 35)" />
      <ellipse cx="72" cy="35" rx="12" ry="15" fill="url(#adultEarGrad)" stroke="url(#adultStroke)" strokeWidth="1.5" transform="rotate(10 72 35)" />
      {/* Crown */}
      <path d="M36 32 L40 22 L45 30 L50 20 L55 30 L60 22 L64 32" fill="#FFD700" opacity="0.9" stroke="#FFAA00" strokeWidth="1" />
      <circle cx="50" cy="20" r="3" fill="#FF85A8" />
      <circle cx="40" cy="24" r="2" fill="#C8B5FF" />
      <circle cx="60" cy="24" r="2" fill="#C8B5FF" />
      {/* Eyes */}
      {isHappy ? (
        <>
          <path d="M36 53 Q40 49 44 53" stroke="#3D2B4E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M56 53 Q60 49 64 53" stroke="#3D2B4E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="40" cy="53" r="4.5" fill="#3D2B4E" />
          <circle cx="60" cy="53" r="4.5" fill="#3D2B4E" />
          <circle cx="42" cy="52" r="1.5" fill="white" />
          <circle cx="62" cy="52" r="1.5" fill="white" />
        </>
      )}
      {/* Blush */}
      <ellipse cx="31" cy="60" rx="7" ry="4" fill="#FFB5C8" opacity="0.5" />
      <ellipse cx="69" cy="60" rx="7" ry="4" fill="#FFB5C8" opacity="0.5" />
      {/* Smile */}
      <path d="M41 66 Q50 75 59 66" stroke="#3D2B4E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Wings */}
      <path d="M18 55 Q8 45 15 35 Q22 42 22 55" fill="#FFE4EF" stroke="#FFB5C8" strokeWidth="1" opacity="0.7" />
      <path d="M82 55 Q92 45 85 35 Q78 42 78 55" fill="#EEE4FF" stroke="#C8B5FF" strokeWidth="1" opacity="0.7" />
      <defs>
        <linearGradient id="adultGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF5F8" />
          <stop offset="50%" stopColor="#F8F0FF" />
          <stop offset="100%" stopColor="#EEE8FF" />
        </linearGradient>
        <linearGradient id="adultStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFB5C8" />
          <stop offset="100%" stopColor="#C8B5FF" />
        </linearGradient>
        <linearGradient id="adultEarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF0F5" />
          <stop offset="100%" stopColor="#E8DEFF" />
        </linearGradient>
        <radialGradient id="auraGrad">
          <stop offset="0%" stopColor="#FFB5C8" />
          <stop offset="100%" stopColor="#C8B5FF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </g>
  );
}

function SparklePet({ scale, happiness }: { scale: number; happiness: number }) {
  const isHappy = happiness > 40;
  return (
    <g transform={`scale(${scale})`}>
      {/* Rainbow aura */}
      <circle cx="50" cy="55" r="42" fill="url(#sparkleAura)" opacity="0.25" />
      <circle cx="50" cy="55" r="36" fill="url(#sparkleAuraInner)" opacity="0.15" />
      {/* Body */}
      <ellipse cx="50" cy="58" rx="28" ry="26" fill="url(#sparkleGrad)" />
      <ellipse cx="50" cy="58" rx="28" ry="26" fill="none" stroke="url(#sparkleStroke)" strokeWidth="2.5" />
      {/* Ears */}
      <ellipse cx="27" cy="34" rx="13" ry="16" fill="url(#sparkleEarGrad)" stroke="url(#sparkleStroke)" strokeWidth="1.5" transform="rotate(-12 27 34)" />
      <ellipse cx="73" cy="34" rx="13" ry="16" fill="url(#sparkleEarGrad)" stroke="url(#sparkleStroke)" strokeWidth="1.5" transform="rotate(12 73 34)" />
      {/* Jewel crown */}
      <path d="M34 30 L38 18 L44 28 L50 15 L56 28 L62 18 L66 30" fill="url(#crownGrad)" stroke="#FFAA00" strokeWidth="1.5" />
      <circle cx="50" cy="15" r="4" fill="#FF85A8" stroke="#FFAA00" strokeWidth="1" />
      <circle cx="38" cy="20" r="3" fill="#C8B5FF" stroke="#FFAA00" strokeWidth="1" />
      <circle cx="62" cy="20" r="3" fill="#85E0FF" stroke="#FFAA00" strokeWidth="1" />
      {/* Eyes — big sparkly */}
      {isHappy ? (
        <>
          <path d="M35 53 L40 48 L45 53 L40 58 Z" fill="#3D2B4E" />
          <path d="M55 53 L60 48 L65 53 L60 58 Z" fill="#3D2B4E" />
          <circle cx="41" cy="51" r="2" fill="white" />
          <circle cx="61" cy="51" r="2" fill="white" />
        </>
      ) : (
        <>
          <circle cx="40" cy="53" r="5" fill="#3D2B4E" />
          <circle cx="60" cy="53" r="5" fill="#3D2B4E" />
          <circle cx="42" cy="51.5" r="2" fill="white" />
          <circle cx="62" cy="51.5" r="2" fill="white" />
        </>
      )}
      {/* Rainbow blush */}
      <ellipse cx="30" cy="60" rx="7" ry="4" fill="url(#blushGrad)" opacity="0.6" />
      <ellipse cx="70" cy="60" rx="7" ry="4" fill="url(#blushGrad)" opacity="0.6" />
      {/* Big smile */}
      <path d="M40 66 Q50 77 60 66" stroke="#3D2B4E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Wings — bigger */}
      <path d="M16 52 Q2 38 12 25 Q18 30 20 40 Q22 48 20 55" fill="url(#wingGrad)" stroke="#FFB5C8" strokeWidth="1" opacity="0.8" />
      <path d="M84 52 Q98 38 88 25 Q82 30 80 40 Q78 48 80 55" fill="url(#wingGrad2)" stroke="#C8B5FF" strokeWidth="1" opacity="0.8" />
      {/* Sparkle particles */}
      <path d="M20 25 L21 28 L24 28.5 L21.5 30.5 L22 34 L20 32 L18 34 L18.5 30.5 L16 28.5 L19 28 Z" fill="#FFD700" />
      <path d="M78 22 L79 25 L82 25.5 L79.5 27.5 L80 31 L78 29 L76 31 L76.5 27.5 L74 25.5 L77 25 Z" fill="#FFD700" />
      <path d="M50 82 L51 84.5 L53.5 85 L51 86.5 L51.5 89 L50 87.5 L48.5 89 L49 86.5 L46.5 85 L49 84.5 Z" fill="#FFD700" opacity="0.7" />
      <defs>
        <linearGradient id="sparkleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF8FA" />
          <stop offset="50%" stopColor="#FAF0FF" />
          <stop offset="100%" stopColor="#F0F8FF" />
        </linearGradient>
        <linearGradient id="sparkleStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFB5C8" />
          <stop offset="50%" stopColor="#C8B5FF" />
          <stop offset="100%" stopColor="#85E0FF" />
        </linearGradient>
        <linearGradient id="sparkleEarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF5F8" />
          <stop offset="100%" stopColor="#E8DEFF" />
        </linearGradient>
        <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE44D" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
        <linearGradient id="blushGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFB5C8" />
          <stop offset="100%" stopColor="#C8B5FF" />
        </linearGradient>
        <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE4EF" />
          <stop offset="100%" stopColor="#FFB5C8" />
        </linearGradient>
        <linearGradient id="wingGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EEE4FF" />
          <stop offset="100%" stopColor="#C8B5FF" />
        </linearGradient>
        <radialGradient id="sparkleAura">
          <stop offset="0%" stopColor="#FFB5C8" />
          <stop offset="50%" stopColor="#C8B5FF" />
          <stop offset="100%" stopColor="#85E0FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sparkleAuraInner">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>
    </g>
  );
}

const sizeMap = { sm: 60, md: 120, lg: 180 };

export default function PetAvatar({ stage, happiness, size = "md", animate = true }: PetAvatarProps) {
  const px = sizeMap[size];
  const scale = px / 100;

  const renderPet = () => {
    switch (stage) {
      case "egg":
        return <EggPet scale={scale} />;
      case "baby":
        return <BabyPet scale={scale} happiness={happiness} />;
      case "child":
        return <ChildPet scale={scale} happiness={happiness} />;
      case "teen":
        return <TeenPet scale={scale} happiness={happiness} />;
      case "adult":
        return <AdultPet scale={scale} happiness={happiness} />;
      case "sparkle":
        return <SparklePet scale={scale} happiness={happiness} />;
    }
  };

  return (
    <motion.div
      animate={
        animate
          ? {
              y: [0, -6, 0],
            }
          : undefined
      }
      transition={
        animate
          ? {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
      className="inline-flex items-center justify-center"
      style={{ width: px, height: px }}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${100 * scale} ${100 * scale}`}
      >
        {renderPet()}
      </svg>
    </motion.div>
  );
}
