import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
            // toast enter and leave animation
      animation: {
        enter: "enter 300ms ease-out",
        leave: "leave 300ms ease-in forwards"
      },
      keyframes: {
        enter: {
          "0%": {
            opacity: "0",
            transform: "scale(.9)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        },
        leave: {
          "0%": {
            opacity: "1",
            transform: "scale(1)"
          },
          "100%": {
            opacity: "0",
            transform: "scale(.9)"
          }
        }
      },
      // shadow
      boxShadow: {
        light: "0 4px 16px 0 rgba(0, 0, 0, 0.1)",
        modal: "0 8px 24px 0px rgba(0, 0, 0, 0.16)",
        header: "0 16px 8px 0 rgba(255, 255, 255, 0.5)",
        footer: "0 -16px 8px 0 rgba(255, 255, 255, 0.5)"
      },
      // Pretendard font 추가
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      // Typography Text Style
      fontSize: {
        display: "40px",
        heading1: "32px",
        heading2: "24px",
        heading3: "22px",
        heading4: "18px",
        body1: "16px",
        body2: "14px",
        body3: "13px",
        caption1: "12px",
        caption2: "11px"
      },
      letterSpacing: {
        display: "-0.01em",
        heading1: "-0.01em",
        heading2: "-0.01em",
        heading3: "-0.01em",
        heading4: "-0.01em",
        body1: "-0.01em",
        body2: "-0.01em",
        body3: "-0.01em",
        caption1: "-0.01em",
        caption2: "-0.01em"
      },
      fontWeight: {
        semibold: "600",
        medium: "500",
        regular: "400"
      },
      lineHeight: {
        display: "1.3em",
        heading1: "1.25em",
        heading2: "1.3em",
        heading3: "1.3em",
        heading4: "1.4em",
        body1: "1.5em",
        body2: "1.5em",
        body3: "1.4em",
        caption1: "1.35em",
        caption2: "1.3em"
      }
    },
    // Color Palette
    colors: {
      static: {
        white: "#ffffff",
        black: "#000000"
      },
      gray: {
        50: "#F8F9FA",
        100: "#F1F3F5",
        150: "#E9ECEF",
        200: "#DEE2E6",
        300: "#CED4DA",
        400: "#ADB5BD",
        500: "#868E96",
        600: "#5E656C",
        700: "#495057",
        800: "#343A40",
        900: "#212529",
        950: "#171719"
      },
      red: {
        50: "#FEF4F4",
        100: "#FCE8E8",
        150: "#FACAC7",
        200: "#F7A7A3",
        300: "#FF8680",
        400: "#FF6E66",
        500: "#FF5248",
        600: "#FB3E34",
        700: "#E03C33",
        800: "#BA3028",
        900: "#90302A"
      },
      green: {
        50: "#E6F9EA",
        100: "#D7F5DD",
        150: "#C3F0CB",
        200: "#9BE7AA",
        300: "#6BDE86",
        400: "#3BD569",
        500: "#00C94A",
        600: "#01C043",
        700: "#04AF38",
        800: "#029227",
        900: "#00731E"
      },
      blue: {
        50: "#F2F9FF",
        100: "#EAF2FE",
        150: "#D7E7FF",
        200: "#9FD4FF",
        300: "#6DBDFF",
        400: "#45A7F9",
        500: "#2097F6",
        600: "#1E85EF",
        700: "#1B6FD4",
        800: "#1650B4",
        900: "#1C468E"
      },
      orange: {
        50: "#FEF3E0",
        100: "#FFECCA",
        150: "#FEDFB2",
        200: "#FFD18B",
        300: "#FFC165",
        400: "#FFAE35",
        500: "#FFA117",
        600: "#FF9001",
        700: "#F17B00",
        800: "#DF6501",
        900: "#BB5500"
      },
      background: {
        base: {
          light: "#F8F9FA",
          dark: "#171719"
        },
        surface: {
          light: "#FFFFFF",
          dark: "#212529"
        },
        elevated: {
          light: "#FFFFFF",
          dark: "#343A40"
        },
        disabled: {
          light: "#F8F9FA",
          dark: "#212529"
        },
        base_inverse: {
          light: "#212529",
          dark: "#F8F9FA"
        },
        scrim: {
          light: "#00000066",
          dark: "#000000CC"
        }
      },
      border: {
        default: {
          light: "#CED4DA",
          dark: "#5E656C"
        },
        active: {
          light: "#495057",
          dark: "#E9ECEF"
        },
        disabled: {
          light: "#DEE2E6",
          dark: "#495057"
        },
        default_inverse: {
          light: "#FFFFFF",
          dark: "#000000"
        }
      },
      content: {
        primary: {
          light: "#212529",
          dark: "#F8F9FA"
        },
        secondary: {
          light: "#5E656C",
          dark: "#E9ECEF"
        },
        tertiary: {
          light: "#868E96",
          dark: "#868E96"
        },
        alternative: {
          light: "#ADB5BD",
          dark: "#5E656C"
        },
        disabled: {
          light: "#CED4DA",
          dark: "#495057"
        },
        on_color: {
          light: "#FFFFFF",
          dark: "#FFFFFF"
        }
      },
      accent: {
        primary: {
          light: "#1E85EF",
          dark: "#2097F6"
        },
        light: {
          light: "#EAF2FE",
          dark: "#F2F9FF"
        },
        disabled: {
          light: "#9FD4FF",
          dark: "#D7E7FF"
        }
      },
      state: {
        positive: {
          light: "#01C043",
          dark: "#00C94A"
        },
        positive_light: {
          light: "#D7F5DD",
          dark: "#E6F9EA"
        },
        positive_disabled: {
          light: "#9BE7AA",
          dark: "#C3F0CB"
        },
        warning: {
          light: "#FF9001",
          dark: "#FFA117"
        },
        warning_light: {
          light: "#FFECCA",
          dark: "#FEF3E0"
        },
        warning_disabled: {
          light: "#FFD18B",
          dark: "#FEDFB2"
        },
        negative: {
          light: "#FB3E34",
          dark: "#FF5248"
        },
        negative_light: {
          light: "#FCE8E8",
          dark: "#FEF4F4"
        },
        negative_disabled: {
          light: "#F7A7A3",
          dark: "#FACAC7"
        }
      }
    },
  },
  plugins: [],
};
export default config;
