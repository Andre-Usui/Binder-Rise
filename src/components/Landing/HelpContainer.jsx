export default function HelpContainer({ children }) {

  return (
    <>
      <div id="container"
        className="w-full h-full m-0 p-12 bg-main-1 grid grid-flow-col gap-12 snap-x scroll-p-4 overflow-x-auto "
      >
        {children}
      </div>
    </>
  )
}