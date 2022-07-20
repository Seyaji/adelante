export default function changeTheme(theme: string): string {

    const colors = {
      dark: {
        main: '#0A0613',
        secondary: '#36113C',
        heading: '#BD2C5C',
        font: '#FECF6A',
        extra: '#E96559',
      },
      light: {
        main: '#FDFDFC',
        heading: '#4B4367',
        secondary: '#8781AA',
        font: '#0A0613',
        extra: '#4252BB',
      }
    }
  
    if (theme === 'light') {
      const root = document.documentElement;
      root.style.setProperty("--main-color", colors.dark.main);
      root.style.setProperty("--secondary-color", colors.dark.secondary);
      root.style.setProperty("--heading-color", colors.dark.heading);
      root.style.setProperty("--font-color", colors.dark.font);
      root.style.setProperty("--extra-color", colors.dark.extra);
      return 'dark';
    }
  
    if (theme === 'dark') {
      const root = document.documentElement;
      root.style.setProperty("--main-color", colors.light.main);
      root.style.setProperty("--secondary-color", colors.light.secondary);
      root.style.setProperty("--heading-color", colors.light.heading);
      root.style.setProperty("--font-color", colors.light.font);
      root.style.setProperty("--extra-color", colors.light.extra);
      return 'light';
    }
    else {
      console.log("theme-error")
      return 'dark'
    }
  }