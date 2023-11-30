# Lingua

Lingua is an interactive web app built with the OpenAI API, Next.js and Tailwind CSS and supported by GPT-4 on the backend. It provides a Personalized Learning Path Recommender based on the Unit the student selects for an introductory linguistics course.

The terminal setup commands below are for Mac and other Linux-based systems.

## Pre-requisites

This requires Node.js 16.8.0 or higher.

For information on how to download, install and update Node.js, see their official website: [https://nodejs.org/](https://nodejs.org/).

You can run the terminal commands `node -v` and `npm -v` to check what versions you have installed of Node.js and the associated package manager NPM.

## Launching the web app locally

1. Change the present working directory to the `lingua` folder. If you're using Visual Studio Code ([https://code.visualstudio.com/](https://code.visualstudio.com/)), then create a new window and open the folder. Alternatively, you can use the `cd` terminal command to do this. You can run the command `pwd` to check you have done this correctly.

2. Install the dependencies for the web app:

```
npm install
```

3. Create a copy of the sample environment variables files, `.env.sample`, either manually or by running the following command:

```
cp .env.sample .env.local
```

4. Add your OpenAI API key to the environment variables file `.env.local`:

```
OPENAI_API_KEY=my-openai-api-key-1
```

5. Run the local development server:

```
npm run dev
```

6. Open your browser of choice and head to [http://localhost:3000](http://localhost:3000) to see the web app live locally.

## Acknowledgements and thanks

- Twitter's Twemoji project ([https://twemoji.twitter.com/](https://twemoji.twitter.com/)) for `waving-hand.svg`. The graphics for the project are licensed under CC-BY 4.0 and the code is licensed under the MIT License. The repo is available on GitHub here: [https://github.com/twitter/twemoji](https://github.com/twitter/twemoji).
- Sam Herbert's (Twitter: [@Sherb](https://twitter.com/sherb)) SVG Loaders project ([https://samherbert.net/svg-loaders/](https://samherbert.net/svg-loaders/)) for `three-dots.svg`. Published under a MIT License, the repo is available on GitHub here: [https://github.com/SamHerbert/SVG-Loaders](https://github.com/SamHerbert/SVG-Loaders).
- Shahriar Khalvati's (GitHub: [@ShahriarKh](https://github.com/shahriarkh)) Twemoji Cheatsheet ([https://twemoji-cheatsheet.vercel.app/](https://twemoji-cheatsheet.vercel.app/)) to navigate the graphics in Twitter's Twemoji project
- OpenAI's Next.js example pet name generator web app `openai-quickstart-node` using the `text-davinci-003` GPT 3.5 model for providing a useful learning resource
