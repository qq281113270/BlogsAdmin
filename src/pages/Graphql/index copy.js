import React, { useState, useEffect, useCallback, useRef } from "react";
import "@/common/css/base.less";
import "./index.less";
import { Form, Input, Button, message, Checkbox } from "antd";
import { routePaths, historyPush, getHistory } from "@/router";
import { query, mutation } from "@/common/js/request/index";
import { checkPhone, checkUser, checkPassword } from "@/utils";
import Store, { mapRedux } from "@/redux";

import CodeMirror from "@/common/component/Codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/sql-hint.js";
import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/sql/sql";
import "codemirror/addon/hint/show-hint.js";

import "codemirror/theme/blackboard.css";
import "codemirror/lib/codemirror.css";
// require active-line.js
import "codemirror/addon/selection/active-line.js";
// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
// hint
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/sql-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint.js";
// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/match-highlighter.js";
// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
// foldGutter
// import 'codemirror/addon/fold/foldgutter.css'
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";

// ?????????????????????
import "codemirror/theme/monokai.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/yonce.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Index = (props) => {
  const [schema, setSchema] = useState("");
  const [variables, setVariables] = useState("");
  const codeMirrorRef = useRef(null);
  const [data, setData] = useState('');

  const updateSchema = useCallback((code) => {
    setSchema(code);
  }, []);

  const updateVariables = useCallback((code) => {
    setVariables(code);
  }, []);

  const updateData = useCallback((data) => {
    setData(data);
  }, []);
  const options = {
    lineNumbers: true, // ????????????
    lineWrapping: true, // ????????????
    styleActiveLine: true, // ???????????????
    mode: "text/javascript",
    theme: "erlang-dark", // ????????????
    matchBrackets: true, // ????????????
    extraKeys: { Ctrl: "autocomplete" }, //??????????????????
    gutters: ["CodeMirror-lint-markers"],
    lint: true, // ??????????????????
    indentUnit: 4, // ????????????????????????2???
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    // theme: 'solarized light', // ??????
  };
  console.log("data==============", data);
  console.log("codeMirrorRef==============", codeMirrorRef);

  useEffect(() => {}, []);
  return (
    <div className="graphql">
      <div className="button-box">
        <Button
          onClick={() => {
            query(schema, variables).then((res) => {
              const data = (res && res[0]) || {};
              console.log("data=", JSON.stringify(data,null, 4));
              updateData(JSON.stringify(data,null, 4));
            });
          }}
        >
          ??????query??????
        </Button>
        <Button
          onClick={() => {
            mutation(schema, variables).then((res) => {
              const data = (res && res[0]) || {};
              console.log("data=", JSON.stringify(data,null, 4));
              updateData(JSON.stringify(data,null, 4));
            });
          }}
        >
          ??????mutation??????
        </Button>
      </div>
      <div className="code-mirror-box">
        <ul>
          <li>
            <dl>
              <dt>schema:</dt>
              <dd>
                <CodeMirror
                  value={schema}
                  onChange={updateSchema}
                  options={options}
                />
              </dd>
            </dl>
            <dl>
              <dt>variables:</dt>
              <dd>
                <CodeMirror
                  value={variables}
                  onChange={updateVariables}
                  options={options}
                />
              </dd>
            </dl>
          </li>
          <li>
            <CodeMirror
              ref={codeMirrorRef}
              value={data}
              onChange={updateData}
              options={{ ...options, theme: " base16-light" }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default mapRedux(["user"])(Index);
