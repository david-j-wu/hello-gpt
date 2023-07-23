# Hello, GPT!: A simple web app built with the OpenAI API, Next.js and Tailwind CSS

This is the source code for the tutorial written by David Wu to build the Hello, GPT! project: Building a simple web app with OpenAI’s ChatGPT API, Next.js and Tailwind CSS ([https://davidwu.io/posts/building-a-simple-web-app-with-openais-chatgpt-api-nextjs-and-tailwind-css/](https://davidwu.io/posts/building-a-simple-web-app-with-openais-chatgpt-api-nextjs-and-tailwind-css/)).

The terminal commands below are for Mac and other Linux-based systems. Your mileage may vary if you are using Windows or another operating system.

This project uses the MIT License. See `LICENSE.md` for more information.

## Live demo

You can try the version hosted on [Vercel](https://vercel.com/) (the awesome cloud computing company founded by the creators of Next.js) here:

[https://bonjour-gpt.vercel.app/](https://bonjour-gpt.vercel.app/)

## Pre-requisites

This project requires Node.js 16.8.0 or higher.

For information on how to download, install and update Node.js, see their official website: [https://nodejs.org/](https://nodejs.org/).

You can run the terminal commands `node -v` and `npm -v` to check what versions you have installed of Node.js and the associated package manager NPM.

## How to launch the web app locally

1. Change the present working directory to the `hello-gpt` folder. If you're using Visual Studio Code ([https://code.visualstudio.com/](https://code.visualstudio.com/)), then create a new window and open the folder. Alternatively, you can use the `cd` terminal command to do this. You can run the command `pwd` to check you have done this correctly.

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

7. Make desired changes to the web app. Next.js will automatically update the web app when you save changes to the source code.

## Acknowledgements and thanks

- Twitter's Twemoji project ([https://twemoji.twitter.com/](https://twemoji.twitter.com/)) for `waving-hand.svg`. The graphics for the project are licensed under CC-BY 4.0 and the code is licensed under the MIT License. The repo is available on GitHub here: [https://github.com/twitter/twemoji](https://github.com/twitter/twemoji).
- Sam Herbert's (Twitter: [@Sherb](https://twitter.com/sherb)) SVG Loaders project ([https://samherbert.net/svg-loaders/](https://samherbert.net/svg-loaders/)) for `three-dots.svg`. Published under a MIT License, the repo is available on GitHub here: [https://github.com/SamHerbert/SVG-Loaders](https://github.com/SamHerbert/SVG-Loaders).
- Shahriar Khalvati's (GitHub: [@ShahriarKh](https://github.com/shahriarkh)) Twemoji Cheatsheet ([https://twemoji-cheatsheet.vercel.app/](https://twemoji-cheatsheet.vercel.app/)) to navigate the graphics in Twitter's Twemoji project
- OpenAI's Next.js example pet name generator web app `openai-quickstart-node` using the `text-davinci-003` GPT 3.5 model for providing a useful learning resource
