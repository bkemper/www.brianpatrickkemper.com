import { useCallback, useEffect, useRef } from "react";

const STRENGTH = 0.28;
const RESET_MS = 180;

const MagneticConnect = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef(0);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame.current);
      el.style.transition = `transform ${RESET_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      reset();
      window.setTimeout(() => {
        if (el) el.style.transition = "";
      }, RESET_MS);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reset]);

  return (
    <a
      className="inline-flex border border-night bg-transparent px-7 py-3 text-sm font-medium tracking-wide text-night will-change-transform transition-[color,background-color,border-color] duration-300 ease-out hover:border-accent hover:bg-accent hover:text-accent-ink focus-visible:border-accent focus-visible:bg-accent focus-visible:text-accent-ink active:scale-[0.98] dark:border-day dark:text-day dark:hover:border-accent dark:hover:bg-accent dark:hover:text-accent-ink dark:focus-visible:border-accent dark:focus-visible:bg-accent dark:focus-visible:text-accent-ink"
      href="//www.linkedin.com/in/brianpatrickkemper/"
      ref={ref}
      rel="noopener noreferrer"
      target="_blank"
    >
      Connect
    </a>
  );
};

export default MagneticConnect;
