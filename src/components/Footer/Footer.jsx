import { footerBox, footerTitle, footerRights, footerLinkContainer, footerLink, footerVersion } from './footerTailwind.js';

export default function Footer() {

  return (
    <div className={footerBox}>
      <h1 className={footerTitle}>Binder Rise</h1>
      <p className={footerRights}>All rights reseverd to :<br /><strong>André-Usui ©</strong> <br /> 2024</p>
      <div className={footerLinkContainer}>
        <a className={footerLink} href="https://www.linkedin.com/in/andreusui/">LinkedIn</a>
        <a className={footerLink} href="https://github.com/Andre-Usui">GitHub</a>
      </div>
      <p className={footerVersion} >@Version: 1.0.1</p>
    </div>
  )
}