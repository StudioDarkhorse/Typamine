import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SeventiesThemeToggle } from '@/components/common/SeventiesThemeToggle';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  logoSlot?: React.ReactNode;
  headerExtra?: React.ReactNode;
  headerHidden?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}



export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#ff3131', '#00cece'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',
  logoSlot,
  headerExtra,
  headerHidden = false,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#ffffff',
  changeMenuColorOnOpen = true,
  accentColor = '#ff3131',
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const toggleMenu = useCallback(() => {
    const nextState = !openRef.current;
    openRef.current = nextState;
    setOpen(nextState);

    if (nextState) {
      onMenuOpen?.();
    } else {
      onMenuClose?.();
    }
  }, [onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
    }
  }, [onMenuClose]);

  // Gestione tasto ESC e click outside per chiudere il menu
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnClickAway &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, closeOnClickAway, closeMenu]);

  const buttonColor = open && changeMenuColorOnOpen
    ? (openMenuButtonColor || menuButtonColor)
    : menuButtonColor;


  return (
    <div
      className={`sm-scope z-40 ${isFixed ? 'fixed left-0 w-screen overflow-hidden pointer-events-none' : 'w-full h-full'}`}
      style={isFixed ? { top: "var(--marquee-offset, 0px)", height: "calc(100dvh - var(--marquee-offset, 0px))" } : undefined}
    >
      <div
        className={
          (className ? className + ' ' : '') + 'staggered-menu-wrapper pointer-events-none relative w-full h-full z-40'
        }
        style={{
          '--sm-accent': accentColor,
          '--sm-bg-color': 'var(--background, #13100F)',
        } as React.CSSProperties}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Layer di sfondo a cascata (Pre-layers) */}
        <div
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#ff3131', '#00cece'];
            return raw.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        {/* Header principale (Logo + ThemeToggle + Oreo Menu Button) */}
        <header
          ref={headerRef}
          className={`staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between pt-8 px-16 pb-16 bg-transparent pointer-events-none z-20 transition-transform duration-300 ease-in-out ${
            headerHidden && !open ? '-translate-y-full' : 'translate-y-0'
          }`}
          aria-label="Main navigation header"
        >
          <div
            className={`sm-logo flex items-center select-none pointer-events-auto transition-opacity duration-300 ${
              open ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Logo"
          >
            {logoSlot ?? (
              <img
                src={logoUrl || '/src/assets/logos/reactbits-gh-white.svg'}
                alt="Logo"
                className="sm-logo-img block h-8 w-auto object-contain"
                draggable={false}
                width={110}
                height={24}
              />
            )}
          </div>

          <div className="flex items-center gap-3 mb-4">
            {headerExtra && <div className="flex items-center pointer-events-auto">{headerExtra}</div>}

            <button
              ref={toggleBtnRef}
              className="sm-toggle relative inline-flex items-center justify-center w-9 h-9 bg-transparent border-0 cursor-pointer pointer-events-auto select-none rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 focus-visible:outline-offset-4 leading-none overflow-visible"
              style={{ color: buttonColor }}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              onClick={toggleMenu}
              type="button"
            >
              {/* Contenitore nav-icon-1 con 9 punti (3x3 grid) */}
              <div className={`nav-icon-1 ${open ? "open" : ""}`}>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
        </header>

        {/* Pannello menu laterale */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-white dark:bg-black flex flex-col p-[6em_2em_2em_2em] max-lg:pb-[1.5rem] overflow-y-auto z-10 backdrop-blur-[16px] pointer-events-auto"
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none mt-8 mx-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                    <a
                      className="sm-panel-item relative text-black dark:text-white font-semibold text-[3.5rem] sm:text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[2.2em]"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      onClick={closeMenu}
                    >
                      <span className="sm-panel-itemLabel inline-block">
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                  <span className="sm-panel-item relative text-black dark:text-white font-semibold text-[3.5rem] sm:text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[2.2em]">
                    <span className="sm-panel-itemLabel inline-block">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {/* Theme Toggle (non-minimizzato, posizionato in basso rispetto alla lista dei link) */}
            <div
              className={`w-full mt-auto pt-4 border-t border-black/10 dark:border-white/10 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open
                  ? "opacity-100 translate-y-0 delay-[560ms]"
                  : "opacity-0 translate-y-4 duration-0"
              }`}
            >
              <SeventiesThemeToggle variant="full" size={32} />
            </div>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#ff3131)]">Socials</h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-[1.2rem] font-medium text-black dark:text-white no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Stili CSS per la coreografia dell'icona (3D Flip + Traslazione Y) e animazioni menu */}
      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; pointer-events: none; }
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 2em; background: transparent; pointer-events: none; z-index: 20; }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
.sm-scope .sm-logo-img { display: block; height: 32px; width: auto; object-fit: contain; }

/* nav-icon-1 */
.sm-scope .nav-icon-1 {
  width: 30px;
  height: 30px;
  position: relative;
  transition: transform 0.2s cubic-bezier(0.8, 0.5, 0.2, 1.4), color 0.3s ease;
  cursor: pointer;
  display: inline-block;
}
.sm-scope .nav-icon-1.open {
  transform: rotate(180deg);
}
.sm-scope .nav-icon-1 span {
  width: 5px;
  height: 5px;
  background-color: currentColor;
  display: block;
  border-radius: 50%;
  position: absolute;
  transition: 
    left 0.35s cubic-bezier(0.8, 0.5, 0.2, 1.4) 0s,
    top 0.35s cubic-bezier(0.8, 0.5, 0.2, 1.4) 0s,
    right 0.35s cubic-bezier(0.8, 0.5, 0.2, 1.4) 0s,
    bottom 0.35s cubic-bezier(0.8, 0.5, 0.2, 1.4) 0s,
    transform 0.35s cubic-bezier(0.8, 0.5, 0.2, 1.4) 0s,
    background-color 0.3s ease 0s;
}
.sm-scope .nav-icon-1:hover span {
  transform: scale(1.2);
  transition: transform 0.35s cubic-bezier(0.8, 0.5, 0.2, 1.4);
}
.sm-scope .nav-icon-1 span:nth-child(1) { left: 0; top: 0; }
.sm-scope .nav-icon-1 span:nth-child(2) { left: 12px; top: 0; }
.sm-scope .nav-icon-1 span:nth-child(3) { right: 0; top: 0; }
.sm-scope .nav-icon-1 span:nth-child(4) { left: 0; top: 12px; }
.sm-scope .nav-icon-1 span:nth-child(5) { left: 12px; top: 12px; }
.sm-scope .nav-icon-1 span:nth-child(6) { right: 0; top: 12px; }
.sm-scope .nav-icon-1 span:nth-child(7) { left: 0; bottom: 0; }
.sm-scope .nav-icon-1 span:nth-child(8) { left: 12px; bottom: 0; }
.sm-scope .nav-icon-1 span:nth-child(9) { right: 0; bottom: 0; }

.sm-scope .nav-icon-1.open span {
  transition: 
    left 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4) 0.2s,
    top 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4) 0.2s,
    right 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4) 0.2s,
    bottom 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4) 0.2s,
    transform 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4) 0.2s,
    background-color 0.3s ease 0s;
}
.sm-scope .nav-icon-1.open span:nth-child(2) { left: 6px; top: 6px; }
.sm-scope .nav-icon-1.open span:nth-child(4) { left: 6px; top: 18px; }
.sm-scope .nav-icon-1.open span:nth-child(6) { right: 6px; top: 6px; }
.sm-scope .nav-icon-1.open span:nth-child(8) { left: 18px; bottom: 6px; }



/* Prelayers (sfondi a cascata colorati) */
.sm-scope .sm-prelayers {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: clamp(260px, 38vw, 420px);
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  transform: translateX(100%);
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.sm-scope [data-position='left'] .sm-prelayer { transform: translateX(-100%); }
.sm-scope .staggered-menu-wrapper[data-open] .sm-prelayer { transform: translateX(0%); }
.sm-scope .staggered-menu-wrapper[data-open] .sm-prelayer:nth-child(1) { transition-delay: 0s; }
.sm-scope .staggered-menu-wrapper[data-open] .sm-prelayer:nth-child(2) { transition-delay: 0.05s; }
.sm-scope .staggered-menu-wrapper[data-open] .sm-prelayer:nth-child(3) { transition-delay: 0.10s; }

/* Panel principale */
.sm-scope .staggered-menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: clamp(260px, 38vw, 420px);
  height: 100%;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  padding: 6em 2em 2em 2em;
  overflow-y: auto;
  z-index: 10;
  transform: translateX(100%);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; transform: translateX(-100%); }
.sm-scope .staggered-menu-wrapper[data-open] .staggered-menu-panel {
  transform: translateX(0%);
  transition-delay: 0.08s;
}

/* Animazione a cascata degli elementi di testo */
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-panel-list { list-style: none; margin: 2rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.sm-scope .sm-panel-item {
  position: relative;
  font-weight: 600;
  font-size: clamp(2.2rem, 8vw, 4rem);
  cursor: pointer;
  line-height: 1;
  letter-spacing: -2px;
  text-transform: uppercase;
  transition: background 0.25s, color 0.25s;
  display: inline-block;
  text-decoration: none;
  padding-right: 2.2em;
}

.sm-scope .sm-panel-itemLabel {
  display: inline-block;
  will-change: transform, opacity;
  transform: translateY(120%) rotate(6deg);
  opacity: 0;
  transform-origin: 0% 100%;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
}
.sm-scope .staggered-menu-wrapper[data-open] .sm-panel-itemLabel {
  transform: translateY(0%) rotate(0deg);
  opacity: 1;
}

.sm-scope .staggered-menu-wrapper[data-open] .sm-panel-itemWrap:nth-child(1) .sm-panel-itemLabel { transition-delay: 0.20s; }
.sm-scope .staggered-menu-wrapper[data-open] .sm-panel-itemWrap:nth-child(2) .sm-panel-itemLabel { transition-delay: 0.26s; }
.sm-scope .staggered-menu-wrapper[data-open] .sm-panel-itemWrap:nth-child(3) .sm-panel-itemLabel { transition-delay: 0.32s; }
.sm-scope .staggered-menu-wrapper[data-open] .sm-panel-itemWrap:nth-child(4) .sm-panel-itemLabel { transition-delay: 0.38s; }
.sm-scope .staggered-menu-wrapper[data-open] .sm-panel-itemWrap:nth-child(5) .sm-panel-itemLabel { transition-delay: 0.44s; }
.sm-scope .staggered-menu-wrapper[data-open] .sm-panel-itemWrap:nth-child(6) .sm-panel-itemLabel { transition-delay: 0.50s; }

.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff3131); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem;
  content: counter(smItem, decimal-leading-zero);
  position: absolute;
  top: 0.15em;
  right: 0.3em;
  font-size: 18px;
  font-weight: 400;
  color: var(--sm-accent, #ff3131);
  letter-spacing: 0;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.sm-scope .staggered-menu-wrapper[data-open] .sm-panel-list[data-numbering] .sm-panel-item::after {
  opacity: 1;
  transition-delay: 0.35s;
}

/* Social links */
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; color: var(--sm-accent, #ff3131); }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease, color 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #ff3131); outline-offset: 3px; }
.sm-scope .sm-socials-link { font-size: 1.2rem; font-weight: 500; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff3131); }

@media (max-width: 1024px) {
  .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; padding-bottom: 1.5rem; }
  .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img { filter: invert(100%); }
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
