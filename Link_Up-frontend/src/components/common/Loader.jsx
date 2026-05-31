/**
 * Loader — reusable spinner component
 *
 * Props:
 *   size  : 'sm' | 'md' | 'lg'  (default: 'md')
 *   full  : boolean              (default: false) — centres loader in full viewport
 *   label : string               (optional) — accessible screen-reader label
 */

const sizes = {
  sm: { box: 18, stroke: 2 },
  md: { box: 36, stroke: 3 },
  lg: { box: 56, stroke: 4 },
};

export default function Loader({ size = 'md', full = false, label = 'Loading…' }) {
  const { box, stroke } = sizes[size] ?? sizes.md;

  const spinner = (
    <span
      role="status"
      aria-label={label}
      style={{
        display:       'inline-block',
        width:         box,
        height:        box,
        borderRadius:  '50%',
        border:        `${stroke}px solid rgba(108, 99, 255, 0.2)`,   /* --primary dimmed */
        borderTopColor: 'var(--primary, #6c63ff)',
        animation:     'lu-spin 0.7s linear infinite',
        flexShrink:    0,
      }}
    />
  );

  if (full) {
    return (
      <div
        style={{
          position:       'fixed',
          inset:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          background:     'rgba(26, 26, 46, 0.55)',   /* --foreground dimmed */
          backdropFilter: 'blur(4px)',
          zIndex:         9999,
        }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}
