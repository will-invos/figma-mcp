/** Icon components for auth pages. Generic icons use the icon font;
 *  brand icons (Google, Apple, LINE) keep inline SVG for multi-color fills. */

export const ArrowLeftIcon = () => (
  <i className="icon-chevron-left" aria-hidden="true" />
)

export const EyeIcon = () => (
  <i className="icon-eye" aria-hidden="true" />
)

export const EyeOffIcon = () => (
  <i className="icon-eye-off" aria-hidden="true" />
)

export const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19.6 10.23c0-.68-.06-1.36-.19-2.02H10v3.83h5.4a4.62 4.62 0 0 1-2 3.03v2.52h3.24c1.9-1.75 2.96-4.33 2.96-7.36z" fill="#4285F4" />
    <path d="M10 20c2.7 0 4.97-.89 6.63-2.41l-3.24-2.52c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.75-5.6-4.11H1.07v2.6A10 10 0 0 0 10 20z" fill="#34A853" />
    <path d="M4.4 11.92c-.2-.6-.32-1.25-.32-1.92s.12-1.31.32-1.92V5.48H1.07A10 10 0 0 0 0 10c0 1.6.39 3.15 1.07 4.52l3.33-2.6z" fill="#FBBC05" />
    <path d="M10 3.96c1.47 0 2.8.5 3.84 1.5l2.87-2.87A10 10 0 0 0 10 0 10 10 0 0 0 1.07 5.48l3.33 2.6C5.2 5.71 7.4 3.96 10 3.96z" fill="#EA4335" />
  </svg>
)

export const AppleIcon = () => (
  <i className="icon-apple" aria-hidden="true" />
)

export const LineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19 8.62c0-4.04-4.04-7.33-9-7.33s-9 3.3-9 7.33c0 3.62 3.2 6.65 7.52 7.23.29.06.69.19.79.44.09.22.06.57.03.8l-.13.76c-.04.23-.18.89.78.49s5.18-3.05 7.06-5.23c1.3-1.42 1.92-2.87 1.92-4.49z" fill="#06C755" />
    <path d="M16.09 10.96h-2.53a.17.17 0 0 1-.17-.17V6.85a.17.17 0 0 1 .17-.17h2.53a.17.17 0 0 1 .17.17v.64a.17.17 0 0 1-.17.17h-1.72v.67h1.72a.17.17 0 0 1 .17.17v.64a.17.17 0 0 1-.17.17h-1.72v.67h1.72a.17.17 0 0 1 .17.17v.64a.17.17 0 0 1-.17.17zm-3.51 0a.17.17 0 0 1-.17-.17V6.85a.17.17 0 0 1 .17-.17h.64a.17.17 0 0 1 .17.17v3.94a.17.17 0 0 1-.17.17h-.64zm-1.2 0h-.64a.17.17 0 0 1-.14-.07l-1.67-2.25v2.15a.17.17 0 0 1-.17.17h-.64a.17.17 0 0 1-.17-.17V6.85a.17.17 0 0 1 .17-.17h.64a.17.17 0 0 1 .14.07l1.67 2.25V6.85a.17.17 0 0 1 .17-.17h.64a.17.17 0 0 1 .17.17v3.94a.17.17 0 0 1-.17.17zm-4.17 0h-2.53a.17.17 0 0 1-.17-.17V6.85a.17.17 0 0 1 .17-.17h.64a.17.17 0 0 1 .17.17v3.13h1.72a.17.17 0 0 1 .17.17v.64a.17.17 0 0 1-.17.17z" fill="#FFF" />
  </svg>
)
