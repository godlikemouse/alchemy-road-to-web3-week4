import CopyButton from "./CopyButton";

//TDOO: add pagination system

export default function NFTCard(props) {
    const { nft } = props;

    return (
        <div className="w-1/4 flex flex-col">
            <div className="rounded-md">
                <img
                    className="object-cover h-128 w-full rounded-t-md"
                    src={nft.media[0].gateway}
                />
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
                <div>
                    <h2 className="text-xl text-gray-800">{nft.title}</h2>
                    <p className="text-gray-600">
                        {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
                    </p>
                    <p className="text-gray-600 flex">
                        {nft.contract.address.substr(0, 34)}...
                        {nft.contract.address.substr(
                            nft.contract.address.length - 4
                        )}{" "}
                        <CopyButton contract={nft.contract.address} />
                    </p>
                </div>

                <div className="flex-grow mt-2">
                    <p className="text-gray-600 truncate">{nft.description}</p>
                </div>
                <div className="flex jutify-end mb-1 mt-2">
                    <a
                        href={`https://etherscan.io/token/${nft.contract.address}`}
                        target="_blank"
                        className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-m text-whie"
                    >
                        View on Etherscan
                    </a>
                </div>
            </div>
        </div>
    );
}
