const ChartIcon = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            className={className}
            aria-hidden="true"
        >
            <g fill="currentColor" stroke="none">
                <path d="M3 21V3h2v16h16v2H3zm4-4v-7h3v7H7zm5 0V6h3v11h-3zm5 0v-4h3v4h-3z"/>
            </g>
        </svg>
    );
};

export default ChartIcon
