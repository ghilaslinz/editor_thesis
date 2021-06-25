
import React, { useState, useEffect, useRef } from 'react';
import SunEditor from 'suneditor-react';

import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import "./heading.css"
import "./figure.css"
import "./bibliography.css"
import "./TableCaption.css"
import "./math.css"
import "./Icon.css"
import "./mycomponent.css"

//import list from 'suneditor/src/plugins/submenu/list'
//import mathNew from '../node_modules/suneditor/src/plugins/dialog/mathNew'
//import mathJax from '../src/plugins/modules/dialog'
import plugins from 'suneditor/src/plugins'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import katex from 'katex'
import MathJax from 'mathjax/es5/tex-chtml.js'

import 'katex/dist/katex.min.css'
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext"


import mergeTag from "./merge_tag_plugin";
//import resolutions from "./resolution";

import bibliographyPlugin from "./Bibliopgraphy";
import NavBar from "./components/NavBar";
import mathNew from "./math_new_plugin";
import math_plugin from "./math_new_plugin";
import image_new from './ImageNew';
import fontSize_new from './fontsize'

import FormatBlockNew from './FormatBlockNew';
import TableCaption from './TableCaption';
import plugin_dialog from './CustomLink';
import { Link, useHistory, useParams } from "react-router-dom"
//import lang from 'suneditor/src/lang';
import ml from './ml';
import HTMLtoDOCX from 'html-to-docx';
import { save } from 'save-file'
//import en from './en';

var juice = require('juice');
const MyComponent = (props) => {
  const history = useHistory()
  const { currentUser } = useAuth();
  const [loader, setLoader] = useState(false);
  const [onlyContents, sendonlyContents] = useState("");
  const [database, displayDatabase] = useState("");
  const { id } = useParams();
  const lang = {


    code: 'ml',
    toolbar: {
      default: 'Default',
      save: 'Save',
      font: 'Font',
      formats: 'Formats',
      fontSize: 'Size',
      bold: 'Bold',
      underline: 'Underline',
      italic: 'Italic',
      strike: 'Strike',
      subscript: 'Subscript',
      superscript: 'Superscript',
      removeFormat: 'Remove Format',
      fontColor: 'Font Color',
      hiliteColor: 'Highlight Color',
      indent: 'Indent',
      outdent: 'Outdent',
      align: 'Align',
      alignLeft: 'Align left',
      alignRight: 'Align right',
      alignCenter: 'Align center',
      alignJustify: 'Align justify',
      list: 'List',
      orderList: 'Ordered list',
      unorderList: 'Unordered list',
      horizontalRule: 'Horizontal line',
      hr_solid: 'Solid',
      hr_dotted: 'Dotted',
      hr_dashed: 'Dashed',
      table: 'Table',
      link: 'Link',
      math: 'Math',
      image: 'Image',
      video: 'Video',
      audio: 'Audio',
      fullScreen: 'Full screen',
      showBlocks: 'Show blocks',
      codeView: 'Code view',
      undo: 'REDO',
      redo: 'Redo',
      preview: 'Preview',
      print: 'print',
      tag_p: 'Paragraph',
      tag_div: 'Normal (DIV)',
      tag_h: 'Header',
      tag_blockquote: 'Quote',
      tag_pre: 'Code',
      tag_b: 'Bold',
      tag_i: 'Italic',
      tag_u: 'Underline',
      template: 'Template',
      lineHeight: 'Line height',
      paragraphStyle: 'Paragraph style',
      textStyle: 'Text style',
      imageGallery: 'Image gallery',
      mention: 'Mention'
    },
    dialogBox: {
      linkBox: {

        title: 'Insert Link',
        url: 'URL to link',
        text: 'Text to display',
        newWindowCheck: 'Open in new window',
        downloadLinkCheck: 'Download link',
        bookmark: 'Bookmark'
      },
      mathBox: {
        title: 'Math',
        inputLabel: 'Mathematical Notation',
        fontSizeLabel: 'Font Size',
        previewLabel: 'Preview'
      },
      imageBox: {
        title: 'Insert image',
        file: 'Select from files',
        url: 'Image URL',
        altText: 'Alternative text',
        imgTitle: 'Insert title',
      },
      videoBox: {
        title: 'Insert Video',
        file: 'Select from files',
        url: 'Media embed URL, YouTube/Vimeo'
      },
      audioBox: {
        title: 'Insert Audio',
        file: 'Select from files',
        url: 'Audio URL'
      },
      browser: {
        tags: 'Tags',
        search: 'Search',
      },



      // captionTable: '',
      caption: '',
      close: 'Close',
      submitButton: 'Submit',
      revertButton: 'Revert',
      proportion: 'Constrain proportions',
      basic: 'Basic',
      left: 'Left',
      right: 'Right',
      center: 'Center',
      width: 'Width',
      height: 'Height',
      size: 'Size',
      ratio: 'Ratio'
    },
    controller: {
      edit: 'Edit',
      unlink: 'Unlink',
      remove: 'Remove',
      insertRowAbove: 'Insert row above',
      insertRowBelow: 'Insert row below',
      deleteRow: 'Delete row',
      insertColumnBefore: 'Insert column before',
      insertColumnAfter: 'Insert column after',
      deleteColumn: 'Delete column',
      fixedColumnWidth: 'Fixed column width',
      resize100: 'Resize 100%',
      resize75: 'Resize 75%',
      resize50: 'Resize 50%',
      resize25: 'Resize 25%',
      autoSize: 'Auto size',
      mirrorHorizontal: 'Mirror, Horizontal',
      mirrorVertical: 'Mirror, Vertical',
      rotateLeft: 'Rotate left',
      rotateRight: 'Rotate right',
      maxSize: 'Max size',
      minSize: 'Min size',
      tableHeader: 'Table header',
      mergeCells: 'Merge cells',
      splitCells: 'Split Cells',
      HorizontalSplit: 'Horizontal split',
      VerticalSplit: 'Vertical split'
    },
    menu: {
      spaced: 'Spaced',
      bordered: 'Bordered',
      neon: 'Neon',
      translucent: 'Translucent',
      shadow: 'Shadow',
      code: 'Code'
    }
  };

  var plugin_command = {
    // @Required @Unique
    // plugin name
    name: "customCommand",
    // @Required
    // data display
    display: "command",

    // @Options
    title: "Add range tag",
    buttonClass: "",
    innerHTML: '<i class="fas fa-carrot"></i>',

    // @Required
    // add function - It is called only once when the plugin is first run.
    // This function generates HTML to append and register the event.
    // arguments - (core : core object, targetElement : clicked button element)
    add: function (core, targetElement) {
      const context = core.context;
      const rangeTag = core.util.createElement("div");
      core.util.addClass(rangeTag, "__se__format__range_custom");

      // @Required
      // Registering a namespace for caching as a plugin name in the context object
      context.customCommand = {
        targetButton: targetElement,
        tag: rangeTag
      };
    },

    // @Override core
    // Plugins with active methods load immediately when the editor loads.
    // Called each time the selection is moved.
    active: function (element) {
      if (!element) {
        this.util.removeClass(
          this.context.customCommand.targetButton,
          "active"
        );
      } else if (this.util.hasClass(element, "__se__format__range_custom")) {
        this.util.addClass(this.context.customCommand.targetButton, "active");
        return true;
      }

      return false;
    },

    // @Required, @Override core
    // The behavior of the "command plugin" must be defined in the "action" method.
    action: function () {
      const rangeTag = this.util.getRangeFormatElement(this.getSelectionNode());

      if (this.util.hasClass(rangeTag, "__se__format__range_custom")) {
        this.detachRangeFormatElement(rangeTag, null, null, false, false);
      } else {
        this.applyRangeFormatElement(
          this.context.customCommand.tag.cloneNode(false)
        );
      }
    }
  };

  const htmlString = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Document</title>
    </head>
    <body style="counter-reset: h1";>
  
   
    `


    + onlyContents +
    `</body>
</html>`;

  const styledContentHTMLString = juice.inlineContent(
    htmlString,
    `h1 {
    counter-reset: h2;
  
  }
  h2 {
    counter-reset: h3;
  }
  
  h1:before {
    counter-increment: h1;
    content: counter(h1) ". ";
  }
  h2:before {
    counter-increment: h2;
    content: counter(h1) "." counter(h2) ". ";
  }
  
  h1.nocount:before,
  h2.nocount:before {
    content: "";
    counter-increment: none;
  }
  
  h4 {
    font-weight: lighter;
  }
`


  );
  const downloadFile = async () => {


    console.log(onlyContents);
    const fileBuffer = await HTMLtoDOCX(styledContentHTMLString, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });

    await save(fileBuffer, 'Document.docx')
  };

  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleKeyDown = (e) => {
    const { key, shiftKey } = e;
    const keyCode = e.which || e.keyCode;

    if (key === "Enter" || keyCode === 13) {
      console.log(editor.current);
      e.preventDefault();
      editor.current.core.actionCall(
        "customCommand",
        "command",
        editor.current.core.context.customCommand.targetButton
      );

      return false;
    }
  };

  useEffect(() => {
    function getDatafromDatabse() {
      if (currentUser) {
        //setLoading(true);
        db.collection("users")
          .doc(currentUser?.uid)
          .collection("databases")
          .doc(`${id}`)
          .get()
          .then((item) => {
            return item.data();

            //console.log(databases[1])
          })
          .then((d) => {
            displayDatabase(d);
            console.log(lang)
            console.log(d.onlyContents);
            //	console.log(d.onlyContents);
            //	setLoading(false);
          });
      } else {
        displayDatabase({});
        console.log("erreur ");
      }
    }
    getDatafromDatabse();
  }, []);

  function getContents(onlyContents) {
    console.log(onlyContents);
    sendonlyContents(onlyContents);


  }
  /*
const handleSubmit = (e) => {
// e.preventDefault();
 
setLoader(true);
 
db.collection('users')
.doc(currentUser?.uid)
.collection('databases')
.doc(`${id}`)
  .update({
    onlyContents
  })
  .then(() => {
  
    setLoader(false);
    alert("Your informations has been submittedðŸ‘");
   
    
   // history.push("/dashboard");
 
  })
  .catch((error) => {
    alert(error.message);
  
    setLoader(false);
  });
 
}
*/
  /*
    function changetoLatex() {
      history.push(`/exportlatex/${id}`);
    }
    function changeToExportWord() {
      history.push(`/export/${id}`);
    }
  */
  function changetoDashboard() {
    history.push(`/dashboard/`);
  }


  function preview() {
    history.push(`/preview/${id}`);
  }


  return (
    <div>
      <div className="subtoolbar">
        <button class="barbutton" tabIndex="0" onClick={changetoDashboard}><i class="fas fa-home"> Go back to Dashboard</i></button>
        <button class="barbutton" tabIndex="0" onClick={downloadFile}><i class="fas fa-file-word"> Export to Word</i></button>
        {/* <button  tabIndex="0" onClick={changetoLatex}><i class="fas fa-file"> Export to latex</i></button> */}
        <button class="barbutton" tabIndex="0" onClick={preview}><i class="fas fa-eye"> Preview</i></button>

      </div>
      <SunEditor

        setDefaultStyle={`
       
              width: 100%;
             
              height: 700px;
              
           
          `}
        getSunEditorInstance={getSunEditorInstance}
        // onKeyDown={handleKeyDown}
        onChange={getContents}
        setContents={database.onlyContents}


        lang={ml}
        setOptions={{

          icons: {

            bold: '<i tabindex="0" class="fas fa-bold"></i>',
            underline: '<i tabindex="0" class="fas fa-underline"></i>',
            italic: '<i tabindex="0" class="fas fa-italic" ></i>',
            // lineHeight : '<i tabindex="0" class="fas fa-italic"></i>',
            image: '<i tabindex="0" class="fas fa-images" title="Upload new image"></i>',
            bibliographyPlugin: '<i tabindex="0" class="fad fa-books-medical" title="Add new reference"></i>',
            // table : '<i  class="fas fa-table">create new table</i>',
            table: '<i tabindex="0" class="fas fa-table" title="Create new table"  ></i>',
            math: '<i tabindex="0" class="fas fa-square-root-alt" title="add a math expression"></i>',
            preview: '<i tabindex="0" class="fas fa-eye" title="preview"></i>',
            save: '<i tabindex="0" class="fas fa-save" title="save"></i>',
            undo: '<i tabindex="0" class="fas fa-undo" title="undo"></i>',
            redo: '<i tabindex="1" class="fas fa-redo" title="redo"></i>',
            //   mergeTag : '<i tabindex="0" class="fas fa-anchor"></i>'

          },

          plugins: [plugin_command, bibliographyPlugin, FormatBlockNew, image_new, TableCaption],
          katex: katex,

          callBackSave: function (contents) {
            // alert(contents);
            setLoader(true);

            db.collection('users')
              .doc(currentUser?.uid)
              .collection('databases')
              .doc(`${id}`)
              .update({
                onlyContents: contents
              })
              .then(() => {

                setLoader(false);
                alert("Your informations has been submitted");


                // history.push("/dashboard");

              })
              .catch((error) => {
                alert(error.message);

                setLoader(false);
              });
          },
          buttonList: [

            ["formatBlock", "align", "list"],
            [
              "table",
              "tableCaption",
              "image",
              "math",
              "preview",

              "lineHeight",
              "fontSize",
              "blockquote",

            ],
            ["undo", "redo", 'save', "bibliographyPlugin"]
          ],

        }}

      />

      <div></div>

    </div>

  );
};

export default MyComponent;
