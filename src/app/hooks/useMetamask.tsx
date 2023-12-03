import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Este hook gestionará la conexión a MetaMask
const useMetaMask = () => {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            
            const newProvider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(newProvider);
            setProvider(newProvider);
        } else {
            console.error("MetaMask no está instalado");
        }
    }, []);

    const connectWallet = async () => {
        if (!provider) return;

        try {
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);
        } catch (error) {
            console.error("Error al conectar con MetaMask", error);
        }
    };

    return { provider, account, connectWallet };
};

export default useMetaMask;
