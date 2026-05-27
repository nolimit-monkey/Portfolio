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
        </ul>
      </nav>
    </header>`;
}
