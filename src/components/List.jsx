import { CONTENT } from "./content.js";

export default function () {
  return (
    <ul class="mt-2">
      <div class="flex justify-end py-1">
        <h2 class="font-bold  text-lg">
          <span class="text-[.5em]">↗</span> Archive.
        </h2>
      </div>
      {CONTENT.list.map((item) => (
        <li class="ListItem flex justify-between uppercase border-black border-t py-1 relative">
          <div class="">
            <p class="inline ft-gs mr-3">{item.name}</p> {item.year}
          </div>
          <div class="flex justify-between w-[50%]">
            <div class=" w-[10%] flex justify-between">
              <div>
                {"•"} <span class="text-[.6em]">WW</span>
              </div>
              <div>
                {"•"} <span class="text-[.6em]">US</span>
              </div>
            </div>

            <div class="">
              <span class="text-[8px] capitalize mr-6">{item.type}</span>{" "}
              {item.object}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
