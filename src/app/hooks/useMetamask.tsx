import { useState, useCallback } from "react";
import toast from "react-hot-toast"; // Asegúrate de tener react-toastify instalado o usa otra librería de notificaciones
import { ethers } from "ethers";

// interface
export interface AccountType {
    address?: string;
    balance?: string;
    chainId?: string;
    network?: string;
}

const useMetaMaskConnection = () => {
    const [isLoading, setLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState<AccountType>({});
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null); // import { ethers } from "ethers";

    const connectToMetaMask = useCallback(async () => {
        const { ethereum } = window;
        setLoading(true);

        if (!ethereum) {
            toast.error("MetaMask no está instalado.");
            setIsConnected(false);
            setLoading(false);
            return;
        }

        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const address = accounts[0];
            setProvider(new ethers.BrowserProvider(ethereum));

            toast.success(`Conectado a MetaMask en la dirección: ${address}`);
            setIsConnected(true);
            setAccount(address);
        } catch (error) {
            console.error("Error al conectar con MetaMask:", error);
            toast.error(`Error al conectar con MetaMask: ${error.message}`);
            setIsConnected(false);
        } finally {
            setLoading(false);
        }
    }, []);

    return { connectToMetaMask, isLoading, isConnected, account, provider };
};

export default useMetaMaskConnection;
