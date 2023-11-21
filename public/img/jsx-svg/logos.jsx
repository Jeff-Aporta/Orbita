function Logo({ className, w }) {
  return (
    <svg width={`${w}px`} height={`${w}px`} viewBox={`0 0 ${w} ${w}`} version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect x="0" y="0" rx={`${w * 0.3}`} ry={`${w * 0.3}`} width="100%" height="100%" fill="#FFFFFF" />
        <circle cx="60%" cy="60%" r={`${w * 0.3}`} fill="blue" />
        <circle cx="40%" cy="40%" r={`${w * 0.2}`} fill="rgba(0,255,2555,0.5)" />
      </g>
    </svg>
  );
}