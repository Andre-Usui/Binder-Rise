import './footer.css';

export default function Footer() {

  return (
    <div className="footerBox">
      <h1>Binder Rise</h1>
      <p className="footerRights">All rights reseverd to :<br /><strong>André-Usui ©</strong> <br /> 2024</p>
      <div className="footerLinks">
        <a href="https://www.linkedin.com/in/andreusui/">LinkedIn</a>
        <a href="https://github.com/Andre-Usui">GitHub</a>
      </div>
      <p className="footerVersion" >@Version: 1.0.1</p>
    </div>
  )
}