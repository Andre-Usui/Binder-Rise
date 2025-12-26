import HelpContainer from "./HelpContainer";
import HelpItem from "./HelpItem";
import { landingContainer, landingText, landingLogo, landingTitle, landingSubText } from "./landingTailwind";

/*
  - ensinar como usar; 
  - por que usar o app?;
  - ficar dentro da options button;
*/

export default function Landing() {

  return (
    <div
      id="landing"
      className={landingContainer}
    >
      <h1 className={landingTitle}>
        Welcome!
      </h1>
      <h2 className={landingText}>
        Studies state that writing down your learning by hand helps a lot in the learning
        process, as the article of <i>Scientific American</i> says on &quot;
        <a
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://www.scientificamerican.com/article/why-writing-by-hand-is-better-for-memory-and-learning/">
          Why Writing by Hand Is Better for Memory and Learning
        </a>
        &quot;.
        I myself use this methodology and recommend it to everyone I care about. But when I had to find
        some content within dozens of notebooks, multiple references, I found myself going crazy. Or i buy a new notebook
        or a new notebinder and rewrite EVERYTHING, or i build an Aplication to it. Then i made the...
      </h2>

      <h1 className={landingLogo}>Binder Rise</h1>

      <h3 className={landingSubText}>
        As myself, are you tired of juggling multiple note and struggling to keep your notes organized?
        Do you wish you had a centralized space to store and reference your notes,
        without the clutter and chaos?

        <br />

        Binder Rise is here to revolutionize your note-taking experience. With our intuitive
        and customizable app, you can:
      </h3>
      <HelpContainer>
        <HelpItem
          title="Organize your notes by discipline:"
          description="Choose from pre-defined disciplines, such as Math, Science, History, Literature, Programming JavaScript."
        />
        <HelpItem
          title="Create custom pages:"
          description="Divide each discipline into pages, such as Math: Algebra, Geometry, Calculus; Science: Biology, Chemistry, Physics; History: Ancient Civilizations, World Wars, American History."
        />
        <HelpItem
          title="Save links to references:"
          description="Keep relevant links, articles, and resources at your fingertips, making it easy to revisit and reference important information."
        />
        <HelpItem
          title="Edit and customize to your content:"
          description="Rearrange disciplines and pages as needed, delete or edit existing content, and add new notes whenever you want."
        />
        <HelpItem
          title="Take control of your notes:"
          description="With Binder Rise, you're in charge of your note-taking experience. No more tedious searching or sifting through disorganized notes. Our app helps you stay focused, productive, and organized."
        />
      </HelpContainer>
      <h3 className={landingSubText}>
        Try <strong style={{ color: "#FF4C4C", }}>Binder Rise</strong> today and start taking control of your notes!
        <br />
        This landing text aims to highlight the key features and benefits of your app, while also emphasizing
        the user&apos;s ability to customize and tailor the experience to their specific needs.
        <br />
        Click on the &quot;+&quot; button tab to create a new discipline and start your studies. You also can check some
        hints for a properly use of <strong style={{ color: "#FF4C4C", }}>Binder Rise</strong> on Option button on top left tab.
      </h3>
    </div>

  )
}