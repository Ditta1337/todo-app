import React from "react";
import style from "../styles/modules/title.module.css";

function PageTitle({ title, ...rest }: { title: string }) {
  return (
    <p className={style.title} {...rest}>{title}</p>
  );
}

export default PageTitle;