import React, { Fragment } from "react";

function Footer() {
    const date = new Date();
  return (
    <Fragment>
      <footer className="py-1  bg-dark mb-0 footer">
        <p className="text-center mt-1">
          MegaStore - {date.getFullYear()}, All Rights Reserved
        </p>
      </footer>
    </Fragment>
  );
}

export default Footer;
