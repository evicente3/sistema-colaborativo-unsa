/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F6FED',
        'on-primary': '#FFFFFF',
        surface: '#F5F8FF',
        'surface-card': '#FFFFFF',
        border: '#E3E9F5',
        'text-main': '#1E2A44',
        'text-muted': '#5B6784',
        'progress-track': '#E1EAFB',
        'status-pending': '#7B8AA8',
        'status-pending-soft': '#EEF1F7',
        'status-pending-text': '#4A5873',
        'status-progress': '#2F6FED',
        'status-progress-soft': '#E6EEFF',
        'status-progress-text': '#1F4FBF',
        'status-blocked': '#F59E0B',
        'status-blocked-soft': '#FEF3DC',
        'status-blocked-text': '#8A5300',
        'status-help': '#8B5CF6',
        'status-help-soft': '#EFE8FE',
        'status-help-text': '#5B34C7',
        'status-done': '#22A06B',
        'status-done-soft': '#E1F5EC',
        'status-done-text': '#14663F',
        'alert-late': '#E5484D',
        'alert-late-soft': '#FDECEC',
        'alert-late-text': '#B3282D',
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        control: '8px',
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(30, 42, 68, 0.06), 0 1px 3px -1px rgba(30, 42, 68, 0.04)',
      },
    },
  },
  plugins: [],
}
