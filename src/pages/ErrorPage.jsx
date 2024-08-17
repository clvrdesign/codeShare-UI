import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ErrorPage = () => {
  return (
    <>
        <Navbar/>
        <div className="h-[calc(100vh-150px)] flex flex-col justify-center items-center">
          <i className="fi fi-rr-ban text-[50px] text-red-500"></i>
        <h1 className='max-w-[750px] mb-4 text-center lg:text-4xl text-xl text-gray-50 font-semibold'>
          Error 404
        </h1>
        <p className='max-w-[650px] text-center lg:text-lg text-[15px] text-gray-50 px-3'>
          The page seems to be missing or permanently removed form our servers...
        </p>
        </div>
        
        <Footer/>
    </>
  )
}

export default ErrorPage