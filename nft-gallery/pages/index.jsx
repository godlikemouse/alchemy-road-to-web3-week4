import { useState } from "react";
import NFTCard from "./components/NFTCard";
import Pager from "./components/Pager";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;

export default function Home() {
    const [walletAddress, setWalletAddress] = useState("");
    const [collectionAddress, setCollectionAddress] = useState("");
    const [NFTs, setNFTs] = useState([]);
    const [fetchForCollection, setFetchForCollection] = useState(false);
    const [pageKey, setPageKey] = useState(null);

    async function fetchNFTs(pageKey) {
        let nfts;
        console.info("fetching nfts");

        if (!collectionAddress.length) {
            const fetchURL = `${baseURL}/getNFTs/?owner=${walletAddress}`;
            const keyParams = pageKey ? `&pageKey=${pageKey}` : "";
            const res = await fetch(fetchURL + keyParams);
            nfts = await res.json();
        } else {
            console.info("Fetching nfts for collection owned by address");
            const fetchURL = `${baseURL}/getNFTs/?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
            const keyParams = pageKey ? `&pageKey=${pageKey}` : "";
            const res = await fetch(fetchURL + keyParams);
            nfts = await res.json();
        }

        if (nfts) {
            console.info("nfts:", nfts);
            setNFTs(nfts.ownedNfts);
            setPageKey(nfts.pageKey);
        }
    }

    async function fetchNFTsForCollection(pageKey) {
        let nfts;
        console.info("fetching nfts for collection");

        if (collectionAddress.length) {
            const fetchURL = `${baseURL}/getNFTsForCollection/?contractAddress=${collectionAddress}&withMetadata=true`;
            const keyParams = pageKey ? `&startToken=${pageKey}` : "";
            const res = await fetch(fetchURL + keyParams);
            nfts = await res.json();

            if (nfts) {
                console.info("NFTs in collection:", nfts);
                setNFTs(nfts.nfts);
                setPageKey(nfts.nextToken);
            }
        }
    }

    async function onNext(key) {
        await (fetchForCollection
            ? fetchNFTsForCollection(key)
            : fetchNFTs(key));
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-8 gap-y-3">
            <div className="flex flex-col w-full justify-center items-center gap-y-2">
                <input
                    type="text"
                    placeholder="Add your wallet address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
                />
                <input
                    type="text"
                    placeholder="Add the collection address"
                    onChange={(e) => setCollectionAddress(e.target.value)}
                    value={collectionAddress}
                    className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
                />
                <label className="text-gray-600">
                    <input
                        type="checkbox"
                        onChange={(e) =>
                            setFetchForCollection(e.target.checked)
                        }
                        className="mr-2"
                    />
                    Fetch for collection
                </label>
                <button
                    onClick={() => onNext()}
                    className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
                >
                    Let's go!
                </button>
            </div>
            <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
                {NFTs.map((nft, idx) => (
                    <NFTCard nft={nft} key={`nft-card-${idx}`} />
                ))}
            </div>
            {NFTs.length ? (
                <Pager
                    pageKey={pageKey}
                    onNext={(key) => onNext(key)}
                    onHome={() => onNext()}
                />
            ) : null}
        </div>
    );
}
