import { useState, useEffect } from "react"

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(year)
    }, [year])

    return (
        <div className="bg-gray-950">
        <p className="max-w-[1200px] m-auto flex items-center justify-center text-sm text-gray-600 gap-2 text-center border-t border-gray-900 py-5 px-3">
            &copy; {year} codeShare | Levi Okoye,s Challenge 
        </p>
        </div>
    )
}

export default Footer