import React from "react";
export function ModalScreen(props) {
  console.log(props);

  const { className } = props;
  return (
    <section
      {...props}
      className={`modal-screen${className ? " " + className : ""}${
        props.invisible ? " invisible" : ""
      }`}
    >
      {props.children}
    </section>
  );
}
