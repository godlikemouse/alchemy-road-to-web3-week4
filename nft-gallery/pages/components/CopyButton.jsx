import { ClipboardDocumentCheckIcon } from "./Icons";

export default function CopyButton(props) {
    const { contract } = props;

    async function copyToClipboard(content) {
        try {
            await navigator.clipboard.writeText(content);
        } catch (ex) {
            console.error("failed to copy to clipboard");
        }
    }

    return (
        <button
            className="h-6 w-6"
            title="Copy address"
            onClick={() => copyToClipboard(contract)}
        >
            <ClipboardDocumentCheckIcon />
        </button>
    );
}
