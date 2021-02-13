import React, { Fragment } from "react";

function Footer() {
    const date = new Date();
  return (
    <Fragment>
      <footer className="py-1">
        <p className="text-center mt-1">
          Shopping Cart - {date.getFullYear()}, All Rights Reserved
        </p>
      </footer>
    </Fragment>
  );
}

export default Footer;
