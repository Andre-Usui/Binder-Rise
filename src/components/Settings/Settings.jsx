import { motion } from 'motion/react';
import Download from './Download.jsx';
import Upload from './Upload.jsx';
import HelpItem from "./HelpItem.jsx";
import DragDisciplines from "./DragDisciplines.jsx";
import Button from "../Button.jsx";
import "./settings.css"

export default function Settings({ handle }) {

  const handleSubmit = () => {
    console.log("button submit was clicked");
    handle((prevState) => !prevState);
  }

  return (
    <>
      <div
        className="settingsContainer">
        <h1>Settings</h1>
        <h3>Drag the items to rearrange the discipline's positions</h3>
        <div className="dragBox">
          <DragDisciplines />
          <Button
            buttonClass="settingsButton"
            buttonName="Submit"
            buttonClick={handleSubmit}
          />
          <Download />
          <Upload />
        </div>
        <h3>If you need some help to properly use the Binder Rise, you can find bellow some hints:</h3>
        <div className="helpContainer">
          <HelpItem
            title="How to create a Discipline's tab"
            description="There is a '+' button on the discipline's tab, here you can: "
            ul={["Set the title of the discipline;",
              "Set the title of the first page of the discipline;",
              "Set the main color of the background's discipline tab",
              "Set the detail color of the discipline tab",
              "Set the font color of the discipline tab."
            ]}
            srcImg="src"
            altImg=""
          />
          <HelpItem
            title="How to edit a Discipline's tab"
            description="There is a edit button on top of the discipline's tab, here you can:"
            ul={["Edit the title of the discipline;",
              "Edit the main color of the background's discipline tab;",
              "Edit the detail color of the discipline tab;",
              "Edit the font color of the discipline tab."
            ]}
            srcImg="src"
            altImg=""
          />
          <HelpItem
            title="How to delete a Discipline tab"
            description="There is a delete button on top of the discipline's tab, but be aware:"
            ul={["If you delete the discipline, all pages and posts refered to this discipline will be also deleted;",
              "The content deleted cannot be recovered.",
            ]}
            srcImg="src"
            altImg=""
          />
          <HelpItem
            title="How to edit Discipline's tab positions"
            description="There is a Settings button on left corner of the discipline's tab, there you can:"
            ul={["You can change the Discipline's tab positions by dragging the disciplines;",
              "You need to submit to save the changings.",
            ]}
            srcImg="src"
            altImg=""
          />
          <HelpItem key="4"
            title="How to download and upload the Json of your Binder"
            description="On Settings you can download and upload the content of your binder"
            ul={["By download the Json of your Binder, you can load it on any desktop uploading it;",
              "You can save your Binder Json on your Whatsapp or mobile device, for example.",
            ]}
            srcImg="src"
            altImg=""
          />
          <HelpItem
            title="How to create a new Page"
            description="The page's of a Discipline is where you build your knowledge content, you should:"
            ul={["On the top of Content's page you will see all your pages and the 'Add page' Button;",
              "Choose the name of the page ",
              "Use your binder whatever you are."
            ]}
            srcImg="src"
            altImg=""
          />
          <HelpItem
            key="6"
            title="How to edit or delete a Page"
            description="The page can be edited, search the 'edit' Button and there you can:"
            ul={["Edit the name of the page;",
              "Rearrange the position of the posts by dragging the posts;",
              "Delete the page clicking on the delete button;",
              "But remember, by deleting the page you will delete all content inside."
            ]}
            srcImg="src"
            altImg=""
          />
          <HelpItem
            title="How to create a Post"
            description="On Posts, you save your content and references"
            ul={["Set the title of the Post;",
              "Set the references of your content;",
              "Set the content of your Post.",
            ]}
            srcImg="src"
            altImg=""
          />
          <HelpItem
            key="8"
            title="How to properly use references"
            description="To properly use the reference you should use the following pattern:"
            ul={["Set a reference using 'title(link)';",
              "You can insert more than one reference by separating the references with comma ' , ' + 'space';",
              "For example: title1(site1.com), title2(site2.com), title3(site3.com).",
            ]}
            srcImg="src"
            altImg=""
          />
          <HelpItem
            title="How to edit a Post"
            description="On each Post you will see a 'Edit' Button, here you can: "
            ul={["Edit the title of the Post;",
              "Edit the references of your content;",
              "Edit the content of your Post.",
            ]}
            srcImg="src"
            altImg=""
          />
          <HelpItem
            key="10"
            title="How to delete a Post"
            description="On each Post you will see a 'Delete' Button, but be aware: "
            ul={["The content deleted can't be restored.",
            ]}
            srcImg="src"
            altImg=""
          />
        </div>
      </div>


    </>
  )
}