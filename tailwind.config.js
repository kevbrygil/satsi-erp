/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/**/*.{js,ts,tsx}', "./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
      },
      borderColor: {
      },
      backgroundColor: {
      },
      colors: {
        'app-primary': '#001446',
        'app-secondary': '#02437B',
        'app-tertiary': '#028BBF',
        'app-quaternary': '#98CBDC',
        'app-quinary': '#D8E9F0',
      },
      flex: {
        'app-1': '1',
      },
      height: {
        '1/10': '10%',
        '2/40': '5%',
        '9/20': '45%'
      },
      padding: {
        'app-14': '0.875rem'
      },

      minHeight: {
        'app-5': '5%',
        'app-10': '10%',
        'app-15': '15%',
        'app-20': '20%',
        'app-25': '25%',
        'app-30': '30%',
        'app-35': '35%',
        'app-40': '40%',
        'app-45': '45%',
        'app-50': '50%',
        'app-55': '55%',
        'app-60': '60%',
        'app-65': '65%',
        'app-70': '70%',
        'app-75': '75%',
        'app-80': '80%',
        'app-85': '85%',
        'app-90': '90%',
        'app-95': '95%',
        'app-100': '100%',
      },
      maxHeight: {
        'app-5': '40%',
        'app-50': '50%',
        'app-60': '60%',
        'app-70': '70%',
        'app-80': '80%',
        'app-90': '90%',
        'app-100': '100%',
      },
      fontSize: {
        'app-4xl': ['2.25rem', '2.5rem']
      },
      lineHeight: {
        'app-140': '140%'
      },
      margin: {
        'app-.5px': '0.03125rem',
        'app-.6px': '0.0375rem',
        'app-.7px': '0.04375rem',
        'app-.8px': '0.05rem',
        'app-.9px': '0.05625rem',
        'app-1px': '0.0625rem',
        'app-1.5px': '0.09375rem',
        'app-2px': '0.125rem',
        'app-3px': '0.1875rem',
        'app-4px': '0.25rem',
        'app-5px': '0.3125rem',
      },

    }
  },
  plugins: [],
};
