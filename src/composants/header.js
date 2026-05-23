const headerLinks = [
  { label: "Accueil", href: "/" },
  {
    label: "Presentation",
    href: "/presentation/presentation-apprenti.html",
    match: "/presentation/",
    children: [
      {
        label: "Presentation apprenti",
        href: "/presentation/presentation-apprenti.html",
      },
      {
        label: "Presentation entreprise",
        href: "/presentation/presentation-entreprise.html",
      },
    ],
  },
  {
    label: "Epreuve E5",
    href: "/epreuve%20E5/tableau-de-synthese.html",
    match: "/epreuve%20E5/",
    children: [
      {
        label: "Tableau de synthese",
        href: "/epreuve%20E5/tableau-de-synthese.html",
      },
      {
        label: "Missions en formation",
        href: "/epreuve%20E5/missions-realisees-en-formation.html",
      },
      {
        label: "Missions en entreprise",
        href: "/epreuve%20E5/missions-realisees-en-entreprise.html",
      },
      {
        label: "Certifications",
        href: "/epreuve%20E5/certifications.html",
      },
    ],
  },
  {
    label: "Epreuve E6",
    href: "/epreuve%20E6/situations.html",
    match: "/epreuve%20E6/",
    children: [
      {
        label: "Situations",
        href: "/epreuve%20E6/situations.html",
      },
      {
        label: "Productions",
        href: "/epreuve%20E6/productions.html",
      },
    ],
  },
  {
    label: "Veille",
    href: "/veille/veille.html",
    match: "/veille/",
  },
];

function normalizePath(pathname) {
  return decodeURIComponent(pathname);
}

function isCurrentPage(pathname, href) {
  const normalizedPath = normalizePath(pathname);
  const normalizedHref = normalizePath(href);

  if (href === "/") {
    return normalizedPath === "/" || normalizedPath.endsWith("/index.html");
  }

  return normalizedPath === normalizedHref || normalizedPath.endsWith(normalizedHref);
}

function isActiveLink(pathname, href, match = href) {
  const normalizedPath = normalizePath(pathname);
  const normalizedMatch = normalizePath(match);

  if (href === "/") {
    return normalizedPath === "/" || normalizedPath.endsWith("/index.html");
  }

  return normalizedPath.startsWith(normalizedMatch);
}

export function renderHeader(pathname = "/") {
  const linksMarkup = headerLinks
    .map(({ label, href, match, children }) => {
      const ariaCurrent = isActiveLink(pathname, href, match)
        ? ' aria-current="page"'
        : "";
      const itemClass = children
        ? "header__item header__item--dropdown"
        : "header__item";
      const submenuMarkup = children
        ? `
            <ul class="header__submenu">
              ${children
                .map(({ label: childLabel, href: childHref }) => {
                  const childAriaCurrent = isCurrentPage(pathname, childHref)
                    ? ' aria-current="page"'
                    : "";

                  return `
                <li>
                  <a class="header__sublink" href="${childHref}"${childAriaCurrent}>${childLabel}</a>
                </li>`;
                })
                .join("")}
            </ul>`
        : "";

      return `
          <li class="${itemClass}">
            <a class="header__link" href="${href}"${ariaCurrent}>${label}</a>
            ${submenuMarkup}
          </li>`;
    })
    .join("");

  return `
    <header class="header">
      <nav>
        <ul class="header__menu">
          ${linksMarkup}
          <li class="header__item">
            <button class="header__soleil" type="button" aria-label="Changer le theme">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </header>`;
}
