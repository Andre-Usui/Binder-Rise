import { helpItem, helpItemImg } from "./landingTailwind";

export default function HelpItem ({ title, description, imageSrc }) {

  return (
    <>
      <div className={helpItem}>
        <p>
          <strong>{title}</strong> <br /><br /> {description}
        </p>
        {imageSrc && <img src={imageSrc} alt={title} className={helpItemImg} />}
      </div>
    </>
  )
}