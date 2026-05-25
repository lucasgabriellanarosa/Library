import NotFoundSVG from '../assets/notfound.svg'

function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center gap-8 min-h-[60dvh]'>
      <img src={NotFoundSVG} className='h-72' />
      <p><span className='text-red-600 font-semibold'>Error 404:</span> This Page Was Not Found</p>
    </div>
  )
}

export default NotFound