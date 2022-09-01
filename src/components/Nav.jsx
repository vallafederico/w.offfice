export default function ({ children, className }) {
  const navLinks = [
    { text: "About.", path: "/about" },
    { text: "Archive.", path: "/about" },
    { text: "Custom Work.", path: "/about" },
    { text: "Shop Archive.", path: "/about" },
  ];

  return (
    <nav
      class={"Nav flex px-[2vw] py-[2em] justify-between w-full" + className}
    >
      <a href="/">
        offfice. <span class="ft-gs">studio</span>
      </a>

      <ul class=" text-right font-bold leading-[2em]">
        {navLinks.map((link) => (
          <li>
            <a href={link.path}>{link.text}</a>
          </li>
        ))}
      </ul>
      {children}
    </nav>
  );
}
