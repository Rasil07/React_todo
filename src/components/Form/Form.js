import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddTodoModal from "./AddTodoModal";

function Form() {
  const [formToggled, setFormToggle] = useState(false);

  function onToggleClick() {
    setFormToggle(!formToggled);
  }

  return (
    <Fragment>
      <div className="form-wrapper">
        <AddTodoModal />
      </div>
    </Fragment>
  );
}

export default Form;
