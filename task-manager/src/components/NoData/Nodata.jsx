 const Nodata = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white p-6">
            {/* <img aria-hidden="true" alt="data-not-found" src="https://openui.fly.dev/openui/200x200.svg?text=📉" className="mb-4 animate-bounce" /> */}
            <h1 className="text-4xl font-extrabold text-zinc-800 drop-shadow-lg">Oops! Data Not Found</h1>
            <p className="text-zinc-800 text-center mt-2 text-lg max-w-md">We couldn&apos;t find any data matching your request. Please try again later or check your input.</p>
            <div className="mt-4 text-zinc-800 text-sm">
                <p>✨ Feeling adventurous? Try a different search!</p>
            </div>
        </div>
    )
}

export default Nodata