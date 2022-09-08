export default function ({ children, className }) {
  const navLinks = [
    { text: "Custom Work.", path: "/about" },
    { text: "Shop Archive.", path: "/about" },
  ];

  return (
    <nav
      class={
        "Nav flex px-[3vw] py-[2em] justify-between w-full fixed top-[0em]" +
        className
      }
    >
      <div class="">
        <a href="/" class="visible md:hidden">
          offfice. <span class="ft-gs">studio</span>
        </a>
      </div>
      <ul class=" text-right font-bold leading-[2em]">
        {navLinks.map((link) => (
          <li>
            <a class="hover:opacity-50" href={link.path}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      {children}
    </nav>
  );
}
