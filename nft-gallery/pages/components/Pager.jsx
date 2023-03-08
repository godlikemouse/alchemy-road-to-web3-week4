export default function Pager(props) {
    const { pageKey, onNext, onHome } = props;

    return (
        <div>
            {pageKey ? (
                <>
                    <button
                        onClick={() => onHome()}
                        className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm mx-1"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => onNext(pageKey)}
                        className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm mx-1"
                    >
                        Next
                    </button>
                </>
            ) : null}
        </div>
    );
}
