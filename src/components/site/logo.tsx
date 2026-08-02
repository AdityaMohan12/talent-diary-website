/**
 * Talent Diary wordmark: "TALENT" over "DIARY", with the A of TALENT replaced
 * by the brand's blue bookmark glyph (rounded top, V-notched foot). Pure markup
 * (no hooks) so it renders in both the client nav and the server footer.
 */
export function Logo({ tone = "ink" }: { tone?: "ink" | "on-blue" }) {
  return (
    <span className={`logo-lock logo-lock--${tone}`}>
      <span className="logo-row">
        T
        <svg
          className="logo-bk"
          viewBox="0 0 36 49"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 12 a8 8 0 0 1 8 -8 h12 a8 8 0 0 1 8 8 v33 l-14 -8 l-14 8 z"
            fill="#1d18e6"
          />
        </svg>
        LENT
      </span>
      <span className="logo-row">DIARY</span>
      <span className="sr-only">Talent Diary</span>
    </span>
  );
}
