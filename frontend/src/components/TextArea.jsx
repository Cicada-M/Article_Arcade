/* eslint-disable react/prop-types */
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
export default function TextArea({ initialDesc, setDesc, setDescText }) {
  const [value, setValue] = useState(initialDesc);
  useEffect(() => {
    setValue(initialDesc);
  }, [initialDesc]);
  return (
    <Editor
      apiKey={import.meta.env.VITE_REACT_APP_TINYMCE_KEY}
      onEditorChange={(value, editor) => {
        setValue(value);
        setDesc(value);
        setDescText(editor.getContent({ format: "text" }));
      }}
      initialValue={initialDesc}
      value={value}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
