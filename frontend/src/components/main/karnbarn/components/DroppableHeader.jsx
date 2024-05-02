import PropTypes from 'prop-types'

export default function DroppableHeader({ droppableHeader, totalItem }) {
    return (
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-xl text-slate-700 font-semibold">{droppableHeader} ({ totalItem })</h2>
            <div className="flex items-center gap-x-2">
                <button className='p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                </button>
                <button className='p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

DroppableHeader.propTypes = {
    droppableHeader: PropTypes.string.isRequired,
    totalItem: PropTypes.number.isRequired,
};