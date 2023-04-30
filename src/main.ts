import Editor from "./editor/Editor";

new Editor();
const editor = Editor.instance.getObject();

document.body?.append(editor);
