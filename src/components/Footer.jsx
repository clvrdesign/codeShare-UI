import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(year)
    }, [year])

    return (
        <div className="bg-gray-950">
        <p className="max-w-[1200px] m-auto flex items-center justify-center text-sm text-gray-600 gap-2 text-center border-t border-gray-900 py-5 px-3">
            &copy; {year} codeShare | Levi,s Code Craft by<Link className="inline hover:text-[#f8f296] text-gray-500 ease-out duration-150" to='https://www.klevadev.com'>Clever Designer</Link>
        </p>
        </div>
    )
}

export default Footer