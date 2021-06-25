
import React, { useState, useEffect, useRef } from 'react';

import SunEditor from 'suneditor-react';


import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import "./heading.css"
import "./figure.css"
import "./bibliography.css"
import "./math.css"
import "./Icon.css"


// FIXME: Incase you have the npm package
//import HTMLtoDOCX from 'html-to-docx';

import 'katex/dist/katex.min.css'
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext"


import mergeTag from "./merge_tag_plugin";

//import table_new from "./NewTable";
import bibliographyPlugin from "./Bibliopgraphy";

import mathNew from "./math_new_plugin";
import math_plugin from "./math_new_plugin";
import image_new from './ImageNew';

import FormatBlockNew from './FormatBlockNew';
import plugin_dialog from './CustomLink';
import { Link, useHistory, useParams } from "react-router-dom";
//import lang from 'suneditor/src/lang';
import ml from './ml';


//var juice = require('juice');

const ExportLatex = props => {


  const { currentUser } = useAuth();
  const [loader, setLoader] = useState(false);
  const [onlyContents, sendonlyContents] = useState("");
  const [database, displayDatabase] = useState("");
  const { id } = useParams();
  // ex) A command plugin to add "Range format element(util.isRangeFormatElement)" to selection


  /**
    * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
    */
  const editor = useRef();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
    //  console.log(editor.current)

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
            //    console.log(d.onlyContents);
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
  const styledContentHTMLString = juice.inlineContent(
    htmlString,
    `p{background-color: black;}`,
  );*/
  const htmlString = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Document</title>
    </head>
    <body style="counter-reset: h1";>
  
   
    <p>hello</p>`
    + onlyContents +
    `</body>
</html>`;





  //"<style>div{color:red;}</style><div/>"
  /*
  const styledContentHTMLString = juice.inlineContent(
    htmlString,
    `h1 {
      counter-reset: h2;
      background-color: red;
      text-decoration: underline;
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
  
    p{background-color: black;}`
   
    
  );
  */
  /*ça marche
  const styledContentHTMLString = juice.inlineContent(
    htmlString,
    `h1{background-color: red;},
    p{background-color: black;}`
   
    
  );
  
  
  
  */

  /*
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
  
  */
  /*
  const downloadFile = async () => {
  
    
    console.log(onlyContents);
    const fileBuffer = await HTMLtoDOCX(styledContentHTMLString, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });
  
    await save(fileBuffer, 'Document.docx')
  };
  */

  return (

    <div>
      {/*<button onClick={downloadFile} >export to latex</button> */}

      <SunEditor



        setContents={database.onlyContents}
        onChange={getContents}
        getSunEditorInstance={getSunEditorInstance}

      //onKeyDown={handleKeyDown}


      />


      <div>


      </div>

    </div>
  );

}
export default ExportLatex;
