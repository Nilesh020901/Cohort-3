# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Frontend of the project:

1.Landing page
2.lgin & signup page
3.home page
4.hotel and specification view page 
4.booking page
5.profile page
6.admin dashboard

Navabar or header and footer same on every pages but not include on login & signup page

src/
├── assets/                 # Images, icons, etc.
├── components/             # Reusable UI components (Navbar, Footer, Cards)
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ...
├── layouts/                # Page wrappers with/without layout
│   ├── MainLayout.jsx      # Includes Navbar & Footer
│   └── AuthLayout.jsx      # No Navbar/Footer
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Home.jsx
│   ├── HotelView.jsx
│   ├── Booking.jsx
│   ├── Profile.jsx
│   └── AdminDashboard.jsx
├── routes/
│   └── AppRoutes.jsx       # Centralized routing with layout switching
├── services/
│   └── api.js              # Axios setup
├── App.jsx
├── main.jsx
└── index.css               # Tailwind imports
