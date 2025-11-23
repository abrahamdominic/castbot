"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-black dark:text-white">
          {address}
        </p>
        <button
          className="flex h-10 items-center justify-center rounded-full bg-red-500 px-4 text-white transition-colors hover:bg-red-600"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      className="flex h-10 items-center justify-center rounded-full bg-green-500 px-4 text-white transition-colors hover:bg-green-600"
      onClick={() => connect({ connector: injected() })}
    >
      Connect Wallet
    </button>
  );
}
