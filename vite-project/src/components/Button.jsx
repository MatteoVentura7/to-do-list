export default function Button ({ onClick, children }) {
    return (
        <button className='caret-amber-200 p-1 mr-2 border-2 cursor-pointer' onClick={onClick}>
            {children}
        </button>
    )
}