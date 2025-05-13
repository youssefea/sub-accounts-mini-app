import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia } from 'wagmi/chains'; // add baseSepolia for testing 
import { type ReactNode, useState } from 'react';
import { type State, WagmiProvider } from 'wagmi';
 
import { getConfig } from '@/wagmi'; // your import path may vary 
 
export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const apiKey =
    typeof window !== 'undefined'
      ? window.ENV?.PUBLIC_ONCHAINKIT_API_KEY
      : undefined; 
 
  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={apiKey} 
          chain={baseSepolia} // add baseSepolia for testing 
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}