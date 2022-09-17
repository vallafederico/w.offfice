import { CONTENT } from "./content.js";

export default function () {
  return (
    <ul class="mt-2 z-50">
      <div class="flex justify-end py-1">
        <h2 class="font-bold  text-lg">
          <span class="text-[.5em]">↙</span> Archive.
        </h2>
      </div>
      {CONTENT.list.map((item, i) => (
        <li
          onClick={() => {
            window.evts.clicky(i);
          }}
          class="ListItem flex justify-between uppercase border-black border-t py-1 relative"
          data-model={item.model}
        >
          <div class="">
            <p class="inline ft-gs mr-3">{item.name}</p>{" "}
            <span class=""> {item.year}</span>
          </div>

          <div class="flex md:justify-between md:w-[50%] justify-end">
            <div class=" w-[10%] sm:flex hidden justify-between">
              <div>
                {"•"} <span class="text-[.6em]">WW</span>
              </div>
              <div>
                {"•"} <span class="text-[.6em]">US</span>
              </div>
            </div>

            <div class="">
              <span class="text-[8px] capitalize md:mr-6 mr-2 hidden sm:visible">
                {item.type}
              </span>{" "}
              {item.object}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
