export default function Loading() {
  return (
    <main
      aria-label="در حال بارگذاری"
      className="flex min-h-screen items-center justify-center bg-[#fbf8f2]"
    >
      <svg
        className="sonic-loader"
        x="0px"
        y="0px"
        viewBox="0 0 50 31.25"
        height="31.25"
        width="50"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path
          className="track"
          strokeWidth="4"
          fill="none"
          pathLength="100"
          d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
        />
        <path
          className="car"
          strokeWidth="4"
          fill="none"
          pathLength="100"
          d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
        />
      </svg>

      <style>{`
        .sonic-loader {
          --uib-color: #183a5c;
          --uib-speed: 1.75s;
          --uib-bg-opacity: .1;
          height: 31.25px;
          width: 50px;
          transform-origin: center;
          overflow: visible;
        }

        .sonic-loader .car {
          stroke: var(--uib-color);
          stroke-dasharray: 100;
          stroke-dashoffset: 0;
          stroke-linecap: round;
          stroke-linejoin: round;
          animation:
            sonic-travel var(--uib-speed) ease-in-out infinite,
            sonic-fade var(--uib-speed) ease-out infinite;
          will-change: stroke-dasharray, stroke-dashoffset, opacity;
        }

        .sonic-loader .track {
          stroke: var(--uib-color);
          stroke-linecap: round;
          stroke-linejoin: round;
          opacity: var(--uib-bg-opacity);
        }

        @keyframes sonic-travel {
          0% { stroke-dashoffset: 100; }
          75% { stroke-dashoffset: 0; }
        }

        @keyframes sonic-fade {
          0% { opacity: 0; }
          20%, 55% { opacity: 1; }
          100% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sonic-loader .car {
            animation: none;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
