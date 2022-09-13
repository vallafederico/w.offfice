export default function ({ children, className }) {
  const navLinks = [
    {
      text: "Custom Work.",
      path: "mailto:someone@yoursite.com",
      subject: "Custom Work Request",
      body: "Please provide as much information as possible. Feel free to attach pictures, concepts or anything you have at your disposal.",
      target: "blank",
    },
    {
      text: "Shop Archive.",
      path: "mailto:someone@yoursite.com",
      subject: "Archive Shop Inquiry",
      body: "What piece are you enquiring for? What size? What color? To which state will this need to be shipped?",
      target: "blank",
    },
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
            <a
              target={link.target}
              class="hover:opacity-50"
              href={`${link.path}?subject=${link.subject}&body=${link.body}`}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      {children}
    </nav>
  );
}
