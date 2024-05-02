import PropTypes from 'prop-types'

export default function CanbanItem({ content }) {
    return (
        <div>
            <span className=' bg-red-600 text-white text-[20px] p-1 mt-[3px] top-2 rounded-[5px]'>$1000</span>
            <p className='text-base text-slate-700 p-4 item-content before:bg-red-500'>{content}</p>
            <div className="flex justify-between items-center border-t border-slate-200 p-4">
                <button className="flex items-center gap-x-2 text-slate-700 p-[7px] rounded bg-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                    </svg>
                    <span className='font-semibold text-xs'>20.01.2024</span>
                </button>
                <div className='flex items-center gap-x-4 bg-wite'>
                    <button className='relative p-2 bg-slate-100 text-slate-700 rounded-full flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                        </svg>
                        <span className='absolute -top-2 -right-2 w-5 h-5 text-xs font-bold flex items-center justify-center bg-teal-500 text-white rounded-full'>3</span>
                    </button>
                    <button className='relative p-2 bg-slate-100 text-slate-700 rounded-full flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                        <span className='absolute -top-2 -right-2 w-5 h-5 text-xs font-bold flex items-center justify-center bg-sky-500 text-white rounded-full'>4</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

CanbanItem.propTypes = {
    content: PropTypes.string.isRequired
}