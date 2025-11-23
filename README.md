# Castbot

AI-powered content generation for Farcaster.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installing

1.  Clone the repo
2.  Install NPM packages

```bash
npm install
```

3.  Set up your environment variables. Create a `.env.local` file in the root of your project and add the following:

```
# Farcaster API Key
FARCASTER_API_KEY=your_farcaster_api_key
```

4.  Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Wallet Integration

This project uses `wagmi` and `viem` for wallet integration. You will need to have a wallet extension like MetaMask installed in your browser to connect to the application.

## How to use

1.  Enter a prompt in the text area.
2.  Click the "Generate" button to generate AI content.
3.  Click the "Cast" button to post the content to Farcaster.

## Built With

*   [Next.js](https://nextjs.org/) - The React Framework for Production
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
*   [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum
*   [Viem](https://viem.sh/) - TypeScript Interface for Ethereum
*   [Farcaster](https://www.farcaster.xyz/) - A sufficiently decentralized social network

