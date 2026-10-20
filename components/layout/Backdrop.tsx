/**
 * The page ground: three slow luminous color fields behind all the glass.
 * Pure CSS (see `.backdrop` in globals.css) — no JS, no WebGL, and the drift
 * stops under prefers-reduced-motion.
 */
export default function Backdrop() {
  return (
    <div aria-hidden className="backdrop">
      <div className="backdrop__field backdrop__field--a" />
      <div className="backdrop__field backdrop__field--b" />
      <div className="backdrop__field backdrop__field--c" />
    </div>
  );
}
