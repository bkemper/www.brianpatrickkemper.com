import { useCallback, useEffect, useRef } from "react";

const STRENGTH = 0.32;
const RESET_MS = 200;

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
      className="inline-flex border border-accent bg-accent px-8 py-3.5 text-sm font-semibold tracking-wide text-accent-ink will-change-transform shadow-[0_14px_36px_-10px_hsl(16_62%_46%_/_0.5)] transition-[background-color,border-color,box-shadow] duration-300 ease-out hover:bg-night hover:border-night hover:text-day hover:shadow-none focus-visible:bg-night focus-visible:border-night focus-visible:text-day active:scale-[0.98] dark:hover:bg-day dark:hover:border-day dark:hover:text-night dark:focus-visible:bg-day dark:focus-visible:border-day dark:focus-visible:text-night"
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
