const CONTACTS = [
  { text: "Email", link: "studio@officeforfuturefurnishing.com" },
  { text: "Press", link: "press@officeforfuturefurnishing.com" },
];

export default function () {
  return (
    <div class="">
      <p class="max-w-[35ch] text-4xl uppercase layer-top">
        We’re an Italian, Spanish and swiss multidisciplinary design studio
        focused on interior design, installations, digital imagery and
        meta-space research.
      </p>
      <ul class="mt-8">
        {CONTACTS.map((item, i) => (
          <li class=" flex mb-2">
            <h3 class="min-w-[10vw] uppercase">{item.text}</h3>
            <a href={`mailto:${item.link}`}>{item.link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
