import "./style.css";
import "./composants/header.css";
import "./utilitaire.css";
import "./modern-normalize.css";
import "./composants/presentation.css";
import "./composants/apropos.css";
import "./composants/projets.css";
import "./composants/projets-secondaires.css";
import "./composants/footer.css";
import "./composants/contact.css";
import { renderHeader } from "./composants/header.js";

const headerTarget = document.querySelector("[data-site-header]");

if (headerTarget) {
  headerTarget.outerHTML = renderHeader(window.location.pathname);
}
