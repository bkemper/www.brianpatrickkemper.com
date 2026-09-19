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
      className="inline-flex border border-night bg-transparent px-7 py-3 text-sm font-medium tracking-wide text-night will-change-transform transition-colors duration-500 ease-out hover:bg-night hover:text-day focus-visible:bg-night focus-visible:text-day active:scale-[0.98] dark:border-day dark:text-day dark:hover:bg-day dark:hover:text-night dark:focus-visible:bg-day dark:focus-visible:text-night"
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
