const CONTACTS = [
  { text: "Email", link: "studio@officeforfuturefurnishing.com" },
  { text: "Press", link: "press@officeforfuturefurnishing.com" },
];

export default function () {
  return (
    <div class="">
      <p class="max-w-[50ch] text-lg uppercase">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <ul class="mt-2">
        {CONTACTS.map((item, i) => (
          <li class=" flex">
            <h3 class="min-w-[10vw]">{item.text}</h3>
            <a href={`mailto:${item.link}`}>{item.link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
