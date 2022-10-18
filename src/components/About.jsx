const CONTACTS = [
  { text: "Email", link: "studio@officeforfuturefurnishing.com" },
  { text: "Press", link: "press@officeforfuturefurnishing.com" },
];

export default function () {
  return (
    <div class="">
      <p class="max-w-[35ch] text-4xl uppercase layer-top">
        We’re an Italian, Spanish and swiss multidisciplinary design studio
        focused on interior, installations, digital imagery and liminal space
        research.
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
