import { helpContainer } from "./landingTailwind";

export default function HelpContainer({ children }) {

  return (
    <>
      <div id="container"
        className={helpContainer}
        style={{ overscrollBehaviorInline: 'contain' }}
      >
        {children}
      </div>
    </>
  )
}