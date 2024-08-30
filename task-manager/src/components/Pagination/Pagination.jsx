import PropTypes from 'prop-types';

export const Pagination = ({ totalPage, perPage, onClick,filters }) => {
    const renderBouton = () => {
        let buttons = [];
        for (let i = 0; i < totalPage; i++) {
            const offset = i * perPage;
            buttons.push(
                <button 
                    key={`btn-pagination-${offset}`} 
                    onClick={() => onClick(offset,filters)} 
                    className="bg-transparent text-gray-700 dark:text-gray-200 font-semibold min-w-[40px] border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
                >
                    {i + 1}
                </button>
            );
        }
        return buttons;
    };

    const renderOption = () => {
        let options = [];
        for (let i = 0; i < totalPage; i++) {
            const offset = i * perPage;
            options.push(
                <option value={offset} key={`option-pagination-${offset}`}>
                    {i + 1}
                </option>
            );
        }
        return options;
    };

    return (
        <>
            {totalPage > 0 && (
                <div className="flex justify-center items-center mt-8">
                    <div className="flex mx-4 gap-2">
                        {renderBouton()}
                    </div>
                    <button className="bg-transparent text-gray-700 dark:text-gray-200 font-semibold border border-gray-300 rounded-md px-2 py-1 focus:outline-none dark:border-none">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
                            <path d="M10 2l8 8-8 8-1.414-1.414L15.172 10l-6.586-6.586L10 2z" />
                        </svg>
                    </button>
                    <span className="mx-4 dark:text-gray-400">Page</span>
                    <select onChange={(e) => onClick(Number(e.target.value))} className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                        {renderOption()}
                    </select>
                </div>
            )}
        </>
    );
};

Pagination.propTypes = {
    totalPage: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    perPage: PropTypes.number.isRequired,
    filters:PropTypes.any
};
