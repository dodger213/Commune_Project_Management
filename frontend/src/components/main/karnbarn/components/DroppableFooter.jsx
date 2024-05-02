import PropTypes from 'prop-types';

export default function DroppableFooter({ onHandlePage }) {
    return (
        <div className="border-t border-slate-200 w-full h-12 flex items-center justify-end px-2 gap-x-2">
            <button onClick={() => onHandlePage("prev")} className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded w-8 h-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
            </button>
            <button onClick={() => onHandlePage("next")} className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded w-8 h-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
            </button>
        </div>
    )
}

DroppableFooter.propTypes = {
    onHandlePage: PropTypes.func.isRequired
};