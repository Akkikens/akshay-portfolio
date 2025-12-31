 <div align="center">
  <img alt="Logo" src="https://user-images.githubusercontent.com/62770500/199333052-3cd38b31-7e77-4883-a1ff-a037afcc0492.png" width="100" />
</div>

<h1 align="center">AkshayKalapgar.com - v1</h1>

<p align="center">
  The first iteration of <a href="https://akshaykalapgar.com" target="_blank">AkshayKalapgar.com</a>, built with <a href="https://nextjs.org/" target="_blank">Next.js</a> and hosted on <a href="https://vercel.com/" target="_blank">Vercel</a>.
</p>

<p align="center">
  <a href="https://akshaykalapgar.com" target="_blank">
    <img src="https://raw.githubusercontent.com/DataDog/integrations-extras/master/vercel/images/logo-full-black.png" width="100" alt="Vercel Status" />
  </a>
</p>

## 🚀 About This Repository

I’m excited to see my portfolio gaining traction, inspiring developers worldwide. This repository contains the full source code for my website, which you’re welcome to use for your own projects. If you do, a credit link back would be greatly appreciated! 😊

### 🔥 Unique Features
- **Fully responsive** design built with **Tailwind CSS**
- **Framer Motion** animations for smooth transitions
- **Next.js** for optimal **SEO** and **performance**
- **Custom "This website can't be reached" trick** for a playful user experience
- **Open-source** with a modular and scalable structure

**Note:** While some design inspiration comes from Anaflous Abdellatif’s portfolio, all code has been written from scratch.

## 📌 Table of Contents
- [Description](#description)
- [Technologies & Libraries](#technologies--libraries)
- [Installation & Setup](#installation--setup)
- [Building for Production](#building-for-production)
- [API Endpoints](#api-endpoints)
- [Color Palette](#color-palette)
- [License](#license)
- [Author](#author)

## 📝 Description
This portfolio serves as a personal space to showcase my projects, skills, and experience. I chose **Next.js** for its **server-side rendering (SSR)**, which enhances **SEO** and improves page load times. Styling is managed with **Tailwind CSS**, ensuring a visually appealing, responsive layout with minimal effort.

---

## 💡 Technologies & Libraries
This project utilizes the following tools and libraries:

- **Next.js** (React Framework)
- **TypeScript** (Strongly typed JavaScript)
- **Tailwind CSS** (Utility-first styling)
- **Framer Motion** (Smooth animations)
- **Google API** (Geolocation services)
- **Node.js** (Backend functionalities)
- **Vercel Analytics** (Performance monitoring)

For additional dependencies, refer to the [`package.json`](package.json) file.
## Sponsor Me
If you appreciate my work, consider sponsoring me on GitHub!

[[Sponsor](https://github.com/sponsors/Akkikens)]

---

## 🛠 Installation & Setup

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Akkikens/akshay-portfolio.git
   ```

2. **Install Node.js via NVM (Recommended):**
   ```sh
   nvm install
   ```

3. **Install dependencies:**
   ```sh
   yarn
   ```

4. *(Optional)*: Create a `.env` file for environment variables:
   ```sh
   touch .env
   ```

5. *(Optional)*: Add your Google API key inside `.env`:
   ```sh
   NEXT_PUBLIC_KEY_GOOGLE_API="your-api-key"
   ```
   **Note:** Not adding a Google API key may cause incorrect or missing zip codes in the geolocation service.

6. **Start the development server:**
   ```sh
   yarn dev
   ```

---

## 🚀 Building for Production

To generate and preview the production build:

1. **Generate a static build:**
   ```sh
   yarn build
   ```
2. **Preview the site before deployment:**
   ```sh
   yarn run serve
   ```

---

## 🔗 API Endpoints

### 📍 Endpoint 1: Get User Info by IP
Returns a JSON object with details about the provided IP address.
```api
/api/userInfoByIP/[IP-Address]
```
**Example:**
```api
/api/userInfoByIP/159.89.173.104
```
**Response:**
```json
{
  "zip": "560002",
  "country": "India",
  "city": "Bengaluru",
  "isp": "DigitalOcean, LLC",
  "timezone": "Asia/Kolkata"
}
```

### 📍 Endpoint 2: Get Zip Code by Latitude & Longitude
Returns the postal code for the given coordinates.
```api
/api/userInfoByLatLon/[lat]/[lon]
```
**Example:**
```api
/api/userInfoByLatLon/12.9634/77.5855
```
**Response:**
```json
{"zipcode": "56998"}
```

### 📍 Endpoint 3: Get a Random Quote
Returns a random quote based on a specified minimum character length.
```api
/api/typing/[minLength]
```
**Notes:**
- `minLength` must be between **10 and 300**.
- This is a customized endpoint using Next.js API routes.

---

## 🎨 Color Palette
| Color          | Hex Code |
|---------------|----------|
| **Navy**       | `#0a192f` |
| **Light Navy** | `#112240` |
| **Slate**      | `#8892b0` |
| **Green**      | `#64ffda` |
| **White**      | `#e6f1ff` |

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Akshay Kalapgar

Permission is hereby granted, free of charge, to use, copy, modify, and distribute this software.
```

---

## 👨‍💻 Author

- **LinkedIn**: [@Akshay-Kalapgar](https://www.linkedin.com/in/akshaykalapgar)
- **Website**: [AkshayKalapgar.com](https://akshaykalapgar.com)

[🔝 Back to Top](#)














<!-- commit 15 -->

<!-- commit 16 -->
