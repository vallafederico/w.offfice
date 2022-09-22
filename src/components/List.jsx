import { CONTENT } from "./content.js";

export default function () {
  return (
    <ul class="mt-2">
      <li class="text-center font-bold text-lg">Archive.</li>
      {CONTENT.list.map((item, i) => (
        <li
          onClick={() => {
            window.evts.clicky(i);
          }}
          class="text-center flex flex-col items-center "
          data-model={item.model}
        >
          <h2 class="text-[5vw] leading-[.8em] mt-4 py-4 relative z-[100]">
            <span class="ft-gs">{item.name} </span>
            <span class="text-[2vw]">{item.year}</span>
          </h2>
          <div class="md:w-1/3 w-full flex justify-between">
            <div class="">{item.object}</div>
            <div class="text-[.8em] w-1/3 text-center">{item.avail}</div>
            <div>{item.type}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
