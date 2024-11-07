<div align="center">
  <img alt="Logo" src="https://user-images.githubusercontent.com/62770500/199333052-3cd38b31-7e77-4883-a1ff-a037afcc0492.png" width="100" />
</div>
<h1 align="center">
  akshaykalapgar.com - v1
</h1>
<p align="center">
  The first iteration of <a href="https://akshaykalapgar.com" target="_blank">akshaykalapgar.com</a> built with <a href="https://nextjs.org/" target="_blank">Next.js</a> and hosted with <a href="https://vercel.com/" target="_blank">Vercel</a>
</p>

<p align="center">
  <a href="https://akshaykalapgar.com" target="_blank">
    <img src="https://raw.githubusercontent.com/DataDog/integrations-extras/master/vercel/images/logo-full-black.png" width="100" alt="Vercel Status" />
  </a>
</p>

![demo] 
---
## 🚨 About this repo (please read!)

### 🚀 Latest Update
I'm thrilled to see my portfolio gaining traction, with many daily visitors inspired by my work. It’s fantastic to share my code with the open-source community, and I appreciate everyone checking it out!

You can use this code for your website too. A note of credit linking back would be appreciated 😊. 

Please note that some design elements were inspired by Anaflous Abdellatif's portfolio, but all code was written from scratch. Technologies like `Tailwind CSS`, `Framer Motion`, and `Next.js` have been used to add unique touches, so while it may look similar, the underlying structure is completely original!

The `This website can't be reached` trick in my portfolio is an original, playful idea meant to engage visitors. Although it’s unconventional, it adds a lighthearted element to the user experience. 

---
### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [🎨 Color Reference](#references)
- [License](#license)
- [Author Info](#author-info)

---
## Description

A portfolio website is a unique way to showcase your work, projects, and skills. It serves as a dynamic, evergreen platform that can reflect your evolution as a developer. I chose Next.js for its server-side rendering, which benefits SEO, and Tailwind CSS for efficient styling that helps create responsive and visually appealing layouts.

---
## Technologies & Libraries

This portfolio integrates a variety of technologies and libraries to maximize functionality and enhance design, including:

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Google API
- Node.js
- Vercel Analytics

You can find additional packages in the `package.json` file.

---

### How To Use

Feel free to fork this repository for your own portfolio. Please link back to [akshaykalapgar.com](https://akshaykalapgar.com) if you do. Thank you!

## 🛠 Installation & Set Up

1. Clone the repo:

   ```sh
   git clone https://github.com/Akkikens/akshay-portfolio

2. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)

   ```sh
   nvm install
   ```

3. Install dependencies

   ```sh
   yarn
   ```
   
4. (OPTIONAL) : Add .env file to the root project 
 
```bash
    touch .env
```

5.  (OPTIONAL) : Add your Google API key inside .env file.

###### ***Note :***
###### not Adding Google API to the project will cause not returning the correct zip code, it might be always "00000"
###### make sure you enabled Geolocation to this API

```Javascript
    NEXT_PUBLIC_KEY_GOOGLE_API="your API key"
```

6. Start the development server

   ```sh
   yarn dev
   ```

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   yarn build
   ```

1. Preview the site as it will appear once deployed

   ```sh
   yarn run serve
   ```
---
## API Description :
##### Endpoint 1 :
the following endpoint will return a json object contains a bunch of information about the ip address  

```api
    /api/userInfoByIP/[IP-Address]
```
example :

```api
    /api/userInfoByIP/159.89.173.104
```
###### ***Get Request to above endpoint will return the following json data :***
```JavaScript
    {"zip":"560002","country":"India","countryCode":"IN","region":"KA","regionName":"Karnataka","city":"Bengaluru","datetime":"9/6/2022, 1:24:30 AM","lat":12.9634,"lon":77.5855,"timezone":"Asia/Kolkata","isp":"DigitalOcean, LLC","org":"Digital Ocean","as":"AS14061 DigitalOcean, LLC","query":"159.89.173.104"}
```

##### Endpoint 2 :
the following endpoint will return a json object contains the zip code for the latitude and logitude

```api
    "/api/userInfoByLatLon/" + lat + "/" + lon
```
example :

```api
    /api/userInfoByIP/159.89.173.104
```
###### ***Get Request to above endpoint will return the zipcode of the lat and long provided :***
```JavaScript
    {"zipcode" : "56998"}
```
###### ***the Response below is returned if the lat and long provided has no zip code in Google maps, like lat & long in positioned in the ocean :***
```JavaScript
    {"zipcode" : "00000"}
```

##### Endpoint 3 :
the following endpoint will return a json object contains "quote" and "author", for SpeedTyping project i displayed only the quote, **minLength** is considered as the minimum of characters.  

```api
    /api/typing/[minLength]
```
##### notes : 
- ***minLength*** should be between 10 - 300.
- the returned quote is a chain of 
- i costumized the original Endpoint using The API Route of Nextjs, here is the Original Endpoint.

##### Original Endpiont :
###### URL : 
```api
    https://api.quotable.io/random?minLength=[minLength]
```
---

## References

| Color          | Hex                                                                |
| -------------- | ------------------------------------------------------------------ |
| Navy           | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) `#0a192f` |
| Light Navy     | ![#112240](https://via.placeholder.com/10/0a192f?text=+) `#112240` |
| Lightest Navy  | ![#233554](https://via.placeholder.com/10/303C55?text=+) `#233554` |
| Slate          | ![#8892b0](https://via.placeholder.com/10/8892b0?text=+) `#8892b0` |
| Light Slate    | ![#a8b2d1](https://via.placeholder.com/10/a8b2d1?text=+) `#a8b2d1` |
| Lightest Slate | ![#ccd6f6](https://via.placeholder.com/10/ccd6f6?text=+) `#ccd6f6` |
| White          | ![#e6f1ff](https://via.placeholder.com/10/e6f1ff?text=+) `#e6f1ff` |
| Green          | ![#64ffda](https://via.placeholder.com/10/64ffda?text=+) `#64ffda` |

---

## License

MIT License

Copyright (c) [2024] [AKSHAY KALAPGAR]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



---

## Author Info

- Linkedin - [@Akshay-Kalapgar](https://www.linkedin.com/in/akshaykalapgar)
- Website - [Akshay Kalapgar](https://akshaykalapgar.com)

[Back To The Top](#description) :

