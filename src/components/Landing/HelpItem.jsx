export default function HelpItem ({ title, description, imageSrc }) {

  const itemClass = "w-100 h-full mb-4 p-12 bg-main-2 rounded-lg grid gap-0 snap-start";

  return (
    <>
      <div className={itemClass}>
        <p>
          <strong>{title}</strong> <br /><br /> {description}
        </p>
        {imageSrc && <img src={imageSrc} alt={title} className="h-64 w-64 mt-4 rounded-md" />}
      </div>
    </>
  )
}